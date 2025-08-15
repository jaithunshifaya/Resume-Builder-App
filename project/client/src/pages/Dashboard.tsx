import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Plus, Edit, Trash2, Calendar, Eye } from 'lucide-react';
import axios from 'axios';

interface Resume {
  _id: string;
  personalInfo: {
    fullName: string;
    email: string;
  };
  template: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('/resume');
        setResumes(response.data);
      } catch (err) {
        setError('Failed to fetch resumes');
        console.error('Error fetching resumes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`/resume/${id}`);
        setResumes(resumes.filter(resume => resume._id !== id));
      } catch (err) {
        alert('Failed to delete resume');
        console.error('Error deleting resume:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your resumes and create new ones
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Link
            to="/builder"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Resume
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resumes yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first resume
            </p>
            <Link
              to="/builder"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {resume.personalInfo.fullName || 'Untitled Resume'}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {resume.personalInfo.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Updated {formatDate(resume.updatedAt)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {resume.template}
                    </span>
                    <div className="flex space-x-2">
                      <Link
                        to={`/preview/${resume._id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Preview"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/builder/${resume._id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(resume._id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;