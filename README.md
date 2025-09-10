# Task Management Dashboard

A modern, full-stack task management application built with **Next.js 15**, **TypeScript**, **Prisma**, **PostgreSQL**, and **shadcn/ui** components.

## ✨ Features

### Frontend
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🎨 Modern UI** - Clean, professional interface using shadcn/ui components
- **⚡ Server-Side Rendering** - Fast initial page loads with SSR data fetching
- **🔍 Real-time Filtering** - Filter tasks by status and priority
- **📊 Statistics Dashboard** - Visual overview of task completion and progress
- **✅ Task Management** - Create, update, complete, and delete tasks
- **🎯 Priority Levels** - Organize tasks by Low, Medium, and High priority
- **📅 Task Tracking** - View creation dates and track progress

### Backend API
- **🚀 REST API** - Full CRUD operations for task management
- **🔒 Type Safety** - Complete TypeScript implementation
- **✅ Request Validation** - Zod schema validation for all inputs
- **🗄️ Database Integration** - Prisma ORM with PostgreSQL
- **📈 Statistics Endpoint** - Comprehensive task analytics
- **🛡️ Error Handling** - Robust error handling with proper HTTP status codes

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database connection:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/taskdashboard"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── api/tasks/           # API endpoints
│   │   ├── route.ts         # GET /api/tasks, POST /api/tasks
│   │   ├── [id]/route.ts    # GET, PUT, DELETE /api/tasks/[id]
│   │   └── stats/route.ts   # GET /api/tasks/stats
│   ├── globals.css          # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main dashboard page (SSR)
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── AddTaskDialog.tsx   # New task creation modal
│   ├── StatsCards.tsx      # Statistics display cards
│   ├── TaskCard.tsx        # Individual task component
│   └── TaskFilters.tsx     # Filter controls
├── lib/
│   ├── api.ts              # Client-side API functions
│   └── utils.ts            # Utility functions
└── types/
    └── api.ts              # TypeScript type definitions
```

## 🔌 API Endpoints

### Tasks
- `GET /api/tasks` - Retrieve all tasks (with optional filtering)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Get a specific task
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### Statistics
- `GET /api/tasks/stats` - Get task statistics and analytics

For detailed API documentation, see the inline comments in the API route files.

## 🎨 UI Components

The application uses **shadcn/ui** components for a consistent, accessible interface:

- **Cards** - Task containers and stat displays
- **Dialogs** - Modal forms for task creation
- **Forms** - Input handling with validation
- **Badges** - Priority and status indicators
- **Buttons** - Interactive elements
- **Dropdowns** - Action menus and filters
- **Checkboxes** - Task completion toggles

## 🧪 Testing Strategy

### Recommended Test Plan

1. **Unit Tests**
   - API endpoint validation
   - Component rendering
   - Utility function logic

2. **Integration Tests**
   - Database operations
   - API route workflows
   - Form submissions

3. **E2E Tests**
   - Task creation flow
   - Status updates
   - Filtering functionality
   - Responsive design

### Test Implementation
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test
```

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma generate  # Regenerate Prisma client
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Docker
```bash
docker-compose up --build
```

## 🤖 AI Usage & Development Approach

This project was developed with AI assistance for:
- **Architecture Planning** - Overall structure and best practices
- **Component Design** - UI component implementation
- **API Development** - REST endpoint creation
- **Type Safety** - TypeScript interface definitions

**Human oversight included:**
- Code review and optimization
- Design decisions and UX considerations
- Error handling improvements
- Performance optimizations

## 🎯 Key Design Decisions

1. **SSR for Performance** - Server-side rendering for faster initial loads
2. **Type Safety First** - Complete TypeScript implementation
3. **Component Composition** - Reusable, modular components
4. **Responsive Design** - Mobile-first approach
5. **Accessibility** - ARIA labels and keyboard navigation
6. **Error Boundaries** - Graceful error handling

## 📈 Performance Considerations

- **Server-Side Rendering** - Initial page load optimization
- **Database Indexing** - Optimized queries with Prisma
- **Component Lazy Loading** - Reduced bundle size
- **Image Optimization** - Next.js automatic optimization
- **Caching Strategy** - API response caching

## 🔒 Security Features

- **Input Validation** - Zod schema validation
- **SQL Injection Prevention** - Prisma ORM protection
- **Type Safety** - Runtime type checking
- **Error Sanitization** - Safe error messages
