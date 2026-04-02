import React from 'react';
import { Palette, Layers, Eye, Save, Globe, Smartphone, Monitor } from 'lucide-react';

const THEMES = [
  { id: 'minimal', name: 'Modern Minimal', color: '#6366f1' },
  { id: 'cyberpunk', name: 'Cyberpunk', color: '#00fffa' },
  { id: 'brutal', name: 'Neo-Brutalism', color: '#ffea00' },
  { id: 'mineral', name: 'Mineral', color: '#a27b5c' },
];

const ThemeSelector = ({ selectedTheme, onThemeChange }) => {
  return (
    <div className="theme-selector p-4 bg-white border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold flex items-center gap-2">
          <Palette size={18} className="text-primary" />
          Choose Vibe:
        </span>
        <div className="flex gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              className={`theme-btn ${selectedTheme === t.id ? 'active' : ''}`}
              title={t.name}
              style={{ '--theme-color': t.color }}
            >
              <div className="theme-preview" style={{ backgroundColor: t.color }}></div>
              <span className="text-xs">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
