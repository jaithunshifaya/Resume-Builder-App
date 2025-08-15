import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { Download, Edit, ArrowLeft, Printer } from 'lucide-react';
import ResumePreviewComponent from '../components/ResumePreview';
import { generatePDF } from '../utils/pdfGenerator';

const ResumePreview: React.FC = () => {
  const { id } = useParams();
  const { resume, loadResume, loading } = useResume();
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      loadResume(id).catch(() => {
        alert('Failed to load resume');
      });
    }
  }, [id, loadResume]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await generatePDF(resume);
    } catch (error) {
      alert('Failed to generate PDF');
      console.error('PDF generation error:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                {resume.personalInfo.fullName || 'Resume'} Preview
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                {downloading ? 'Generating PDF...' : 'Download PDF'}
              </button>
              <Link
                to={`/builder/${id}`}
                className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Resume
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ResumePreviewComponent />
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;