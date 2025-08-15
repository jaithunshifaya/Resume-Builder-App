import React, { useState } from 'react';
import { useResume, WorkExperience } from '../../contexts/ResumeContext';
import { Plus, Trash2, Briefcase, Building, MapPin, Calendar, FileText } from 'lucide-react';

const WorkExperienceForm: React.FC = () => {
  const { resume, updateWorkExperience } = useResume();
  const [experiences, setExperiences] = useState<WorkExperience[]>(
    resume.workExperience.length > 0 ? resume.workExperience : [createEmptyExperience()]
  );

  function createEmptyExperience(): WorkExperience {
    return {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      description: '',
    };
  }

  const handleChange = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    
    // If marking as current job, clear end date
    if (field === 'isCurrentJob' && value === true) {
      updatedExperiences[index].endDate = '';
    }
    
    setExperiences(updatedExperiences);
    updateWorkExperience(updatedExperiences);
  };

  const addExperience = () => {
    const newExperience = createEmptyExperience();
    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    updateWorkExperience(updatedExperiences);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
      updateWorkExperience(updatedExperiences);
    }
  };

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Experience {index + 1}
            </h3>
            {experiences.length > 1 && (
              <button
                onClick={() => removeExperience(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={experience.jobTitle}
                  onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Software Engineer"
                  required
                />
                <Briefcase className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Google"
                  required
                />
                <Building className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., San Francisco, CA"
                />
                <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date *
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={experience.isCurrentJob}
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={experience.isCurrentJob}
                onChange={(e) => handleChange(index, 'isCurrentJob', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <div className="relative">
              <textarea
                value={experience.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your responsibilities, achievements, and key projects..."
              />
              <FileText className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Use bullet points to highlight your key achievements and responsibilities
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;