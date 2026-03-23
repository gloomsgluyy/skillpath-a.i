# 🧪 QA TESTING GUIDE - FUNCTIONAL & UI TESTING

**Purpose:** Complete checklist untuk testing semua fitur & UI website  
**Scope:** End-to-end functional testing + UI/UX testing  
**Target:** 100% production-ready verification  

---

## 📋 PART 1: FUNCTIONAL TESTING CHECKLIST

---

## 1. AUTHENTICATION & USER MANAGEMENT

### 1.1 Sign Up Flow

**Test Case 1.1.1: Valid Sign Up**
```
Precondition: User on sign up page
Steps:
  1. Fill email: test@example.com
  2. Fill password: ValidPass123!
  3. Fill full name: Test User
  4. Accept terms
  5. Click "Daftar"
Expected: 
  ✅ User created in Firebase
  ✅ Redirect to onboarding
  ✅ Email verification sent (check email)
  ✅ User session created
```

**Test Case 1.1.2: Invalid Email Format**
```
Steps:
  1. Fill email: invalid-email
  2. Fill password: ValidPass123!
  3. Click "Daftar"
Expected:
  ✅ Error message: "Email tidak valid"
  ✅ Form doesn't submit
  ✅ Error highlighted on email field
```

**Test Case 1.1.3: Weak Password**
```
Steps:
  1. Fill password: 123
Expected:
  ✅ Error: "Password minimal 8 karakter"
  ✅ Submit button disabled
  ✅ Password strength indicator shows red
```

**Test Case 1.1.4: Email Already Exists**
```
Precondition: existing@example.com already registered
Steps:
  1. Fill email: existing@example.com
  2. Fill password: ValidPass123!
  3. Click "Daftar"
Expected:
  ✅ Error: "Email sudah terdaftar"
  ✅ Suggest login instead
```

**Test Case 1.1.5: Missing Required Fields**
```
Steps:
  1. Leave email blank
  2. Leave password blank
  3. Click "Daftar"
Expected:
  ✅ Submit button disabled
  ✅ Error messages on empty fields
  ✅ Red border on required fields
```

---

### 1.2 Login Flow

**Test Case 1.2.1: Valid Login**
```
Steps:
  1. Fill email: test@example.com
  2. Fill password: ValidPass123!
  3. Click "Masuk"
Expected:
  ✅ Redirect to dashboard/explore
  ✅ User avatar shown in navbar
  ✅ User authenticated
```

**Test Case 1.2.2: Wrong Password**
```
Steps:
  1. Fill email: test@example.com
  2. Fill password: WrongPassword123!
  3. Click "Masuk"
Expected:
  ✅ Error: "Email atau password salah"
  ✅ User not logged in
  ✅ Stay on login page
```

**Test Case 1.2.3: Non-existent Email**
```
Steps:
  1. Fill email: nonexistent@example.com
  2. Fill password: ValidPass123!
  3. Click "Masuk"
Expected:
  ✅ Error: "Email atau password salah"
  ✅ User not logged in
```

**Test Case 1.2.4: "Remember Me" Functionality**
```
Steps:
  1. Check "Ingat saya"
  2. Login successfully
  3. Close browser
  4. Reopen website
Expected:
  ✅ User still logged in
  ✅ No need to login again
```

**Test Case 1.2.5: Login Rate Limiting**
```
Steps:
  1. Try login 5+ times with wrong password
Expected:
  ✅ After 5 attempts: "Terlalu banyak percobaan, coba lagi dalam 15 menit"
  ✅ Login button disabled
```

---

### 1.3 Logout

**Test Case 1.3.1: Simple Logout**
```
Steps:
  1. Click user avatar
  2. Click "Logout"
Expected:
  ✅ User session cleared
  ✅ Redirect to landing page
  ✅ All user data cleared from storage
```

**Test Case 1.3.2: Logout clears sensitive data**
```
Steps:
  1. Logout
  2. Open browser DevTools → Storage
Expected:
  ✅ No user tokens in localStorage
  ✅ No user data in sessionStorage
```

---

### 1.4 Password Reset

**Test Case 1.4.1: Valid Reset Request**
```
Steps:
  1. Click "Lupa Password?"
  2. Fill email: test@example.com
  3. Click "Reset Password"
Expected:
  ✅ Email sent confirmation shown
  ✅ Email received with reset link
  ✅ Reset link valid for 24 hours
```

**Test Case 1.4.2: Reset with New Password**
```
Steps:
  1. Click reset link from email
  2. Fill new password: NewPass123!
  3. Fill confirm: NewPass123!
  4. Click "Reset"
Expected:
  ✅ Password updated in Firebase
  ✅ Can login with new password
  ✅ Old password no longer works
```

**Test Case 1.4.3: Reset Link Expiration**
```
Steps:
  1. Wait 25 hours
  2. Click reset link from email
Expected:
  ✅ Error: "Link sudah expired"
  ✅ Suggest request new reset link
```

---

### 1.5 Email Verification

**Test Case 1.5.1: Verify Email on Signup**
```
Steps:
  1. Complete signup
  2. Check email for verification link
  3. Click verification link
Expected:
  ✅ Email marked as verified in Firebase
  ✅ Success message shown
  ✅ Can access all features
```

