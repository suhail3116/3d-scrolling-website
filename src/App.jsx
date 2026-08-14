import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import FloatingNavDock from './components/FloatingNavDock.jsx';
import HeroCanvasViewer from './components/HeroCanvasViewer.jsx';
import StarlightCabin from './components/StarlightCabin.jsx';
import ModelDetails from './components/ModelDetails.jsx';
import VideoSection from './components/VideoSection.jsx';
import BespokeConfigurator from './components/BespokeConfigurator.jsx';
import ModelComparisonModal from './components/ModelComparisonModal.jsx';
import AppDescriptionModal from './components/AppDescriptionModal.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { Sparkles, ArrowUp, Info } from 'lucide-react';
import { audioEngine } from './utils/audioEngine.js';

export default function App() {
  const [isAppInfoOpen, setIsAppInfoOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('studio');
  const [isMuted, setIsMuted] = useState(false);

  // Smooth Navigation handler
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'studio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'starlight') {
      document.getElementById('starlight-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'specs') {
      document.getElementById('specs-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'video') {
      document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'configurator') {
      document.getElementById('configurator-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll position observer to update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const starlightTop = document.getElementById('starlight-section')?.offsetTop || 1200;
      const specsTop = document.getElementById('specs-section')?.offsetTop || 2000;
      const videoTop = document.getElementById('video-section')?.offsetTop || 2800;
      const configTop = document.getElementById('configurator-section')?.offsetTop || 3600;

      if (scrollY >= configTop - 250) {
        setActiveSection('configurator');
      } else if (scrollY >= videoTop - 250) {
        setActiveSection('video');
      } else if (scrollY >= specsTop - 250) {
        setActiveSection('specs');
      } else if (scrollY >= starlightTop - 250) {
        setActiveSection('starlight');
      } else {
        setActiveSection('studio');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-obsidian)] text-white font-['Montserrat'] selection:bg-[var(--gold-primary)] selection:text-black">
      {/* Custom Luxury Cursor */}
      <CustomCursor />

      {/* Floating Right-Side Section Dock */}
      <FloatingNavDock
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Ambient overlays */}
      <div id="grain-overlay" />
      <div id="vignette-overlay" />

      {/* Navigation Bar */}
      <Navbar
        onOpenAppInfo={() => setIsAppInfoOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. 360° Studio Hero Canvas (with X-Ray Blueprint Mode & Drag Hint) */}
        <HeroCanvasViewer onNavigateToSpecs={() => handleNavigate('specs')} />

        {/* 2. Starlight Headliner & Celestial Cabin Simulator */}
        <StarlightCabin />

        {/* 3. Comprehensive Model Specs & Engineering (with Tooltip Modals) */}
        <ModelDetails />

        {/* 4. Feature Video Showcase */}
        <VideoSection />

        {/* 5. Bespoke Color Configurator & Live Price Estimator (with Heritage Tooltips) */}
        <BespokeConfigurator onNavigateToStudio={() => handleNavigate('studio')} />
      </main>

      {/* Luxury Footer */}
      <footer className="py-16 px-6 md:px-12 bg-black border-t border-[var(--border-gold)] text-xs text-[var(--text-muted)] font-mono">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="font-['Cormorant_Garamond'] text-2xl tracking-[0.4em] uppercase text-[var(--gold-primary)] mb-1">
              ROLLS&#8202;·&#8202;ROYCE
            </div>
            <p className="text-[11px] text-[var(--text-dim)]">
              Spectre Atelier & Interactive 3D Digital Twin Experience
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button
              onClick={() => {
                audioEngine.playClick();
                setIsComparisonOpen(true);
              }}
              className="hover:text-[var(--gold-light)] transition-colors flex items-center gap-1.5"
            >
              Compare Flagship Portfolio
            </button>
            <button
              onClick={() => {
                audioEngine.playClick();
                setIsAppInfoOpen(true);
              }}
              className="hover:text-[var(--gold-light)] transition-colors flex items-center gap-1.5"
            >
              <Info size={12} /> App Architecture
            </button>
            <button
              onClick={() => {
                audioEngine.playClick();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[var(--gold-light)] transition-colors flex items-center gap-1.5"
            >
              <ArrowUp size={12} /> Back to Top
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[var(--text-dim)]">
          <p>© {new Date().getFullYear()} Rolls-Royce Motor Cars Limited. React App Edition.</p>
          <p className="flex items-center gap-2">
            <Sparkles size={10} className="text-[var(--gold-primary)]" /> Built with React 18, Vite & HTML5 Canvas Engine
          </p>
        </div>
      </footer>

      {/* Flagship Comparison Modal */}
      <ModelComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

      {/* App Description Modal */}
      <AppDescriptionModal
        isOpen={isAppInfoOpen}
        onClose={() => setIsAppInfoOpen(false)}
      />
    </div>
  );
}
