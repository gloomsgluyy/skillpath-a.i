# 🔄 USER PROGRESS SAVE SYSTEM - COMPLETE ARCHITECTURE

**Purpose:** Design system untuk menyimpan user progress dengan Firebase + Custom Server  
**Auth Methods:** Email + Google OAuth  
**Data:** User profile, Tasks, Roadmap, Skills, Projects, Achievements  

---

# 📐 PART 1: SYSTEM ARCHITECTURE OVERVIEW

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Next.js)                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ User Actions (Task completion, Progress update, etc)      │  │
│  └─────────┬──────────────────────┬─────────────────────────┘  │
└───────────┼──────────────────────┼──────────────────────────────┘
            │                      │
            ▼                      ▼
        ┌─────────────────────────────────┐
        │   AUTHENTICATION LAYER          │
        │  ┌─────────────────────────────┐│
        │  │ Firebase Auth               ││  OAuth (Google, Email)
        │  │ - Generate JWT              ││  - Login
        │  │ - Refresh tokens            ││  - Sign up
        │  │ - Session management        ││
        │  └─────────────────────────────┘│
        └──────────┬─────────────────────┘
                   │
        ┌──────────┴──────────┬──────────────────┐
        │                     │                  │
        ▼                     ▼                  ▼
    ┌─────────────┐   ┌──────────────┐   ┌─────────────┐
    │ FIREBASE    │   │ CUSTOM API   │   │   CACHE     │
    │ Realtime DB │   │   SERVER     │   │  (Redis)    │
    │             │   │              │   │             │
    │ - Auth      │   │ - Aggregation│   │ - Session   │
    │ - User Data │   │ - Analytics  │   │ - Progress  │
    │ - Presence  │   │ - Business   │   │   cache     │
    │             │   │   logic      │   │             │
    └─────────────┘   └──────────────┘   └─────────────┘
            │                │
            └────────┬───────┘
                     ▼
          ┌──────────────────────┐
          │   DATA WAREHOUSE     │
          │   (PostgreSQL/MongoDB)
          │                      │
          │ - Analytics          │
          │ - Reports            │
          │ - User behavior      │
          │ - Progress tracking  │
          └──────────────────────┘
```

---

# 📋 PART 2: AUTHENTICATION FLOW (Email & Google)

## 2.1 Email Authentication Flow

```
CLIENT                          FIREBASE AUTH          CUSTOM API SERVER
  │                                  │                          │
  │ 1. User fills signup form        │                          │
  │────────────────────────────────→ │                          │
  │                                  │                          │
  │ 2. createUserWithEmail()         │                          │
  │    (name, email, password)       │                          │
  │────────────────────────────────→ │                          │
  │                                  │                          │
  │ 3. User created in Firebase      │                          │
  │←────────────────────────────────│                          │
  │    (UID generated)               │                          │
  │                                  │                          │
  │ 4. Get Firebase ID Token         │                          │
  │────────────────────────────────→ │                          │
  │                                  │                          │
  │ 5. Token returned                │                          │
  │←────────────────────────────────│                          │
  │                                  │                          │
  │ 6. Send Token to API with user data           │
  │─────────────────────────────────────────────→ │
  │    (name, email, archetype, interests, etc)   │
  │                                  │             │
  │                                  │ 7. Verify token
  │                                  │←─────────────│
  │                                  │             │
  │                                  │ 8. Create user in DB
  │                                  │    Create default profile
  │                                  │    Create roadmap
  │                                  │    Set preferences
  │                                  │
  │                                  │ 9. Return auth response
  │←─────────────────────────────────────────────│
  │    (user ID, JWT, refresh token)  │          │
  │                                  │
  │ 10. Store in localStorage         │
  │     - JWT token                   │
  │     - User profile cache          │
  │     - Refresh token               │
```

### Implementation:

```typescript
// lib/auth/emailAuth.ts
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
) {
  // Step 1: Create Firebase user
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  // Step 2: Get ID token
  const idToken = await userCredential.user.getIdToken()

  // Step 3: Send to API server
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name,
      firebaseUid: userCredential.user.uid,
      idToken,
      authMethod: 'email'
    })
  })

  if (!response.ok) {
    throw new Error('Failed to create user profile')
  }

  const data = await response.json()

  // Step 4: Store in localStorage
  localStorage.setItem('auth_token', data.token)
  localStorage.setItem('refresh_token', data.refreshToken)
  localStorage.setItem('user_profile', JSON.stringify(data.user))

  return data
}

