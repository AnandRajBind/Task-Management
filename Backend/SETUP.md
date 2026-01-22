# Quick Setup Guide

## Step-by-Step Setup

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Setup Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env file and update these values:
# DATABASE_URL="mysql://root:your_password@localhost:3306/taskmanagement"
# JWT_ACCESS_SECRET="change-this-to-random-secret"
# JWT_REFRESH_SECRET="change-this-to-random-secret"
```

### 3. Setup MySQL Database
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE taskmanagement;
EXIT;
```

### 4. Run Prisma Setup
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations (creates tables)
npm run prisma:migrate

# Optional: Open Prisma Studio to view database
npm run prisma:studio
```

### 5. Start Development Server
```bash
npm run dev
```

Server will start at: `http://localhost:5000`

### 6. Test the API

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register a User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User"
  }'
```

Save the `accessToken` from the response.

**Create a Task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "My First Task",
    "description": "Testing the API"
  }'
```

**Get All Tasks:**
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Common Issues

### Issue: Prisma Client not found
**Solution:**
```bash
npm run prisma:generate
```

### Issue: Cannot connect to MySQL
**Solution:**
- Make sure MySQL is running
- Check DATABASE_URL in .env file
- Verify database exists: `SHOW DATABASES;`

### Issue: Port 5000 already in use
**Solution:**
- Change PORT in .env file
- Or kill the process using port 5000

## Production Build

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## Folder Structure Overview

```
src/
├── config/          # Configuration files (database, env)
├── controllers/     # Handle HTTP requests/responses
├── services/        # Business logic
├── middleware/      # Authentication, validation, error handling
├── routes/          # API route definitions
├── validators/      # Zod validation schemas
├── utils/           # Helper functions (JWT, password)
├── types/           # TypeScript type definitions
└── index.ts         # Main application entry
```

## API Endpoints Summary

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Tasks (Protected)
- `GET /api/tasks` - Get all tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PATCH /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task status

## Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **Database:** MySQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Validation:** Zod
- **Password:** bcrypt

## Next Steps
1. ✅ Backend is complete
2. 📱 Build the Frontend (Next.js)
3. 🔗 Connect Frontend to Backend
4. 🚀 Deploy to production
