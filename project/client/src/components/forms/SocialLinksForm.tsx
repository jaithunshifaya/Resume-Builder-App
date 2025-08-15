import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { Linkedin, Github, Globe, Twitter } from 'lucide-react';

const SocialLinksForm: React.FC = () => {
  const { resume, updateSocialLinks } = useResume();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateSocialLinks({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <div className="relative">
            <input
              type="url"
              name="linkedin"
              value={resume.socialLinks.linkedin}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://linkedin.com/in/yourprofile"
            />
            <Linkedin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub Profile
          </label>
          <div className="relative">
            <input
              type="url"
              name="github"
              value={resume.socialLinks.github}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://github.com/yourusername"
            />
            <Github className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Website
          </label>
          <div className="relative">
            <input
              type="url"
              name="website"
              value={resume.socialLinks.website}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://yourwebsite.com"
            />
            <Globe className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twitter Profile
          </label>
          <div className="relative">
            <input
              type="url"
              name="twitter"
              value={resume.socialLinks.twitter}
              onChange={handleChange}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://twitter.com/yourusername"
            />
            <Twitter className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              <strong>Pro tip:</strong> Only include social links that are relevant to your professional profile. 
              Make sure your profiles are professional and up-to-date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksForm;