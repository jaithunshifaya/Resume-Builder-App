import React, { useState } from 'react';
import { useResume, Project } from '../../contexts/ResumeContext';
import { Plus, Trash2, X, Folder, Link, Github, Calendar, FileText } from 'lucide-react';

const ProjectsForm: React.FC = () => {
  const { resume, updateProjects } = useResume();
  const [projects, setProjects] = useState<Project[]>(
    resume.projects.length > 0 ? resume.projects : [createEmptyProject()]
  );

  function createEmptyProject(): Project {
    return {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      githubLink: '',
      startDate: '',
      endDate: '',
    };
  }

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  const addTechnology = (projectIndex: number, technology: string) => {
    if (technology.trim() === '') return;

    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: [...updatedProjects[projectIndex].technologies, technology.trim()],
    };
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      technologies: updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex),
    };
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  const addProject = () => {
    const newProject = createEmptyProject();
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    updateProjects(updatedProjects);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      const updatedProjects = projects.filter((_, i) => i !== index);
      setProjects(updatedProjects);
      updateProjects(updatedProjects);
    }
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <div key={project.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Project {index + 1}
            </h3>
            {projects.length > 1 && (
              <button
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., E-commerce Website"
                  required
                />
                <Folder className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Live Demo URL
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com"
                />
                <Link className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Repository
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={project.githubLink}
                  onChange={(e) => handleChange(index, 'githubLink', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username/project"
                />
                <Github className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <div className="relative">
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  value={project.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                  className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <div className="relative">
              <textarea
                value={project.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe what the project does and your role in it..."
              />
              <FileText className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies Used
            </label>
            <TechnologyInput
              onAdd={(tech) => addTechnology(index, tech)}
              placeholder="Type a technology and press Enter"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
              >
                {tech}
                <button
                  onClick={() => removeTechnology(index, techIndex)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Project
      </button>
    </div>
  );
};

const TechnologyInput: React.FC<{
  onAdd: (tech: string) => void;
  placeholder: string;
}> = ({ onAdd, placeholder }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onAdd(input.trim());
        setInput('');
      }
    }
  };

  return (
    <input
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      placeholder={placeholder}
    />
  );
};

export default ProjectsForm;