# Calculator PWA Backend

Backend API for the Calculator Progressive Web App with user authentication, calculation history, and sync functionality.

## Features

- User registration and authentication
- Forced number configuration per user
- Calculation history storage
- Offline data sync
- Statistics and analytics
- Rate limiting and security

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration:
   ```
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=mongodb://localhost:27017/calculator-pwa
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   ```

5. Make sure MongoDB is running on your system

6. Start the server:
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/forced-number` - Update forced number

### Calculator
- `POST /api/calculator/history` - Save calculation
- `GET /api/calculator/history` - Get calculation history
- `DELETE /api/calculator/history` - Clear calculation history
- `POST /api/calculator/sync` - Sync offline data
- `GET /api/calculator/stats` - Get user statistics

### Health Check
- `GET /api/health` - Server health check

## Security Features

- JWT Authentication
- Password hashing with bcryptjs
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation

## Database Schema

### User
- username (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- forcedNumber (Number, optional)
- preferences (Object)

### CalculationHistory
- userId (ObjectId, required)
- expression (String, required)
- actualResult (Number, required)
- forcedResult (Number, optional)
- wasForced (Boolean, required)
- operationType (String, required)
- deviceId (String, required)
- timestamps

## Error Handling

The API returns consistent error responses:
```json
{
  "error": "Error message",
  "message": "Additional details (in development mode)"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Protected endpoints require authentication

## Deployment

1. Set `NODE_ENV=production`
2. Configure production database
3. Use a secure JWT secret
4. Configure reverse proxy (nginx) for production
5. Set up SSL certificate
