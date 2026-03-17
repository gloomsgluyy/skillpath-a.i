import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, collection, getDocs, query, where, increment, serverTimestamp } from 'firebase/firestore';

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
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    return snap.exists() ? (snap.data() as UserProfile) : null;
  } catch (error) {
    console.error('getUserProfile error:', error);
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
  const ref = doc(db, 'recommendations', uid);
  await setDoc(ref, {
    uid,
    ...result,
    savedAt: serverTimestamp(),
  });
};

export const getAIRecommendation = async (uid: string): Promise<AIRecommendation | null> => {
  if (!uid) return null;
  try {
    const ref = doc(db, 'recommendations', uid);
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as AIRecommendation) : null;
  } catch (error) {
    console.error('getAIRecommendation error:', error);
    return null;
  }
};

export const deleteAIRecommendation = async (uid: string) => {
  if (!uid) return;
  const ref = doc(db, 'recommendations', uid);
  const { deleteDoc } = await import('firebase/firestore');
  await deleteDoc(ref);
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
  const ref = doc(db, 'assessments', uid);
  await setDoc(ref, { uid, answers, result: aiResult, completedAt: serverTimestamp() });
  await incrementUserPoints(uid, 100);
};

export const getUserAssessment = async (uid: string) => {
  if (!uid) return null;
  const ref = doc(db, 'assessments', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
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
}

export const saveSkillPath = async (uid: string, career: string, nodes: SkillPathNode[]) => {
  if (!uid) return;
  const ref = doc(db, 'skillpaths', uid);
  await setDoc(ref, {
    uid,
    targetCareer: career,
    nodes,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
  });
};

export const getSkillPath = async (uid: string) => {
  if (!uid) return null;
  try {
    const ref = doc(db, 'skillpaths', uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error('getSkillPath error:', error);
    return null;
  }
};

export const updateSkillPathNode = async (uid: string, nodeId: string, status: 'locked' | 'active' | 'completed') => {
  if (!uid) return;
  const ref = doc(db, 'skillpaths', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const nodes = (data.nodes || []).map((n: any) => n.id === nodeId ? { ...n, status } : n);
  await updateDoc(ref, { nodes, lastUpdated: serverTimestamp() });
  if (status === 'completed') await incrementUserPoints(uid, 50);
};

// ===================== LEARNING JOURNEYS =====================

export interface JourneyTask {
  id: string;
  day: number;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt: any | null;
}

export const saveUserJourney = async (uid: string, career: string, tasks: JourneyTask[]) => {
  if (!uid) return;
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
};

export const getUserJourney = async (uid: string) => {
  if (!uid) return null;
  try {
    const ref = doc(db, 'journeys', uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error('getUserJourney error:', error);
    return null;
  }
};

export const markTaskCompleted = async (uid: string, taskId: string) => {
  if (!uid) return;
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
  await incrementUserPoints(uid, 15);

  // Update completed task count on profile
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { completedTaskCount: increment(1) }).catch(() => {});
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
  const ref = doc(db, 'projects', `${uid}_${project.id}`);
  await setDoc(ref, {
    uid,
    ...project,
    submittedAt: serverTimestamp(),
  });
  await incrementUserPoints(uid, 30);

  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { completedProjectCount: increment(1) }).catch(() => {});
};

export const getUserProjects = async (uid: string): Promise<ProjectEvaluation[]> => {
  if (!uid) return [];
  try {
    const q = query(collection(db, 'projects'), where('uid', '==', uid));
    const snap = await getDocs(q);
    return snap.docs.map(d => d.data() as ProjectEvaluation);
  } catch (error) {
    console.error('getUserProjects error:', error);
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
    console.error('getUserStats error:', error);
    return null;
  }
};