**Test Case 1.5.2: Resend Verification Email**
```
Steps:
  1. If email not verified, click "Kirim ulang email"
Expected:
  ✅ New verification email sent
  ✅ Link valid
  ✅ Rate limited (max 3 per day)
```

---

## 2. ONBOARDING FLOW

### 2.1 Education Level Selection

**Test Case 2.1.1: Select Education**
```
Steps:
  1. Select "SMA"
  2. Click "Lanjut"
Expected:
  ✅ Selection saved
  ✅ Move to next step (Archetype)
  ✅ Progress indicator shows 2/5
```

**Test Case 2.1.2: Cannot Skip**
```
Steps:
  1. Don't select education
  2. Try click "Lanjut"
Expected:
  ✅ Button disabled
  ✅ Error: "Pilih salah satu"
```

**Test Case 2.1.3: Change Selection**
```
Steps:
  1. Select "SMA"
  2. Change to "Kuliah"
  3. Click "Lanjut"
Expected:
  ✅ Latest selection saved (Kuliah)
  ✅ Previous selection ignored
```

---

### 2.2 Archetype Selection

**Test Case 2.2.1: Select Archetype**
```
Steps:
  1. Click "The Thinker"
  2. Click "Lanjut"
Expected:
  ✅ Archetype saved
  ✅ Move to Interests step
  ✅ Selection shows in profile later
```

**Test Case 2.2.2: All Archetypes Available**
```
Expected:
  ✅ All 4 archetypes visible
  ✅ Each has icon + description
  ✅ Hover effect on each
```

---

### 2.3 Interest Selection

**Test Case 2.3.1: Select Multiple Interests**
```
Steps:
  1. Click "Frontend Development"
  2. Click "Backend Development"
  3. Click "Lanjut"
Expected:
  ✅ Both selected (checkmark visible)
  ✅ Multiple selection allowed
  ✅ Move to next step
```

**Test Case 2.3.2: Minimum Interest Required**
```
Steps:
  1. Don't select any interests
  2. Click "Lanjut"
Expected:
  ✅ Button disabled
  ✅ Error: "Pilih minimal 1 interest"
```

---

### 2.4 Account Creation (Part of Onboarding)

**Test Case 2.4.1: Create Account in Onboarding**
```
Steps:
  1. Complete education/archetype/interests
  2. Fill email: newuser@example.com
  3. Fill password: ValidPass123!
  4. Fill name: New User
  5. Click "Selesaikan"
Expected:
  ✅ User account created
  ✅ Preferences saved
  ✅ Redirect to /explore
  ✅ Welcome message shown
```

---

## 3. EXPLORE CAREERS PAGE

### 3.1 Career Browsing

**Test Case 3.1.1: Load Career List**
```
Steps:
  1. Navigate to /explore
Expected:
  ✅ Career cards loaded
  ✅ Shows "Menampilkan 24 dari 75 karir"
  ✅ Match percentage visible (89%)
  ✅ Images/icons loaded
  ✅ Salary in Rupiah shown
```

**Test Case 3.1.2: Scroll Load More**
```
Steps:
  1. Scroll to bottom
Expected:
  ✅ Load more careers automatically
  ✅ No pagination button needed
  ✅ Smooth loading animation
```

---

### 3.2 Search Functionality

**Test Case 3.2.1: Search by Career Name**
```
Steps:
  1. Type "Data Scientist" in search
  2. Press Enter
Expected:
  ✅ Filter results to matching careers
  ✅ Show only careers with "Data" in name
  ✅ Update count: "Menampilkan X dari 75"
```

**Test Case 3.2.2: Search with No Results**
```
Steps:
  1. Type "XYZ123" (non-existent)
Expected:
  ✅ Empty state shown
  ✅ Message: "Tidak ada karir yang cocok"
  ✅ Suggest refine search
```

**Test Case 3.2.3: Clear Search**
```
Steps:
  1. Search something
  2. Clear search box
Expected:
  ✅ All careers shown again
  ✅ Original list restored
```

---

### 3.3 Category Filter

**Test Case 3.3.1: Filter by Category**
```
Steps:
  1. Click "Data & AI" category
Expected:
  ✅ Show only Data & AI careers
  ✅ Category pill highlighted
  ✅ Count updated
```

**Test Case 3.3.2: Multiple Filters**
```
Steps:
  1. Click "Data & AI"
  2. Click "Software Development"
Expected:
  ✅ Show careers in both categories
  ✅ OR logic (not AND)
```

**Test Case 3.3.3: Clear Filters**
```
Steps:
  1. Apply filter
  2. Click "Semua"
Expected:
  ✅ All careers shown
  ✅ Pills reset
```

---

### 3.4 Career Details

**Test Case 3.4.1: View Career Details**
```
Steps:
  1. Click career card
Expected:
  ✅ Career details modal/page opens
  ✅ Show description
  ✅ Show skills required
  ✅ Show salary range
  ✅ Show career path button
```

**Test Case 3.4.2: Match Score Explanation**
```
Steps:
  1. Hover/click on match percentage
Expected:
  ✅ Tooltip shows why 89% (e.g., "Based on your interests")
```

---

### 3.5 Select Career Action

