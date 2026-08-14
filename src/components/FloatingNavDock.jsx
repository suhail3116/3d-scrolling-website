import React from 'react';
import { audioEngine } from '../utils/audioEngine.js';

const SECTIONS = [
  { id: 'studio', label: '360° Studio', num: '01' },
  { id: 'starlight', label: 'Starlight Sanctuary', num: '02' },
  { id: 'specs', label: 'Engineering Specs', num: '03' },
  { id: 'video', label: 'Coach Doors Video', num: '04' },
  { id: 'configurator', label: 'Bespoke Studio', num: '05' }
];

export default function FloatingNavDock({ activeSection, onNavigate }) {
  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 py-4 px-2 glass-panel rounded-full border border-[var(--border-gold)]">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => {
              audioEngine.playClick();
              onNavigate(sec.id);
            }}
            className="group relative flex items-center justify-center p-1.5"
            aria-label={sec.label}
          >
            {/* Dot Indicator */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-[var(--gold-primary)] shadow-[0_0_12px_var(--gold-primary)] scale-110'
                  : 'w-2 h-2 bg-white/30 group-hover:bg-white/70'
              }`}
            />

            {/* Hover Tooltip Label */}
            <div className="absolute right-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 glass-panel px-3 py-1 text-[10px] font-mono text-[var(--gold-light)] whitespace-nowrap rounded shadow-lg flex items-center gap-2 border border-[var(--border-gold)]">
              <span className="text-[var(--gold-primary)] font-bold">{sec.num}</span>
              <span>{sec.label}</span>
            </div>
          </button>
        );
      })}
    </aside>
  );
}
