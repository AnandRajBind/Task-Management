# Task Management System - Backend API

Production-ready REST API built with Node.js, TypeScript, Express, Prisma, and MySQL.

## 📁 Project Structure

```
Backend/
├── prisma/
│   └── schema.prisma           # Database schema
├── src/
│   ├── config/
│   │   ├── database.ts         # Prisma client instance
│   │   └── env.ts              # Environment configuration
│   ├── controllers/
│   │   ├── auth.controller.ts  # Auth endpoints logic
│   │   └── task.controller.ts  # Task endpoints logic
│   ├── middleware/
│   │   ├── auth.middleware.ts  # JWT authentication
│   │   ├── errorHandler.middleware.ts  # Global error handler
│   │   └── validation.middleware.ts    # Zod validation
│   ├── routes/
│   │   ├── auth.routes.ts      # Auth routes
│   │   ├── task.routes.ts      # Task routes
│   │   └── index.ts            # Route aggregator
│   ├── services/
│   │   ├── auth.service.ts     # Auth business logic
│   │   └── task.service.ts     # Task business logic
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── utils/
│   │   ├── jwt.util.ts         # JWT generation/verification
│   │   └── password.util.ts    # Password hashing
│   ├── validators/
│   │   ├── auth.validator.ts   # Auth validation schemas
│   │   └── task.validator.ts   # Task validation schemas
│   └── index.ts                # Application entry point
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   DATABASE_URL="mysql://root:yourpassword@localhost:3306/taskmanagement"
   JWT_ACCESS_SECRET="your-secret-key"
   JWT_REFRESH_SECRET="your-refresh-secret-key"
   ```

3. **Create database**
   ```bash
   mysql -u root -p
   CREATE DATABASE taskmanagement;
   EXIT;
   ```

4. **Run Prisma migrations**
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-01-22T10:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2026-01-22T10:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

#### Refresh Token
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc..."
    }
  }
}
```

#### Logout
```http
POST /api/auth/logout
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Tasks (Protected Routes)

All task endpoints require Bearer token authentication:
```http
Authorization: Bearer <accessToken>
```

#### Get All Tasks (with pagination, filtering, search)
```http
GET /api/tasks?page=1&limit=10&status=PENDING&search=meeting
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): PENDING | IN_PROGRESS | COMPLETED
- `search` (optional): Search by title

**Response (200)**
```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "uuid",
        "title": "Complete project",
        "description": "Finish the task management system",
        "status": "PENDING",
        "userId": "uuid",
        "createdAt": "2026-01-22T10:00:00.000Z",
        "updatedAt": "2026-01-22T10:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management system",
  "status": "PENDING"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "PENDING",
    "userId": "uuid",
    "createdAt": "2026-01-22T10:00:00.000Z",
    "updatedAt": "2026-01-22T10:00:00.000Z",
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

#### Get Task by ID
```http
GET /api/tasks/:id
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "PENDING",
    "userId": "uuid",
    "createdAt": "2026-01-22T10:00:00.000Z",
    "updatedAt": "2026-01-22T10:00:00.000Z"
  }
}
```

#### Update Task
```http
PATCH /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS"
}
```

**Response (200)**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "uuid",
    "title": "Updated title",
    "description": "Updated description",
    "status": "IN_PROGRESS",
    "userId": "uuid",
    "createdAt": "2026-01-22T10:00:00.000Z",
    "updatedAt": "2026-01-22T11:00:00.000Z"
  }
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
```

**Response (200)**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Toggle Task Status
```http
PATCH /api/tasks/:id/toggle
```

Cycles through: PENDING → IN_PROGRESS → COMPLETED → PENDING

**Response (200)**
```json
{
  "success": true,
  "message": "Task status toggled successfully",
  "data": {
    "id": "uuid",
    "title": "Complete project",
    "description": "Finish the task management system",
    "status": "IN_PROGRESS",
    "userId": "uuid",
    "createdAt": "2026-01-22T10:00:00.000Z",
    "updatedAt": "2026-01-22T11:00:00.000Z"
  }
}
```

### Health Check
```http
GET /api/health
```

**Response (200)**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-01-22T10:00:00.000Z"
}
```

## 🔐 Authentication Flow

1. **Register/Login** → Receive access token (15 min) + refresh token (7 days)
2. **Make API calls** → Use access token in Authorization header
3. **Token expires** → Use refresh token to get new tokens
4. **Logout** → Send refresh token to invalidate it

## ⚙️ Available Scripts

```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

## 🛡️ Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ Refresh token rotation
- ✅ Token expiry handling
- ✅ User-specific task isolation
- ✅ Input validation with Zod
- ✅ SQL injection prevention (Prisma)
- ✅ Global error handling

## 🗄️ Database Schema

### User
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `password`: String (Hashed)
- `name`: String
- `createdAt`: DateTime
- `updatedAt`: DateTime

### Task
- `id`: UUID (Primary Key)
- `title`: String
- `description`: Text (Optional)
- `status`: Enum (PENDING, IN_PROGRESS, COMPLETED)
- `userId`: UUID (Foreign Key)
- `createdAt`: DateTime
- `updatedAt`: DateTime

### RefreshToken
- `id`: UUID (Primary Key)
- `token`: String (Unique)
- `userId`: UUID (Foreign Key)
- `expiresAt`: DateTime
- `createdAt`: DateTime

## 📝 Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Invalid/missing token)
- `404` - Not Found (Resource doesn't exist)
- `409` - Conflict (Email already exists)
- `500` - Internal Server Error

## 🧪 Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Create Task (replace <TOKEN>)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"title":"My Task","description":"Task description"}'

# Get Tasks
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <TOKEN>"
```

## 📦 Production Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

4. Start the server:
   ```bash
   npm start
   ```

## 🎯 Key Features

- ✅ Clean architecture (Controllers → Services → Database)
- ✅ TypeScript for type safety
- ✅ Zod validation for request data
- ✅ JWT authentication with refresh tokens
- ✅ Pagination and filtering
- ✅ Search functionality
- ✅ User-specific data isolation
- ✅ Professional error handling
- ✅ RESTful API design

---

Built with ❤️ using Node.js, TypeScript, Express, Prisma, and MySQL