**Test Case 3.5.1: Select Career**
```
Steps:
  1. Click "Pilih Karir Ini"
Expected:
  ✅ Career set as target
  ✅ Confirmation shown
  ✅ Option to view roadmap
```

**Test Case 3.5.2: Change Career**
```
Steps:
  1. Select "Full-Stack Developer"
  2. Later select "Data Scientist"
Expected:
  ✅ Previous target replaced
  ✅ New target set
  ✅ No conflicts
```

---

## 4. SKILL PATHS (ROADMAP) PAGE

### 4.1 Roadmap Display

**Test Case 4.1.1: Load Roadmap**
```
Steps:
  1. Navigate to /paths
Expected:
  ✅ Roadmap title shown: "Roadmap: Full-Stack Developer"
  ✅ All 8 steps visible
  ✅ Step nodes numbered 1-8
  ✅ Progress: "0/8 tahapan selesai"
```

**Test Case 4.1.2: Step Status Display**
```
Expected:
  ✅ Step 1: Yellow (Active) - can click
  ✅ Step 2: Gray (Locked) - cannot click
  ✅ Completed step (if any): Green with checkmark
```

**Test Case 4.1.3: Step Details**
```
Steps:
  1. Click on Step 1
Expected:
  ✅ Show full title
  ✅ Show description
  ✅ Show estimated hours (40h)
  ✅ Show skills to learn
```

---

### 4.2 Complete Steps

**Test Case 4.2.1: Mark Step Complete**
```
Steps:
  1. Click Step 1 node
  2. Click "Tandai Selesai"
Expected:
  ✅ Step 1 marked complete (green)
  ✅ Progress updates: "1/8"
  ✅ Step 2 unlocks (yellow)
  ✅ Celebration/success animation
  ✅ XP awarded (if applicable)
```

**Test Case 4.2.2: Cannot Skip Steps**
```
Expected:
  ✅ Step 2 locked until Step 1 complete
  ✅ Click on locked step shows message: "Selesaikan step sebelumnya"
```

**Test Case 4.2.3: Undo Completion**
```
Steps:
  1. Mark Step 1 complete
  2. Click "Batalkan" (if button exists)
Expected:
  ✅ Status reverted
  ✅ Progress resets
  ✅ Step 2 locked again
```

---

### 4.3 AI Consultant Sidebar

**Test Case 4.3.1: Chat Loaded**
```
Expected:
  ✅ "AI Consultant" header shown
  ✅ "Online" status indicator green
  ✅ Chat input visible
```

**Test Case 4.3.2: Send Chat Message**
```
Steps:
  1. Type "Bagaimana cara belajar HTML?"
  2. Click send or press Enter
Expected:
  ✅ Message appears in chat
  ✅ User message aligned right
  ✅ AI response appears (loading spinner first)
  ✅ AI response aligned left
  ✅ Response relevant to question
```

**Test Case 4.3.3: AI Response Quality**
```
Steps:
  1. Ask: "Apa itu HTML?"
Expected:
  ✅ Response is accurate
  ✅ Response is in Indonesian
  ✅ Response under 5 minutes
  ✅ No errors in response
```

**Test Case 4.3.4: Chat History**
```
Steps:
  1. Have several messages
  2. Refresh page
Expected:
  ✅ Chat history preserved
  ✅ Previous messages visible
```

---

## 5. DISCOVER YOURSELF (PERSONALITY QUIZ)

### 5.1 Quiz Flow

**Test Case 5.1.1: Start Quiz**
```
Steps:
  1. Navigate to /discover
  2. Click "Mulai Quiz"
Expected:
  ✅ Quiz starts at question 1/25
  ✅ Question visible with clear text
  ✅ Multiple choice options (radio buttons)
```

**Test Case 5.1.2: Answer Question**
```
Steps:
  1. Read question
  2. Select option
  3. Click "Next" or auto-advance
Expected:
  ✅ Option selected (radio checked)
  ✅ Move to next question
  ✅ Progress: "Q2/25"
```

**Test Case 5.1.3: All Questions Answerable**
```
Steps:
  1. Go through all 25 questions
Expected:
  ✅ Every question has 4-5 options
  ✅ No skipped questions
  ✅ Clear, understandable wording
```

**Test Case 5.1.4: Quiz Completion**
```
Steps:
  1. Answer all 25 questions
Expected:
  ✅ Results page shown
  ✅ Archetype determined
  ✅ Explanation of archetype
  ✅ Recommended careers based on archetype
```

---

### 5.2 Quiz Results

**Test Case 5.2.1: Results Display**
```
Expected:
  ✅ Your archetype: "The Thinker"
  ✅ Description of archetype
  ✅ Strengths highlighted
  ✅ Weaknesses acknowledged
  ✅ Recommended career paths
```

**Test Case 5.2.2: Save Results**
```
Steps:
  1. Complete quiz
  2. Click "Simpan Hasil"
Expected:
  ✅ Results saved to user profile
  ✅ Can view later in profile
```

---

## 6. LEARNING JOURNEY PAGE

### 6.1 Daily Tasks

**Test Case 6.1.1: Load Tasks**
```
Steps:
  1. Navigate to /journey
Expected:
  ✅ "Daily Tasks" section visible
  ✅ 7 daily tasks shown
  ✅ "0 selesai hari ini"
  ✅ Each task has checkbox
```

