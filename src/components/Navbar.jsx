import React from 'react';
import { Info, Volume2, VolumeX, Sparkles, Moon, Layers, Sliders } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine.js';

export default function Navbar({
  onOpenAppInfo,
  onOpenComparison,
  activeSection,
  onNavigate,
  isMuted,
  onToggleMute
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-black/50 border-b border-[var(--border-gold)] transition-all duration-300">
      {/* Brand Logo */}
      <div 
        onClick={() => {
          audioEngine.playClick();
          onNavigate('studio');
        }}
        className="cursor-pointer group flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full border border-[var(--gold-primary)] flex items-center justify-center text-[var(--gold-primary)] group-hover:bg-[var(--gold-primary)] group-hover:text-black transition-all">
          <Sparkles size={14} />
        </div>
        <div>
          <span className="font-['Cormorant_Garamond'] text-lg md:text-xl tracking-[0.4em] uppercase text-[var(--gold-primary)] font-light">
            ROLLS&#8202;·&#8202;ROYCE
          </span>
          <span className="block text-[9px] font-mono tracking-[0.3em] uppercase text-[var(--text-dim)]">
            SPECTRE ATELIER
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-[0.2em] uppercase text-[var(--text-muted)]">
        <button
          onClick={() => {
            audioEngine.playClick();
            onNavigate('studio');
          }}
          className={`hover:text-[var(--gold-light)] transition-colors py-1 ${activeSection === 'studio' ? 'text-[var(--gold-primary)] border-b border-[var(--gold-primary)]' : ''}`}
        >
          360° Studio
        </button>
        <button
          onClick={() => {
            audioEngine.playClick();
            onNavigate('starlight');
          }}
          className={`hover:text-[var(--gold-light)] transition-colors py-1 flex items-center gap-1.5 ${activeSection === 'starlight' ? 'text-[var(--gold-primary)] border-b border-[var(--gold-primary)]' : ''}`}
        >
          <Moon size={13} /> Starlight
        </button>
        <button
          onClick={() => {
            audioEngine.playClick();
            onNavigate('specs');
          }}
          className={`hover:text-[var(--gold-light)] transition-colors py-1 ${activeSection === 'specs' ? 'text-[var(--gold-primary)] border-b border-[var(--gold-primary)]' : ''}`}
        >
          Engineering
        </button>
        <button
          onClick={() => {
            audioEngine.playClick();
            onNavigate('video');
          }}
          className={`hover:text-[var(--gold-light)] transition-colors py-1 ${activeSection === 'video' ? 'text-[var(--gold-primary)] border-b border-[var(--gold-primary)]' : ''}`}
        >
          Video
        </button>
        <button
          onClick={() => {
            audioEngine.playClick();
            onNavigate('configurator');
          }}
          className={`hover:text-[var(--gold-light)] transition-colors py-1 ${activeSection === 'configurator' ? 'text-[var(--gold-primary)] border-b border-[var(--gold-primary)]' : ''}`}
        >
          Bespoke Studio
        </button>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Compare Lineup Modal Trigger */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onOpenComparison();
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-[var(--gold-primary)] rounded text-xs font-mono text-[var(--gold-light)] transition-all"
        >
          <Layers size={13} /> Lineup Matrix
        </button>

        {/* Sound Toggle with Animated Equalizer */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onToggleMute();
          }}
          title={isMuted ? "Enable Soundscape" : "Mute Soundscape"}
          className="px-3 py-1.5 border border-[var(--border-gold)] rounded hover:bg-[var(--gold-glow)] text-[var(--gold-primary)] transition-all flex items-center gap-2"
        >
          {isMuted ? (
            <VolumeX size={15} />
          ) : (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[var(--gold-primary)] animate-[pulse-glow_0.6s_infinite_ease-in-out] h-full" />
              <span className="w-0.5 bg-[var(--gold-light)] animate-[pulse-glow_0.9s_infinite_ease-in-out] h-2/3" />
              <span className="w-0.5 bg-[var(--gold-primary)] animate-[pulse-glow_0.4s_infinite_ease-in-out] h-4/5" />
            </div>
          )}
          <span className="text-[10px] font-mono uppercase hidden md:inline">
            {isMuted ? 'SOUND OFF' : 'ACOUSTICS ON'}
          </span>
        </button>

        {/* About App Info */}
        <button
          onClick={() => {
            audioEngine.playClick();
            onOpenAppInfo();
          }}
          className="btn-luxury text-[10px] py-2 px-3"
        >
          <Info size={14} />
          <span className="hidden sm:inline">About App</span>
        </button>
      </div>
    </header>
  );
}
