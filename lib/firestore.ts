import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, query, where, increment, serverTimestamp } from 'firebase/firestore';

// ===================== PERSISTENT CACHE (localStorage) =====================
const CACHE_TTL = 1000 * 60 * 10; // 10 minutes (safe because we invalidate on writes)

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

// Retry helper for Firestore cold-start offline errors
async function getDocWithRetry(ref: any, retries = 2): Promise<any> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await getDoc(ref);
    } catch (err: any) {
      if (i < retries && err?.message?.includes('offline')) {
        await new Promise(r => setTimeout(r, 1000));
        continue;
      }
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
  try {
    const userRef = doc(db, 'users', uid);
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
  } catch (e) {
    console.warn('saveUserProfile offline/error:', e);
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
  } catch (error) {
    console.warn('getUserProfile offline/error:', error);
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
  try {
    const ref = doc(db, 'recommendations', uid);
    await setDoc(ref, {
      uid,
      ...result,
      savedAt: serverTimestamp(),
    });
    invalidateCache(`ai_rec_${uid}`);
  } catch (e) {
    console.warn('saveAIRecommendation error:', e);
  }
};

export const getAIRecommendation = async (uid: string): Promise<AIRecommendation | null> => {
  if (!uid) return null;
  const cacheKey = `ai_rec_${uid}`;
  const cached = getCached<AIRecommendation>(cacheKey);
  if (cached) return cached;

  try {
    const ref = doc(db, 'recommendations', uid);
    const snap = await getDocWithRetry(ref);
    const data = snap.exists() ? (snap.data() as AIRecommendation) : null;
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('getAIRecommendation offline/error:', error);
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
  try {
    const ref = doc(db, 'assessments', uid);
    await setDoc(ref, { uid, answers, result: aiResult, completedAt: serverTimestamp() });
    await incrementUserPoints(uid, 100);
  } catch (e) {
    console.warn('saveAssessmentResults error:', e);
  }
};

export const getUserAssessment = async (uid: string) => {
  if (!uid) return null;
  try {
    const ref = doc(db, 'assessments', uid);
    const snap = await getDoc(ref);
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
}

export const saveSkillPath = async (uid: string, career: string, nodes: SkillPathNode[]) => {
  if (!uid) return;
  try {
    const ref = doc(db, 'skillpaths', uid);
    await setDoc(ref, {
      uid,
      targetCareer: career,
      nodes,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
    // Invalidate cache so next read gets fresh data
    invalidateCache(`skillpath_${uid}`);
  } catch (e) {
    console.warn('saveSkillPath error:', e);
  }
};

export const getSkillPath = async (uid: string) => {
  if (!uid) return null;
  const cacheKey = `skillpath_${uid}`;
  const cached = getCached<any>(cacheKey);
  if (cached) return cached;

  try {
    const ref = doc(db, 'skillpaths', uid);
    const snap = await getDocWithRetry(ref);
    const data = snap.exists() ? snap.data() : null;
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('getSkillPath offline/error:', error);
    return null;
  }
};

export const updateSkillPathNode = async (uid: string, nodeId: string, status: 'locked' | 'active' | 'completed') => {
  if (!uid) return;
  try {
    const ref = doc(db, 'skillpaths', uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const data = snap.data();
    const nodes = (data.nodes || []).map((n: any) => n.id === nodeId ? { ...n, status } : n);
    await updateDoc(ref, { nodes, lastUpdated: serverTimestamp() });
    invalidateCache(`skillpath_${uid}`);
    if (status === 'completed') await incrementUserPoints(uid, 50);
  } catch (error) {
    console.warn('updateSkillPathNode offline/error:', error);
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
  try {
    const ref = doc(db, 'journeys', uid);
    await setDoc(ref, {
      uid,
      targetCareer: career,
      tasks,
      streak: 0,
      lastCompletedDate: null,
      createdAt: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    });
    invalidateCache(`journey_${uid}`);
  } catch (e) {
    console.warn('saveUserJourney error:', e);
  }
};

export const getUserJourney = async (uid: string) => {
  if (!uid) return null;
  const cacheKey = `journey_${uid}`;
  const cached = getCached<any>(cacheKey);
  if (cached) return cached;

  try {
    const ref = doc(db, 'journeys', uid);
    const snap = await getDocWithRetry(ref);
    const data = snap.exists() ? snap.data() : null;
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('getUserJourney offline/error:', error);
    return null;
  }
};

export const markTaskCompleted = async (uid: string, taskId: string) => {
  if (!uid) return;
  try {
    const ref = doc(db, 'journeys', uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;

    const data = snap.data();
    const tasks = (data.tasks || []).map((t: any) =>
      t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
    );

    // Streak logic
    const today = new Date().toDateString();
    const lastDate = data.lastCompletedDate;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    let newStreak = data.streak || 0;
    if (lastDate !== today) {
      newStreak = lastDate === yesterday ? newStreak + 1 : 1;
    }

    await updateDoc(ref, {
      tasks,
      streak: newStreak,
      lastCompletedDate: today,
      lastUpdated: serverTimestamp(),
    });
    invalidateCache(`journey_${uid}`);
    await incrementUserPoints(uid, 15);

    // Update completed task count on profile
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { completedTaskCount: increment(1) }).catch(() => {});
    invalidateCache(`user_${uid}`);
  } catch (error) {
    console.warn('markTaskCompleted offline/error:', error);
  }
};

// ===================== PROJECTS =====================

export interface ProjectEvaluation {
  id: string;
  title: string;
  link: string;
  score: number;
  skills: string[];
  feedback: string;
  submittedAt: any;
}

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
  if (cached) return cached;

  try {
    const q = query(collection(db, 'projects'), where('uid', '==', uid));
    const snap = await getDocs(q);
    const data = snap.docs.map(d => d.data() as ProjectEvaluation);
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    console.warn('getUserProjects offline/error:', error);
    return [];
  }
};

// ===================== USER STATS AGGREGATION =====================

export const getUserStats = async (uid: string) => {
  if (!uid) return null;
  try {
    const profile = await getUserProfile(uid);
    const journeyData = await getUserJourney(uid);
    const projects = await getUserProjects(uid);

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
