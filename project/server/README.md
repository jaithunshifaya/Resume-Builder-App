# Resume Builder - Backend API

This is the backend API for the Resume Builder application built with Node.js, Express.js, and MongoDB.

## Features

- User authentication (JWT)
- Resume CRUD operations
- File upload for profile photos
- MongoDB data storage
- RESTful API design
- Input validation
- Security middleware
- Rate limiting

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Clone the repository and navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/resumebuilder
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start MongoDB (if running locally):
```bash
mongod
```

6. Run the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resume` - Get all resumes for authenticated user
- `GET /api/resume/:id` - Get single resume
- `POST /api/resume` - Create new resume
- `PUT /api/resume/:id` - Update resume
- `DELETE /api/resume/:id` - Delete resume

### File Upload
- `POST /api/upload/profile-photo` - Upload profile photo

## Deployment

### Using Railway

1. Create account on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy!

### Using Render

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