**Test Case 6.1.2: Task Details**
```
Expected:
  ✅ Task title visible
  ✅ Duration shown (30 min, 45 min, etc.)
  ✅ XP reward shown (+15 XP)
  ✅ Checkbox unchecked
```

**Test Case 6.1.3: Complete Task**
```
Steps:
  1. Click checkbox on first task
Expected:
  ✅ Checkbox checked
  ✅ Task marked as complete
  ✅ Strikethrough text
  ✅ Progress updates: "1 selesai hari ini"
  ✅ XP indicator shows "+15 XP"
```

**Test Case 6.1.4: Incomplete Task**
```
Steps:
  1. Complete a task
  2. Click checkbox again
Expected:
  ✅ Checkbox unchecked
  ✅ Task no longer strikethrough
  ✅ XP removed
```

**Test Case 6.1.5: Task Timer (Optional)**
```
Steps:
  1. Click on task duration
Expected:
  ✅ Timer starts
  ✅ Countdown visible
  ✅ Notification when time's up
```

---

### 6.2 Progress Circle

**Test Case 6.2.1: Display Progress**
```
Expected:
  ✅ Circle shows 0% (at start)
  ✅ Label shows "SELESAI"
  ✅ Text centered
  ✅ Color is orange/gradient
```

**Test Case 6.2.2: Progress Updates**
```
Steps:
  1. Complete 3 tasks
Expected:
  ✅ Circle updates to ~43%
  ✅ Animation smooth
  ✅ Progress reflects task completion
```

---

### 6.3 Streak System

**Test Case 6.3.1: Streak Display**
```
Expected:
  ✅ Streak icon (🔥) visible
  ✅ Current streak shown (0 at start)
  ✅ Label: "HARI STREAK"
```

**Test Case 6.3.2: Streak Increment on First Task**
```
Steps:
  1. Today: Complete first task
  2. Next day: Complete task
Expected:
  ✅ Day 1: Streak = 1
  ✅ Day 2: Streak = 2
  ✅ Continues if task completed daily
```

**Test Case 6.3.3: Streak Breaks**
```
Steps:
  1. Maintain 5-day streak
  2. Skip a day (no tasks completed)
Expected:
  ✅ Streak resets to 0
  ✅ Warning notification sent day before
```

---

### 6.4 Target Career Display

**Test Case 6.4.1: Show Target Career**
```
Expected:
  ✅ "TARGET KARIR" label visible
  ✅ Selected career name shown: "Full-Stack Developer"
  ✅ Can click to change career
```

---

## 7. PROJECTS LAB PAGE

### 7.1 Project List

**Test Case 7.1.1: Load Projects**
```
Steps:
  1. Navigate to /projects
Expected:
  ✅ Project list loaded (empty if new user)
  ✅ Empty state shown: "Belum ada proyek"
  ✅ "Submit Proyek Baru" button visible
```

**Test Case 7.1.2: Project Cards**
```
Expected (if projects exist):
  ✅ Project title
  ✅ Project description
  ✅ AI score (0-100)
  ✅ Submission date
  ✅ Skills used
```

---

### 7.2 Submit Project

**Test Case 7.2.1: Submit Project Form**
```
Steps:
  1. Click "Submit Proyek Baru"
  2. Fill form:
     - Title: "Todo App"
     - GitHub link: https://github.com/user/todo-app
     - Add skills: React, TypeScript
     - Description: "A todo application..."
  3. Click "Submit"
Expected:
  ✅ Form validated
  ✅ Link verified (valid URL)
  ✅ Project submitted to AI reviewer
```

**Test Case 7.2.2: Invalid GitHub Link**
```
Steps:
  1. Fill GitHub link: "not-a-url"
  2. Try submit
Expected:
  ✅ Error: "URL tidak valid"
  ✅ Form doesn't submit
```

**Test Case 7.2.3: Missing Required Fields**
```
Steps:
  1. Leave title blank
  2. Try submit
Expected:
  ✅ Error: "Judul wajib diisi"
  ✅ Form doesn't submit
```

---

### 7.3 AI Project Review

**Test Case 7.3.1: Get AI Review**
```
Steps:
  1. Submit project
  2. Wait for AI to review
Expected:
  ✅ Loading spinner shown
  ✅ "Sedang di-review..." message
  ✅ Review completes within 2 minutes
```

**Test Case 7.3.2: Review Results**
```
Expected:
  ✅ Score shown (0-100)
  ✅ Feedback text provided
  ✅ Strengths highlighted
  ✅ Improvement areas listed
  ✅ Relevant to project
```

**Test Case 7.3.3: Resubmit Project**
```
Steps:
  1. After review, improve project
  2. Resubmit for review
Expected:
  ✅ Can resubmit unlimited times
  ✅ New review generated
  ✅ Score can improve
```

---

## 8. PROFILE PAGE

### 8.1 Profile Information

**Test Case 8.1.1: Display Profile**
```
Expected:
  ✅ User name: "Test User"
  ✅ Email: test@example.com
  ✅ Target career: "Full-Stack Developer"
  ✅ Archetype: "The Thinker"
  ✅ Member since: [date]
```

