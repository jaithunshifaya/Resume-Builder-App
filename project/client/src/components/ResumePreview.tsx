import React from 'react';
import { useResume } from '../contexts/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Twitter, Calendar, ExternalLink } from 'lucide-react';

const ResumePreview: React.FC = () => {
  const { resume } = useResume();

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate: string, endDate: string, isCurrent: boolean = false) => {
    const start = formatDate(startDate);
    const end = isCurrent ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div id="resume-preview" className="max-w-4xl mx-auto bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {resume.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              {resume.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{resume.personalInfo.email}</span>
                </div>
              )}
              {resume.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>{resume.personalInfo.phone}</span>
                </div>
              )}
              {resume.personalInfo.address && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{resume.personalInfo.address}</span>
                </div>
              )}
            </div>
          </div>
          {resume.personalInfo.profilePhoto && (
            <div className="ml-6">
              <img
                src={`${import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000'}${resume.personalInfo.profilePhoto}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      {(resume.socialLinks.linkedin || resume.socialLinks.github || resume.socialLinks.website || resume.socialLinks.twitter) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Links</h2>
          <div className="flex flex-wrap gap-4">
            {resume.socialLinks.linkedin && (
              <a
                href={resume.socialLinks.linkedin}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </a>
            )}
            {resume.socialLinks.github && (
              <a
                href={resume.socialLinks.github}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-1" />
                GitHub
              </a>
            )}
            {resume.socialLinks.website && (
              <a
                href={resume.socialLinks.website}
                className="flex items-center text-green-600 hover:text-green-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-4 w-4 mr-1" />
                Website
              </a>
            )}
            {resume.socialLinks.twitter && (
              <a
                href={resume.socialLinks.twitter}
                className="flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </a>
            )}
          </div>
        </div>
      )}

      {/* Professional Summary */}
      {resume.personalInfo.profileSummary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.profileSummary}</p>
        </div>
      )}

      {/* Work Experience */}
      {resume.workExperience.length > 0 && resume.workExperience.some(exp => exp.jobTitle) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Work Experience</h2>
          <div className="space-y-4">
            {resume.workExperience.map((exp, index) => (
              exp.jobTitle && (
                <div key={index} className="border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600">{exp.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDateRange(exp.startDate, exp.endDate, exp.isCurrentJob)}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 mt-2">
                      {exp.description.split('\n').map((line, i) => (
                        <p key={i} className="mb-1">{line}</p>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && resume.education.some(edu => edu.degree) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          <div className="space-y-4">
            {resume.education.map((edu, index) => (
              edu.degree && (
                <div key={index} className="border-l-2 border-green-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                      <p className="text-green-600 font-medium">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600">{edu.location}</p>}
                      {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    {edu.graduationDate && (
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(edu.graduationDate)}
                        </div>
                      </div>
                    )}
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 mt-2">{edu.description}</p>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && resume.skills.some(skill => skill.category && skill.items.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.skills.map((skill, index) => (
              skill.category && skill.items.length > 0 && (
                <div key={index}>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && resume.projects.some(project => project.name) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
          <div className="space-y-4">
            {resume.projects.map((project, index) => (
              project.name && (
                <div key={index} className="border-l-2 border-purple-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live Demo
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            className="text-gray-700 hover:text-gray-900 text-sm flex items-center"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-3 w-3 mr-1" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDateRange(project.startDate, project.endDate)}
                        </div>
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 mt-2">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certifications.length > 0 && resume.certifications.some(cert => cert.name) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
          <div className="space-y-3">
            {resume.certifications.map((cert, index) => (
              cert.name && (
                <div key={index} className="border-l-2 border-yellow-200 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{cert.name}</h3>
                      <p className="text-yellow-600 font-medium">{cert.issuer}</p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-600">ID: {cert.credentialId}</p>
                      )}
                    </div>
                    {cert.date && (
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(cert.date)}
                        </div>
                        {cert.expiryDate && (
                          <div className="text-xs text-gray-400 mt-1">
                            Expires: {formatDate(cert.expiryDate)}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;