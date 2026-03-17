'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { saveUserProfile } from '@/lib/firestore';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Read onboarding data saved before login
      const storedRaw = localStorage.getItem('skillpath_onboarding_data');
      const onboardingData = storedRaw ? JSON.parse(storedRaw) : {};
      
      // If user typed a custom displayName during onboarding, use that instead of Google's
      const customName = onboardingData.displayName;
      if (customName && customName.trim()) {
        await updateProfile(user, { displayName: customName.trim() });
        // Force re-read of user so UI updates
        setCurrentUser({ ...user, displayName: customName.trim() } as User);
      }
      
      // Save full profile to Firestore
      await saveUserProfile(user.uid, {
        uid: user.uid,
        displayName: customName?.trim() || user.displayName || 'User',
        email: user.email,
        photoURL: user.photoURL,
        pendidikan: onboardingData.pendidikan || '',
        archetype: onboardingData.archetype || '',
        roleInterests: onboardingData.roleInterests || [],
      }).catch((err: any) => console.error('Firestore save error:', err));
      
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logout = () => signOut(auth);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
