import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, query, where, increment, serverTimestamp } from 'firebase/firestore';

// ===================== PERSISTENT CACHE (localStorage) =====================
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days — localStorage is primary persistence, Firestore syncs when available

function getCached<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`cache_${key}`);
    if (!raw) return null;
    const item = JSON.parse(raw);
    if (item && item.exp > Date.now() && item.data != null) return item.data as T;
    localStorage.removeItem(`cache_${key}`);
  } catch {}
  return null;
}

function setCached(key: string, data: any) {
  // CRITICAL: Never cache null/undefined — it causes 'cache poisoning'
  if (typeof window === 'undefined' || data == null) return;
  try {
    localStorage.setItem(`cache_${key}`, JSON.stringify({ data, exp: Date.now() + CACHE_TTL }));
  } catch {}
}

function invalidateCache(key: string) {
  if (typeof window === 'undefined') return;
  try { localStorage.removeItem(`cache_${key}`); } catch {}
}

// Robust read helper: tries server, falls back to cache instantly on offline/timeout errors
async function getDocWithRetry(ref: any): Promise<any> {
  try {
    return await Promise.race([
      getDoc(ref),
      new Promise((_, reject) => setTimeout(() => reject(new Error('offline')), 3000))
    ]);
  } catch (err: any) {
    // Try reading from local Firestore cache on timeout/offline
    try {
      const { getDocFromCache } = await import('firebase/firestore');
      return await getDocFromCache(ref);
    } catch {
      throw err;
    }
  }
}

// Robust write helper: retries maximum once on offline errors
async function writeWithRetry(writeFn: () => Promise<void>): Promise<void> {
  try {
    await writeFn();
  } catch (err: any) {
    const isOffline = err?.message?.includes('offline') || err?.code === 'unavailable';
    if (isOffline) {
      // Small delay then one last try
      await new Promise(r => setTimeout(r, 1000));
      await writeFn();
    } else {
      throw err;
    }
  }
}

// ===================== USER PROFILES =====================

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
  pendidikan: string;
  archetype: string;
  roleInterests: string[];
  jurusan?: string;
  minat?: string;
  createdAt: any;
  lastLoginAt: any;
  points: number;
  level: number;
  completedTaskCount: number;
  completedProjectCount: number;
}

export const saveUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  if (!uid) return;
  
  // ALWAYS save to localStorage first (instant, guaranteed)
  const existing = getCached<UserProfile>(`user_${uid}`) || { uid, points: 0, level: 1, completedTaskCount: 0, completedProjectCount: 0 } as UserProfile;
  const updatedData = { ...existing, ...data, lastLoginAt: new Date().toISOString() };
  if (!existing.createdAt) updatedData.createdAt = new Date().toISOString();
  setCached(`user_${uid}`, updatedData);

  // Then try Firestore in the background
  try {
    const userRef = doc(db, 'users', uid);
    writeWithRetry(async () => {
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          ...data,
          uid,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
          points: 0,
          level: 1,
          completedTaskCount: 0,
          completedProjectCount: 0,
        });
      } else {
        await updateDoc(userRef, {
          ...data,
          lastLoginAt: serverTimestamp(),
        });
      }
    }).catch(e => console.warn('saveUserProfile firestore error (data saved locally):', e));
  } catch (e) {
    console.warn('saveUserProfile error:', e);
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;
  const cacheKey = `user_${uid}`;
  const cached = getCached<UserProfile>(cacheKey);
  if (cached) return cached;

  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDocWithRetry(userRef);
    const data = snap.exists() ? (snap.data() as UserProfile) : null;
    setCached(cacheKey, data);
    return data;
  } catch (error: any) {
    if (!error?.message?.includes('offline') && error?.code !== 'unavailable') {
      console.warn('getUserProfile error:', error);
    }
    return null;
  }
};

export const incrementUserPoints = async (uid: string, amount: number) => {
  if (!uid) return;
  const userRef = doc(db, 'users', uid);
  try {
    await updateDoc(userRef, {
      points: increment(amount),
    });
    invalidateCache(`user_${uid}`);
  } catch (e) { console.error('incrementUserPoints error:', e); }
};

// ===================== AI RECOMMENDATIONS =====================

export interface AIRecommendation {
  careerTitle: string;
  matchScore: number;
  reason: string;
  skills: string[];
  savedAt: any;
}

