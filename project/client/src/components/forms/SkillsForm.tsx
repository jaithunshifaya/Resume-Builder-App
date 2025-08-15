import React, { useState } from 'react';
import { useResume, Skill } from '../../contexts/ResumeContext';
import { Plus, Trash2, X, Code, Wrench, Users, BookOpen } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resume, updateSkills } = useResume();
  const [skills, setSkills] = useState<Skill[]>(
    resume.skills.length > 0 ? resume.skills : [createEmptySkill()]
  );

  function createEmptySkill(): Skill {
    return {
      id: Date.now().toString(),
      category: '',
      items: [],
    };
  }

  const handleCategoryChange = (index: number, category: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], category };
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  const addSkillItem = (skillIndex: number, item: string) => {
    if (item.trim() === '') return;

    const updatedSkills = [...skills];
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      items: [...updatedSkills[skillIndex].items, item.trim()],
    };
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  const removeSkillItem = (skillIndex: number, itemIndex: number) => {
    const updatedSkills = [...skills];
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      items: updatedSkills[skillIndex].items.filter((_, i) => i !== itemIndex),
    };
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  const addSkillCategory = () => {
    const newSkill = createEmptySkill();
    const updatedSkills = [...skills, newSkill];
    setSkills(updatedSkills);
    updateSkills(updatedSkills);
  };

  const removeSkillCategory = (index: number) => {
    if (skills.length > 1) {
      const updatedSkills = skills.filter((_, i) => i !== index);
      setSkills(updatedSkills);
      updateSkills(updatedSkills);
    }
  };

  const getIconForCategory = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('technical') || lowerCategory.includes('programming')) {
      return <Code className="h-5 w-5 text-gray-400" />;
    } else if (lowerCategory.includes('tool') || lowerCategory.includes('software')) {
      return <Wrench className="h-5 w-5 text-gray-400" />;
    } else if (lowerCategory.includes('soft') || lowerCategory.includes('communication')) {
      return <Users className="h-5 w-5 text-gray-400" />;
    } else {
      return <BookOpen className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {skills.map((skill, index) => (
        <div key={skill.id} className="border border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Skill Category {index + 1}
            </h3>
            {skills.length > 1 && (
              <button
                onClick={() => removeSkillCategory(index)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <div className="relative">
              <input
                type="text"
                value={skill.category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Technical Skills, Programming Languages, Soft Skills"
                required
              />
              {getIconForCategory(skill.category)}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <SkillItemInput
              onAdd={(item) => addSkillItem(index, item)}
              placeholder="Type a skill and press Enter"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, itemIndex) => (
              <span
                key={itemIndex}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {item}
                <button
                  onClick={() => removeSkillItem(index, itemIndex)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={addSkillCategory}
        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Skill Category
      </button>
    </div>
  );
};

const SkillItemInput: React.FC<{
  onAdd: (item: string) => void;
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

export default SkillsForm;