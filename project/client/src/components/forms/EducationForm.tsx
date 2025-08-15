import React, { useState } from 'react';
import { useResume, Education } from '../../contexts/ResumeContext';
import { Plus, Trash2, GraduationCap, School, MapPin, Calendar, FileText } from 'lucide-react';

const EducationForm: React.FC = () => {
  const { resume, updateEducation } = useResume();
  const [educations, setEducations] = useState<Education[]>(
    resume.education.length > 0 ? resume.education : [createEmptyEducation()]
  );

  function createEmptyEducation(): Education {
    return {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      description: '',
    };
  }

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = { ...updatedEducations[index], [field]: value };
    setEducations(updatedEducations);
    updateEducation(updatedEducations);
  };

  const addEducation = () => {
    const newEducation = createEmptyEducation();
    const updatedEducations = [...educations, newEducation];
    setEducations(updatedEducations);
    updateEducation(updatedEducations);
  };

  const removeEducation = (index: number) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((_, i) => i !== index);
      setEducations(updatedEducations);
      updateEducation(updatedEducations);
    }
  };

  return (
    <div className="space-y-6">
      {educations.map((education, index) => (
        <div key={education.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Education {index + 1}
            </h3>
            {educations.length > 1 && (
              <button
                onClick={() => removeEducation(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  required
                />
                <GraduationCap className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) => handleChange(index, 'institution', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Stanford University"
                  required
                />
                <School className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={education.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Stanford, CA"
                />
                <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Graduation Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={education.graduationDate}
                  onChange={(e) => handleChange(index, 'graduationDate', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={education.gpa}
                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 3.8/4.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Information
            </label>
            <div className="relative">
              <textarea
                value={education.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Relevant coursework, honors, activities, etc."
              />
              <FileText className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Education
      </button>
    </div>
  );
};

export default EducationForm;