import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  profilePhoto?: string;
  profileSummary: string;
}

export interface WorkExperience {
  id?: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentJob: boolean;
  description: string;
}

export interface Education {
  id?: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
  gpa: string;
  description: string;
}

export interface Skill {
  id?: string;
  category: string;
  items: string[];
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate: string;
  credentialId: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  githubLink: string;
  startDate: string;
  endDate: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  website: string;
  twitter: string;
}

export interface Resume {
  _id?: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  projects: Project[];
  socialLinks: SocialLinks;
  template: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ResumeContextType {
  resume: Resume;
  setResume: (resume: Resume) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateWorkExperience: (experience: WorkExperience[]) => void;
  updateEducation: (education: Education[]) => void;
  updateSkills: (skills: Skill[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateSocialLinks: (links: Partial<SocialLinks>) => void;
  saveResume: () => Promise<string>;
  loadResume: (id: string) => Promise<void>;
  resetResume: () => void;
  loading: boolean;
}

const defaultResume: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: '',
    profileSummary: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  socialLinks: {
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
  },
  template: 'modern',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<Resume>(defaultResume);
  const [loading, setLoading] = useState(false);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setResume(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  }, []);

  const updateWorkExperience = useCallback((experience: WorkExperience[]) => {
    setResume(prev => ({ ...prev, workExperience: experience }));
  }, []);

  const updateEducation = useCallback((education: Education[]) => {
    setResume(prev => ({ ...prev, education }));
  }, []);

  const updateSkills = useCallback((skills: Skill[]) => {
    setResume(prev => ({ ...prev, skills }));
  }, []);

  const updateCertifications = useCallback((certifications: Certification[]) => {
    setResume(prev => ({ ...prev, certifications }));
  }, []);

  const updateProjects = useCallback((projects: Project[]) => {
    setResume(prev => ({ ...prev, projects }));
  }, []);

  const updateSocialLinks = useCallback((links: Partial<SocialLinks>) => {
    setResume(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, ...links }
    }));
  }, []);

  const saveResume = useCallback(async (): Promise<string> => {
    setLoading(true);
    try {
      const response = resume._id
        ? await axios.put(`/resume/${resume._id}`, resume)
        : await axios.post('/resume', resume);
      
      const savedResume = response.data;
      setResume(savedResume);
      return savedResume._id;
    } catch (error) {
      console.error('Error saving resume:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [resume]);

  const loadResume = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/resume/${id}`);
      setResume(response.data);
    } catch (error) {
      console.error('Error loading resume:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetResume = useCallback(() => {
    setResume(defaultResume);
  }, []);

  const value = {
    resume,
    setResume,
    updatePersonalInfo,
    updateWorkExperience,
    updateEducation,
    updateSkills,
    updateCertifications,
    updateProjects,
    updateSocialLinks,
    saveResume,
    loadResume,
    resetResume,
    loading,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};