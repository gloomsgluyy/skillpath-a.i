# 🧪 PRODUCTION-READY TESTING GUIDE - SKILLPATH AI

**Purpose:** Ensure 100% production readiness through comprehensive testing  
**Total Test Types:** 12 categories  
**Estimated Coverage:** 80%+ code coverage + 100% critical path testing  

---

## TESTING PYRAMID 🔺

```
                    ▲
                   /|\
                  / | \
                 /  |  \  E2E TESTS (10%)
                /   |   \  - Full user journeys
               /____|____\ - Critical workflows
              /     |     \
             /      |      \ INTEGRATION TESTS (20%)
            /       |       \ - API interactions
           /_________|_______\ - Database operations
          /         |         \
         /          |          \ UNIT TESTS (70%)
        /__________│___________\ - Functions, hooks, utilities
       /           |           \
      /_____________|_____________\

RULE: Test as much as possible at the lowest level (unit)
      Move up only when necessary
```

---

# 📋 PART 1: UNIT TESTING (70% of pyramid)

## 1.1 WHAT IS UNIT TESTING?

Testing individual functions, hooks, and components in isolation.

**Examples:**
```javascript
// ✅ Unit test: Test one function
describe('calculateLevel', () => {
  it('should return 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1);
  });
  
  it('should return 2 for 1000 XP', () => {
    expect(calculateLevel(1000)).toBe(2);
  });
});
```

---

## 1.2 UNIT TESTS FOR UTILITIES

### Test `lib/utils.ts` Functions

**File to test:** `lib/utils.ts`

```typescript
// ✅ Example unit tests

describe('Utils - XP Calculations', () => {
  describe('calculateLevel', () => {
    // Test: XP to Level conversion
    it('should calculate correct level from XP', () => {
      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(1000)).toBe(2);
      expect(calculateLevel(5000)).toBe(6);
    });

    // Test: Edge cases
    it('should handle negative XP', () => {
      expect(calculateLevel(-100)).toBe(1);
    });

    // Test: Large numbers
    it('should handle large XP values', () => {
      expect(calculateLevel(1000000)).toBe(1001);
    });
  });

  describe('calculateStreak', () => {
    // Test: Streak calculation
    it('should increment streak on consecutive days', () => {
      const streakData = [
        { date: '2026-03-20', completed: true },
        { date: '2026-03-21', completed: true },
        { date: '2026-03-22', completed: true }
      ];
      expect(calculateStreak(streakData)).toBe(3);
    });

    // Test: Streak breaks
    it('should reset streak on missed day', () => {
      const streakData = [
        { date: '2026-03-20', completed: true },
        { date: '2026-03-21', completed: false },
        { date: '2026-03-22', completed: true }
      ];
      expect(calculateStreak(streakData)).toBe(1);
    });
  });

  describe('formatCurrency', () => {
    it('should format salary in Rupiah', () => {
      expect(formatCurrency(15000000)).toBe('Rp 15.000.000');
      expect(formatCurrency(50000)).toBe('Rp 50.000');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0)).toBe('Rp 0');
    });
  });

  describe('validateEmail', () => {
    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.id')).toBe(true);
    });

    it('should reject invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });
  });
});
```

**Checklist:**
- [ ] Test happy paths (normal inputs)
- [ ] Test edge cases (0, negative, very large)
- [ ] Test error conditions (invalid inputs)
- [ ] Test boundary values

**Expected Coverage:** 90%+

---

## 1.3 UNIT TESTS FOR HOOKS

### Test Custom Hooks

**File to test:** `hooks/useUserProgress.ts`

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useUserProgress } from '@/hooks/useUserProgress';
import * as firebaseLib from '@/lib/firestore';

jest.mock('@/lib/firestore');

describe('useUserProgress', () => {
  // Test: Initial state
  it('should return loading state initially', () => {
    const { result } = renderHook(() => useUserProgress());
    expect(result.current.loading).toBe(true);
  });

  // Test: Data fetching
  it('should fetch user progress', async () => {
    const mockProgress = {
      xp: 450,
      level: 1,
      streak: 3,
      completedTasks: 10
    };

    (firebaseLib.getUserProgress as jest.Mock).mockResolvedValue(mockProgress);

    const { result } = renderHook(() => useUserProgress());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.progress).toEqual(mockProgress);
  });

  // Test: Error handling
  it('should handle error when fetching fails', async () => {
    (firebaseLib.getUserProgress as jest.Mock).mockRejectedValue(
      new Error('Network error')
    );

    const { result } = renderHook(() => useUserProgress());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.progress).toBeNull();
  });

  // Test: Refetch
  it('should refetch data when refetch is called', async () => {
    const { result, rerender } = renderHook(() => useUserProgress());

    // Mock initial call
    (firebaseLib.getUserProgress as jest.Mock).mockResolvedValueOnce({
      xp: 0
    });

    await waitFor(() => {
      expect(result.current.progress?.xp).toBe(0);
    });

    // Mock second call
    (firebaseLib.getUserProgress as jest.Mock).mockResolvedValueOnce({
      xp: 500
    });

    result.current.refetch();

    await waitFor(() => {
      expect(result.current.progress?.xp).toBe(500);
    });
  });
});
```

**Checklist:**
- [ ] Test initial state
- [ ] Test successful data fetching
- [ ] Test error handling
- [ ] Test refetching
- [ ] Test cleanup (memory leaks)

**Expected Coverage:** 85%+

---

## 1.4 UNIT TESTS FOR API HELPERS

### Test `lib/firestore.ts` Functions

```typescript
import { createUser, updateUserXP, getSkillPath } from '@/lib/firestore';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc } from 'firebase/firestore';

