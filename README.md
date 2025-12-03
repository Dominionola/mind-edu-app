# MindEdu Hub 🧠

A modern, interactive mental health education platform designed for youth. MindEdu Hub provides evidence-based mental health content through engaging learning modules, interactive quizzes, and practical coping tools in a safe, private environment.

![Next.js](https://img.shields.io/badge/Next.js-16.0.6-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running Locally](#running-locally)
- [Usage Guide](#usage-guide)
- [API Routes](#api-routes)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**MindEdu Hub** is a comprehensive mental health education platform that addresses the growing need for accessible, youth-friendly mental health resources. The platform combines interactive learning with practical coping tools to help young people understand and manage their mental wellness.

### Why MindEdu Hub?

Mental health challenges among youth are at an all-time high, yet many young people lack access to quality mental health education. MindEdu Hub bridges this gap by providing:

- **Accessible Education**: Free, evidence-based mental health content available 24/7
- **Interactive Learning**: Engaging modules and quizzes that make learning enjoyable
- **Practical Tools**: Real coping strategies like guided breathing and journaling
- **Private & Safe**: A judgment-free space with complete privacy
- **Self-Paced**: Learn at your own speed without pressure

---

## ✨ Features

### 🎓 Interactive Learning Modules
- **Evidence-based content** on topics like depression, anxiety, stress management, and resilience
- **Rich media support** including text, images, and embedded videos
- **Progress tracking** with completion badges and statistics
- **Difficulty levels** (Beginner, Intermediate, Advanced) with color-coded badges
- **Estimated duration** for each module (15-25 minutes)
- **Sequential learning** with recommended next module navigation

### 📝 Knowledge Assessment Quizzes
- **Multiple-choice quizzes** linked to learning modules
- **Instant feedback** with detailed explanations for each answer
- **Progress indicators** showing current question and quick-jump navigation
- **Passing scores** with ability to retake unlimited times
- **Performance tracking** including average scores and quiz history
- **Results dashboard** with visual score display and personalized feedback

### 📊 Personal Dashboard
- **Real-time statistics**: Modules completed, quizzes passed, average scores, journal entries
- **Recent activity feed** showing latest achievements (modules, quizzes, journals)
- **Time-based activity** (e.g., "11 hours ago", "3 days ago")
- **Quick action buttons** for easy navigation to key features
- **Personalized welcome** message

### 🧘 Coping Tools

#### Guided Breathing Exercise
- **4-4-4 breathing technique** (Inhale 4s, Hold 4s, Exhale 4s)
- **Animated visual guide** with expanding/contracting circle
- **Audio cues** at phase transitions with mute option
- **Progress tracking** with cycle counter
- **Keyboard controls** (Space to start/pause, R to reset, M to mute)
- **Instructions modal** with technique benefits

#### Personal Journal
- **Private journaling** space (entries visible only to you)
- **Optional mood tracking** with 8 emoji-based mood indicators
- **Personalized writing prompts** based on:
  - Recent quiz performance
  - Mental health topics you're learning
  - General wellness themes
- **Recent entries sidebar** for easy access to past reflections
- **Character counter** for tracking entry length
- **Full CRUD operations** (Create, Read, Update, Delete)

### 🔐 Authentication System
- **Email/password registration** with secure authentication
- **Anonymous guest mode** for exploring content without signup
- **Protected routes** for dashboard and personal features
- **Session management** with automatic refresh
- **Seamless upgrade** from guest to authenticated user

### 🎨 User Experience
- **Responsive design** optimized for mobile, tablet, and desktop
- **Smooth animations** using Framer Motion
- **Calming color palette** designed for mental wellness
- **Accessibility features** including keyboard navigation and ARIA labels
- **Dark mode ready** (infrastructure in place)
- **Loading states** and error handling throughout

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.0.6](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: [Howler.js](https://howlerjs.com/)

### Backend & Database
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **ORM**: @supabase/supabase-js
- **Real-time**: Supabase Realtime (ready for future features)
- **Storage**: Supabase Storage (ready for user uploads)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript Compiler
- **Git Hooks**: (ready to add Husky)

---

## 📁 Project Structure

```
mind-edu-app/
├── app/                          # Next.js App Router (main application)
│   ├── api/                      # API Routes
│   │   ├── journal/              # Journal CRUD operations
│   │   ├── module-progress/      # Track module completion
│   │   ├── save-quiz-result/     # Save quiz scores
│   │   ├── seed-modules/         # Populate sample modules
│   │   └── seed-quizzes/         # Populate sample quizzes
│   ├── auth/                     # Authentication pages
│   │   ├── login/page.tsx        # Login page
│   │   └── signup/page.tsx       # Registration page
│   ├── coping/                   # Coping tools section
│   │   ├── breathing/page.tsx    # 4-4-4 breathing exercise
│   │   ├── journal/page.tsx      # Personal journaling
│   │   └── page.tsx              # Coping tools overview
│   ├── dashboard/                # User dashboard
│   │   ├── layout.tsx            # Dashboard layout
│   │   └── page.tsx              # Dashboard with stats & activity
│   ├── modules/                  # Learning modules
│   │   ├── [id]/page.tsx         # Individual module page
│   │   ├── layout.tsx            # Modules layout with sidebar
│   │   └── page.tsx              # Modules overview page
│   ├── quizzes/                  # Knowledge quizzes
│   │   ├── [id]/page.tsx         # Individual quiz page
│   │   ├── layout.tsx            # Quizzes layout with sidebar
│   │   └── page.tsx              # Quizzes overview page
│   ├── favicon.ico               # App favicon
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   ├── input.tsx             # Input component
│   │   ├── label.tsx             # Label component
│   │   └── textarea.tsx          # Textarea component
│   ├── Header.tsx                # Navigation header
│   ├── LayoutWrapper.tsx         # Conditional layout wrapper
│   ├── ModuleCard.tsx            # Module display card
│   ├── QuizCard.tsx              # Quiz display card
│   └── QuizResults.tsx           # Quiz results component
├── contexts/                     # React Context providers
│   └── AuthContext.tsx           # Global authentication state
├── lib/                          # Utility libraries
│   ├── journalPrompts.ts         # Personalized prompt generator
│   ├── markdownParser.ts         # Markdown to HTML converter
│   ├── seedModules.ts            # Sample module data
│   ├── seedQuizzes.ts            # Sample quiz data
│   ├── storageUtils.ts           # Local storage utilities
│   ├── supabaseClient.ts         # Client-side Supabase client
│   ├── supabase-server.ts        # Server-side Supabase client
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # General utility functions
├── docs/                         # Documentation
│   └── PROJECT_DESCRIPTION.md    # Detailed project description
├── .env.local                    # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── components.json               # shadcn/ui configuration
├── middleware.ts                 # Next.js middleware for auth
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # This file
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**
- **Git** - [Download](https://git-scm.com/)
- **Supabase Account** (free tier) - [Sign up](https://supabase.com/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/mind-edu-app.git
cd mind-edu-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables** (see [Environment Setup](#environment-setup))

4. **Set up Supabase database** (see [Database Setup](#database-setup))

5. **Run the development server** (see [Running Locally](#running-locally))

---

## 🔐 Environment Setup

### Create `.env.local` file

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Getting Supabase Credentials

1. **Create a Supabase project**:
   - Go to [Supabase Dashboard](https://app.supabase.com/)
   - Click "New Project"
   - Fill in project details and create

2. **Get your credentials**:
   - Navigate to **Project Settings** > **API**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Paste credentials** into your `.env.local` file

---

## 🗄️ Database Setup

### Step 1: Create Database Tables

In your Supabase project, go to **SQL Editor** and run the following SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Modules table
CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    content JSONB NOT NULL,
    order INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quizzes table
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic TEXT NOT NULL,
    module_id UUID REFERENCES modules(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    questions JSONB NOT NULL,
    passing_score INTEGER DEFAULT 60,
    difficulty TEXT DEFAULT 'Beginner',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, module_id)
);

-- User results table
CREATE TABLE user_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    answers JSONB,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Journals table
CREATE TABLE journals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    mood TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_modules_order ON modules(order);
CREATE INDEX idx_modules_published ON modules(is_published);
CREATE INDEX idx_quizzes_module ON quizzes(module_id);
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_user_progress_module ON user_progress(module_id);
CREATE INDEX idx_user_results_user ON user_results(user_id);
CREATE INDEX idx_user_results_quiz ON user_results(quiz_id);
CREATE INDEX idx_journals_user ON journals(user_id);
CREATE INDEX idx_journals_created ON journals(created_at DESC);
```

### Step 2: Enable Row Level Security (RLS)

Run this SQL to set up security policies:

```sql
-- Enable RLS
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Modules: Public read access
CREATE POLICY "Modules are viewable by everyone"
    ON modules FOR SELECT
    USING (is_published = true);

-- Quizzes: Public read access
CREATE POLICY "Quizzes are viewable by everyone"
    ON quizzes FOR SELECT
    USING (true);

-- User Progress: Users can only access their own
CREATE POLICY "Users can view their own progress"
    ON user_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
    ON user_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
    ON user_progress FOR UPDATE
    USING (auth.uid() = user_id);

-- User Results: Users can only access their own
CREATE POLICY "Users can view their own results"
    ON user_results FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
    ON user_results FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Journals: Private to each user
CREATE POLICY "Users can view their own journals"
    ON journals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journals"
    ON journals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journals"
    ON journals FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journals"
    ON journals FOR DELETE
    USING (auth.uid() = user_id);
```

### Step 3: Seed Sample Data

After the database is set up, seed sample modules and quizzes:

1. Start your development server:
```bash
npm run dev
```

2. Visit these URLs in your browser:
   - [http://localhost:3000/api/seed-modules](http://localhost:3000/api/seed-modules)
   - [http://localhost:3000/api/seed-quizzes](http://localhost:3000/api/seed-quizzes)

3. You should see success messages confirming the data was seeded.

---

## 💻 Running Locally

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build and run the production version:

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Linting

Check code quality:

```bash
npm run lint
```

---

## 📘 Usage Guide

### For First-Time Users

1. **Explore as Guest**:
   - Visit the home page
   - Browse modules and quizzes without signing up
   - Try the breathing exercise and coping tools

2. **Create an Account** (to save progress):
   - Click "Sign Up" in the header
   - Enter email and password
   - You'll be redirected to the dashboard

3. **Start Learning**:
   - Click "Modules" to browse learning content
   - Complete a module and mark it as done
   - Take the related quiz to test your knowledge

4. **Track Your Progress**:
   - View your dashboard for statistics
   - See recent activity and achievements
   - Monitor quiz scores and module completion

5. **Use Coping Tools**:
   - Try the 4-4-4 breathing exercise when stressed
   - Write in your private journal
   - Review past journal entries for reflection

### For Returning Users

- **Dashboard**: View your progress and recent activity
- **Modules**: Continue where you left off or start new modules
- **Quizzes**: Retake quizzes to improve your scores
- **Journal**: Write new entries or review past reflections
- **Breathing**: Use anytime for quick stress relief

---

## 🔌 API Routes

### Authentication
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/signup` - User registration
- **POST** `/api/auth/logout` - User logout

### Modules & Quizzes
- **GET** `/api/seed-modules` - Seed sample modules (development)
- **GET** `/api/seed-quizzes` - Seed sample quizzes (development)

### Progress Tracking
- **POST** `/api/module-progress` - Update module completion
- **POST** `/api/save-quiz-result` - Save quiz score

### Journaling
- **GET** `/api/journal` - Get user's journal entries
- **POST** `/api/journal` - Create new journal entry
- **PUT** `/api/journal` - Update journal entry
- **DELETE** `/api/journal` - Delete journal entry

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add environment variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **Deploy**:
   - Click "Deploy"
   - Your app will be live in minutes

### Other Platforms

- **Netlify**: Similar process to Vercel
- **Railway**: Supports Next.js with automatic builds
- **AWS Amplify**: Full-featured deployment with CI/CD

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Supabase** for the backend infrastructure
- **Radix UI** and **shadcn/ui** for accessible components
- **Tailwind CSS** for the utility-first styling
- Mental health professionals and researchers whose work informed the content

---

## 📞 Support

If you encounter any issues or have questions:

- **Open an Issue**: [GitHub Issues](https://github.com/yourusername/mind-edu-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mind-edu-app/discussions)
- **Email**: your.email@example.com

---

## 🌟 Roadmap

Future enhancements planned:

- [ ] Dark mode toggle
- [ ] Achievement badges and rewards system
- [ ] Daily check-in feature with mood tracking
- [ ] Community forum (moderated)
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] AI-powered personalized learning paths
- [ ] Integration with mental health crisis hotlines
- [ ] Therapist/counselor resources directory

---

**Built with ❤️ for mental health awareness and youth education.**