**Test Case 8.1.2: Edit Profile**
```
Steps:
  1. Click "Edit Profile"
  2. Change name: "Updated Name"
  3. Save
Expected:
  ✅ Changes saved to Firebase
  ✅ Name updated everywhere
  ✅ Confirmation shown
```

---

### 8.2 Achievements & Badges

**Test Case 8.2.1: Badges Earned**
```
Expected:
  ✅ "First Task" badge (if applicable)
  ✅ "7-Day Streak" badge (if applicable)
  ✅ Badge images/icons visible
  ✅ Unlock dates shown
```

---

### 8.3 Statistics

**Test Case 8.3.1: User Stats**
```
Expected:
  ✅ Total XP: "0"
  ✅ Current Level: "1"
  ✅ Tasks Completed: "0"
  ✅ Best Streak: "0"
  ✅ Projects Submitted: "0"
```

---

### 8.4 CV Generator

**Test Case 8.4.1: Generate CV**
```
Steps:
  1. Click "Generate CV"
  2. Wait for generation
Expected:
  ✅ CV generated as PDF
  ✅ Download link provided
  ✅ Includes:
     - User info
     - Skills learned
     - Projects completed
     - Achievements
```

**Test Case 8.4.2: CV Content Accuracy**
```
Expected:
  ✅ All completed skills listed
  ✅ All submitted projects listed
  ✅ Current level shown
  ✅ Dates accurate
```

---

## 9. NAVIGATION & USER FLOW

### 9.1 Navbar Navigation

**Test Case 9.1.1: Navigate Between Pages**
```
Steps:
  1. Click "Explore Careers" → /explore
  2. Click "Discover Yourself" → /discover
  3. Click "Skill Paths" → /paths
  4. Click "Learning Journey" → /journey
  5. Click "Projects" → /projects
Expected:
  ✅ All links work
  ✅ Correct pages load
  ✅ Active link highlighted
```

**Test Case 9.1.2: Logo Navigation**
```
Steps:
  1. Click SkillPath logo
Expected:
  ✅ Go to home/landing page
  ✅ If authenticated: redirect to /explore
```

---

### 9.2 User Menu

**Test Case 9.2.1: Profile Menu**
```
Steps:
  1. Click user avatar
Expected:
  ✅ Dropdown menu shows
  ✅ Options visible:
     - Profil
     - Pengaturan
     - Logout
```

**Test Case 9.2.2: Navigate from Menu**
```
Steps:
  1. Click "Profil"
Expected:
  ✅ Go to /profile
```

---

## 10. DATA PERSISTENCE

### 10.1 User Data Saved

**Test Case 10.1.1: Progress Saved**
```
Steps:
  1. Complete task
  2. Close browser
  3. Reopen and login
Expected:
  ✅ Task still marked complete
  ✅ XP persisted
  ✅ Progress shows same state
```

**Test Case 10.1.2: Preferences Saved**
```
Steps:
  1. Select career
  2. Close browser
  3. Reopen
Expected:
  ✅ Same career shown as target
```

**Test Case 10.1.3: Chat History Saved**
```
Steps:
  1. Chat with AI
  2. Close page/browser
  3. Reopen /paths
Expected:
  ✅ Chat history visible
  ✅ All messages preserved
```

---

## 11. ERROR HANDLING

### 11.1 Network Errors

**Test Case 11.1.1: API Timeout**
```
Steps:
  1. Try action while simulating slow network
Expected:
  ✅ Error message shown: "Request timeout"
  ✅ Retry button provided
  ✅ User can retry action
```

**Test Case 11.1.2: Server Error (500)**
```
Expected:
  ✅ Friendly error message: "Terjadi kesalahan di server"
  ✅ Not technical error code
  ✅ Suggest refresh or contact support
```

**Test Case 11.1.3: No Internet Connection**
```
Steps:
  1. Go offline (DevTools or airplane mode)
  2. Try action
Expected:
  ✅ Error: "Tidak terhubung internet"
  ✅ Suggest check connection
  ✅ Retry when online
```

---

### 11.2 Input Validation Errors

**Test Case 11.2.1: XSS Prevention**
```
Steps:
  1. Try inject: <script>alert('XSS')</script>
  2. In any input field
Expected:
  ✅ Script not executed
  ✅ Treated as plain text
  ✅ Escaped in display
```

**Test Case 11.2.2: SQL Injection Prevention**
```
Steps:
  1. Try inject: '; DROP TABLE users; --
  2. In search field
Expected:
  ✅ Treated as search term
  ✅ No database affected
  ✅ Returns no results
```

---

---

## 📋 PART 2: UI/UX TESTING CHECKLIST

---

## 1. VISUAL DESIGN & STYLING

### 1.1 Colors

**Test Case 1.1.1: Color Consistency**
```
Check:
  ✅ Primary color (Orange): Consistent across all pages
  ✅ Buttons: Same shade (not varying)
  ✅ Text colors: Readable contrast
  ✅ Backgrounds: Consistent pattern
  ✅ Icons: Consistent color usage
```

**Test Case 1.1.2: Dark Mode (if applicable)**
```
Expected:
  ✅ Theme toggle works
  ✅ All colors adapt
  ✅ Text still readable
  ✅ No white text on white
```

---

### 1.2 Typography

