import React, { useState } from 'react';
import { useResume, Certification } from '../../contexts/ResumeContext';
import { Plus, Trash2, Award, Building, Calendar, CreditCard } from 'lucide-react';

const CertificationsForm: React.FC = () => {
  const { resume, updateCertifications } = useResume();
  const [certifications, setCertifications] = useState<Certification[]>(
    resume.certifications.length > 0 ? resume.certifications : [createEmptyCertification()]
  );

  function createEmptyCertification(): Certification {
    return {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
    };
  }

  const handleChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = { ...updatedCertifications[index], [field]: value };
    setCertifications(updatedCertifications);
    updateCertifications(updatedCertifications);
  };

  const addCertification = () => {
    const newCertification = createEmptyCertification();
    const updatedCertifications = [...certifications, newCertification];
    setCertifications(updatedCertifications);
    updateCertifications(updatedCertifications);
  };

  const removeCertification = (index: number) => {
    if (certifications.length > 1) {
      const updatedCertifications = certifications.filter((_, i) => i !== index);
      setCertifications(updatedCertifications);
      updateCertifications(updatedCertifications);
    }
  };

  return (
    <div className="space-y-6">
      {certifications.map((certification, index) => (
        <div key={certification.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Certification {index + 1}
            </h3>
            {certifications.length > 1 && (
              <button
                onClick={() => removeCertification(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certification Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={certification.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
                <Award className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issuing Organization *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={certification.issuer}
                  onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Amazon Web Services"
                  required
                />
                <Building className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Issue Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={certification.date}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date (Optional)
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={certification.expiryDate}
                  onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credential ID (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={certification.credentialId}
                  onChange={(e) => handleChange(index, 'credentialId', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., ABC123456789"
                />
                <CreditCard className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Certification
      </button>
    </div>
  );
};

export default CertificationsForm;