export const saveAIRecommendation = async (uid: string, result: Omit<AIRecommendation, 'savedAt'>) => {
  if (!uid) return;

  const localData = { ...result, savedAt: new Date().toISOString() };
  setCached(`ai_rec_${uid}`, localData as AIRecommendation);

  try {
    const ref = doc(db, 'recommendations', uid);
    writeWithRetry(async () => {
      await setDoc(ref, {
        uid,
        ...result,
        savedAt: serverTimestamp(),
      });
    }).catch(e => console.warn('saveAIRecommendation firestore error (data saved locally):', e));
  } catch (e) {
    console.warn('saveAIRecommendation error:', e);
  }
};

export const getAIRecommendation = async (uid: string): Promise<AIRecommendation | null> => {
  if (!uid) return null;
  const cacheKey = `ai_rec_${uid}`;
  const cached = getCached<any>(cacheKey);
  if (cached) return cached._emptyState ? null : cached;

  try {
    const ref = doc(db, 'recommendations', uid);
    const snap = await getDocWithRetry(ref);
    const data = snap.exists() ? (snap.data() as AIRecommendation) : { _emptyState: true } as any;
    setCached(cacheKey, data);
    return snap.exists() ? data : null;
  } catch (error: any) {
    if (!error?.message?.includes('offline') && error?.code !== 'unavailable') {
      console.warn('getAIRecommendation error:', error);
    }
    return null;
  }
};

export const deleteAIRecommendation = async (uid: string) => {
  if (!uid) return;
  try {
    const ref = doc(db, 'recommendations', uid);
    const { deleteDoc } = await import('firebase/firestore');
    await deleteDoc(ref);
  } catch (e) {
    console.warn('deleteAIRecommendation error:', e);
  }
};

// ===================== ASSESSMENTS =====================

export interface AssessmentResult {
  primaryField: string;
  secondaryField: string;
  strengths: string[];
  matchedCareers: string[];
  personalityTraits: string[];
  detailedAnalysis: string;
}

export const saveAssessmentResults = async (uid: string, answers: number[], aiResult: AssessmentResult) => {
  if (!uid) return;

  const localData = { uid, answers, result: aiResult, completedAt: new Date().toISOString() };
  setCached(`assessments_${uid}`, localData);

  try {
    const ref = doc(db, 'assessments', uid);
    writeWithRetry(async () => {
      await setDoc(ref, { uid, answers, result: aiResult, completedAt: serverTimestamp() });
    }).catch(e => console.warn('saveAssessmentResults firestore error:', e));
    incrementUserPoints(uid, 100).catch(() => {});
  } catch (e) {
    console.warn('saveAssessmentResults error:', e);
  }
};

export const getUserAssessment = async (uid: string) => {
  if (!uid) return null;
  try {
    const ref = doc(db, 'assessments', uid);
    const snap = await getDocWithRetry(ref);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.warn('getUserAssessment offline/error:', error);
    return null;
  }
};

// ===================== SKILL PATHS =====================

export interface SkillPathNode {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  prerequisites: string[];
  status: 'locked' | 'active' | 'completed';
  x: number;
  y: number;
  // Neural Roadmap fields
  coordinates: { x: number; y: number };
  icon_type: string;
  difficulty: string;
  duration: string;
  connections: string[];
  learning_resources?: { title: string; url: string; type: string }[];
}

export const saveSkillPath = async (uid: string, career: string, nodes: SkillPathNode[]) => {
  if (!uid) return;
  const localData = { uid, targetCareer: career, nodes, lastUpdated: new Date().toISOString() };
  // ALWAYS save to localStorage first (instant, guaranteed)
  setCached(`skillpath_${uid}`, localData);
  // Then try Firestore in the background (best-effort)
  try {
    const ref = doc(db, 'skillpaths', uid);
    await writeWithRetry(async () => {
      await setDoc(ref, {
        ...localData,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      });
    });
  } catch (e) {
    console.warn('saveSkillPath firestore error (data saved locally):', e);
  }
};

export const getSkillPath = async (uid: string) => {
  if (!uid) return null;
  const cacheKey = `skillpath_${uid}`;
  // Check localStorage first (instant)
  const cached = getCached<any>(cacheKey);
  if (cached) return cached._emptyState ? null : cached;

  // Fall back to Firestore
  try {
    const ref = doc(db, 'skillpaths', uid);
    const snap = await getDocWithRetry(ref);
    const data = snap.exists() ? snap.data() : { _emptyState: true };
    setCached(cacheKey, data);
    return snap.exists() ? data : null;
  } catch (error) {
    console.warn('getSkillPath offline/error:', error);
    return null;
  }
};

