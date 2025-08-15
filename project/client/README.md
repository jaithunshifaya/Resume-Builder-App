# Resume Builder - Frontend

A modern, responsive resume builder application built with React, TypeScript, and Tailwind CSS.

## Features

- 📝 **Interactive Resume Builder** - Step-by-step form to build your resume
- 👀 **Live Preview** - See your resume as you build it
- 📱 **Responsive Design** - Works on all device sizes
- 💾 **Save & Edit** - Save your resumes and edit them later
- 📄 **PDF Export** - Download your resume as a high-quality PDF
- 🔐 **User Authentication** - Secure login and registration
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- 📸 **Photo Upload** - Add your professional photo
- 🔗 **Social Links** - Include your LinkedIn, GitHub, and other profiles

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **jsPDF** - PDF generation
- **html2canvas** - HTML to canvas conversion
- **Axios** - HTTP client
- **Lucide React** - Beautiful icons

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

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
```
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

To build the application for production:

```bash
npm run build
```

The build files will be in the `dist` directory.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set the build command: `npm run build`
3. Set the output directory: `dist`
4. Add environment variables in Vercel dashboard
5. Deploy!

### Netlify

1. Connect your GitHub repository to Netlify
2. Set the build command: `npm run build`
3. Set the publish directory: `dist`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Environment Variables for Production

```
VITE_API_URL=https://your-api-domain.com/api
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── forms/          # Form components for different sections
│   ├── Navbar.tsx      # Navigation component
│   ├── ProtectedRoute.tsx
│   └── ResumePreview.tsx
├── contexts/           # React contexts
│   ├── AuthContext.tsx
│   └── ResumeContext.tsx
├── pages/             # Page components
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ResumeBuilder.tsx
│   └── ResumePreview.tsx
├── utils/             # Utility functions
│   └── pdfGenerator.ts
├── App.tsx            # Main app component
└── main.tsx           # App entry point
```

## Key Features

### Resume Builder Forms
- **Personal Information** - Name, contact details, photo, summary
- **Work Experience** - Job history with descriptions
- **Education** - Academic background
- **Skills** - Technical and soft skills with categories
- **Certifications** - Professional certifications
- **Projects** - Portfolio projects with links
- **Social Links** - Professional social media profiles

### PDF Generation
- High-quality PDF export using jsPDF and html2canvas
- Professional formatting
- Automatic filename generation
- Print-ready output

### User Authentication
- Secure JWT-based authentication
- User registration and login
- Protected routes
- Guest mode for trying the app

### Responsive Design
- Mobile-first approach
- Breakpoints for mobile, tablet, and desktop
- Touch-friendly interface
- Optimized for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
