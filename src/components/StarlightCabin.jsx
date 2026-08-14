import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Moon, Sun, Sliders, Zap } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine.js';

const CONSTELLATIONS = [
  { id: 'ursa', name: 'Ursa Major' },
  { id: 'orion', name: 'Orion’s Belt' },
  { id: 'cassiopeia', name: 'Cassiopeia' },
  { id: 'drift', name: 'Galactic Drift' }
];

const STAR_COLORS = [
  { id: 'gold', name: 'Warm Gold', hex: '#e8d5a3' },
  { id: 'white', name: 'Diamond White', hex: '#ffffff' },
  { id: 'violet', name: 'Cosmic Violet', hex: '#c084fc' },
  { id: 'ice', name: 'Ice Blue', hex: '#38bdf8' }
];

export default function StarlightCabin() {
  const canvasRef = useRef(null);
  const [isNight, setIsNight] = useState(true);
  const [starBrightness, setStarBrightness] = useState(80);
  const [selectedColor, setSelectedColor] = useState(STAR_COLORS[0]);
  const [selectedConstellation, setSelectedConstellation] = useState('ursa');
  const [meteors, setMeteors] = useState([]);

  // Generate 200 random star points inside canvas
  const starsRef = useRef([]);

  useEffect(() => {
    const stars = [];
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }
    starsRef.current = stars;
  }, []);

  // Trigger shooting star
  const triggerShootingStar = () => {
    audioEngine.playClick();
    const newMeteor = {
      x: Math.random() * 0.4 + 0.1,
      y: Math.random() * 0.3 + 0.1,
      dx: 0.015,
      dy: 0.008,
      length: 0.15,
      life: 1.0
    };
    setMeteors((prev) => [...prev, newMeteor]);
  };

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Background Gradient
      if (isNight) {
        const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w);
        bgGrad.addColorStop(0, '#0c0c16');
        bgGrad.addColorStop(1, '#030306');
        ctx.fillStyle = bgGrad;
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#2a2a35');
        bgGrad.addColorStop(1, '#0e0e14');
        ctx.fillStyle = bgGrad;
      }
      ctx.fillRect(0, 0, w, h);

      if (isNight) {
        // Draw Stars
        const opacityMult = starBrightness / 100;
        starsRef.current.forEach((star) => {
          star.phase += star.speed;
          const currentAlpha = (Math.sin(star.phase) * 0.35 + 0.65) * opacityMult;

          ctx.beginPath();
          ctx.arc(star.x * w, star.y * h, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = selectedColor.hex;
          ctx.globalAlpha = currentAlpha;
          ctx.shadowBlur = star.radius * 4;
          ctx.shadowColor = selectedColor.hex;
          ctx.fill();
        });
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;

        // Draw Meteors
        setMeteors((prevMeteors) => {
          return prevMeteors
            .map((m) => {
              const startX = m.x * w;
              const startY = m.y * h;
              const endX = (m.x + m.dx * m.length * 10) * w;
              const endY = (m.y + m.dy * m.length * 10) * h;

              const grad = ctx.createLinearGradient(startX, startY, endX, endY);
              grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
              grad.addColorStop(1, 'transparent');

              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.lineTo(endX, endY);
              ctx.strokeStyle = grad;
              ctx.lineWidth = 2;
              ctx.stroke();

              return { ...m, x: m.x + m.dx, y: m.y + m.dy, life: m.life - 0.04 };
            })
            .filter((m) => m.life > 0);
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isNight, starBrightness, selectedColor]);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.parentElement.clientWidth;
        canvasRef.current.height = canvasRef.current.parentElement.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="starlight-section" className="py-24 px-6 md:px-12 bg-[#040407] border-t border-[var(--border-gold)] text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--gold-primary)] mb-2 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Handcrafted Celestial Craftsmanship
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light italic mb-3">
            Starlight Headliner Sanctuary
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed">
            Experience the magical cabin atmosphere featuring 4,796 optical stars hand-fitted into the leather ceiling and inner door panels.
          </p>
        </div>

        {/* Interactive Simulator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Canvas Viewport */}
          <div className="lg:col-span-2 glass-panel p-4 relative min-h-[380px] flex flex-col justify-between overflow-hidden group">
            <div className="w-full h-full relative rounded overflow-hidden">
              <canvas ref={canvasRef} className="w-full h-[360px] block rounded" />

              {/* Day/Night Badge */}
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 text-[10px] font-mono text-[var(--gold-light)] flex items-center gap-2">
                {isNight ? <Moon size={12} className="text-[var(--gold-primary)]" /> : <Sun size={12} className="text-amber-400" />}
                {isNight ? 'STARLIGHT NIGHT MODE (4,796 OPTICAL STARS)' : 'DAYLIGHT AMBIANCE'}
              </div>

              {/* Meteor Trigger Button */}
              {isNight && (
                <button
                  onClick={triggerShootingStar}
                  className="absolute bottom-4 right-4 btn-luxury text-[10px] py-1.5 px-3"
                >
                  <Zap size={12} /> Trigger Shooting Star
                </button>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="glass-panel p-6 space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[var(--gold-light)] uppercase mb-4 flex items-center gap-2">
                <Sliders size={14} /> Cabin Atmosphere Controls
              </h3>

              {/* Day / Night Switcher */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setIsNight(true);
                  }}
                  className={`flex-1 py-2 text-xs font-mono rounded flex items-center justify-center gap-2 transition-all ${
                    isNight
                      ? 'bg-[var(--gold-primary)] text-black font-bold'
                      : 'glass-panel-light text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  <Moon size={14} /> Night Mode
                </button>

                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setIsNight(false);
                  }}
                  className={`flex-1 py-2 text-xs font-mono rounded flex items-center justify-center gap-2 transition-all ${
                    !isNight
                      ? 'bg-[var(--gold-primary)] text-black font-bold'
                      : 'glass-panel-light text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  <Sun size={14} /> Day Ambiance
                </button>
              </div>

              {/* Star Brightness Slider */}
              {isNight && (
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[var(--text-dim)]">STAR ILLUMINATION</span>
                    <span className="text-[var(--gold-primary)]">{starBrightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={starBrightness}
                    onChange={(e) => setStarBrightness(parseInt(e.target.value, 10))}
                    className="w-full accent-[var(--gold-primary)] bg-white/10 h-1 rounded cursor-pointer"
                  />
                </div>
              )}

              {/* Star Color Temperature */}
              {isNight && (
                <div className="space-y-2">
                  <label className="text-xs font-mono text-[var(--text-dim)] block mb-2">
                    OPTICAL FIBER SPECTRUM
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STAR_COLORS.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => {
                          audioEngine.playClick();
                          setSelectedColor(col);
                        }}
                        className={`p-2 rounded text-[10px] font-mono flex items-center gap-2 border transition-all ${
                          selectedColor.id === col.id
                            ? 'border-[var(--gold-primary)] bg-white/10 text-white font-semibold'
                            : 'border-white/5 text-[var(--text-muted)] hover:text-white'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col.hex }} />
                        {col.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-[var(--text-dim)] flex items-center justify-between">
              <span>Bespoke Starlight Package</span>
              <span className="text-[var(--gold-light)]">+ $18,500 MSRP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