export async function signInWithEmail(
  email: string,
  password: string
) {
  // Step 1: Sign in with Firebase
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  // Step 2: Get ID token
  const idToken = await userCredential.user.getIdToken()

  // Step 3: Send to API server
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      firebaseUid: userCredential.user.uid,
      idToken,
      authMethod: 'email'
    })
  })

  const data = await response.json()

  // Step 4: Store tokens
  localStorage.setItem('auth_token', data.token)
  localStorage.setItem('refresh_token', data.refreshToken)
  localStorage.setItem('user_profile', JSON.stringify(data.user))

  return data
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email)
}

export async function logout() {
  await signOut(auth)
  localStorage.removeItem('auth_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_profile')
}
```

---

## 2.2 Google OAuth Flow

```
CLIENT                    GOOGLE OAUTH              FIREBASE AUTH         CUSTOM API
  │                           │                          │                    │
  │ 1. Click "Login with Google"                        │                    │
  │─────────────────────────────────────────────────────→                    │
  │                                                      │                    │
  │ 2. Google popup opens                               │                    │
  │ (User selects Google account)                       │                    │
  │                                                      │                    │
  │ 3. Google returns auth code                         │                    │
  │←─────────────────────────────────────────────────────                    │
  │                                                      │                    │
  │ 4. signInWithPopup() with GoogleAuthProvider        │                    │
  │─────────────────────────────────────────────────────→                    │
  │                                                      │                    │
  │                                          5. Verify and create user        │
  │                                          (or link to existing)            │
  │                                      │                                    │
  │ 6. Return user credential                           │                    │
  │←─────────────────────────────────────────────────────                    │
  │                                                      │                    │
  │ 7. Get ID Token                                     │                    │
  │─────────────────────────────────────────────────────→                    │
  │                                                      │                    │
  │ 8. Send to API server                               │                    │
  │──────────────────────────────────────────────────────────────────────────→
  │                                                      │                    │
  │                                                      │         9. Verify token
  │                                                      │←──────────────────│
  │                                                      │                    │
  │                                                      │    10. Create/update user
  │                                                      │        Save preferences
  │                                                      │
  │ 11. Return auth response                            │
  │←──────────────────────────────────────────────────────────────────────────│
  │        (token, user profile)                        │
```

### Implementation:

```typescript
// lib/auth/googleAuth.ts
import { 
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

const googleProvider = new GoogleAuthProvider()

export async function signInWithGoogle() {
  // Step 1: Open Google popup
  const userCredential = await signInWithPopup(auth, googleProvider)

  // Step 2: Get user info from Google
  const { email, displayName, photoURL, uid } = userCredential.user

  // Step 3: Get Firebase ID token
  const idToken = await userCredential.user.getIdToken()

  // Step 4: Send to API server
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      name: displayName,
      photoURL,
      firebaseUid: uid,
      idToken,
      authMethod: 'google'
    })
  })

  if (!response.ok) {
    throw new Error('Failed to authenticate with Google')
  }

  const data = await response.json()

  // Step 5: Store in localStorage
  localStorage.setItem('auth_token', data.token)
  localStorage.setItem('refresh_token', data.refreshToken)
  localStorage.setItem('user_profile', JSON.stringify(data.user))

  return data
}
```

---

# 💾 PART 3: DATA STORAGE ARCHITECTURE

## 3.1 Firebase Realtime Database Structure

```
firebase_db/
├── users/
│   └── {userId}/
│       ├── profile/
│       │   ├── email: "user@example.com"
│       │   ├── name: "John Doe"
│       │   ├── photoURL: "..."
│       │   ├── archetype: "The Thinker"
│       │   ├── interests: ["Frontend", "Backend"]
│       │   ├── targetCareer: "Full-Stack Developer"
│       │   ├── createdAt: 1234567890
│       │   └── updatedAt: 1234567890
│       │
│       ├── progress/
│       │   ├── xp: 450
│       │   ├── level: 2
│       │   ├── totalXpEarned: 450
│       │   ├── streak: 3
│       │   ├── bestStreak: 5
│       │   ├── lastActivityDate: "2026-03-23"
│       │   └── updatedAt: 1234567890
│       │
│       ├── tasks/
│       │   └── {taskId}/
│       │       ├── taskName: "Learn HTML"
│       │       ├── completed: true
│       │       ├── completedDate: "2026-03-23"
│       │       ├── xpEarned: 15
│       │       ├── durationMinutes: 30
│       │       └── updatedAt: 1234567890
│       │
│       ├── roadmap/
│       │   ├── careerId: "full-stack-dev"
│       │   ├── selectedDate: "2026-03-20"
│       │   └── steps/
│       │       └── {stepId}/
│       │           ├── stepNumber: 1
│       │           ├── title: "HTML & CSS Basics"
│       │           ├── completed: true
│       │           ├── completedDate: "2026-03-22"
│       │           ├── estimatedHours: 40
│       │           ├── actualHoursSpent: 45
│       │           └── status: "completed"
│       │
│       ├── skills/
│       │   └── {skillId}/
│       │       ├── skillName: "React"
│       │       ├── level: "Beginner"
│       │       ├── learnedDate: "2026-03-21"
│       │       ├── progress: 60
│       │       └── verified: false
│       │
│       └── projects/
│           └── {projectId}/
│               ├── title: "Todo App"
│               ├── description: "..."
│               ├── link: "https://github.com/..."
│               ├── submittedDate: "2026-03-23"
│               ├── aiScore: 85
│               ├── feedback: "..."
│               └── skills: ["React", "TypeScript"]
│
├── presence/
│   └── {userId}: {lastActiveTime, status}
│
└── notifications/
    └── {userId}/
        └── {notificationId}/
            ├── type: "task_reminder"
            ├── message: "..."
            ├── read: false
            └── createdAt: 1234567890