**Test Case 1.2.1: Font Sizes**
```
Check:
  ✅ Headings: Larger than body text
  ✅ Body text: 16px minimum (readable)
  ✅ Captions: Smaller, but still readable
  ✅ Hierarchy clear
```

**Test Case 1.2.2: Font Weight**
```
Check:
  ✅ Headings: Bold (700)
  ✅ Body: Regular (400)
  ✅ Emphasis: Medium (500)
  ✅ No more than 3 weights used
```

**Test Case 1.2.3: Line Spacing**
```
Check:
  ✅ Headings: Tight (1.2)
  ✅ Body text: Loose (1.6)
  ✅ Not cramped
  ✅ Easy to read long text
```

---

## 2. LAYOUT & SPACING

### 2.1 Responsive Design

**Test Case 2.1.1: Mobile (375px)**
```
Device: iPhone SE
Steps:
  1. Visit each page
Expected:
  ✅ Content fits screen
  ✅ No horizontal scroll
  ✅ Readable without zoom
  ✅ Touch targets ≥ 44px
```

**Test Case 2.1.2: Tablet (768px)**
```
Device: iPad
Steps:
  1. Visit each page
Expected:
  ✅ Layout adapts well
  ✅ 2-column grid where appropriate
  ✅ Sidebar visible or hamburger menu
```

**Test Case 2.1.3: Desktop (1920px)**
```
Device: Desktop
Expected:
  ✅ Full layout visible
  ✅ Max-width respected (not too wide)
  ✅ Content centered
  ✅ Sidebar + main content visible
```

---

### 2.2 Whitespace

**Test Case 2.2.1: Padding Consistency**
```
Check:
  ✅ Card padding: Consistent (16px, 24px)
  ✅ Section padding: Consistent
  ✅ Not too cramped
  ✅ Breathing room around text
```

**Test Case 2.2.2: Gap Between Elements**
```
Check:
  ✅ Between cards: Consistent gap
  ✅ Between sections: Larger gap
  ✅ Visual rhythm present
```

---

## 3. COMPONENTS

### 3.1 Buttons

**Test Case 3.1.1: Button Appearance**
```
Check:
  ✅ Primary buttons: Orange gradient
  ✅ Secondary buttons: Gray
  ✅ Text buttons: Clear
  ✅ Button height: ≥ 44px
  ✅ Text inside: Centered
```

**Test Case 3.1.2: Button States**
```
Check:
  ✅ Normal state: Clear appearance
  ✅ Hover state: Color change or shadow
  ✅ Active/Click: Feedback (scale down)
  ✅ Disabled state: Grayed out
  ✅ Loading state: Spinner visible
```

**Test Case 3.1.3: Button Text**
```
Check:
  ✅ Clear action (e.g., "Pilih Karir", not "Submit")
  ✅ Indonesian language
  ✅ Consistent across site
  ✅ Icon + text if icon used
```

---

### 3.2 Cards

**Test Case 3.2.1: Card Design**
```
Check:
  ✅ White background with subtle shadow
  ✅ Rounded corners (8px, 12px, 16px)
  ✅ Content padded properly
  ✅ Consistent border/shadow
```

**Test Case 3.2.2: Card Hover Effect**
```
Check:
  ✅ Shadow increased on hover
  ✅ Subtle color change
  ✅ Cursor pointer
  ✅ Smooth transition (200-300ms)
```

**Test Case 3.2.3: Card Content Layout**
```
Check:
  ✅ Icon/image at top
  ✅ Title below image
  ✅ Description below title
  ✅ CTA button at bottom
  ✅ Good alignment
```

---

### 3.3 Forms

**Test Case 3.3.1: Form Input Styling**
```
Check:
  ✅ Input field visible
  ✅ Placeholder text clear
  ✅ Label above input
  ✅ Border visible (not invisible)
  ✅ Focus state clear (blue outline)
```

**Test Case 3.3.2: Form Validation Messages**
```
Check:
  ✅ Error message red
  ✅ Error message visible
  ✅ Input field highlighted
  ✅ Success message green
```

**Test Case 3.3.3: Form Layout**
```
Check:
  ✅ Inputs aligned vertically
  ✅ Good spacing between inputs
  ✅ Submit button clearly visible
  ✅ Not too wide (readable labels)
```

---

### 3.4 Navigation

**Test Case 3.4.1: Navbar Appearance**
```
Check:
  ✅ Logo visible
  ✅ Nav items aligned horizontally
  ✅ User avatar present
  ✅ Not cluttered
  ✅ Good contrast
```

**Test Case 3.4.2: Active Page Indicator**
```
Check:
  ✅ Current page link highlighted
  ✅ Obvious which page you're on
  ✅ Underline or background color
```

**Test Case 3.4.3: Mobile Menu**
```
Check (on mobile):
  ✅ Hamburger icon visible
  ✅ Menu opens on click
  ✅ All nav items in menu
  ✅ Can close menu
```

---

## 4. INTERACTIONS & ANIMATIONS

### 4.1 Hover Effects

**Test Case 4.1.1: Button Hover**
```
Check:
  ✅ Hover state obvious
  ✅ Color change or shadow
  ✅ Cursor changes to pointer
  ✅ Smooth transition (not jerky)
```

**Test Case 4.1.2: Card Hover**
```
Check:
  ✅ Shadow increases
  ✅ Slight scale or lift effect
  ✅ Smooth animation
```

