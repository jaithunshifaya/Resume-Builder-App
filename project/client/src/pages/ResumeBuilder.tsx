import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { Save, Eye, ChevronRight, ChevronLeft, Download } from 'lucide-react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import SocialLinksForm from '../components/forms/SocialLinksForm';
import ResumePreviewComponent from '../components/ResumePreview';

const sections = [
  { id: 'personal', title: 'Personal Information', component: PersonalInfoForm },
  { id: 'work', title: 'Work Experience', component: WorkExperienceForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'certifications', title: 'Certifications', component: CertificationsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm },
  { id: 'social', title: 'Social Links', component: SocialLinksForm },
];

const ResumeBuilder: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { resume, saveResume, loadResume, resetResume, loading } = useResume();
  const [currentSection, setCurrentSection] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      loadResume(id).catch(() => {
        alert('Failed to load resume');
        navigate('/dashboard');
      });
    } else {
      resetResume();
    }
  }, [id, loadResume, resetResume, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const savedId = await saveResume();
      if (!id) {
        navigate(`/builder/${savedId}`, { replace: true });
      }
      alert('Resume saved successfully!');
    } catch (error) {
      alert('Failed to save resume');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = async () => {
    try {
      const savedId = await saveResume();
      navigate(`/preview/${savedId}`);
    } catch (error) {
      alert('Failed to save resume before preview');
      console.error('Preview error:', error);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentComponent = sections[currentSection].component;

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
            {id ? 'Edit Resume' : 'Create New Resume'}
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in your information to create a professional resume
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Step {currentSection + 1} of {sections.length}
                </h2>
                <div className="text-sm text-gray-500">
                  {Math.round(((currentSection + 1) / sections.length) * 100)}% Complete
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Section Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-wrap gap-2 mb-4">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      index === currentSection
                        ? 'bg-blue-600 text-white'
                        : index < currentSection
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                {sections[currentSection].title}
              </h2>
              <CurrentComponent />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={prevSection}
                disabled={currentSection === 0}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save'}
                </button>

                <button
                  onClick={async () => {
                    try {
                      const { generatePDF } = await import('../utils/pdfGenerator');
                      await generatePDF(resume);
                    } catch (error) {
                      alert('Failed to generate PDF');
                      console.error('PDF generation error:', error);
                    }
                  }}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>

                <button
                  onClick={handlePreview}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </button>

                <button
                  onClick={nextSection}
                  disabled={currentSection === sections.length - 1}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Live Preview</h2>
              <div className="border rounded-lg overflow-hidden">
                <ResumePreviewComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;