export const updateSkillPathNode = async (uid: string, nodeId: string, status: 'locked' | 'active' | 'completed') => {
  if (!uid) return;
  try {
    // Read from localStorage first, then Firestore
    const existing = await getSkillPath(uid);
    if (!existing) return;

    const nodes = (existing.nodes || []).map((n: any) => n.id === nodeId ? { ...n, status } : n);
    const updatedData = { ...existing, nodes, lastUpdated: new Date().toISOString() };

    // ALWAYS save to localStorage first (instant, guaranteed)
    setCached(`skillpath_${uid}`, updatedData);

    // Then try Firestore in the background
    try {
      const ref = doc(db, 'skillpaths', uid);
      await writeWithRetry(async () => {
        await updateDoc(ref, { nodes, lastUpdated: serverTimestamp() });
      });
    } catch (e) {
      console.warn('updateSkillPathNode firestore error (data saved locally):', e);
    }

    if (status === 'completed') incrementUserPoints(uid, 50).catch(() => {});
  } catch (error) {
    console.warn('updateSkillPathNode error:', error);
  }
};

// ===================== LEARNING JOURNEYS =====================

export interface JourneyTask {
  id: string;
  day: number;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt: any | null;
  resources?: { title: string; url: string }[];
}

export const saveUserJourney = async (uid: string, career: string, tasks: JourneyTask[]) => {
  if (!uid) return;
  const localData = { uid, targetCareer: career, tasks, streak: 0, lastCompletedDate: null, lastUpdated: new Date().toISOString() };
  // ALWAYS save to localStorage first (instant, guaranteed)
  setCached(`journey_${uid}`, localData);
  // Then try Firestore in the background
  try {
    const ref = doc(db, 'journeys', uid);
    await writeWithRetry(async () => {
      await setDoc(ref, {
        ...localData,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      });
    });
  } catch (e) {
    console.warn('saveUserJourney firestore error (data saved locally):', e);
  }
};

export const getUserJourney = async (uid: string) => {
  if (!uid) return null;
  const cacheKey = `journey_${uid}`;
  // Check localStorage first (instant)
  const cached = getCached<any>(cacheKey);
  if (cached) return cached._emptyState ? null : cached;

  // Fall back to Firestore
  try {
    const ref = doc(db, 'journeys', uid);
    const snap = await getDocWithRetry(ref);
    const data = snap.exists() ? snap.data() : { _emptyState: true };
    setCached(cacheKey, data);
    return snap.exists() ? data : null;
  } catch (error) {
    console.warn('getUserJourney offline/error:', error);
    return null;
  }
};

export const markTaskCompleted = async (uid: string, taskId: string) => {
  if (!uid) return;
  try {
    // Read current journey from localStorage first, then Firestore
    const existing = await getUserJourney(uid);
    if (!existing) return;

    const tasks = (existing.tasks || []).map((t: any) =>
      t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
    );

    // Streak logic
    const today = new Date().toDateString();
    const lastDate = existing.lastCompletedDate;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak = existing.streak || 0;
    if (lastDate !== today) {
      newStreak = lastDate === yesterday ? newStreak + 1 : 1;
    }

    const updatedData = {
      ...existing,
      tasks,
      streak: newStreak,
      lastCompletedDate: today,
      lastUpdated: new Date().toISOString(),
    };

    // ALWAYS save to localStorage first (instant, guaranteed)
    setCached(`journey_${uid}`, updatedData);

    // Then try Firestore in the background
    try {
      const ref = doc(db, 'journeys', uid);
      await writeWithRetry(async () => {
        await updateDoc(ref, {
          tasks,
          streak: newStreak,
          lastCompletedDate: today,
          lastUpdated: serverTimestamp(),
        });
      });
    } catch (e) {
      console.warn('markTaskCompleted firestore error (data saved locally):', e);
    }

    // Background: try to update points
    incrementUserPoints(uid, 15).catch(() => {});
    const userRef = doc(db, 'users', uid);
    writeWithRetry(async () => {
      await updateDoc(userRef, { completedTaskCount: increment(1) });
    }).catch(() => {});
    invalidateCache(`user_${uid}`);
  } catch (error) {
    console.warn('markTaskCompleted error:', error);
  }
};

