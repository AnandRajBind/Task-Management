# Quick Setup Guide - Frontend

## Step-by-Step Instructions

### 1. Install Dependencies
```bash
cd Frontend
npm install
```

### 2. Setup Environment
```bash
# Copy example env file
cp .env.example .env.local

# Edit .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Make Sure Backend is Running
```bash
# Backend should be running on port 5000
# Check: http://localhost:5000/api/health
```

### 4. Start Development Server
```bash
npm run dev
```

Frontend will start at: `http://localhost:3000`

## 🎯 Test the Application

### 1. Home Page
- Open `http://localhost:3000`
- Should see landing page
- Click "Get Started Free" or "Sign In"

### 2. Register a User
- Go to Register page
- Fill in: Name, Email, Password
- Click "Create account"
- Should redirect to Dashboard

### 3. Create a Task
- Click "+ New Task" button
- Fill in: Title, Description, Status
- Click "Create"
- Task appears in the list

### 4. Test Task Operations
- **Edit:** Click green edit icon → Modify → Save
- **Toggle Status:** Click blue toggle icon
- **Delete:** Click red delete icon → Confirm

### 5. Test Filters
- **Search:** Type in search box
- **Filter:** Select status from dropdown
- **Pagination:** Use Previous/Next buttons

### 6. Test Auth
- Click "Logout"
- Should redirect to Login
- Login again with same credentials

## 📂 Project Structure Overview

```
src/
├── app/              # Next.js 14 App Router pages
├── components/       # Reusable React components
├── context/          # React Context (Auth)
├── lib/              # Utilities (API client)
├── services/         # API service layer
└── types/            # TypeScript types
```

## 🔑 Key Files

- `src/app/layout.tsx` - Root layout with AuthProvider
- `src/app/page.tsx` - Home/landing page
- `src/app/login/page.tsx` - Login page
- `src/app/register/page.tsx` - Register page
- `src/app/dashboard/page.tsx` - Main dashboard
- `src/context/AuthContext.tsx` - Auth state management
- `src/lib/apiClient.ts` - Axios with token refresh
- `src/services/auth.service.ts` - Auth API calls
- `src/services/task.service.ts` - Task API calls

## 🎨 Features Implemented

### Authentication
- ✅ Register new user
- ✅ Login with credentials
- ✅ JWT token storage
- ✅ Auto token refresh
- ✅ Protected routes
- ✅ Logout

### Tasks
- ✅ View all tasks
- ✅ Create task
- ✅ Edit task
- ✅ Delete task
- ✅ Toggle status
- ✅ Search by title
- ✅ Filter by status
- ✅ Pagination

### UI/UX
- ✅ Responsive design
- ✅ Toast notifications
- ✅ Loading states
- ✅ Form validation
- ✅ Modal dialogs

## 🐛 Common Issues

### Issue: Cannot connect to backend
**Solution:**
- Make sure backend is running on port 5000
- Check `.env.local` has correct API URL
- Verify CORS is enabled on backend

### Issue: Login/Register not working
**Solution:**
- Open browser console (F12)
- Check network tab for errors
- Verify backend API is responding
- Check credentials format

### Issue: Tasks not loading
**Solution:**
- Check if you're logged in
- Verify token is stored (localStorage)
- Check browser console for errors
- Test API endpoint: `GET http://localhost:5000/api/tasks`

### Issue: Port 3000 already in use
**Solution:**
- Change port: `npm run dev -- -p 3001`
- Or kill process using port 3000

## 🔄 How Token Refresh Works

1. Access token expires (15 min)
2. API call returns 401 error
3. Interceptor catches error
4. Sends refresh token to `/auth/refresh`
5. Gets new access + refresh tokens
6. Retries original request
7. If refresh fails → Logout

## 📱 Pages Overview

| Page | Route | Protected | Description |
|------|-------|-----------|-------------|
| Home | `/` | No | Landing page |
| Login | `/login` | No | Sign in form |
| Register | `/register` | No | Sign up form |
| Dashboard | `/dashboard` | Yes | Task management |

## 🎯 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP:** Axios
- **State:** React Context API
- **Notifications:** react-hot-toast

## 🚀 Next Steps

1. ✅ Backend is running
2. ✅ Frontend is running
3. 🎉 Test all features
4. 📝 Customize as needed
5. 🚀 Deploy to production

## 📦 Production Build

```bash
# Build
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Production
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

## 🔗 API Endpoints Used

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:id
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
PATCH  /api/tasks/:id/toggle
```

---

Need help? Check the main README.md for detailed documentation!
