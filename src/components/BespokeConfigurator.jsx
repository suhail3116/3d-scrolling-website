import React, { useState } from 'react';
import { Sliders, Sparkles, Check, Download, Eye, DollarSign, ShieldCheck, Info } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine.js';

const BASE_PRICE = 422750;

const PAINT_OPTIONS = [
  {
    id: 'magma-red',
    name: 'Magma Red',
    hex: '#8b0000',
    price: 14500,
    filter: 'hue-rotate(330deg) saturate(1.6)',
    desc: '7 coats of hand-sanded metallic quartz pigment formulated for intense light refraction.'
  },
  {
    id: 'english-white',
    name: 'English White',
    hex: '#f0ede6',
    price: 0,
    filter: 'brightness(1.15) sepia(0.15)',
    desc: 'Classic non-metallic pure white inspired by original 1906 Rolls-Royce Silver Ghosts.'
  },
  {
    id: 'obsidian-black',
    name: 'Obsidian Black',
    hex: '#121216',
    price: 9800,
    filter: 'brightness(0.6) contrast(1.3)',
    desc: 'Deep mirror-finish black infused with subtle blue diamond flakes.'
  },
  {
    id: 'tempest-grey',
    name: 'Tempest Grey',
    hex: '#4a5056',
    price: 7500,
    filter: 'grayscale(0.85) contrast(1.1)',
    desc: 'Subtle metallic slate finish engineered for zero reflection glare.'
  },
  {
    id: 'twilight-purple',
    name: 'Twilight Purple',
    hex: '#3b1e54',
    price: 16200,
    filter: 'hue-rotate(240deg) saturate(1.4)',
    desc: 'Bespoke midnight violet with gold iridescent undercoats that change under sunlight.'
  },
  {
    id: 'emerald-green',
    name: 'Emerald Green',
    hex: '#0b3c26',
    price: 15000,
    filter: 'hue-rotate(110deg) saturate(1.5)',
    desc: 'Rich deep forest green with micro-crystalline metallic flakes.'
  }
];

const WHEEL_OPTIONS = [
  { id: '7-spoke', name: '23" 7-Spoke Part-Polished Forged', price: 0 },
  { id: 'aero-vane', name: '23" Aero-Vane Bicolor Disc', price: 8200 },
  { id: 'classic', name: '22" Classic Mirror Polish', price: 5400 }
];