```

### Firebase Firestore Alternative:

```typescript
// If using Firestore instead of Realtime DB
collection: 'users'
  doc: {userId}
    subcollections:
      - 'profile'
      - 'progress'
      - 'tasks'
      - 'roadmap'
        - 'steps'
      - 'skills'
      - 'projects'
      - 'notifications'
```

---

## 3.2 Custom Server Database (PostgreSQL/MongoDB)

### PostgreSQL Schema:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  firebase_uid VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  photo_url TEXT,
  auth_method VARCHAR(50), -- 'email' or 'google'
  archetype VARCHAR(100),
  target_career VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_active TIMESTAMP
);

-- User profile (denormalized for quick access)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  xp INT DEFAULT 0,
  level INT DEFAULT 1,
  total_xp_earned INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  best_streak INT DEFAULT 0,
  tasks_completed INT DEFAULT 0,
  projects_submitted INT DEFAULT 0,
  achievements TEXT[], -- JSON array
  last_activity_date DATE,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Daily tasks
CREATE TABLE daily_tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  task_name VARCHAR(255),
  task_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  xp_earned INT,
  duration_minutes INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, task_date, task_name)
);

-- Roadmap steps
CREATE TABLE roadmap_steps (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  career_id VARCHAR(255),
  step_number INT,
  title VARCHAR(255),
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  estimated_hours INT,
  actual_hours_spent INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skills learned
CREATE TABLE skills (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  skill_name VARCHAR(255),
  skill_level VARCHAR(100), -- 'Beginner', 'Intermediate', 'Advanced'
  learned_date DATE,
  progress INT, -- 0-100
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects submitted
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  description TEXT,
  github_link VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT NOW(),
  ai_score INT, -- 0-100
  feedback TEXT,
  skills VARCHAR(255)[], -- JSON array of skills
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Activity log (for analytics)
CREATE TABLE activity_log (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(100), -- 'task_completed', 'skill_learned', etc
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### MongoDB Alternative:

```javascript
// users collection
db.users.insertOne({
  _id: ObjectId(),
  firebaseUid: "...",
  email: "user@example.com",
  name: "John Doe",
  authMethod: "email",
  archetype: "The Thinker",
  targetCareer: "Full-Stack Developer",
  profile: {
    xp: 450,
    level: 2,
    streak: 3,
    tasksCompleted: 15,
    projectsSubmitted: 2
  },
  tasks: [
    {
      taskId: "...",
      completed: true,
      completedAt: ISODate(),
      xpEarned: 15
    }
  ],
  roadmap: {
    careerId: "full-stack-dev",
    steps: [
      {
        stepId: "...",
        completed: true,
        completedAt: ISODate()
      }
    ]
  },
  skills: [...],
  projects: [...],
  createdAt: ISODate(),
  updatedAt: ISODate()
})
```

---

# 🔄 PART 4: PROGRESS SAVE FLOWS

## 4.1 Task Completion Flow

```
CLIENT                         API SERVER              FIREBASE             DATABASE
  │                                 │                     │                     │
  │ 1. User clicks checkbox         │                     │                     │
  │    (Complete task)              │                     │                     │
  │                                 │                     │                     │
  │ 2. optimisticUpdate()           │                     │                     │
  │    (Update UI immediately)      │                     │                     │
  │                                 │                     │                     │
  │ 3. POST /api/tasks/complete     │                     │                     │
  │    (taskId, userId)             │                     │                     │
  │─────────────────────────────────→                     │                     │
  │                                 │                     │                     │
  │                                 │ 4. Verify task exists│                     │
  │                                 │    Verify not already done                │
  │                                 │                     │                     │
  │                                 │ 5. Calculate XP gained                    │
  │                                 │    (Usually 15 XP)                        │
  │                                 │                     │                     │
  │                                 │ 6. Update user XP   │                     │
  │                                 │    and level if need upg
  │                                 │                     │                     │
  │                                 │ 7. Update streak    │                     │
  │                                 │    Check if consecutive days               │
  │                                 │                     │                     │
  │                                 │ 8. Save to Firebase (realtime)            │
  │                                 │────────────────────→                     │
  │                                 │                     │ Listeners trigger   │
  │                                 │                     │ (other devices)     │
  │                                 │                     │                     │
  │                                 │ 9. Save to Database │                     │
  │                                 │────────────────────────────────────────→ │
  │                                 │                     │                     │
  │                                 │ 10. Log activity    │                     │
  │                                 │     (for analytics)│                     │
  │                                 │────────────────────────────────────────→ │
  │                                 │                     │                     │
  │ 11. Return success response     │                     │                     │
  │←─────────────────────────────────                     │                     │
  │     {                           │                     │                     │
  │       xp: 15,                   │                     │                     │
  │       newTotal: 465,            │                     │                     │
  │       newLevel: 2,              │                     │                     │
  │       streak: 4,                │                     │                     │
  │       achievement: "Level Up!"  │                     │                     │
  │     }                           │                     │                     │
  │                                 │                     │                     │
  │ 12. Update UI with response     │                     │                     │
  │     Show animation              │                     │                     │
  │     (✨ +15 XP)                │                     │                     │
