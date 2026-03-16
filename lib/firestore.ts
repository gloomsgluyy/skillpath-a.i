import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

// --- User Profiles ---

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string | null;
  photoURL: string | null;
  pendidikan: string;
  archetype: string;
  roleInterests: string[];
  createdAt: any;
  lastLoginAt: any;
  points?: number;
}

export const saveUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  if (!uid) return;
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Create new profile
    await setDoc(userRef, {
      ...data,
      uid,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
      points: 0,
    });
  } else {
    // Update existing profile
    await updateDoc(userRef, {
      ...data,
      lastLoginAt: serverTimestamp(),
    });
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  if (!uid) return null;
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

// --- Assessments (Discover) ---

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
  // Save specific assessment document
  const assessmentRef = doc(db, 'assessments', uid);
  await setDoc(assessmentRef, {
    uid,
    answers,
    result: aiResult,
    completedAt: serverTimestamp(),
  });
  
  // Award points for completing assessment
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    points: 100 // Example reward
  }).catch(() => {}); // ignore error if user doc doesn't exist yet
};

export const getUserAssessment = async (uid: string) => {
  if (!uid) return null;
  const assessmentRef = doc(db, 'assessments', uid);
  const snap = await getDoc(assessmentRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
};

// --- User Journeys ---

export interface JourneyTask {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
  completedAt: any | null;
}

export const saveUserJourney = async (uid: string, career: string, tasks: JourneyTask[]) => {
  if (!uid) return;
  const journeyRef = doc(db, 'journeys', uid);
  await setDoc(journeyRef, {
    uid,
    targetCareer: career,
    tasks,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
  });
};

export const markTaskCompleted = async (uid: string, taskId: string) => {
  if (!uid) return;
  const journeyRef = doc(db, 'journeys', uid);
  const journeySnap = await getDoc(journeyRef);
  
  if (journeySnap.exists()) {
    const data = journeySnap.data();
    const tasks = data.tasks || [];
    const updatedTasks = tasks.map((t: any) => 
      t.id === taskId ? { ...t, completed: true, completedAt: serverTimestamp() } : t
    );
    
    await updateDoc(journeyRef, {
      tasks: updatedTasks,
      lastUpdated: serverTimestamp()
    });
    
    // Award points
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      points: 10 // Example reward
    }).catch(() => {});
  }
}

// --- Projects ---

export const saveCompletedProject = async (uid: string, projectId: string, title: string, feedback: string) => {
  if (!uid) return;
  const projectRef = doc(db, 'completed_projects', `${uid}_${projectId}`);
  await setDoc(projectRef, {
    uid,
    projectId,
    title,
    mentorFeedback: feedback,
    completedAt: serverTimestamp(),
  });
};