export default function BespokeConfigurator({ onNavigateToStudio }) {
  const [selectedPaint, setSelectedPaint] = useState(PAINT_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState(WHEEL_OPTIONS[0]);
  const [ambientLight, setAmbientLight] = useState('studio');
  const [hasStarlight, setHasStarlight] = useState(true);
  const [hasCanadelWood, setHasCanadelWood] = useState(true);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [hoveredPaint, setHoveredPaint] = useState(null);

  // Calculate total commission price
  const totalPrice =
    BASE_PRICE +
    selectedPaint.price +
    selectedWheel.price +
    (hasStarlight ? 18500 : 0) +
    (hasCanadelWood ? 12000 : 0);

  return (
    <section id="configurator-section" className="py-24 px-6 md:px-12 bg-[#060609] border-t border-[var(--border-gold)] text-white relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--gold-primary)] mb-2 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Personalization Studio & Price Estimator
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light italic mb-3">
            Bespoke Exterior & Commission Atelier
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
            Craft your signature commission. Tailor paint hues, wheel geometry, cabin options, and estimate your bespoke build pricing.
          </p>
        </div>

        {/* Configurator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left / Center Visual Preview */}
          <div className="lg:col-span-2 glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Ambient Backlight Glow */}
            <div
              className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-30"
              style={{
                background:
                  ambientLight === 'sunset'
                    ? 'radial-gradient(circle at center, rgba(235, 120, 30, 0.4), transparent 70%)'
                    : ambientLight === 'midnight'
                    ? 'radial-gradient(circle at center, rgba(30, 40, 90, 0.4), transparent 70%)'
                    : 'radial-gradient(circle at center, rgba(201, 169, 110, 0.25), transparent 70%)'
              }}
            />

            {/* Car Preview Image frame */}
            <div className="relative w-full aspect-[16/9] flex items-center justify-center overflow-hidden rounded">
              <img
                src="/rolls_set/ezgif-frame-001.jpg"
                alt="Rolls-Royce Spectre Custom Preview"
                className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: selectedPaint.filter }}
              />

              {/* Hue Badge */}
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 text-[10px] font-mono text-[var(--gold-light)] flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full border border-white/40"
                  style={{ backgroundColor: selectedPaint.hex }}
                />
                {selectedPaint.name.toUpperCase()} (+${selectedPaint.price.toLocaleString()})
              </div>

              {/* Lighting Badge */}
              <div className="absolute top-4 right-4 glass-panel px-3 py-1 text-[10px] font-mono text-[var(--text-dim)] uppercase">
                STUDIO LIGHTING: {ambientLight}
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="w-full mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs font-mono text-[var(--text-muted)]">
                {selectedWheel.name}
              </div>
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onNavigateToStudio();
                }}
                className="btn-luxury text-[10px]"
              >
                <Eye size={14} /> Preview 360° Studio
              </button>
            </div>
          </div>

          {/* Right Controls & Estimator Panel */}
          <div className="glass-panel p-6 space-y-6">
            {/* Live Pricing Counter */}
            <div className="p-4 glass-panel-light border-l-2 border-[var(--gold-primary)] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider block">ESTIMATED COMMISSION</span>
                <span className="font-['Cormorant_Garamond'] text-3xl font-light text-[var(--gold-light)]">
                  ${totalPrice.toLocaleString()} <span className="text-xs font-mono text-white/50">USD</span>
                </span>
              </div>
              <DollarSign size={24} className="text-[var(--gold-primary)]" />
            </div>

            {/* Paint Selector with Heritage Tooltips */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono tracking-widest text-[var(--gold-light)] uppercase flex items-center gap-2">
                  <Sliders size={14} /> Bespoke Paint Finish
                </label>
                <span className="text-[10px] font-mono text-[var(--text-dim)]">
                  {selectedPaint.name}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 relative">
                {PAINT_OPTIONS.map((paint) => (
                  <button
                    key={paint.id}
                    onMouseEnter={() => setHoveredPaint(paint)}
                    onMouseLeave={() => setHoveredPaint(null)}
                    onClick={() => {
                      audioEngine.playClick();
                      setSelectedPaint(paint);
                    }}
                    className={`p-2 glass-panel-light rounded flex flex-col items-center gap-1.5 transition-all hover:scale-105 ${
                      selectedPaint.id === paint.id
                        ? 'border-2 border-[var(--gold-primary)] bg-white/10'
                        : 'border border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full shadow-inner border border-white/30"
                      style={{ backgroundColor: paint.hex }}
                    />
                    <span className="text-[9px] font-mono tracking-tighter text-center">
                      {paint.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Hover Tooltip display */}
              {hoveredPaint && (
                <div className="mt-3 p-2.5 glass-panel-light text-[11px] font-mono text-[var(--gold-light)] border-l-2 border-[var(--gold-primary)] animate-modal">
                  <div className="font-bold">{hoveredPaint.name} (+${hoveredPaint.price.toLocaleString()})</div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{hoveredPaint.desc}</div>
                </div>
              )}
            </div>

            {/* Wheel Rim Selector */}
            <div>
              <label className="text-xs font-mono tracking-widest text-[var(--gold-light)] uppercase block mb-2">
                Forged Wheel Geometry
              </label>
              <div className="space-y-1.5">
                {WHEEL_OPTIONS.map((wheel) => (
                  <button
                    key={wheel.id}
                    onClick={() => {
                      audioEngine.playClick();
                      setSelectedWheel(wheel);
                    }}
                    className={`w-full text-left p-2.5 rounded text-xs font-mono flex items-center justify-between transition-all ${
                      selectedWheel.id === wheel.id
                        ? 'bg-[var(--gold-primary)] text-black font-semibold'
                        : 'glass-panel-light text-[var(--text-muted)] hover:text-white'
                    }`}
                  >
                    <span>{wheel.name}</span>
                    <span className="text-[10px]">
                      {wheel.price > 0 ? `+$${wheel.price.toLocaleString()}` : 'Included'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cabin Packages Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-mono tracking-widest text-[var(--gold-light)] uppercase block mb-1">
                Sanctuary Interior Packages
              </label>
              <label className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] cursor-pointer p-2 glass-panel-light rounded">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hasStarlight}
                    onChange={(e) => {
                      audioEngine.playClick();
                      setHasStarlight(e.target.checked);
                    }}
                    className="accent-[var(--gold-primary)]"
                  />
                  <span>Starlight Doors & Headliner</span>
                </div>
                <span className="text-[10px] text-[var(--gold-primary)]">+$18,500</span>
              </label>

              <label className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] cursor-pointer p-2 glass-panel-light rounded">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={hasCanadelWood}
                    onChange={(e) => {
                      audioEngine.playClick();
                      setHasCanadelWood(e.target.checked);
                    }}
                    className="accent-[var(--gold-primary)]"
                  />
                  <span>Open-Pore Canadel Wood Veneers</span>
                </div>
                <span className="text-[10px] text-[var(--gold-primary)]">+$12,000</span>
              </label>
            </div>

            {/* Dossier Generator */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  setIsDossierOpen(true);
                }}
                className="w-full btn-luxury-solid text-[10px] justify-center py-3"
              >
                <Download size={14} /> Generate Bespoke Dossier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dossier Print Modal */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg glass-panel p-8 text-white animate-modal border-2 border-[var(--gold-primary)]">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-gold)] mb-6">
              <div className="font-['Cormorant_Garamond'] text-2xl tracking-[0.3em] uppercase text-[var(--gold-primary)]">
                ROLLS&#8202;·&#8202;ROYCE
              </div>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="text-xs font-mono text-white/60 hover:text-white"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono mb-6">
              <div className="text-center pb-3 border-b border-white/10">
                <div className="text-[10px] text-[var(--gold-primary)] uppercase">CONFIDENTIAL CLIENT DOSSIER</div>
                <div className="text-sm font-bold text-white mt-1">SPECTRE BESPOKE COMMISSION</div>
                <div className="text-[10px] text-[var(--text-dim)]">REF ID: #RR-SPC-2026-991A</div>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-[var(--text-dim)]">Base Spectre Vehicle</span>
                <span>${BASE_PRICE.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-dim)]">Paint: {selectedPaint.name}</span>
                <span>+${selectedPaint.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--text-dim)]">Wheels: {selectedWheel.name}</span>
                <span>+${selectedWheel.price.toLocaleString()}</span>
              </div>
              {hasStarlight && (
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-dim)]">Starlight Doors & Headliner</span>
                  <span>+$18,500</span>
                </div>
              )}
              {hasCanadelWood && (
                <div className="flex justify-between py-1">
                  <span className="text-[var(--text-dim)]">Canadel Wood Veneers</span>
                  <span>+$12,000</span>
                </div>
              )}

              <div className="pt-3 border-t border-[var(--gold-primary)] flex justify-between text-sm font-bold text-[var(--gold-light)]">
                <span>TOTAL ESTIMATED MSRP</span>
                <span>${totalPrice.toLocaleString()} USD</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn-luxury text-[10px]"
              >
                Print Dossier
              </button>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="btn-luxury-solid text-[10px]"
              >
                Save Commission
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