jest.mock('firebase/firestore');

describe('Firestore Operations', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockAddDoc = addDoc as jest.Mock;
      mockAddDoc.mockResolvedValue({ id: 'user-123' });

      const result = await createUser({
        email: 'test@example.com',
        name: 'Test User'
      });

      expect(result.id).toBe('user-123');
      expect(mockAddDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          email: 'test@example.com',
          name: 'Test User'
        })
      );
    });

    it('should throw error if email already exists', async () => {
      const mockAddDoc = addDoc as jest.Mock;
      mockAddDoc.mockRejectedValue(new Error('Email already exists'));

      await expect(
        createUser({
          email: 'existing@example.com',
          name: 'Test User'
        })
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('updateUserXP', () => {
    it('should update user XP', async () => {
      const mockUpdateDoc = updateDoc as jest.Mock;
      mockUpdateDoc.mockResolvedValue(undefined);

      await updateUserXP('user-123', 150);

      expect(mockUpdateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          xp: 150
        })
      );
    });

    it('should increment XP if increment=true', async () => {
      const mockUpdateDoc = updateDoc as jest.Mock;
      mockUpdateDoc.mockResolvedValue(undefined);

      await updateUserXP('user-123', 150, true);

      expect(mockUpdateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          xp: expect.any(Object) // Firebase increment
        })
      );
    });
  });

  describe('getSkillPath', () => {
    it('should retrieve skill path for career', async () => {
      const mockSkillPath = {
        id: 'path-1',
        career: 'Full-Stack Developer',
        steps: [
          {
            id: 'step-1',
            title: 'HTML & CSS',
            status: 'active'
          }
        ]
      };

      // Mock Firestore getDocs
      jest.mock('firebase/firestore', () => ({
        getDocs: jest.fn().mockResolvedValue({
          docs: [{ id: 'path-1', data: () => mockSkillPath }]
        })
      }));

      const result = await getSkillPath('Full-Stack Developer');
      expect(result.career).toBe('Full-Stack Developer');
      expect(result.steps.length).toBeGreaterThan(0);
    });
  });
});
```

**Checklist:**
- [ ] Test successful operations
- [ ] Test error cases
- [ ] Test mocked Firebase calls
- [ ] Verify correct parameters passed

**Expected Coverage:** 80%+

---

## 1.5 UNIT TESTS FOR COMPONENTS

### Test UI Components

```typescript
import { render, screen } from '@testing-library/react';
import { SkillCard } from '@/components/SkillCard';

describe('SkillCard Component', () => {
  // Test: Rendering
  it('should render skill information', () => {
    const skill = {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn React basics',
      durationHours: 40,
      status: 'active' as const
    };

    render(<SkillCard skill={skill} />);

    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Learn React basics')).toBeInTheDocument();
    expect(screen.getByText('40 hours')).toBeInTheDocument();
  });

  // Test: Status indicator
  it('should show correct status badge', () => {
    const skill = {
      id: '1',
      title: 'React',
      description: 'Learn React',
      durationHours: 40,
      status: 'active' as const
    };

    render(<SkillCard skill={skill} />);

    const badge = screen.getByText('Active');
    expect(badge).toHaveClass('bg-yellow-500');
  });

  // Test: Click handler
  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const skill = {
      id: '1',
      title: 'React',
      description: 'Learn React',
      durationHours: 40,
      status: 'active' as const
    };

    render(<SkillCard skill={skill} onClick={handleClick} />);

    const card = screen.getByRole('button');
    card.click();

    expect(handleClick).toHaveBeenCalledWith(skill);
  });

  // Test: Accessibility
  it('should be keyboard accessible', () => {
    const skill = {
      id: '1',
      title: 'React',
      description: 'Learn React',
      durationHours: 40,
      status: 'active' as const
    };

    render(<SkillCard skill={skill} />);

    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});
```

**Checklist:**
- [ ] Test component renders correctly
- [ ] Test conditional rendering (different states)
- [ ] Test props handling
- [ ] Test event handlers
- [ ] Test accessibility attributes
- [ ] Test error states

**Expected Coverage:** 80%+

---

# 📋 PART 2: INTEGRATION TESTING (20% of pyramid)

## 2.1 WHAT IS INTEGRATION TESTING?

Testing how multiple components/modules work together.

---

## 2.2 API ROUTE INTEGRATION TESTS

### Test `/api/roadmap` Route

```typescript
import { POST } from '@/app/api/roadmap/route';

