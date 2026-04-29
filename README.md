# SkillPath A.I.

SkillPath A.I. is a personalized career learning platform powered by Artificial Intelligence. It generates customized learning roadmaps, daily actionable tasks, and provides an integrated AI consultant to guide users through their chosen tech career journeys.

## Overview

Traditional learning paths are often rigid and one-size-fits-all. SkillPath A.I. solves this by leveraging generative AI (via Groq and Llama models) to dynamically create learning roadmaps based on a user's specific background, interests, and target career. 

Users can explore different tech roles, receive AI-driven recommendations, and commit to a learning journey complete with estimated hours, prerequisites, and a gamified task tracker.

## Key Features

*   **AI Career Recommender**: Assesses a user's background (education, interests) and suggests the most compatible tech roles with detailed reasoning and match scores.
*   **Dynamic Skill Roadmaps**: Generates a comprehensive, node-based skill tree tailored to the user's target career, detailing prerequisites and time estimations for each learning phase.
*   **Daily Learning Journeys**: Breaks down the overarching roadmap into manageable, daily tasks to build learning habits and maintain streaks.
*   **Project Evaluation**: Allows users to submit their portfolio projects for AI analysis, receiving automated scoring, feedback, and skill validations.
*   **Integrated AI Consultant**: A dedicated, context-aware chatbot that uses Markdown formatting to assist users with technical questions and guidance throughout their roadmap.
*   **Gamified Progression**: Tracks user experience points (XP), levels, streaks, and completed tasks to encourage consistent learning.

## Technology Stack

### Frontend
*   **Framework**: Next.js 16.1.6 (App Router)
*   **UI Library**: React 19.2.3
*   **Language**: TypeScript 5
*   **Styling**: Tailwind CSS 4 via `@tailwindcss/postcss`
*   **Components**: shadcn/ui 4 (`radix-nova`, Radix base, Lucide icons)
*   **Animations**: Motion / Framer Motion
*   **Markdown Parsing**: react-markdown, remark-gfm

### Backend & AI
*   **Database & Auth**: Firebase 12 (Firestore, Firebase Authentication)
*   **AI Inference**: Groq API and Groq SDK (Llama 3.x models)
*   **API Routes**: Next.js Serverless Functions

### Testing & Tooling
*   **Unit/Component Tests**: Jest 30, Testing Library
*   **E2E Tests**: Playwright
*   **Linting**: ESLint 9 with Next.js config
*   **Package Manager**: npm

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
*   Node.js (v20 recommended for the current Next.js 16 / React 19 stack)
*   npm

### Environment Setup

1.  Clone the repository to your local machine.
2.  Duplicate the `.env.example` file and rename it to `.env.local`.
3.  Fill in the required environment variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Groq AI Configuration
GROQ_API_KEY=your_groq_api_key
```

### Installation & Execution

1.  Install the project dependencies:
```bash
npm install
```

2.  Start the development server:
```bash
npm run dev
```

3.  Open `http://localhost:3000` in your browser to view the application.

## Project Structure

*   `/app`: Contains Next.js App Router pages (Home, Profile, Paths, Journey, Projects, Discover) and backend API endpoints (`/app/api`).
*   `/components`: Reusable UI components including layout elements, shadcn/ui primitives, and page sections.
*   `/context`: React contexts, notably the AuthContext for managing Firebase user sessions.
*   `/lib`: Utility functions, Firestore CRUD operations (`firestore.ts`), and static databases.

## Design Philosophy

The application interface is designed with a "Sunset Horizon Warm Glassmorphism" aesthetic. It utilizes a light theme characterized by subtle amber and orange gradients, frosted glass effects (backdrop-blur), asymmetrical card layouts, and refined typography to provide a premium, modern, and engaging user experience that avoids looking heavily "AI-generated".

## License

This project is licensed under the MIT License.
