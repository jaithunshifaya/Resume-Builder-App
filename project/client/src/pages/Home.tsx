import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Zap, Shield, Download } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Build Your Perfect Resume
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Create professional resumes in minutes with our intuitive builder
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/builder"
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-5 w-5 mr-2" />
                Start Building
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 border border-white text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sign Up Free
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600">
              Professional features to help you stand out from the crowd
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Create your resume in minutes with our intuitive drag-and-drop interface
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and secure. We never share your personal information
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">PDF Export</h3>
              <p className="text-gray-600">
                Download your resume as a high-quality PDF ready for printing or sharing
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* CTA Section */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust our platform
          </p>
          <Link
            to="/builder"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
          >
            <FileText className="h-5 w-5 mr-2" />
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;