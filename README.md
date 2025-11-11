# Resume Builder - Full Stack Application

A comprehensive resume builder application that allows users to create professional resumes with ease. Built with React.js for the frontend and Node.js + Express.js for the backend, with MongoDB for data storage.
**Live Demo:** [Resume Builder App](https://resume-builder-app-85cd.vercel.app/)


## 🚀 Features

### Frontend Features
- **Interactive Resume Builder** - Step-by-step form to build your resume
- **Live Preview** - See your resume as you build it in real-time
- **PDF Export** - Download your resume as a high-quality PDF
- **Responsive Design** - Works perfectly on all devices
- **User Authentication** - Secure login and registration system
- **Photo Upload** - Add your professional photo
- **Guest Mode** - Try the app without creating an account

### Backend Features
- **RESTful API** - Clean API design with proper endpoints
- **JWT Authentication** - Secure user authentication
- **File Upload** - Profile photo upload with validation
- **Data Validation** - Input validation and sanitization
- **Security** - Rate limiting, CORS, and security headers
- **MongoDB Integration** - Robust data storage with Mongoose

## 🛠️ Tech Stack

### Frontend
- **React Js** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Hook Form** for form management
- **jsPDF** for PDF generation
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **CORS** for cross-origin requests

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   └── package.json
├── server/                # Backend Node.js application
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Express middleware
│   ├── uploads/          # File upload directory
│   └── server.js         # Main server file
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
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
```env
MONGODB_URI=mongodb://localhost:27017/resumebuilder
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
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
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user


## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set the root directory to `client`
3. Set build command: `npm run build`
4. Set output directory: `dist`


### Backend Deployment (Railway)

1. Connect your GitHub repository to Railway
2. Set the root directory to `server`
3. Add environment variables:
   - `MONGODB_URI=mongodb://localhost:27017/resumebuilder`
   - `NODE_ENV=development`
   - `FRONTEND_URL=[https://your-frontend-domain.com](http://localhost:3000)`

### Alternative: Render

For backend deployment on Render:
1. Create new Web Service
2. Connect GitHub repository
3. Set root directory to `server`
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables

## 🔧 Development

### Running Tests
```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

### Code Formatting
```bash
# Format code
npm run format

# Lint code
npm run lint
```

## 📝 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/resumebuilder

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000

```

### Frontend (.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by professional resume builders
- Designed for ease of use and professional results

## 📞 Support

If you have any questions, feedback, or need support, you can reach me at:

- **LinkedIn:** [Jaithun Shifaya](https://www.linkedin.com/in/jaithun-shifaya03/)  
- **GitHub:** [jaithunshifaya](https://github.com/jaithunshifaya)  
- **Email:** [jaithunshifaya@gmail.com](mailto:jaithunshifaya@gmail.com)

---

**Happy Resume Building!** 🎉
