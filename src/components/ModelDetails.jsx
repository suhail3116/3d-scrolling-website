import React, { useState } from 'react';
import { Zap, Shield, Sparkles, Wind, Gauge, Compass, Layers, Sliders, CheckCircle2, Info } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine.js';

const STAT_DETAILS = {
  power: {
    title: '584 BHP Dual Electric Powertrain',
    desc: 'Separated front (190 hp) and rear (390 hp) electric motors deliver effortless momentum without gear shift pauses, matching the effortless waftability of a traditional 6.75L V12.'
  },
  torque: {
    title: '900 Nm Instant Torque Delivery',
    desc: 'Maximum torque is available from 0 RPM. Accelerating from a standstill requires zero spool time, delivering a whisper-silent surge of relentless power.'
  },
  accel: {
    title: '0 to 60 mph in 4.4 Seconds',
    desc: 'Despite a unladen curb weight of nearly 3 tonnes, Spectre launches with sports car agility, maintaining absolute cabin serenity throughout rapid acceleration.'
  },
  range: {
    title: '530 km WLTP Electric Range',
    desc: 'Powered by a 102 kWh lithium-ion battery pack operating on 400V architecture, supporting up to 195 kW DC fast charging to add 100 km of range in 9 minutes.'
  }
};

export default function ModelDetails() {
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' | 'imperial'
  const [activeStat, setActiveStat] = useState(null);

  return (
    <section id="specs-section" className="py-24 px-6 md:px-12 bg-[#050508] border-t border-[var(--border-gold)] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--gold-primary)] mb-2 flex items-center gap-2">
              <Sparkles size={12} /> Engineering Blueprint & Specifications
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light italic">
              Rolls-Royce Spectre — Technical Mastery
            </h2>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center gap-2 glass-panel p-1.5 self-start md:self-auto">
            <span className="text-[10px] font-mono text-[var(--text-dim)] px-2 uppercase">UNITS:</span>
            <button
              onClick={() => {
                audioEngine.playClick();
                setUnitSystem('metric');
              }}
              className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                unitSystem === 'metric'
                  ? 'bg-[var(--gold-primary)] text-black font-bold'
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              METRIC
            </button>
            <button
              onClick={() => {
                audioEngine.playClick();
                setUnitSystem('imperial');
              }}
              className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                unitSystem === 'imperial'
                  ? 'bg-[var(--gold-primary)] text-black font-bold'
                  : 'text-[var(--text-muted)] hover:text-white'
              }`}
            >
              IMPERIAL
            </button>
          </div>
        </div>

        {/* Highlight Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div
            onClick={() => {
              audioEngine.playClick();
              setActiveStat(STAT_DETAILS.power);
            }}
            className="glass-panel p-6 border-l-2 border-l-[var(--gold-primary)] hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
              <span>POWER OUTPUT</span>
              <Info size={13} className="text-[var(--gold-primary)] opacity-60 group-hover:opacity-100" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[var(--gold-light)] font-light">
              584 <span className="text-sm font-sans text-[var(--text-muted)]">BHP</span>
            </div>
            <div className="text-[11px] font-mono text-white/50 mt-1">430 kW Dual Electric Motors</div>
          </div>

          <div
            onClick={() => {
              audioEngine.playClick();
              setActiveStat(STAT_DETAILS.torque);
            }}
            className="glass-panel p-6 border-l-2 border-l-[var(--gold-primary)] hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
              <span>TORQUE</span>
              <Info size={13} className="text-[var(--gold-primary)] opacity-60 group-hover:opacity-100" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[var(--gold-light)] font-light">
              {unitSystem === 'metric' ? '900 Nm' : '664 lb-ft'}
            </div>
            <div className="text-[11px] font-mono text-white/50 mt-1">Instant zero-rpm delivery</div>
          </div>

          <div
            onClick={() => {
              audioEngine.playClick();
              setActiveStat(STAT_DETAILS.accel);
            }}
            className="glass-panel p-6 border-l-2 border-l-[var(--gold-primary)] hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
              <span>ACCELERATION</span>
              <Info size={13} className="text-[var(--gold-primary)] opacity-60 group-hover:opacity-100" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[var(--gold-light)] font-light">
              {unitSystem === 'metric' ? '4.5 s' : '4.4 s'}
            </div>
            <div className="text-[11px] font-mono text-white/50 mt-1">0 to {unitSystem === 'metric' ? '100 km/h' : '60 mph'}</div>
          </div>

          <div
            onClick={() => {
              audioEngine.playClick();
              setActiveStat(STAT_DETAILS.range);
            }}
            className="glass-panel p-6 border-l-2 border-l-[var(--gold-primary)] hover:scale-[1.02] transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center text-xs font-mono text-[var(--text-dim)] uppercase tracking-wider mb-2">
              <span>ELECTRIC RANGE</span>
              <Info size={13} className="text-[var(--gold-primary)] opacity-60 group-hover:opacity-100" />
            </div>
            <div className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[var(--gold-light)] font-light">
              {unitSystem === 'metric' ? '530 km' : '329 mi'}
            </div>
            <div className="text-[11px] font-mono text-white/50 mt-1">WLTP Combined Cycle</div>
          </div>
        </div>

        {/* Detailed Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Card 1: Drivetrain */}
          <div className="glass-panel p-8 flex flex-col justify-between hover:border-[var(--gold-primary)] transition-all group">
            <div>
              <div className="w-12 h-12 rounded border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] mb-6 group-hover:bg-[var(--gold-primary)] group-hover:text-black transition-colors">
                <Zap size={22} />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-3">
                Whisper EV Architecture
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                Separated front and rear electric motors provide intelligent all-wheel drive, paired with a massive 102 kWh lithium-ion battery mounted underneath the floor pan for silent glide dynamics.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-4 border-t border-white/10">
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> 195 kW DC Fast Charging (10-80% in 34 mins)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> Regenerative Brake Telemetry</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> Active Thermal Preconditioning</li>
            </ul>
          </div>

          {/* Card 2: Planar Chassis */}
          <div className="glass-panel p-8 flex flex-col justify-between hover:border-[var(--gold-primary)] transition-all group">
            <div>
              <div className="w-12 h-12 rounded border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] mb-6 group-hover:bg-[var(--gold-primary)] group-hover:text-black transition-colors">
                <Gauge size={22} />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-3">
                Planar Suspension System
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                A orchestrator of hardware and software that reads road surfaces in real-time. It automatically decouples the anti-roll bars on straight roads and stiffens damper valving in corners.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-4 border-t border-white/10">
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> Magic Carpet Ride Acoustics</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> 4-Wheel Active Steering System</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> 30% Increased Torsional Rigidity</li>
            </ul>
          </div>

          {/* Card 3: Aero & Starlight */}
          <div className="glass-panel p-8 flex flex-col justify-between hover:border-[var(--gold-primary)] transition-all group">
            <div>
              <div className="w-12 h-12 rounded border border-[var(--border-gold)] flex items-center justify-center text-[var(--gold-primary)] mb-6 group-hover:bg-[var(--gold-primary)] group-hover:text-black transition-colors">
                <Wind size={22} />
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-3">
                Aero Drag & Starlight Interior
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                With a drag coefficient of just 0.25 Cd, Spectre is the most aerodynamic Rolls-Royce in history. Inside, the cabin features 4,796 optical stars woven directly into the Starlight Doors.
              </p>
            </div>
            <ul className="space-y-2 text-xs font-mono text-[var(--text-muted)] pt-4 border-t border-white/10">
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> Re-sculpted Spirit of Ecstasy</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> Illuminated Fascia with 5,500 Starlets</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={13} className="text-[var(--gold-primary)]" /> Hand-polished Canadel Wood Veneers</li>
            </ul>
          </div>
        </div>

        {/* Comprehensive Specs Table */}
        <div className="glass-panel p-8">
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-6 border-b border-white/10 pb-4">
            Technical Specification Matrix
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Overall Length</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '5,453 mm' : '214.6 in'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Overall Width (with mirrors)</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '2,080 mm' : '81.8 in'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Overall Height (unladen)</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '1,559 mm' : '61.4 in'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Wheelbase</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '3,210 mm' : '126.3 in'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Curb Weight (Unladen)</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '2,975 kg' : '6,558 lbs'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Gross Vehicle Weight</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '3,400 kg' : '7,495 lbs'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Turning Circle</span>
              <span className="font-mono text-white">{unitSystem === 'metric' ? '12.7 m' : '41.6 ft'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-[var(--text-dim)] font-mono">Drag Coefficient</span>
              <span className="font-mono text-[var(--gold-light)] font-bold">0.25 Cd</span>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-Explanation Modal */}
      {activeStat && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-panel p-6 border-l-4 border-l-[var(--gold-primary)] animate-modal">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[var(--gold-primary)] text-xs font-mono tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles size={12} /> Engineering Telemetry
              </div>
              <button
                onClick={() => setActiveStat(null)}
                className="text-white/60 hover:text-white text-xs font-mono"
              >
                [CLOSE]
              </button>
            </div>
            <h3 className="font-['Cormorant_Garamond'] text-xl text-white font-light mb-2">
              {activeStat.title}
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
              {activeStat.desc}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveStat(null)}
                className="btn-luxury text-[10px]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