```

### Implementation:

```typescript
// app/api/tasks/complete/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyFirebaseToken } from '@/lib/firebase-admin'
import { db } from '@/lib/firebase-admin'
import { query } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    // Step 1: Verify auth token
    const authHeader = req.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const decodedToken = await verifyFirebaseToken(token)
    const userId = decodedToken.uid

    // Step 2: Parse request
    const { taskId } = await req.json()

    // Step 3: Verify task exists and not already completed
    const taskRef = db.ref(`users/${userId}/tasks/${taskId}`)
    const taskSnapshot = await taskRef.once('value')
    const taskData = taskSnapshot.val()

    if (!taskData) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      )
    }

    if (taskData.completed) {
      return NextResponse.json(
        { error: 'Task already completed' },
        { status: 400 }
      )
    }

    // Step 4: Calculate XP (usually 15 per task)
    const xpGained = 15

    // Step 5: Get current user progress
    const progressRef = db.ref(`users/${userId}/progress`)
    const progressSnapshot = await progressRef.once('value')
    const currentProgress = progressSnapshot.val() || {
      xp: 0,
      level: 1,
      streak: 0
    }

    // Step 6: Calculate new XP and level
    const newXp = currentProgress.xp + xpGained
    const newLevel = Math.floor(newXp / 1000) + 1

    // Step 7: Check streak
    const today = new Date().toISOString().split('T')[0]
    const lastActivityDate = currentProgress.lastActivityDate
    
    let newStreak = currentProgress.streak
    if (lastActivityDate !== today) {
      // Check if it's consecutive day
      const lastDate = new Date(lastActivityDate)
      const currentDate = new Date(today)
      const dayDiff = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
      
      if (dayDiff === 1) {
        newStreak = (currentProgress.streak || 0) + 1
      } else {
        newStreak = 1
      }
    }

    // Step 8: Update Firebase (realtime)
    const updates = {}
    updates[`users/${userId}/tasks/${taskId}/completed`] = true
    updates[`users/${userId}/tasks/${taskId}/completedDate`] = today
    updates[`users/${userId}/tasks/${taskId}/updatedAt`] = Date.now()
    
    updates[`users/${userId}/progress/xp`] = newXp
    updates[`users/${userId}/progress/level`] = newLevel
    updates[`users/${userId}/progress/streak`] = newStreak
    updates[`users/${userId}/progress/lastActivityDate`] = today
    updates[`users/${userId}/progress/updatedAt`] = Date.now()

    await db.ref().update(updates)

    // Step 9: Update database (PostgreSQL)
    await query(
      `UPDATE daily_tasks 
       SET completed = true, completed_at = NOW(), xp_earned = $1, updated_at = NOW()
       WHERE id = $2 AND user_id = $3`,
      [xpGained, taskId, userId]
    )

    // Update user profile in database
    await query(
      `UPDATE user_profiles 
       SET xp = $1, level = $2, current_streak = $3, tasks_completed = tasks_completed + 1, 
           updated_at = NOW()
       WHERE user_id = $1`,
      [newXp, newLevel, newStreak, userId]
    )

    // Step 10: Log activity for analytics
    await query(
      `INSERT INTO activity_log (user_id, action, metadata, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [userId, 'task_completed', JSON.stringify({ taskId, xpGained })]
    )

    // Step 11: Check for achievements/badges
    const achievements = []
    if (newLevel > currentProgress.level) {
      achievements.push(`level_up_${newLevel}`)
    }
    if (newStreak === 7 && currentProgress.streak !== 7) {
      achievements.push('streak_7_days')
    }

    // Step 12: Return response
    return NextResponse.json({
      success: true,
      data: {
        xpGained,
        newXp,
        newLevel,
        newStreak,
        achievements,
        taskId
      }
    })

  } catch (error) {
    console.error('Error completing task:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 4.2 Skill Path Completion Flow

```
CLIENT                         API SERVER              FIREBASE             DATABASE
  │                                 │                     │                     │
  │ 1. User marks step complete     │                     │                     │
  │    (Step 1: HTML & CSS)         │                     │                     │
  │                                 │                     │                     │
  │ 2. POST /api/roadmap/complete   │                     │                     │
  │    {stepId, estimatedHours}     │                     │                     │
  │─────────────────────────────────→                     │                     │
  │                                 │                     │                     │
  │                                 │ 3. Verify step      │                     │
  │                                 │    is not completed │                     │
  │                                 │                     │                     │
  │                                 │ 4. Mark step done   │                     │
  │                                 │    Record time      │                     │
  │                                 │                     │                     │
  │                                 │ 5. Award XP         │                     │
  │                                 │    (40h = 100 XP)   │                     │
  │                                 │                     │                     │
  │                                 │ 6. Unlock next step │                     │
  │                                 │    Check if final   │                     │
  │                                 │                     │                     │
  │                                 │ 7. Save to Firebase │                     │
  │                                 │────────────────────→                     │
  │                                 │                     │                     │
  │                                 │ 8. Save to Database │                     │
  │                                 │────────────────────────────────────────→ │
  │                                 │                     │                     │
  │                                 │ 9. Log activity     │                     │
  │                                 │────────────────────────────────────────→ │
  │                                 │                     │                     │
  │ 10. Return success              │                     │                     │
  │←─────────────────────────────────                     │                     │
  │     {                           │                     │                     │
  │       stepId,                   │                     │                     │
  │       xpGained: 100,            │                     │                     │
  │       nextStepUnlocked: true,   │                     │                     │
  │       roadsCompletionPercentage │                     │                     │
  │     }                           │                     │                     │
  │                                 │                     │                     │
  │ 11. Show celebration animation  │                     │                     │
  │     Confetti, sound             │                     │                     │
```

### Implementation:

```typescript
// app/api/roadmap/complete-step/route.ts
export async function POST(req: NextRequest) {
  try {
    const decodedToken = await verifyFirebaseToken(token)
    const userId = decodedToken.uid

    const { stepId, estimatedHours } = await req.json()

    // Get step details from Firebase
    const stepRef = db.ref(`users/${userId}/roadmap/steps/${stepId}`)
    const stepSnapshot = await stepRef.once('value')
    const stepData = stepSnapshot.val()

    if (!stepData) {
      return NextResponse.json(
        { error: 'Step not found' },
        { status: 404 }
      )
    }

    if (stepData.completed) {
      return NextResponse.json(
        { error: 'Step already completed' },
        { status: 400 }
      )
    }

    // Calculate XP (typically 100 per step)
    const xpPerHour = 2.5
    const xpGained = Math.round(estimatedHours * xpPerHour)

    // Get all steps to find next
    const allStepsSnapshot = await db.ref(`users/${userId}/roadmap/steps`).once('value')
    const allSteps = allStepsSnapshot.val() || {}
    const stepNumbers = Object.values(allSteps).map((s: any) => s.stepNumber).sort()
    const nextStepNumber = stepData.stepNumber + 1

    // Mark step as complete
    const updates = {}
    updates[`users/${userId}/roadmap/steps/${stepId}/completed`] = true
    updates[`users/${userId}/roadmap/steps/${stepId}/completedDate`] = new Date().toISOString()
    updates[`users/${userId}/roadmap/steps/${stepId}/actualHoursSpent`] = estimatedHours

    // Unlock next step if exists
    const nextStepId = Object.keys(allSteps).find(
      (key) => allSteps[key].stepNumber === nextStepNumber
    )

    if (nextStepId) {
      updates[`users/${userId}/roadmap/steps/${nextStepId}/status`] = 'active'
    }

    // Update progress
    const progressSnapshot = await db.ref(`users/${userId}/progress`).once('value')
    const progress = progressSnapshot.val()
    const newXp = (progress.xp || 0) + xpGained

    updates[`users/${userId}/progress/xp`] = newXp
    updates[`users/${userId}/progress/updatedAt`] = Date.now()

    // Apply all updates
    await db.ref().update(updates)

    // Save to database
    await query(
      `UPDATE roadmap_steps 
       SET completed = true, completed_at = NOW(), actual_hours_spent = $1, updated_at = NOW()
       WHERE id = $2 AND user_id = $3`,
      [estimatedHours, stepId, userId]
    )

    await query(
      `UPDATE user_profiles 
       SET xp = $1, updated_at = NOW()
       WHERE user_id = $2`,
      [newXp, userId]
    )

    // Log activity
    await query(
      `INSERT INTO activity_log (user_id, action, metadata, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [userId, 'roadmap_step_completed', JSON.stringify({ stepId, xpGained })]
    )

    // Calculate completion percentage
    const completedSteps = Object.values(allSteps).filter((s: any) => s.completed).length
    const totalSteps = Object.keys(allSteps).length
    const completionPercentage = Math.round((completedSteps / totalSteps) * 100)

    return NextResponse.json({
      success: true,
      data: {
        stepId,
        xpGained,
        nextStepUnlocked: !!nextStepId,
        completionPercentage,
        nextStepNumber
      }
    })
  } catch (error) {
    console.error('Error completing step:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 4.3 Project Submission & AI Review Flow

```
CLIENT                      API SERVER              FIREBASE             AI SERVICE
  │                               │                     │                     │
  │ 1. User submits project       │                     │                     │
  │    (title, link, skills)      │                     │                     │
  │                               │                     │                     │
  │ 2. POST /api/projects         │                     │                     │
  │─────────────────────────────→ │                     │                     │
  │                               │                     │                     │
  │                               │ 3. Validate inputs  │                     │
  │                               │    Check GitHub link│                     │
  │                               │                     │                     │
  │                               │ 4. Save to Firebase │                     │
  │                               │────────────────────→                     │
  │                               │                     │                     │
  │                               │ 5. Send to AI for review                  │
  │                               │────────────────────────────────────────→ │
  │                               │                     │                     │
  │ 6. Return projectId + status  │                     │                     │
  │←─────────────────────────────│                     │                     │
  │    status: "pending_review"   │                     │                     │
  │                               │                     │                     │
  │ 7. Show loading state         │                     │                     │
  │    "Sedang di-review..."      │                     │                     │
  │                               │                     │                     │
  │                               │                     │   6. Analyze project│
  │                               │                     │      (2-3 minutes)  │
  │                               │                     │                     │
  │                               │                     │ 7. Generate score  │
  │                               │                     │    and feedback     │
  │                               │                     │                     │
  │                               │ 8. Save review      │                     │
  │←───────────────────────────────────────────────────│                     │
  │    (via webhook or polling)   │                     │                     │
  │                               │                     │                     │
  │                               │ 9. Update Firebase  │                     │
  │                               │────────────────────→                     │
  │                               │                     │                     │
  │                               │ 10. Update Database │                     │
  │                               │──────────────────────────────────────→   │
  │                               │                     │                     │
  │                               │ 11. Award XP        │                     │
  │                               │     (20 XP)         │                     │
  │                               │                     │                     │
  │ 12. Client polls for update   │                     │                     │
  │     (every 5 seconds)         │                     │                     │
  │                               │                     │                     │
  │ GET /api/projects/{id}        │                     │                     │
  │─────────────────────────────→ │                     │                     │
  │                               │ 13. Return updated  │                     │
  │                               │     project with    │                     │
  │ ← {                           │     score & feedback│                     │
  │    score: 85,                 │                     │                     │
  │    feedback: "...",           │                     │                     │
  │    status: "reviewed"         │                     │                     │
  │   }                           │                     │                     │
  │                               │                     │                     │
  │ 14. Show review results       │                     │                     │
  │     Celebrate achievement     │                     │                     │
```

### Implementation:

```typescript
// app/api/projects/route.ts
export async function POST(req: NextRequest) {
  try {
    const decodedToken = await verifyFirebaseToken(token)
    const userId = decodedToken.uid

    const { title, link, skills, description } = await req.json()

    // Validate input
    if (!title || !link || !skills) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate GitHub link
    try {
      new URL(link)
    } catch {
      return NextResponse.json(
        { error: 'Invalid GitHub link' },
        { status: 400 }
      )
    }

    const projectId = generateId()
    const now = new Date().toISOString()

    // Save to Firebase
    await db.ref(`users/${userId}/projects/${projectId}`).set({
      title,
      description,
      link,
      skills,
      submittedDate: now,
      status: 'pending_review',
      createdAt: now,
      updatedAt: now
    })

    // Save to database
    await query(
      `INSERT INTO projects (id, user_id, title, description, github_link, skills, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [projectId, userId, title, description, link, JSON.stringify(skills)]
    )

    // Queue for AI review (async)
    await queueAIReview({
      projectId,
      userId,
      title,
      description,
      link,
      skills
    })

    return NextResponse.json({
      success: true,
      data: {
        projectId,
        status: 'pending_review',
        message: 'Project submitted. AI review in progress...'
      }
    })

  } catch (error) {
    console.error('Error submitting project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Background job to handle AI review
async function queueAIReview(projectData) {
  try {
    // Call Groq API to analyze project
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b',
        messages: [{
          role: 'user',
          content: `
          Review this portfolio project:
          Title: ${projectData.title}
          Description: ${projectData.description}
          GitHub: ${projectData.link}
          Skills: ${projectData.skills.join(', ')}
          
          Provide:
          1. Score (0-100)
          2. Strengths (2-3 points)
          3. Areas for improvement (2-3 points)
          4. Next steps
          
          Format as JSON: {score: number, strengths: string[], improvements: string[], nextSteps: string}
          `
        }],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const result = await response.json()
    const feedback = JSON.parse(result.choices[0].message.content)

    // Update Firebase with review
    await db.ref(`users/${projectData.userId}/projects/${projectData.projectId}`).update({
      status: 'reviewed',
      aiScore: feedback.score,
      feedback: feedback,
      reviewedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    // Update database
    await query(
      `UPDATE projects 
       SET ai_score = $1, feedback = $2, updated_at = NOW()
       WHERE id = $3`,
      [feedback.score, JSON.stringify(feedback), projectData.projectId]
    )

    // Award XP for submission (20 XP)
    const xpGained = 20
    const progressSnapshot = await db.ref(`users/${projectData.userId}/progress`).once('value')
    const progress = progressSnapshot.val()
    const newXp = (progress.xp || 0) + xpGained

    await db.ref(`users/${projectData.userId}/progress/xp`).set(newXp)

    await query(
      `UPDATE user_profiles 
       SET xp = $1, updated_at = NOW()
       WHERE user_id = $2`,
      [newXp, projectData.userId]
    )

  } catch (error) {
    console.error('Error in AI review:', error)
    // Log error but don't fail the main request
  }
}
```

---

# 🔄 PART 5: REAL-TIME SYNC & CACHING

## 5.1 Real-Time Sync from Firebase

```typescript
// hooks/useUserProgress.ts
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'

export function useUserProgress(userId: string) {
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    // Setup real-time listener
    const progressRef = db.ref(`users/${userId}/progress`)
    
    const unsubscribe = progressRef.on('value', (snapshot) => {
      const data = snapshot.val()
      setProgress(data)
      setLoading(false)

      // Also update cache
      if (data) {
        localStorage.setItem(`progress_${userId}`, JSON.stringify(data))
      }
    })

    return () => unsubscribe()
  }, [userId])

  return { progress, loading }
}

// Usage
export function Dashboard() {
  const { progress, loading } = useUserProgress(userId)

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Level {progress.level}</h2>
      <p>XP: {progress.xp}</p>
      <p>Streak: 🔥 {progress.streak}</p>
    </div>
  )
}
```

---

## 5.2 Optimistic Updates

```typescript
// hooks/useCompleteTask.ts
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function useCompleteTask() {
  const queryClient = useQueryClient()

  const completeTask = useCallback(async (taskId: string) => {
    // Optimistic update - update UI immediately
    queryClient.setQueryData(['tasks'], (oldData: any) => {
      return oldData.map((task: any) =>
        task.id === taskId
          ? { ...task, completed: true, completedDate: new Date() }
          : task
      )
    })

    try {
      // Make API call
      const response = await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId })
      })

      const result = await response.json()

      // Update with real server response
      queryClient.setQueryData(['progress'], result.data)
      
      return result.data
    } catch (error) {
      // Rollback on error
      queryClient.invalidateQueries(['tasks'])
      throw error
    }
  }, [queryClient])

  return { completeTask }
}
```

---

## 5.3 Cache Strategy with Redis

```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN
})

export async function getCachedUserProgress(userId: string) {
  const cached = await redis.get(`progress:${userId}`)
  return cached
}

export async function setCacheUserProgress(userId: string, data: any) {
  // Cache for 5 minutes
  await redis.set(`progress:${userId}`, data, { ex: 300 })
}

export async function invalidateUserCache(userId: string) {
  await redis.del(`progress:${userId}`)
}

// Usage in API
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  // Try cache first
  const cached = await getCachedUserProgress(userId)
  if (cached) {
    return NextResponse.json(cached)
  }

  // If not in cache, get from database
  const data = await query('SELECT * FROM user_profiles WHERE user_id = $1', [userId])
  
  // Cache for next request
  await setCacheUserProgress(userId, data)

  return NextResponse.json(data)
}
```

---

# 📊 PART 6: DATA SYNC CONFLICT RESOLUTION

## Conflict When Multiple Devices Update

```typescript
// Timestamp-based resolution
export async function resolveConflict(
  localData: any,
  serverData: any
) {
  // Last-write-wins strategy
  if (localData.updatedAt > serverData.updatedAt) {
    return localData // Use local (more recent)
  } else {
    return serverData // Use server (more recent)
  }
}

// Alternative: Merge strategy for specific fields
export async function mergeUserData(
  localData: any,
  serverData: any
) {
  return {
    // Use server for authoritative data
    xp: serverData.xp,
    level: serverData.level,
    streak: serverData.streak,
    
    // Use local for UI cache
    cachedAt: localData.cachedAt,
    
    // Merge arrays (deduplicate)
    achievements: [
      ...new Set([...localData.achievements, ...serverData.achievements])
    ]
  }
}
```

---

# 🔐 PART 7: SECURITY & ACCESS CONTROL

## 7.1 Firebase Security Rules

```javascript
// Firebase Realtime Database Rules
{
  "rules": {
    "users": {
      "$uid": {
        // Only user can read/write their own data
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        
        "profile": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        },
        
        "progress": {
          ".read": "$uid === auth.uid",
          // Can write progress but with validation
          ".write": "$uid === auth.uid && newData.hasChild('xp') && newData.child('xp').isNumber()",
          
          "xp": {
            // Prevent XP from going negative
            ".validate": "newData.val() >= root.child('users').child($uid).child('progress').child('xp').val()"
          }
        },
        
        "tasks": {
          ".read": "$uid === auth.uid",
          ".write": "$uid === auth.uid"
        }
      }
    }
  }
}
```

## 7.2 API Route Protection

```typescript
// middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server'
import { verifyFirebaseToken } from '@/lib/firebase-admin'

export async function authMiddleware(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]

  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const decoded = await verifyFirebaseToken(token)
    // Add user to request
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-user-id', decoded.uid)
    requestHeaders.set('x-user-email', decoded.email)

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}
```

---

# 📁 PART 8: PROJECT STRUCTURE

```
skillpath-ai/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── google/route.ts
│   │   │   └── refresh/route.ts
│   │   │
│   │   ├── tasks/
│   │   │   ├── complete/route.ts
│   │   │   ├── list/route.ts
│   │   │   └── [id]/route.ts
│   │   │
│   │   ├── roadmap/
│   │   │   ├── complete-step/route.ts
│   │   │   ├── get/route.ts
│   │   │   └── [id]/route.ts
│   │   │
│   │   ├── projects/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   │
│   │   └── user/
│   │       ├── profile/route.ts
│   │       └── progress/route.ts
│   │
│   ├── components/
│   └── layout.tsx
│
├── lib/
│   ├── auth/
│   │   ├── emailAuth.ts
│   │   ├── googleAuth.ts
│   │   └── tokenManager.ts
│   │
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── client.ts
│   │   └── admin.ts
│   │
│   ├── db/
│   │   └── query.ts
│   │
│   ├── cache/
│   │   └── redis.ts
│   │
│   └── utils/
│       ├── validators.ts
│       └── helpers.ts
│
├── hooks/
│   ├── useAuth.ts
│   ├── useUserProgress.ts
│   ├── useCompleteTask.ts
│   └── useRoadmap.ts
│
├── middleware.ts
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

# 🚀 PART 9: DEPLOYMENT & MONITORING

## 9.1 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...

# Server-side only
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...

DATABASE_URL=postgresql://...
REDIS_URL=...
GROQ_API_KEY=...

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 9.2 Monitoring & Analytics

```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'

export function trackEvent(event: string, data: any) {
  if (window.gtag) {
    window.gtag('event', event, data)
  }
}

// Usage
trackEvent('task_completed', {
  taskId: '123',
  xpGained: 15,
  timestamp: new Date()
})
```

---

# 📋 SUMMARY: COMPLETE FLOW

```
1. USER AUTHENTICATION
   Email/Google → Firebase Auth → ID Token → Custom API → JWT + Refresh Token

2. USER PROGRESS TRACKING
   Client → Optimistic Update → API → Firebase (realtime) → Database (analytics)

3. TASK COMPLETION
   User checks task → +XP → Level up → Streak tracking → Database sync

4. ROADMAP STEPS
   Complete step → Unlock next → Award XP → Database update → Real-time broadcast

5. PROJECT SUBMISSION
   Submit project → AI Review (async) → Score & feedback → Update all systems → Notify user

6. REAL-TIME SYNC
   Firebase listener → Cache update → UI update → Cross-device sync

7. DATA BACKUP
   Database → Analytics → Warehouse → Reports
```

---

**Architecture ready for production!** 🚀

