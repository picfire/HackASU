import { useState } from 'react';
import SpotlightCard from './spotlight';

interface Section {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const sections: Section[] = [
  { id: 'culture', name: 'Culture', icon: '🌍', description: 'Learn about local customs' },
  { id: 'language', name: 'Language', icon: '💬', description: 'Essential phrases' },
  { id: 'navigation', name: 'Navigation', icon: '🗺️', description: 'Getting around' },
  { id: 'academics', name: 'Academics', icon: '📚', description: 'University life' },
  { id: 'social', name: 'Social', icon: '👥', description: 'Making friends' },
];

interface SectionsDockProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function SectionsDock({ currentSection, onSectionChange }: SectionsDockProps) {
  return (
    <div className="flex flex-col gap-4">
      <SpotlightCard
        className="bg-gradient-to-br from-[#613873] to-[#4a2c5a] border-0"
        spotlightColor="rgba(255, 255, 255, 0.5)"
      >
        <div className="p-4">
          <h2 className="text-white text-2xl font-bold mb-2">Sections</h2>
          <p className="text-white text-sm opacity-70">Choose your learning path</p>
        </div>
      </SpotlightCard>
      
      {sections.map((section) => (
        <div key={section.id} onClick={() => onSectionChange(section.id)}>
          <SpotlightCard
            className={`cursor-pointer transition-all duration-300 border-0 ${
              currentSection === section.id
                ? 'bg-gradient-to-br from-[#7a4a8f] to-[#613873] scale-105'
                : 'bg-gradient-to-br from-[#613873] to-[#4a2c5a] hover:scale-102'
            }`}
            spotlightColor="rgba(255, 255, 255, 0.5)"
          >
            <div className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{section.icon}</span>
              <h3 className="text-white font-bold text-lg">{section.name}</h3>
            </div>
            <p className="text-white text-sm opacity-80">{section.description}</p>
            {currentSection === section.id && (
              <div className="mt-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-semibold">Active</span>
              </div>
            )}
            </div>
          </SpotlightCard>
        </div>
      ))}
    </div>
  );
}

// Different lessons for each section
export const sectionLessons = {
  culture: [
    { id: 1, type: 'start', completed: false, current: true, icon: '🌍' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🎭' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🎨' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ],
  language: [
    { id: 1, type: 'start', completed: false, current: true, icon: '💬' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🗣️' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '✍️' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ],
  navigation: [
    { id: 1, type: 'start', completed: false, current: true, icon: '🗺️' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🚇' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🚌' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ],
  academics: [
    { id: 1, type: 'start', completed: false, current: true, icon: '📚' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '✏️' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🎓' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ],
  social: [
    { id: 1, type: 'start', completed: false, current: true, icon: '👥' },
    { id: 2, type: 'lesson', completed: false, current: false, icon: '🤝' },
    { id: 3, type: 'chest', completed: false, current: false, icon: '📦' },
    { id: 4, type: 'lesson', completed: false, current: false, icon: '🎉' },
    { id: 5, type: 'star', completed: false, current: false, icon: '⭐' },
  ],
};