// ===================== PROJECTS =====================

export interface ProjectEvaluation {
  id: string; // ID unik proyek statis (e.g., 'proj-api-store')
  title: string;
  githubUrl?: string;
  demoUrl?: string; // Live Demo Web App
  score?: number; // Skor AI
  skills: string[];
  feedback?: string; // AI Feedback
  status: 'Tersedia' | 'Sedang Dikerjakan' | 'Terselesaikan' | 'Revisi';
  startedAt?: any;
  submittedAt?: any;
}

// Fungsi untuk mulai mengerjakan proyek
export const updateProjectStatus = async (uid: string, project: Pick<ProjectEvaluation, 'id' | 'title' | 'skills' | 'status'>) => {
  if (!uid) return;
  try {
    const existing = await getUserProjects(uid);
    const existingProj = existing.find(p => p.id === project.id);
    const newProj: ProjectEvaluation = existingProj 
      ? { ...existingProj, status: project.status }
      : { ...project, status: project.status, startedAt: new Date().toISOString() };

    // Update in local array
    const newArr = existing.filter(p => p.id !== project.id);
    newArr.push(newProj);
    setCached(`projects_${uid}`, newArr);

    // Update in Firestore
    const ref = doc(db, 'projects', `${uid}_${project.id}`);
    await setDoc(ref, {
      uid,
      ...newProj,
      startedAt: newProj.startedAt === serverTimestamp() ? serverTimestamp() : (existingProj?.startedAt || serverTimestamp()),
    }, { merge: true });

  } catch (e) { console.warn('updateProjectStatus error:', e); }
};

export const saveProjectEvaluation = async (uid: string, project: Omit<ProjectEvaluation, 'submittedAt'>) => {
  if (!uid) return;
  try {
    const ref = doc(db, 'projects', `${uid}_${project.id}`);
    await setDoc(ref, {
      uid,
      ...project,
      submittedAt: serverTimestamp(),
    });
    invalidateCache(`projects_${uid}`);
    await incrementUserPoints(uid, 30);

    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { completedProjectCount: increment(1) }).catch(() => {});
    invalidateCache(`user_${uid}`);
  } catch (e) {
    console.warn('saveProjectEvaluation error:', e);
  }
};

export const getUserProjects = async (uid: string): Promise<ProjectEvaluation[]> => {
  if (!uid) return [];
  const cacheKey = `projects_${uid}`;
  const cached = getCached<ProjectEvaluation[]>(cacheKey);
  // ALWAYS return cache immediately if available, even if empty array!
  if (cached && Array.isArray(cached)) return cached;

  try {
    const q = query(collection(db, 'projects'), where('uid', '==', uid));
    // Check if we can get from cache first (very fast)
    let snap;
    try {
      const { getDocsFromCache } = await import('firebase/firestore');
      snap = await getDocsFromCache(q);
      if (!snap.empty) {
        const data = snap.docs.map(d => d.data() as ProjectEvaluation);
        setCached(cacheKey, data);
        return data;
      }
    } catch {
      // Cache miss, try server
    }

    // Try server with a short timeout to prevent 15-second hangs
    snap = await Promise.race([
      getDocs(q),
      new Promise((_, reject) => setTimeout(() => reject(new Error('offline')), 3000))
    ]) as any;
    
    const data = snap.docs.map((d: any) => d.data() as ProjectEvaluation);
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('getUserProjects offline/error:', error);
    return []; // Return empty array since projects are just a list
  }
};

// ===================== USER STATS AGGREGATION =====================

export const getUserStats = async (uid: string) => {
  if (!uid) return null;
  try {
    const [profile, journeyData, projects] = await Promise.all([
      getUserProfile(uid),
      getUserJourney(uid),
      getUserProjects(uid)
    ]);

    const completedTasks = journeyData?.tasks?.filter((t: any) => t.completed).length || 0;
    const totalTasks = journeyData?.tasks?.length || 0;
    const points = profile?.points || 0;
    const level = Math.max(1, Math.floor(points / 200) + 1);

    return {
      points,
      level,
      completedTasks,
      totalTasks,
      projectCount: projects.length,
      streak: journeyData?.streak || 0,
      avgProjectScore: projects.length > 0 ? Math.round(projects.reduce((a, p) => a + (p.score || 0), 0) / projects.length) : 0,
    };
  } catch (error) {
    console.warn('getUserStats offline/error:', error);
    return null;
  }
};
