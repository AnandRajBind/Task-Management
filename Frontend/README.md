# Task Management System - Frontend

Modern, responsive frontend built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── layout.tsx        # Dashboard layout with navbar
│   │   │   └── page.tsx          # Main dashboard with task list
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── register/
│   │   │   └── page.tsx          # Registration page
│   │   ├── layout.tsx            # Root layout with AuthProvider
│   │   ├── page.tsx              # Home/landing page
│   │   └── globals.css           # Global styles and Tailwind
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── ProtectedRoute.tsx   # Route protection wrapper
│   │   ├── TaskCard.tsx          # Individual task card
│   │   └── TaskModal.tsx         # Create/Edit task modal
│   ├── context/
│   │   └── AuthContext.tsx       # Authentication state management
│   ├── lib/
│   │   └── apiClient.ts          # Axios instance with interceptors
│   ├── services/
│   │   ├── auth.service.ts       # Authentication API calls
│   │   └── task.service.ts       # Task API calls
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── public/                       # Static assets
├── .env.example                  # Environment variables template
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Install dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## ✨ Features

### Authentication
- ✅ User registration with validation
- ✅ Login with email/password
- ✅ JWT access token (auto-refresh)
- ✅ JWT refresh token (7 days)
- ✅ Protected routes (auto-redirect)
- ✅ Logout functionality

### Task Management
- ✅ Create new tasks
- ✅ View all tasks with pagination
- ✅ Edit existing tasks
- ✅ Delete tasks (with confirmation)
- ✅ Toggle task status (Pending → In Progress → Completed)
- ✅ Search tasks by title
- ✅ Filter tasks by status
- ✅ Real-time updates

### UI/UX
- ✅ Clean, modern design
- ✅ Responsive layout (mobile-friendly)
- ✅ Loading states
- ✅ Toast notifications
- ✅ Form validation
- ✅ Smooth transitions

## 🎨 Pages

### Home Page (`/`)
- Landing page with features overview
- Redirects to dashboard if authenticated
- Links to login/register

### Login Page (`/login`)
- Email/password form
- Validation feedback
- Link to registration
- Auto-redirect after success

### Register Page (`/register`)
- Name, email, password form
- Password length validation
- Link to login
- Auto-redirect after success

### Dashboard (`/dashboard`)
- Protected route (requires auth)
- Task list with CRUD operations
- Search and filter functionality
- Pagination controls
- Create/edit task modal

## 🔐 Authentication Flow

```
1. User logs in → Receive tokens
2. Store tokens in localStorage
3. Add token to API requests (interceptor)
4. Token expires → Auto-refresh using refresh token
5. Refresh fails → Redirect to login
6. User logs out → Clear tokens → Redirect to login
```

## 📡 API Integration

### API Client (`apiClient.ts`)
- Axios instance with base URL
- Request interceptor (adds auth token)
- Response interceptor (handles token refresh)
- Automatic retry on 401 errors

### Services

**Auth Service:**
- `register(data)` - Register new user
- `login(data)` - Login user
- `refresh(token)` - Refresh access token
- `logout(token)` - Logout user

**Task Service:**
- `getTasks(page, limit, status, search)` - Get paginated tasks
- `getTaskById(id)` - Get single task
- `createTask(data)` - Create new task
- `updateTask(id, data)` - Update task
- `deleteTask(id)` - Delete task
- `toggleTaskStatus(id)` - Toggle task status

## 🎯 State Management

### AuthContext
- Global authentication state
- User data management
- Login/register/logout functions
- Auto-load user from localStorage

### Local State
- Task list state (dashboard)
- Form state (login, register, task modal)
- Loading states
- Pagination state

## 🎨 Styling

### Tailwind CSS
- Utility-first approach
- Custom color palette (primary blue)
- Responsive design utilities
- Custom component classes

### Custom Components (globals.css)
- `.btn` - Base button styles
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary button
- `.btn-danger` - Danger/delete button
- `.input` - Form input styles
- `.card` - Card container

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`, `xl`
- Stacked layout on mobile
- Grid layout on desktop
- Touch-friendly buttons

## 🔒 Protected Routes

```typescript
// Wrap protected pages
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

Features:
- Check authentication status
- Show loading spinner
- Auto-redirect to login
- Prevent unauthorized access

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 📦 Dependencies

### Core
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety

### HTTP & State
- `axios` - HTTP client
- React Context API - State management

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `react-hot-toast` - Toast notifications
- `next/font` - Font optimization

## 🎯 Key Components

### Navbar
- User avatar with initial
- User name display
- Logout button

### TaskCard
- Task title and description
- Status badge with color coding
- Edit, delete, toggle buttons
- Created date display

### TaskModal
- Create/edit form
- Title, description, status fields
- Form validation
- Loading state

### ProtectedRoute
- Authentication check
- Loading spinner
- Auto-redirect
- Children rendering

## 🔄 Token Refresh Flow

```typescript
1. API call fails with 401
2. Interceptor catches error
3. Check if refresh token exists
4. Call /auth/refresh endpoint
5. Store new tokens
6. Retry original request
7. If refresh fails → logout
```

## 📝 Type Safety

All API responses and data structures are typed:
- `User` - User data
- `Task` - Task object
- `AuthResponse` - Login/register response
- `TasksResponse` - Tasks list response
- `TaskStatus` - Enum for task status

## 🚀 Production Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
   ```

3. **Start production server**
   ```bash
   npm start
   ```

4. **Deploy to:**
   - Vercel (recommended)
   - Netlify
   - AWS Amplify
   - Any Node.js hosting

## 🎨 Color Scheme

```
Primary Blue:
- 50:  #eff6ff
- 600: #2563eb (main)
- 700: #1d4ed8 (hover)

Status Colors:
- Pending:     Yellow (#fef3c7 / #f59e0b)
- In Progress: Blue (#dbeafe / #3b82f6)
- Completed:   Green (#d1fae5 / #10b981)
```

## 🔧 Customization

### Change API URL
Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://your-api-url/api
```

### Change Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Add New Pages
1. Create folder in `src/app/`
2. Add `page.tsx` file
3. Next.js auto-routes based on folder structure

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 🤝 Integration with Backend

Ensure backend is running and configured correctly:
- Backend URL: `http://localhost:5000`
- CORS enabled for frontend origin
- All API endpoints match the service calls

## ✅ Testing Checklist

- [ ] Registration works
- [ ] Login works
- [ ] Token stored in localStorage
- [ ] Dashboard loads tasks
- [ ] Create task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Toggle status works
- [ ] Search works
- [ ] Filter works
- [ ] Pagination works
- [ ] Logout works
- [ ] Auto-redirect on token expiry
- [ ] Toast notifications appear

---

Built with ❤️ using Next.js 14, TypeScript, Tailwind CSS, and Axios
