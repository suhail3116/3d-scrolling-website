import React from 'react';
import { X, Cpu, Layers, Sparkles, Code, Globe, ShieldCheck } from 'lucide-react';

export default function AppDescriptionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel p-6 md:p-10 text-white animate-modal shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-gold)] pb-4 mb-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--gold-primary)] flex items-center gap-2">
              <Sparkles size={12} /> Digital Twin Experience
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light italic text-[var(--text-white)] mt-1">
              About Rolls-Royce Spectre Atelier
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-6 text-sm text-[var(--text-muted)] leading-relaxed font-light">
          {/* Summary */}
          <div className="p-4 glass-panel-light border-l-2 border-[var(--gold-primary)]">
            <h3 className="text-white font-medium text-base mb-1 flex items-center gap-2">
              <Globe size={16} className="text-[var(--gold-primary)]" /> Application Purpose
            </h3>
            <p>
              This React application is an ultra-luxury digital showroom and 3D frame-sequenced atelier crafted for the premier electric super-coupé, the <strong>Rolls-Royce Spectre</strong>. It allows prospective clients, automotive enthusiasts, and designers to inspect the vehicle in immersive 360-degree rotation, explore engineering innovations via interactive hotspots, customize bespoke finishes, and watch signature mechanics in action.
            </p>
          </div>

          {/* Core Features Breakdown */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-mono text-[var(--gold-light)] mb-3 flex items-center gap-2">
              <Layers size={14} /> Key Architecture & Features
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded">
                <div className="text-white font-medium text-sm mb-1 text-[var(--gold-light)]">1. 360° Canvas Studio</div>
                <p className="text-xs">
                  Driven by a 240-frame high-resolution image sequence. Provides seamless scroll-driven rotation, drag scrubbing, angle presets, and instant canvas rendering.
                </p>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded">
                <div className="text-white font-medium text-sm mb-1 text-[var(--gold-light)]">2. Interactive Hotspots</div>
                <p className="text-xs">
                  Spatial hotspots mapped onto the vehicle exterior highlighting the Pantheon Grille, Spirit of Ecstasy aero sculpt, Starlight Doors, and Planar Suspension.
                </p>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded">
                <div className="text-white font-medium text-sm mb-1 text-[var(--gold-light)]">3. Bespoke Customizer</div>
                <p className="text-xs">
                  Real-time color hue shifts enabling client preview in Magma Red, Obsidian Black, Tempest Grey, Emerald Green, and English White under various studio lights.
                </p>
              </div>

              <div className="p-3 bg-white/[0.02] border border-white/5 rounded">
                <div className="text-white font-medium text-sm mb-1 text-[var(--gold-light)]">4. Cinematic Feature Video</div>
                <p className="text-xs">
                  Dedicated video player demonstrating the signature power-assisted coach door operation with real-time speed adjustments.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Implementation */}
          <div>
            <h4 className="text-white text-xs uppercase tracking-[0.2em] font-mono text-[var(--gold-light)] mb-3 flex items-center gap-2">
              <Code size={14} /> Technical Stack & Performance
            </h4>
            <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-muted)]">
              <li><strong>Framework</strong>: React 18 with Vite build system for instant HMR and lightweight bundle size.</li>
              <li><strong>Styling</strong>: Custom Vanilla CSS design tokens with glassmorphism, luxury typography (`Cormorant Garamond` & `Montserrat`), and fluid keyframes.</li>
              <li><strong>Optimization</strong>: Multi-chunk progressive image preloading (`requestIdleCallback` / fallback timers) to guarantee smooth 60fps canvas scrubbing.</li>
              <li><strong>Icons & UI</strong>: Lucide React iconography & custom luxury cursor interactions.</li>
            </ul>
          </div>

          {/* Model Note */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-[var(--text-dim)] font-mono">
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-emerald-400" /> Rolls-Royce Spectre Digital Twin v2.0</span>
            <span>Vite + React 18</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="btn-luxury"
          >
            Close & Explore
          </button>
        </div>
      </div>
    </div>
  );
}
