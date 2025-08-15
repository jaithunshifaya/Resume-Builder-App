import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Upload, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import axios from 'axios';

const PersonalInfoForm: React.FC = () => {
  const { resume, updatePersonalInfo } = useResume();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      // Create preview URL
      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      // Upload to server
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const response = await axios.post('/upload/profile-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      updatePersonalInfo({ profilePhoto: response.data.filePath });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    updatePersonalInfo({ profilePhoto: '' });
    setPreviewUrl(null);
  };

  const currentPhotoUrl = previewUrl || (resume.personalInfo.profilePhoto ? 
    `${import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000'}${resume.personalInfo.profilePhoto}` : 
    null);

  return (
    <div className="space-y-6">
      {/* Profile Photo */}
      <div className="flex items-center space-x-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {currentPhotoUrl ? (
              <img
                src={currentPhotoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-gray-400" />
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <label className="cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <Upload className="h-4 w-4 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </span>
            </label>
            {currentPhotoUrl && (
              <button
                onClick={removePhoto}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            JPG, PNG up to 5MB
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={resume.personalInfo.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your full name"
              required
            />
            <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={resume.personalInfo.email}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="your.email@example.com"
              required
            />
            <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={resume.personalInfo.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1 (555) 123-4567"
            />
            <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={resume.personalInfo.address}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="City, State/Country"
            />
            <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary
        </label>
        <div className="relative">
          <textarea
            name="profileSummary"
            value={resume.personalInfo.profileSummary}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a brief summary about yourself, your skills, and career objectives..."
          />
          <FileText className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          2-3 sentences highlighting your experience and goals
        </p>
      </div>
    </div>
  );
};

export default PersonalInfoForm;