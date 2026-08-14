import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Zap, Shield } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine.js';

const MODELS = [
  {
    id: 'spectre',
    name: 'Spectre',
    tag: 'Ultra-Luxury EV Super-Coupé',
    powertrain: 'Dual Electric Motors (102 kWh)',
    power: '584 BHP',
    torque: '900 Nm',
    accel: '4.4 sec',
    aero: '0.25 Cd (Record Lowest)',
    range: '530 km (WLTP)',
    cabinSound: '0.0 dB Silent Glide',
    price: '$422,750 MSRP',
    isCurrent: true
  },
  {
    id: 'phantom',
    name: 'Phantom VIII',
    tag: 'Flagship Grand Sedan',
    powertrain: '6.75L Twin-Turbo V12',
    power: '563 BHP',
    torque: '900 Nm',
    accel: '5.1 sec',
    aero: '0.38 Cd',
    range: '620 km (Petrol Tank)',
    cabinSound: '12.0 dB Whisper Quiet',
    price: '$493,000 MSRP',
    isCurrent: false
  },
  {
    id: 'ghost',
    name: 'Ghost II',
    tag: 'Post-Opulent Luxury Sedan',
    powertrain: '6.75L Twin-Turbo V12',
    power: '563 BHP',
    torque: '850 Nm',
    accel: '4.6 sec',
    aero: '0.34 Cd',
    range: '580 km (Petrol Tank)',
    cabinSound: '14.0 dB Whisper Quiet',
    price: '$354,750 MSRP',
    isCurrent: false
  },
  {
    id: 'cullinan',
    name: 'Cullinan II',
    tag: 'All-Terrain Luxury SUV',
    powertrain: '6.75L Twin-Turbo V12 AWD',
    power: '563 BHP',
    torque: '850 Nm',
    accel: '4.9 sec',
    aero: '0.41 Cd',
    range: '540 km (Petrol Tank)',
    cabinSound: '16.0 dB Sound Isolation',
    price: '$391,750 MSRP',
    isCurrent: false
  }
];

export default function ModelComparisonModal({ isOpen, onClose }) {
  const [selectedModel, setSelectedModel] = useState(MODELS[1]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel p-6 md:p-10 text-white animate-modal shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-gold)] pb-4 mb-6">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--gold-primary)] flex items-center gap-2">
              <Sparkles size={12} /> Model Portfolio Lineup Matrix
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light italic text-white mt-1">
              Rolls-Royce Flagship Comparison
            </h2>
          </div>
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Model Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-white/10">
          <span className="text-xs font-mono text-[var(--text-dim)] uppercase mr-2">COMPARE SPECTRE WITH:</span>
          {MODELS.filter(m => !m.isCurrent).map((m) => (
            <button
              key={m.id}
              onClick={() => {
                audioEngine.playClick();
                setSelectedModel(m);
              }}
              className={`px-4 py-2 text-xs font-mono rounded transition-all whitespace-nowrap ${
                selectedModel.id === m.id
                  ? 'bg-[var(--gold-primary)] text-black font-bold'
                  : 'glass-panel-light text-[var(--text-muted)] hover:text-white'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Comparison Side-by-Side Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spectre Card (Current) */}
          <div className="glass-panel p-6 border-2 border-[var(--gold-primary)] bg-gradient-to-b from-[rgba(201,169,110,0.1)] to-transparent">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest text-[var(--gold-primary)] uppercase bg-[var(--gold-primary)]/20 px-2 py-0.5 rounded">
                ★ FEATURED MODEL
              </span>
              <span className="text-xs font-mono text-[var(--gold-light)] font-bold">{MODELS[0].price}</span>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-1">
              {MODELS[0].name}
            </h3>
            <p className="text-xs font-mono text-[var(--text-dim)] mb-6">{MODELS[0].tag}</p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Powertrain</span>
                <span className="text-[var(--gold-light)] font-bold">{MODELS[0].powertrain}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Power Output</span>
                <span className="text-white font-bold">{MODELS[0].power}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Peak Torque</span>
                <span className="text-white font-bold">{MODELS[0].torque}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">0 to 60 mph</span>
                <span className="text-emerald-400 font-bold">{MODELS[0].accel} (Fastest)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Drag Coefficient</span>
                <span className="text-emerald-400 font-bold">{MODELS[0].aero}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Acoustic Decibels</span>
                <span className="text-emerald-400 font-bold">{MODELS[0].cabinSound}</span>
              </div>
            </div>
          </div>

          {/* Selected Comparison Model Card */}
          <div className="glass-panel p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono tracking-widest text-[var(--text-dim)] uppercase">
                PORTFOLIO COMPARISON
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)] font-bold">{selectedModel.price}</span>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-1">
              {selectedModel.name}
            </h3>
            <p className="text-xs font-mono text-[var(--text-dim)] mb-6">{selectedModel.tag}</p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Powertrain</span>
                <span className="text-white">{selectedModel.powertrain}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Power Output</span>
                <span className="text-white">{selectedModel.power}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Peak Torque</span>
                <span className="text-white">{selectedModel.torque}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">0 to 60 mph</span>
                <span className="text-[var(--text-muted)]">{selectedModel.accel}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Drag Coefficient</span>
                <span className="text-[var(--text-muted)]">{selectedModel.aero}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-[var(--text-dim)]">Acoustic Decibels</span>
                <span className="text-[var(--text-muted)]">{selectedModel.cabinSound}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="btn-luxury"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
