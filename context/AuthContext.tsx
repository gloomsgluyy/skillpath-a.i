'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { saveUserProfile } from '@/lib/firestore';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithEmail: (email: string, pass: string, name?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithEmail = async (email: string, pass: string, name?: string) => {
    try {
      // Coba register dulu, atau login
      let userRec;
      try {
        userRec = await signInWithEmailAndPassword(auth, email, pass);
      } catch (e: any) {
        // Jika belum ada/User Not Found, sekalian buatkan
        if (e.code === 'auth/user-not-found' || e.code === 'auth/invalid-credential') {
          userRec = await createUserWithEmailAndPassword(auth, email, pass);
        } else {
          throw e; // Error lain (wrong password, dll)
        }
      }

      const user = userRec.user;
      
      const storedRaw = localStorage.getItem('skillpath_onboarding_data');
      const onboardingData = storedRaw ? JSON.parse(storedRaw) : {};
      
      const customName = name || onboardingData.displayName || user.displayName || 'Test User';
      
      if (customName && customName.trim()) {
        await updateProfile(user, { displayName: customName.trim() });
        setCurrentUser({ ...user, displayName: customName.trim() } as User);
      }
      
      await saveUserProfile(user.uid, {
        uid: user.uid,
        displayName: customName.trim(),
        email: user.email,
        photoURL: user.photoURL,
        pendidikan: onboardingData.pendidikan || '',
        archetype: onboardingData.archetype || '',
        roleInterests: onboardingData.roleInterests || [],
        }).catch((err: any) => console.error('Firestore save error:', err));
      
    } catch (error) {
      console.error("Error signing in with Email", error);
      throw error;
    }
  };
  const signInWithNickname = async (nickname: string) => {
    // Generate deterministic virtual credentials based on the nickname
    const safeNick = nickname.toLowerCase().replace(/[^a-z0-9]/g, '');
    const virtualEmail = `${safeNick}@tester.skillpath.ai`;
    // Consistent virtual password for the testing session
    const virtualPass = `test_pass_${safeNick}`;
    
    return signInWithEmail(virtualEmail, virtualPass, nickname);
  };

  const signInWithGoogle = async () => {
    try {
      const { signInWithPopup } = await import('firebase/auth');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      const storedRaw = localStorage.getItem('skillpath_onboarding_data');
      const onboardingData = storedRaw ? JSON.parse(storedRaw) : {};
      
      const targetName = onboardingData.displayName || user.displayName || 'Learner';
      
      if (targetName && targetName !== user.displayName) {
         try {
           await updateProfile(user, { displayName: targetName });
         } catch(e){}
      }
      
      await saveUserProfile(user.uid, {
        uid: user.uid,
        displayName: targetName,
        email: user.email,
        photoURL: user.photoURL,
        pendidikan: onboardingData.pendidikan || '',
        archetype: onboardingData.archetype || '',
        roleInterests: onboardingData.roleInterests || [],
      }).catch(err => console.error('Firestore save error:', err));
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const value = {
    currentUser,
    loading,
    signInWithEmail,
    signInWithNickname,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