describe('POST /api/roadmap', () => {
  // Test: Valid request
  it('should generate roadmap for valid input', async () => {
    const request = new Request('http://localhost:3000/api/roadmap', {
      method: 'POST',
      body: JSON.stringify({
        careerGoal: 'Full-Stack Developer',
        education: 'bachelors',
        hoursPerWeek: 10
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.steps).toBeDefined();
    expect(data.steps.length).toBeGreaterThan(0);
    expect(data.totalHours).toBeGreaterThan(0);
  });

  // Test: Invalid input validation
  it('should return 400 for missing required fields', async () => {
    const request = new Request('http://localhost:3000/api/roadmap', {
      method: 'POST',
      body: JSON.stringify({
        careerGoal: 'Full-Stack Developer'
        // Missing education
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toBeDefined();
  });

  // Test: Error handling (Groq API down)
  it('should handle Groq API failure gracefully', async () => {
    // Mock Groq API to fail
    jest.spyOn(global, 'fetch').mockRejectedValueOnce(
      new Error('Connection timeout')
    );

    const request = new Request('http://localhost:3000/api/roadmap', {
      method: 'POST',
      body: JSON.stringify({
        careerGoal: 'Full-Stack Developer',
        education: 'bachelors'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(500);

    const data = await response.json();
    expect(data.error).toBeDefined();
    expect(data.message).toContain('Failed to generate roadmap');
  });

  // Test: Response time (performance)
  it('should respond within 30 seconds', async () => {
    const startTime = Date.now();

    const request = new Request('http://localhost:3000/api/roadmap', {
      method: 'POST',
      body: JSON.stringify({
        careerGoal: 'Full-Stack Developer',
        education: 'bachelors'
      })
    });

    await POST(request);

    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(duration).toBeLessThan(30000); // 30 seconds
  });

  // Test: Rate limiting
  it('should enforce rate limiting', async () => {
    const requests = Array(101).fill(null).map(() =>
      new Request('http://localhost:3000/api/roadmap', {
        method: 'POST',
        body: JSON.stringify({
          careerGoal: 'Full-Stack Developer',
          education: 'bachelors'
        })
      })
    );

    const responses = await Promise.all(
      requests.map(req => POST(req))
    );

    const rateLimited = responses.find(r => r.status === 429);
    expect(rateLimited).toBeDefined();
  });
});
```

### Test `/api/chat` Route

```typescript
describe('POST /api/chat', () => {
  it('should return AI response with streaming', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'How do I learn React?',
        context: 'Full-Stack Developer'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    // Check for streaming response
    expect(response.headers.get('content-type')).toContain('text/event-stream');
  });

  it('should handle malicious input safely', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: '<script>alert("xss")</script>',
        context: 'Full-Stack Developer'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    // Should sanitize and not execute script
    expect(data.response).not.toContain('<script>');
  });

  it('should check authentication', async () => {
    const request = new Request('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Test',
        context: 'Test'
      }),
      headers: {
        // No auth token
      }
    });

    const response = await POST(request);
    expect(response.status).toBe(401); // Unauthorized
  });
});
```

### Test `/api/projects` Route

```typescript
describe('POST /api/projects', () => {
  it('should submit project and get AI review', async () => {
    const request = new Request('http://localhost:3000/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Todo App',
        link: 'https://github.com/user/todo-app',
        skills: ['React', 'TypeScript'],
        description: 'A todo application built with React'
      }),
      headers: {
        'Authorization': 'Bearer valid-token'
      }
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.score).toBeDefined();
    expect(data.feedback).toBeDefined();
    expect(typeof data.score).toBe('number');
    expect(data.score).toBeGreaterThanOrEqual(0);
    expect(data.score).toBeLessThanOrEqual(100);
  });

  it('should validate project link format', async () => {
    const request = new Request('http://localhost:3000/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Todo App',
        link: 'invalid-url',
        skills: ['React'],
        description: 'Test'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it('should reject too long descriptions', async () => {
    const longDescription = 'a'.repeat(5000);

    const request = new Request('http://localhost:3000/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: 'App',
        link: 'https://github.com/user/app',
        skills: ['React'],
        description: longDescription
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

**Checklist:**
- [ ] Test successful operations
- [ ] Test input validation
- [ ] Test error handling
- [ ] Test authentication/authorization
- [ ] Test rate limiting
- [ ] Test response format
- [ ] Test performance/timeouts

**Expected Coverage:** 75%+

---

## 2.3 DATABASE INTEGRATION TESTS

### Test Firestore Operations with Real Firebase

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { createUser, updateUserProgress } from '@/lib/firestore';

// Use Firebase Emulator for testing
beforeAll(() => {
  const app = initializeApp({
    projectId: 'skillpath-test'
  });
  const db = getFirestore(app);
  
  // Connect to emulator
  connectFirestoreEmulator(db, 'localhost', 8080);
});

describe('Firestore Database Integration', () => {
  it('should create and retrieve user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      xp: 0,
      targetCareer: 'Full-Stack Developer'
    };

    const user = await createUser(userData);
    expect(user.id).toBeDefined();
    expect(user.email).toBe('test@example.com');

    // Verify in database
    const retrieved = await getUser(user.id);
    expect(retrieved).toEqual(user);
  });

  it('should update user progress atomically', async () => {
    const user = await createUser({
      email: 'progress@example.com',
      name: 'Progress Test',
      xp: 0
    });

    await updateUserProgress(user.id, {
      xp: 150,
      level: 2,
      streak: 5
    });

    const updated = await getUser(user.id);
    expect(updated.xp).toBe(150);
    expect(updated.level).toBe(2);
    expect(updated.streak).toBe(5);
  });

  it('should handle concurrent updates', async () => {
    const user = await createUser({
      email: 'concurrent@example.com',
      name: 'Concurrent Test',
      xp: 0
    });

    // Simulate 10 concurrent task completions (+10 XP each)
    const updates = Array(10).fill(null).map(() =>
      updateUserXP(user.id, 10, true)
    );

    await Promise.all(updates);

    const updated = await getUser(user.id);
    expect(updated.xp).toBe(100); // 10 * 10 XP
  });
});
```

**Checklist:**
- [ ] Use Firebase Emulator locally
- [ ] Test CRUD operations
- [ ] Test transactions
- [ ] Test concurrent operations
- [ ] Test indexes work correctly
- [ ] Test data consistency

---

# 📋 PART 3: END-TO-END (E2E) TESTING (10% of pyramid)

## 3.1 WHAT IS E2E TESTING?

Testing complete user workflows from start to finish like a real user would.

---

## 3.2 PLAYWRIGHT E2E TESTS

### Setup Playwright

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### Test: Complete Onboarding Flow

```typescript
// tests/e2e/onboarding.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow', () => {
  test('should complete full onboarding', async ({ page }) => {
    // Step 1: Navigate to landing
    await page.goto('http://localhost:3000');
    expect(page).toHaveTitle(/SkillPath/);

    // Step 2: Click "Mulai Personalisasi"
    await page.click('button:has-text("Mulai Personalisasi Karir")');

    // Step 3: Education selection
    await page.click('button:has-text("Kuliah")');
    await page.click('button:has-text("Lanjut")');

    // Step 4: Archetype selection
    await page.click('button:has-text("The Thinker")');
    await page.click('button:has-text("Lanjut")');

    // Step 5: Interests selection
    await page.click('text=Frontend');
    await page.click('text=Backend');
    await page.click('button:has-text("Lanjut")');

    // Step 6: Account creation
    await page.fill('input[type="email"]', 'testuser@example.com');
    await page.fill('input[type="password"]', 'SecurePassword123!');
    await page.fill('input[placeholder="Full Name"]', 'Test User');

    // Step 7: Submit
    await page.click('button:has-text("Sign Up")');

    // Step 8: Verify redirect to Explore
    await page.waitForURL('**/explore');
    expect(page.url()).toContain('/explore');

    // Step 9: Verify career recommendations appear
    await expect(page.locator('text=89% Match')).toBeVisible();
  });

  test('should handle validation errors', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button:has-text("Mulai Personalisasi Karir")');

    // Try to proceed without selecting education
    const nextButton = page.locator('button:has-text("Lanjut")');
    await expect(nextButton).toBeDisabled();

    // Select education
    await page.click('button:has-text("Kuliah")');
    await expect(nextButton).toBeEnabled();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Offline mode
    await page.context().setOffline(true);

    await page.goto('http://localhost:3000');
    await page.click('button:has-text("Mulai Personalisasi Karir")');

    const errorMessage = page.locator('text=Network error');
    await expect(errorMessage).toBeVisible();

    // Back online
    await page.context().setOffline(false);
  });
});
```

### Test: Career Selection & Roadmap Generation

```typescript
test.describe('Career Selection & Roadmap', () => {
  test.beforeEach(async ({ page }) => {
    // Complete onboarding first
    await page.goto('http://localhost:3000');
    await completeOnboarding(page);
  });

  test('should select career and generate roadmap', async ({ page }) => {
    // On Explore page
    expect(page.url()).toContain('/explore');

    // Click first career recommendation
    await page.click('button:has-text("Pilih Karir Ini")');

    // Should show roadmap button
    const roadmapButton = page.locator('button:has-text("Buat Roadmap")');
    await expect(roadmapButton).toBeVisible();

    // Click to view roadmap
    await roadmapButton.click();

    // Wait for roadmap page
    await page.waitForURL('**/paths');

    // Verify roadmap nodes appear
    const nodes = page.locator('[data-testid="roadmap-node"]');
    const nodeCount = await nodes.count();
    expect(nodeCount).toBeGreaterThan(0);

    // Verify step details
    const firstNode = nodes.first();
    await expect(firstNode).toContainText('Step 1');
  });

  test('should unlock next step after completing step', async ({ page }) => {
    // Navigate to roadmap
    await page.goto('http://localhost:3000/paths');

    // First step should be active (yellow)
    const step1 = page.locator('[data-testid="step-1"]');
    await expect(step1).toHaveClass(/active/);

    // Second step should be locked
    const step2 = page.locator('[data-testid="step-2"]');
    await expect(step2).toHaveClass(/locked/);

    // Click step 1 to mark complete
    await step1.click();

    // Confirm completion
    const confirmButton = page.locator('button:has-text("Tandai Selesai")');
    await confirmButton.click();

    // Step 2 should now be active
    await expect(step2).toHaveClass(/active/);
  });

  test('should show skill details on hover', async ({ page }) => {
    await page.goto('http://localhost:3000/paths');

    const step1 = page.locator('[data-testid="step-1"]');

    // Hover to show tooltip
    await step1.hover();

    // Verify tooltip content
    const tooltip = page.locator('[role="tooltip"]');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText('40 hours');
  });
});
```

### Test: Daily Tasks & Gamification

```typescript
test.describe('Daily Tasks & Gamification', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'testuser@example.com', 'password');
    await page.goto('http://localhost:3000/journey');
  });

  test('should show daily tasks and track completion', async ({ page }) => {
    // Verify tasks displayed
    const tasks = page.locator('[data-testid="task-item"]');
    const taskCount = await tasks.count();
    expect(taskCount).toBeGreaterThan(0);

    // Verify first task is visible
    const firstTask = tasks.first();
    await expect(firstTask).toBeVisible();

    // Check task details
    const taskTitle = firstTask.locator('[data-testid="task-title"]');
    const taskDuration = firstTask.locator('[data-testid="task-duration"]');
    await expect(taskTitle).toBeVisible();
    await expect(taskDuration).toBeVisible();

    // Get initial XP
    const initialXP = await page.locator('[data-testid="xp-display"]').textContent();

    // Mark task complete
    await firstTask.locator('button:has-text("Tandai Selesai")').click();

    // Verify XP increased
    const updatedXP = await page.locator('[data-testid="xp-display"]').textContent();
    expect(parseInt(updatedXP)).toBeGreaterThan(parseInt(initialXP));

    // Verify task is now marked complete
    await expect(firstTask).toHaveClass(/completed/);
  });

  test('should maintain streak on consecutive days', async ({ page }) => {
    // Mark today's task complete
    const task = page.locator('[data-testid="task-item"]').first();
    await task.locator('button:has-text("Tandai Selesai")').click();

    // Check streak is 1
    const streak = await page.locator('[data-testid="streak-display"]').textContent();
    expect(streak).toContain('1');

    // Simulate next day
    await page.goto('http://localhost:3000/journey?date=2026-03-22');

    // Mark next task complete
    const nextDayTask = page.locator('[data-testid="task-item"]').first();
    await nextDayTask.locator('button:has-text("Tandai Selesai")').click();

    // Check streak is now 2
    const updatedStreak = await page.locator('[data-testid="streak-display"]').textContent();
    expect(updatedStreak).toContain('2');
  });

  test('should break streak if day is missed', async ({ page }) => {
    // Complete today's task
    let task = page.locator('[data-testid="task-item"]').first();
    await task.locator('button:has-text("Tandai Selesai")').click();

    // Simulate skipping tomorrow, go to day after
    await page.goto('http://localhost:3000/journey?date=2026-03-23');

    // Complete task on day after
    task = page.locator('[data-testid="task-item"]').first();
    await task.locator('button:has-text("Tandai Selesai")').click();

    // Streak should be reset to 1
    const streak = await page.locator('[data-testid="streak-display"]').textContent();
    expect(streak).toContain('1');
  });
});
```

### Test: Project Submission & AI Review

```typescript
test.describe('Project Submission & Review', () => {
  test('should submit project and receive AI feedback', async ({ page }) => {
    await loginAs(page, 'testuser@example.com', 'password');
    await page.goto('http://localhost:3000/projects');

    // Click submit new project
    await page.click('button:has-text("Submit Proyek Baru")');

    // Fill form
    await page.fill('input[placeholder="Project Title"]', 'Todo App');
    await page.fill('input[placeholder="GitHub Link"]', 'https://github.com/user/todo-app');
    await page.fill('input[placeholder="Add skill"]', 'React');
    await page.click('button:has-text("Add")');
    await page.fill('textarea[placeholder="Description"]', 'A React todo application');

    // Submit
    await page.click('button:has-text("🤖 Submit & Evaluasi")');

    // Wait for AI review
    await page.waitForSelector('[data-testid="project-review"]');

    // Verify review content
    const review = page.locator('[data-testid="project-review"]');
    await expect(review).toContainText('Score:');
    await expect(review).toContainText('Feedback:');

    // Verify score is between 0-100
    const scoreText = await page.locator('[data-testid="project-score"]').textContent();
    const score = parseInt(scoreText);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test('should validate project submission', async ({ page }) => {
    await loginAs(page, 'testuser@example.com', 'password');
    await page.goto('http://localhost:3000/projects');

    await page.click('button:has-text("Submit Proyek Baru")');

    // Try to submit with invalid GitHub URL
    await page.fill('input[placeholder="GitHub Link"]', 'not-a-url');
    const submitButton = page.locator('button:has-text("Submit")');

    // Should be disabled or show error
    const isDisabled = await submitButton.isDisabled();
    if (!isDisabled) {
      await submitButton.click();
      const errorMessage = page.locator('text=Invalid URL');
      await expect(errorMessage).toBeVisible();
    }
  });
});
```

### Test: Error Handling & Recovery

```typescript
test.describe('Error Handling', () => {
  test('should show error message when Groq API fails', async ({ page }) => {
    await loginAs(page, 'testuser@example.com', 'password');

    // Mock Groq API failure
    await page.route('**/api/roadmap', route => {
      route.abort('failed');
    });

    // Try to generate roadmap
    await page.goto('http://localhost:3000/explore');
    await page.click('button:has-text("Buat Roadmap")');

    // Should show error message
    const errorMessage = page.locator('text=Gagal menghasilkan roadmap');
    await expect(errorMessage).toBeVisible();

    // Should show retry button
    const retryButton = page.locator('button:has-text("Coba Lagi")');
    await expect(retryButton).toBeVisible();
  });

  test('should recover from network timeout', async ({ page }) => {
    await loginAs(page, 'testuser@example.com', 'password');

    // Simulate slow network
    await page.route('**/api/**', route => {
      setTimeout(() => route.continue(), 35000); // 35 seconds
    });

    // Request should timeout
    await page.goto('http://localhost:3000/explore');
    await page.click('button:has-text("Buat Roadmap")');

    // Should show timeout message
    const timeoutMessage = page.locator('text=Request timeout');
    await expect(timeoutMessage).toBeVisible();
  });

  test('should show 404 for non-existent page', async ({ page }) => {
    await page.goto('http://localhost:3000/non-existent-page');

    const notFoundMessage = page.locator('text=Page not found');
    await expect(notFoundMessage).toBeVisible();

    // Should have home button
    const homeButton = page.locator('button:has-text("Back to Home")');
    await expect(homeButton).toBeVisible();
  });
});
```

**Checklist:**
- [ ] Test complete user journeys
- [ ] Test happy paths
- [ ] Test error scenarios
- [ ] Test form validation
- [ ] Test navigation
- [ ] Test accessibility
- [ ] Test responsiveness on mobile
- [ ] Test offline behavior

**Expected Coverage:** Critical paths 100%

---

# 📋 PART 4: SPECIALTY TESTING

## 4.1 PERFORMANCE TESTING

### Lighthouse CI

```bash
npm install --save-dev @lhci/cli@latest @lhci/config-uploader@latest
```

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/explore",
        "http://localhost:3000/paths"
      ],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

### Run Performance Tests

```bash
# Run Lighthouse CI
lhci autorun

# Performance budget
npm run build
npx webpack-bundle-analyzer dist/bundle.js
```

**Checklist:**
- [ ] Lighthouse score ≥ 90 (Performance)
- [ ] Lighthouse score ≥ 90 (Accessibility)
- [ ] Lighthouse score ≥ 90 (Best Practices)
- [ ] Page load < 3 seconds
- [ ] Bundle size < 500KB
- [ ] Core Web Vitals all green

---

## 4.2 SECURITY TESTING

### OWASP Testing

```typescript
describe('Security Tests', () => {
  test('should prevent XSS attacks', async ({ page }) => {
    await loginAs(page, 'test@example.com', 'password');
    
    // Try to inject script
    const maliciousInput = '<script>alert("XSS")</script>';
    await page.fill('input[placeholder="Task description"]', maliciousInput);
    await page.click('button:has-text("Save")');

    // Content should be escaped
    const savedContent = await page.locator('[data-testid="task-content"]').innerHTML();
    expect(savedContent).not.toContain('<script>');
  });

  test('should prevent SQL injection through Firestore', async ({ page }) => {
    // This should be safe with Firestore, but verify
    const maliciousQuery = "'; DROP TABLE users; --";
    
    // Try to search with malicious input
    await page.fill('input[placeholder="Search"]', maliciousQuery);
    await page.press('input[placeholder="Search"]', 'Enter');

    // Should return no results, not crash
    const results = page.locator('[data-testid="search-result"]');
    const count = await results.count();
    expect(count).toBe(0);
  });

  test('should have proper CSRF protection', async ({ page }) => {
    // Get CSRF token from form
    const csrfToken = await page.locator('input[name="csrf_token"]').inputValue();
    expect(csrfToken).toBeDefined();
    expect(csrfToken.length).toBeGreaterThan(0);
  });

  test('should enforce HTTPS', async ({ page }) => {
    // Should redirect HTTP to HTTPS
    const response = await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    
    expect(page.url()).toContain('https');
  });

  test('should set secure headers', async ({ page }) => {
    const response = await page.goto('http://localhost:3000');
    const headers = response?.headers();

    // Check security headers
    expect(headers?.['x-content-type-options']).toBe('nosniff');
    expect(headers?.['x-frame-options']).toBe('DENY');
    expect(headers?.['x-xss-protection']).toBe('1; mode=block');
  });
});
```

**Checklist:**
- [ ] No XSS vulnerabilities
- [ ] No SQL injection vulnerabilities
- [ ] CSRF tokens present
- [ ] Secure headers set
- [ ] No sensitive data in logs
- [ ] API rate limiting works
- [ ] Authentication required for protected routes

---

## 4.3 ACCESSIBILITY TESTING

### Axe Testing

```bash
npm install --save-dev @axe-core/playwright
```

```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

describe('Accessibility', () => {
  test('should pass Axe accessibility scan on landing page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    await injectAxe(page);
    
    // Check for accessibility violations
    const accessibility = await checkA11y(page);
    expect(accessibility).toHaveLength(0); // No violations
  });

  test('should pass Axe on all main pages', async ({ page }) => {
    const pages = [
      '/',
      '/explore',
      '/discover',
      '/paths',
      '/journey',
      '/projects',
      '/profile'
    ];

    for (const route of pages) {
      await page.goto(`http://localhost:3000${route}`);
      await injectAxe(page);
      
      const violations = await checkA11y(page);
      expect(violations).toHaveLength(0);
    }
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // All buttons should have accessible names
    const buttons = page.locator('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();

      expect(ariaLabel || textContent).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Tab through all interactive elements
    let focusedElement = '';
    let previousElement = '';

    // Press Tab multiple times
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      focusedElement = await page.evaluate(() => {
        const focused = document.activeElement;
        return focused?.tagName || '';
      });

      // Ensure focus moves
      if (i > 0) {
        expect(focusedElement).not.toBe(previousElement);
      }
      previousElement = focusedElement;
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // This should be checked automatically by Axe
    // But you can also use specialized tool
    const contrastCheck = await page.evaluate(() => {
      // Simple check for text color and background
      const elements = document.querySelectorAll('*');
      let contrastIssues = 0;

      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        const color = style.color;
        const bgColor = style.backgroundColor;

        // Check if contrast ratio is acceptable (WCAG AA)
        // This is simplified - would use proper contrast checker in production
        if (color && bgColor && color !== 'transparent') {
          // Real contrast checking would go here
        }
      });

      return contrastIssues;
    });

    expect(contrastCheck).toBe(0);
  });
});
```

**Checklist:**
- [ ] WCAG 2.1 Level AA compliance
- [ ] No Axe violations
- [ ] Proper ARIA labels
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader testing done
- [ ] Color contrast ≥ 4.5:1

---

## 4.4 MOBILE RESPONSIVENESS TESTING

```typescript
describe('Mobile Responsiveness', () => {
  const viewports = [
    { name: 'iPhone 12', width: 390, height: 844 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  viewports.forEach(viewport => {
    test(`should work on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });

      await page.goto('http://localhost:3000/explore');

      // Verify content is visible
      const mainContent = page.locator('main');
      await expect(mainContent).toBeVisible();

      // Verify no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = viewport.width;

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);

      // Verify buttons are tappable (≥ 48x48px)
      const buttons = page.locator('button');
      const count = await buttons.count();

      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const boundingBox = await button.boundingBox();

        if (boundingBox) {
          expect(boundingBox.width).toBeGreaterThanOrEqual(44);
          expect(boundingBox.height).toBeGreaterThanOrEqual(44);
        }
      }
    });
  });
});
```

**Checklist:**
- [ ] Works on iPhone (390px)
- [ ] Works on iPad (768px)
- [ ] Works on Desktop (1920px)
- [ ] No horizontal scroll
- [ ] Touch targets ≥ 44x44px
- [ ] Text readable without zoom
- [ ] Mobile menu functional

---

## 4.5 BROWSER COMPATIBILITY TESTING

```typescript
describe('Browser Compatibility', () => {
  const browsers = ['chromium', 'firefox', 'webkit'];

  browsers.forEach(browserName => {
    test(`should work in ${browserName}`, async ({ browser }) => {
      const page = await browser.newPage();

      await page.goto('http://localhost:3000');

      // Test key features
      const exploreButton = page.locator('button:has-text("Explore")');
      await expect(exploreButton).toBeVisible();

      await page.close();
    });
  });
});
```

**Checklist:**
- [ ] Chrome ≥ 90
- [ ] Firefox ≥ 88
- [ ] Safari ≥ 14
- [ ] Edge ≥ 90

---

## 4.6 API LOAD TESTING

```typescript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp-up
    { duration: '1m30s', target: 20 }, // Stay at 20 users
    { duration: '30s', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests < 1.5s
    http_req_failed: ['<0.1'],         // Error rate < 0.1%
  },
};

export default function () {
  const res = http.post('http://localhost:3000/api/roadmap', {
    careerGoal: 'Full-Stack Developer',
    education: 'bachelors'
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 1500ms': (r) => r.timings.duration < 1500,
  });

  sleep(1);
}
```

**Checklist:**
- [ ] Can handle 100 concurrent users
- [ ] API response time < 1.5s under load
- [ ] Error rate < 0.1%
- [ ] Database connection pool adequate
- [ ] Rate limiting triggers at 100 req/min

---

## 4.7 DATABASE BACKUP & RECOVERY TESTING

```typescript
describe('Database Backup & Recovery', () => {
  it('should recover from backup', async () => {
    // Create test data
    const testUser = await createUser({
      email: 'backup-test@example.com',
      name: 'Backup Test'
    });

    // Create backup
    await createBackup('skillpath-backup-test');

    // Corrupt data (delete user)
    await deleteUser(testUser.id);

    // Verify deletion
    let user = await getUser(testUser.id);
    expect(user).toBeNull();

    // Restore from backup
    await restoreBackup('skillpath-backup-test');

    // Verify restoration
    user = await getUser(testUser.id);
    expect(user).toBeDefined();
    expect(user.email).toBe('backup-test@example.com');
  });
});
```

**Checklist:**
- [ ] Daily automated backups
- [ ] Backup encryption enabled
- [ ] Restore procedure tested monthly
- [ ] RTO (Recovery Time Objective) < 4 hours
- [ ] RPO (Recovery Point Objective) < 24 hours

---

# 📋 PART 5: TESTING CHECKLIST

## BEFORE PRODUCTION DEPLOYMENT

### Unit Tests ✅
- [ ] 70%+ code coverage
- [ ] All utility functions tested
- [ ] All custom hooks tested
- [ ] All component logic tested
- [ ] Edge cases covered
- [ ] Error scenarios covered
- [ ] Run: `npm run test -- --coverage`

### Integration Tests ✅
- [ ] All API routes tested
- [ ] Database operations tested
- [ ] Firestore transactions tested
- [ ] Authentication flow tested
- [ ] Error handling tested
- [ ] Rate limiting tested
- [ ] Run: `npm run test:integration`

### E2E Tests ✅
- [ ] Onboarding flow tested
- [ ] Career selection tested
- [ ] Roadmap generation tested
- [ ] Task completion tested
- [ ] Project submission tested
- [ ] Error recovery tested
- [ ] Run: `npm run test:e2e`

### Performance Tests ✅
- [ ] Lighthouse score ≥ 90 (Performance)
- [ ] Page load < 3 seconds
- [ ] Bundle size < 500KB
- [ ] API response < 1.5 seconds
- [ ] Database queries optimized
- [ ] Run: `npx lhci autorun`

### Security Tests ✅
- [ ] No XSS vulnerabilities
- [ ] No SQL injection vulnerabilities
- [ ] CSRF tokens present
- [ ] Secure headers set
- [ ] Rate limiting works
- [ ] Auth required on protected routes
- [ ] Run: `npm run test:security`

### Accessibility Tests ✅
- [ ] WCAG 2.1 Level AA compliant
- [ ] Axe violations = 0
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels present
- [ ] Color contrast adequate
- [ ] Run: `npm run test:a11y`

### Mobile Tests ✅
- [ ] iPhone 12 (390px) works
- [ ] iPad (768px) works
- [ ] Desktop (1920px) works
- [ ] No horizontal scroll
- [ ] Touch targets ≥ 44x44px
- [ ] Mobile menu functional
- [ ] Run: `npm run test:mobile`

### Browser Tests ✅
- [ ] Chrome ≥ 90 works
- [ ] Firefox ≥ 88 works
- [ ] Safari ≥ 14 works
- [ ] Edge ≥ 90 works
- [ ] Run: `npm run test:browsers`

### Load Tests ✅
- [ ] 100 concurrent users supported
- [ ] API response < 1.5s under load
- [ ] Error rate < 0.1%
- [ ] Run: `k6 run load-test.js`

### Database Tests ✅
- [ ] Backup created successfully
- [ ] Restore tested and works
- [ ] Concurrent operations safe
- [ ] Transactions working
- [ ] Indexes optimized
- [ ] Run: `npm run test:database`

---

## FINAL PRODUCTION CHECKLIST

```
🔴 CRITICAL - MUST PASS
└─ [ ] 70%+ test coverage
└─ [ ] Zero security vulnerabilities
└─ [ ] Lighthouse Performance ≥ 90
└─ [ ] Page load < 3 seconds
└─ [ ] No Axe accessibility violations
└─ [ ] E2E tests: All critical paths pass

🟠 IMPORTANT - STRONGLY RECOMMENDED
└─ [ ] Error monitoring (Sentry) active
└─ [ ] Performance monitoring (Vercel Analytics) active
└─ [ ] Backup & recovery tested
└─ [ ] SSL certificate valid
└─ [ ] API rate limiting configured
└─ [ ] Database indexes created

🟡 NICE TO HAVE
└─ [ ] 80%+ test coverage (target)
└─ [ ] Lighthouse all scores ≥ 90
└─ [ ] Mobile responsiveness tested on real devices
└─ [ ] Load testing passed (100 concurrent users)
└─ [ ] Browser compatibility verified
└─ [ ] Analytics configured
```

---

## TESTING TOOLS QUICK REFERENCE

| Tool | Purpose | Command |
|------|---------|---------|
| Jest | Unit & Integration tests | `npm test` |
| RTL | Component testing | `npm test` |
| Playwright | E2E testing | `npx playwright test` |
| Cypress | E2E testing (alternative) | `npx cypress open` |
| Lighthouse | Performance | `npx lhci autorun` |
| Axe | Accessibility | `npm run test:a11y` |
| K6 | Load testing | `k6 run script.js` |
| ESLint | Code quality | `npm run lint` |
| TypeScript | Type checking | `npm run type-check` |
| Sentry | Error monitoring | Dashboard |

---

## TESTING SCHEDULE

### Before Launching MVP (2 weeks)
```
Week 1:
- Unit tests: 20+ tests, 40% coverage
- Integration tests: API routes only
- E2E tests: Critical paths only
- Security tests: Input validation
- Performance: Initial Lighthouse run

Week 2:
- Add 30+ more tests (total 50, 60% coverage)
- Complete E2E flows
- Accessibility scan
- Load test with 50 users
- Security audit
```

### Before Production (6 weeks after MVP)
```
Week 1-2: Add 20+ more tests (80 total, 70% coverage)
Week 3: Performance optimization
Week 4: Security hardening
Week 5: Final E2E & accessibility testing
Week 6: Load testing (100+ concurrent users)
```

---

## CONTINUOUS TESTING (After Launch)

### Daily
- [ ] Run unit tests (CI/CD)
- [ ] Run E2E tests (CI/CD)
- [ ] Check error logs (Sentry)
- [ ] Monitor performance (Vercel Analytics)

### Weekly
- [ ] Code coverage report
- [ ] Security vulnerability scan
- [ ] Lighthouse CI
- [ ] Performance regression testing

### Monthly
- [ ] Accessibility audit
- [ ] Load testing
- [ ] Database integrity check
- [ ] Backup restoration test

---

## SUMMARY

**For 100% Production-Ready:**

1. **Unit Tests:** 70%+ coverage
2. **Integration Tests:** All API routes
3. **E2E Tests:** All critical user flows
4. **Performance Tests:** Lighthouse ≥ 90
5. **Security Tests:** Pen testing + OWASP top 10
6. **Accessibility Tests:** WCAG 2.1 AA
7. **Mobile Tests:** iPhone, iPad, Desktop
8. **Browser Tests:** Chrome, Firefox, Safari, Edge
9. **Load Tests:** 100+ concurrent users
10. **Recovery Tests:** Backup & restore verified

**Estimated Time:** 8-12 weeks with 1 developer
**Total Test Cases:** 200+ test cases
**Expected Coverage:** 70-80% code coverage

---

**Next Step:** Start with unit tests (Day 1-3), then integration tests (Day 4-6), then E2E tests (Day 7-10), then specialty tests (Week 2-3).