**Test Case 4.1.3: Link Hover**
```
Check:
  ✅ Underline appears or color changes
  ✅ Cursor changes
```

---

### 4.2 Click/Active States

**Test Case 4.2.1: Button Click Feedback**
```
Check:
  ✅ Button scales down (active:scale-95)
  ✅ Visual feedback immediate
  ✅ Feels responsive
```

**Test Case 4.2.2: Checkbox/Radio Selection**
```
Check:
  ✅ Selected state obvious
  ✅ Checkmark or radio dot visible
  ✅ Color indicates selection
```

---

### 4.3 Loading States

**Test Case 4.3.1: Loading Spinner**
```
Check:
  ✅ Spinner visible when loading
  ✅ Clear spinning animation
  ✅ Positioned clearly
  ✅ No layout shift
```

**Test Case 4.3.2: Skeleton Loading**
```
Check:
  ✅ Skeleton matches content shape
  ✅ Animation smooth
  ✅ Prevents layout shift
```

---

### 4.4 Page Transitions

**Test Case 4.4.1: Page Change Animation**
```
Steps:
  1. Navigate between pages
Expected:
  ✅ Smooth transition
  ✅ No jarring change
  ✅ Quick (not too slow)
```

---

## 5. ACCESSIBILITY

### 5.1 Keyboard Navigation

**Test Case 5.1.1: Tab Navigation**
```
Steps:
  1. Press Tab repeatedly
Expected:
  ✅ Focus moves between interactive elements
  ✅ Focus order logical (left to right, top to bottom)
  ✅ No focus trap
```

**Test Case 5.1.2: Enter/Space Activation**
```
Steps:
  1. Tab to button
  2. Press Enter
Expected:
  ✅ Button activates
  ✅ Same as mouse click
```

**Test Case 5.1.3: Escape Key**
```
Steps:
  1. Open modal/menu
  2. Press Escape
Expected:
  ✅ Modal/menu closes
```

---

### 5.2 Focus Indicators

**Test Case 5.2.1: Visible Focus**
```
Check:
  ✅ Focus ring visible (blue outline)
  ✅ Clear where focus is
  ✅ Not too subtle
```

**Test Case 5.2.2: Focus Color Contrast**
```
Check:
  ✅ Focus outline visible on all colors
  ✅ Sufficient contrast
```

---

### 5.3 Color Contrast

**Test Case 5.3.1: Text Contrast**
```
Check:
  ✅ Black text on white: Pass (high contrast)
  ✅ Gray text on white: Check ratio (≥4.5:1)
  ✅ White text on dark: Check ratio
```

**Test Case 5.3.2: Status Indicators**
```
Check:
  ✅ Status not indicated by color alone
  ✅ Use icon + color (e.g., ✅ + green)
```

---

### 5.4 Screen Reader Testing

**Test Case 5.4.1: Page Structure**
```
Using: NVDA or VoiceOver
Check:
  ✅ Headings announced in order (H1, H2, H3)
  ✅ Lists announced as lists
  ✅ Buttons announced as buttons
  ✅ Form labels associated with inputs
```

**Test Case 5.4.2: Link Text**
```
Check:
  ✅ Links have descriptive text (not "click here")
  ✅ Same as visual text
```

**Test Case 5.4.3: Images & Icons**
```
Check:
  ✅ Decorative images have alt=""
  ✅ Important images have descriptive alt text
  ✅ Icons have ARIA labels
```

---

## 6. IMAGE & MEDIA

### 6.1 Images

**Test Case 6.1.1: Image Loading**
```
Check:
  ✅ Images load properly
  ✅ No broken image icons
  ✅ Proper aspect ratio
  ✅ Not pixelated/stretched
```

**Test Case 6.1.2: Image Optimization**
```
Check:
  ✅ Images not oversized
  ✅ Proper format (WebP, JPEG, PNG)
  ✅ Load time acceptable
```

**Test Case 6.1.3: Responsive Images**
```
Check:
  ✅ Images scale on mobile
  ✅ Not too small on mobile
  ✅ Not too large on desktop
```

---

### 6.2 Icons

**Test Case 6.2.1: Icon Visibility**
```
Check:
  ✅ Icons clear and visible
  ✅ Consistent style
  ✅ Appropriate size (≥20px)
```

**Test Case 6.2.2: Icon Meaning**
```
Check:
  ✅ Icons are intuitive
  ✅ Matches expected use
  ✅ Label provided if unclear
```

---

## 7. BROWSER COMPATIBILITY

### 7.1 Desktop Browsers

**Test Case 7.1.1: Chrome (Latest)**
```
Check:
  ✅ All features work
  ✅ Layout correct
  ✅ No console errors
```

**Test Case 7.1.2: Firefox (Latest)**
```
Check:
  ✅ All features work
  ✅ Styling correct
```

**Test Case 7.1.3: Safari (Latest)**
```
Check:
  ✅ All features work
  ✅ Gradients render correctly
  ✅ Animations smooth
```

**Test Case 7.1.4: Edge (Latest)**
```
Check:
  ✅ All features work
```

---

### 7.2 Mobile Browsers

**Test Case 7.2.1: Mobile Chrome**
```
Check:
  ✅ Works on Android
  ✅ Layout responsive
```

**Test Case 7.2.2: Mobile Safari**
```
Check:
  ✅ Works on iOS
  ✅ Safe area respected
```

---

## 8. PERFORMANCE VISUAL

### 8.1 Page Load Speed

**Test Case 8.1.1: First Contentful Paint (FCP)**
```
Expected:
  ✅ FCP < 1.8 seconds (good)
  ✅ Hero content visible quickly
```

**Test Case 8.1.2: Largest Contentful Paint (LCP)**
```
Expected:
  ✅ LCP < 2.5 seconds (good)
  ✅ Main content visible
```

---

### 8.2 Smooth Scrolling

**Test Case 8.2.1: Scroll Performance**
```
Steps:
  1. Scroll down page
Expected:
  ✅ Smooth 60 FPS scroll
  ✅ No jank or stuttering
```

---

### 8.3 Animations Performance

**Test Case 8.3.1: Animation Smoothness**
```
Check:
  ✅ Hover animations smooth
  ✅ No lag on low-end devices
  ✅ Animations use GPU (transform, opacity)
```

---

## 9. ERROR STATES & EMPTY STATES

### 9.1 Error Messages

**Test Case 9.1.1: Error Message Display**
```
Check:
  ✅ Error message visible
  ✅ Red color for error
  ✅ Clear explanation
  ✅ Not too technical
```

**Test Case 9.1.2: Error Recovery**
```
Check:
  ✅ Button to retry/dismiss
  ✅ Form doesn't reset unnecessarily
```

---

### 9.2 Empty States

**Test Case 9.2.1: Empty State UI**
```
Check:
  ✅ Empty state icon/illustration
  ✅ Helpful message
  ✅ CTA to create first item
  ✅ Not confusing
```

---

## 10. CONSISTENCY

### 10.1 Visual Consistency

**Test Case 10.1.1: Design System Adherence**
```
Check across all pages:
  ✅ Button styles same
  ✅ Card styles same
  ✅ Typography consistent
  ✅ Spacing patterns follow grid
  ✅ Colors match palette
```

**Test Case 10.1.2: Component Reusability**
```
Check:
  ✅ Same component used throughout
  ✅ Not duplicated designs
  ✅ Updates propagate everywhere
```

---

### 10.2 Language Consistency

**Test Case 10.2.1: Indonesian Language**
```
Check:
  ✅ All text in Indonesian
  ✅ Spelling correct
  ✅ Grammar correct
  ✅ Formal tone (not casual)
```

**Test Case 10.2.2: Terminology Consistency**
```
Check:
  ✅ Same terms used everywhere
  ✅ Not mixing "Profesi" and "Karir" inconsistently
  ✅ Button labels consistent
```

---

---

## 📋 TESTING EXECUTION PLAN

### Week 1: Functional Testing

```
Day 1-2: Authentication (Sign up, Login, Password Reset)
Day 3: Onboarding (All steps)
Day 4: Explore Careers (Search, Filter, Select)
Day 5: Skill Paths (View, Complete, Chat)
Day 6: Discover Yourself (Quiz, Results)
Day 7: Learning Journey, Projects, Profile (Basic tests)
```

### Week 2: Advanced Functional + Error Testing

```
Day 8-9: Edge cases & error scenarios
Day 10: Data persistence & sync
Day 11: Navigation & user flows
Day 12: Rate limiting & security
Day 13-14: Full integration testing
```

### Week 3: UI/UX Testing

```
Day 15-16: Visual design & colors
Day 17: Responsive design (mobile, tablet, desktop)
Day 18: Components (buttons, cards, forms)
Day 19: Interactions & animations
Day 20: Accessibility testing
Day 21: Browser compatibility
```

### Week 4: Final Testing & Fixes

```
Day 22-23: Performance & optimization
Day 24-25: Consistency audit
Day 26-27: Final regression testing
Day 28: Sign-off & deployment readiness
```

---

## 🎯 QA SIGN-OFF CHECKLIST

### Critical Issues (Blocking Release):
- [ ] All login/auth flows work
- [ ] No server errors (500)
- [ ] All main features functional
- [ ] No data loss
- [ ] Security validated
- [ ] Lighthouse Performance ≥ 90
- [ ] No critical accessibility violations

### Major Issues (Should Fix):
- [ ] Form validation working
- [ ] Error messages clear
- [ ] Loading states visible
- [ ] Mobile responsive
- [ ] Colors consistent
- [ ] Typography readable

### Minor Issues (Nice to Have):
- [ ] Micro-interactions smooth
- [ ] Empty states designed
- [ ] Animation performance
- [ ] Browser compatibility (older versions)

---

## 🔍 BUG REPORT TEMPLATE

```markdown
## Bug Title
[Clear, concise title]

## Environment
- Device: iPhone 12 / Desktop
- Browser: Chrome 120
- OS: iOS 17 / Windows 11

## Steps to Reproduce
1. Go to /explore
2. Click "Data Scientist"
3. Scroll down

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happened]

## Screenshots/Video
[Attach evidence]

## Severity
- Critical (Blocking)
- Major (Should fix)
- Minor (Nice to have)
```

---

**Ready to start QA testing?** Use this checklist and templates! 🚀

