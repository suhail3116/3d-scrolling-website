import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Play, Pause, Compass, Eye, Sparkles, Shield, Zap, Cpu, Layers, MoveHorizontal } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine.js';

const TOTAL_FRAMES = 240;
const CHUNK_SIZE = 12;

// Hotspots mapped onto frame indexes & relative canvas % position
const HOTSPOTS = [
  {
    id: 'grille',
    title: 'Illuminated Pantheon Grille',
    frameRange: [0, 45],
    posX: 50,
    posY: 45,
    subtitle: 'Aero-optimized stainless steel vanes with 22 LED illuminators',
    details: 'The widest grille ever fitted to a Rolls-Royce. Vanes are polished to a mirror shine and subtly angled to guide airflow into Spectre’s aero channels.',
    icon: Sparkles
  },
  {
    id: 'spirit',
    title: 'Aerodynamic Spirit of Ecstasy',
    frameRange: [0, 35],
    posX: 50,
    posY: 28,
    subtitle: 'Re-sculpted mascot tuned over 830 hours of wind tunnel testing',
    details: 'Lower stance and tucked robes decrease drag to help achieve a record-breaking 0.25 Cd drag coefficient — the sleekest Rolls-Royce in history.',
    icon: Compass
  },
  {
    id: 'doors',
    title: 'Power-Assisted Coach Doors',
    frameRange: [60, 150],
    posX: 62,
    posY: 52,
    subtitle: 'Laser-welded aluminum single-piece side structure',
    details: '1.5-meter long rear-hinged coach doors close effortlessly at the touch of a button or driver brake pedal tap, lined with hand-fitted Canadel wood & leather.',
    icon: Shield
  },
  {
    id: 'drivetrain',
    title: 'Whisper EV Battery & Chassis',
    frameRange: [120, 220],
    posX: 42,
    posY: 68,
    subtitle: '700 kg acoustic barrier battery integrated into spaceframe',
    details: 'The 102 kWh lithium-ion battery functions as a massive soundproofing barrier beneath the cabin floor, providing supreme silence and 30% stiffer chassis dynamics.',
    icon: Zap
  },
  {
    id: 'planar',
    title: 'Planar Suspension Architecture',
    frameRange: [180, 240],
    posX: 72,
    posY: 66,
    subtitle: 'Predictive damper telemetry with road-reading cameras',
    details: 'Automatically decouples anti-roll bars on straight roads for smooth cruising, then instantly re-engages in corners to eliminate body roll.',
    icon: Cpu
  }
];

export default function HeroCanvasViewer({ onNavigateToSpecs }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const framesRef = useRef(new Array(TOTAL_FRAMES).fill(null));

  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isXrayMode, setIsXrayMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);

  // Helper frame path
  const getFramePath = (index) => {
    const num = String(index + 1).padStart(3, '0');
    return `/rolls_set/ezgif-frame-${num}.jpg`;
  };

  // Draw current frame onto canvas with optional X-Ray overlay
  const renderFrame = useCallback((frameIdx, xray = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = framesRef.current[frameIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover scaling
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      // X-Ray Mode Schematic Glow Overlay
      if (xray) {
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.fillRect(0, 0, cw, ch);

        // Blueprint Grid overlay
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x < cw; x += 40) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, ch);
          ctx.stroke();
        }
        for (let y = 0; y < ch; y += 40) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(cw, y);
          ctx.stroke();
        }

        // Structural Battery Blueprint Box
        ctx.strokeStyle = '#06b6d4';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#06b6d4';
        ctx.lineWidth = 2;
        const bx = cw * 0.3;
        const bw = cw * 0.4;
        const by = ch * 0.58;
        const bh = ch * 0.18;
        ctx.strokeRect(bx, by, bw, bh);

        ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
        ctx.fillRect(bx, by, bw, bh);

        // Text Schematics
        ctx.fillStyle = '#67e8f9';
        ctx.font = '11px monospace';
        ctx.fillText('[ 102 kWh LITHIUM-ION ACOUSTIC SHIELD BATTERY ]', bx + 10, by + 25);
        ctx.fillText('700 KG STRUCTURAL RIGIDITY CORE', bx + 10, by + 45);

        ctx.shadowBlur = 0;
      }
    }
  }, []);

  // Preload images in idle chunks
  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (index) => {
      return new Promise((resolve) => {
        if (framesRef.current[index]) {
          resolve(framesRef.current[index]);
          return;
        }
        const img = new Image();
        img.onload = () => {
          if (!isCancelled) {
            framesRef.current[index] = img;
            setLoadedCount((prev) => {
              const newCount = prev + 1;
              if (newCount === 1) renderFrame(0, isXrayMode);
              if (newCount >= TOTAL_FRAMES * 0.15) setIsLoading(false);
              return newCount;
            });
          }
          resolve(img);
        };
        img.onerror = () => resolve(null);
        img.src = getFramePath(index);
      });
    };

    const loadChunk = async (startIndex) => {
      if (startIndex >= TOTAL_FRAMES || isCancelled) return;
      const end = Math.min(startIndex + CHUNK_SIZE, TOTAL_FRAMES);
      const promises = [];
      for (let i = startIndex; i < end; i++) {
        promises.push(loadSingleImage(i));
      }
      await Promise.all(promises);

      if (!isCancelled) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => loadChunk(end));
        } else {
          setTimeout(() => loadChunk(end), 30);
        }
      }
    };

    // Load first frame immediately
    loadSingleImage(0).then(() => {
      loadChunk(1);
    });

    return () => {
      isCancelled = true;
    };
  }, [renderFrame, isXrayMode]);

  // Canvas Resize handler
  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth || window.innerWidth;
        canvasRef.current.height = containerRef.current.clientHeight || window.innerHeight;
        renderFrame(currentFrame, isXrayMode);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [currentFrame, renderFrame, isXrayMode]);

  // Render on frame index change
  useEffect(() => {
    renderFrame(currentFrame, isXrayMode);
  }, [currentFrame, renderFrame, isXrayMode]);

  // Scroll listener for sticky 360 scrubbing
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTrackRef.current || isPlaying || isDragging) return;
      const track = scrollTrackRef.current;
      const rect = track.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const scrollPct = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      const targetFrame = Math.min(Math.floor(scrollPct * TOTAL_FRAMES), TOTAL_FRAMES - 1);

      if (targetFrame !== currentFrame) {
        setHasInteracted(true);
        audioEngine.playEvHum(Math.abs(targetFrame - currentFrame));
        setCurrentFrame(targetFrame);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPlaying, isDragging, currentFrame]);

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 45);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Mouse / Touch Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasInteracted(true);
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX);
    dragStartFrame.current = currentFrame;
    setIsPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const deltaX = clientX - dragStartX.current;
    const frameDelta = Math.floor(deltaX / 4);
    let newFrame = (dragStartFrame.current - frameDelta) % TOTAL_FRAMES;
    if (newFrame < 0) newFrame += TOTAL_FRAMES;

    if (newFrame !== currentFrame) {
      audioEngine.playEvHum(1);
      setCurrentFrame(newFrame);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Jump to specific angle presets
  const jumpToPreset = (angleDeg) => {
    setHasInteracted(true);
    audioEngine.playClick();
    setIsPlaying(false);
    const targetIdx = Math.round((angleDeg / 360) * TOTAL_FRAMES) % TOTAL_FRAMES;
    setCurrentFrame(targetIdx);
  };

  const loadingPct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div ref={scrollTrackRef} className="relative w-full h-[350vh] bg-black text-white select-none">
      {/* Sticky Viewport Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Preloader Screen */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-700">
            <div className="font-['Cormorant_Garamond'] text-3xl md:text-5xl tracking-[0.4em] text-[var(--gold-primary)] uppercase font-light mb-6">
              Rolls&#8202;·&#8202;Royce
            </div>
            <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] transition-all duration-300"
                style={{ width: `${loadingPct}%` }}
              />
            </div>
            <div className="mt-4 font-mono text-xs tracking-[0.3em] text-[var(--gold-primary)]">
              LOADING 360° ATELIER &nbsp;{loadingPct}%
            </div>
          </div>
        )}

        {/* Canvas Area */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing relative"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <canvas ref={canvasRef} className="w-full h-full object-cover block" />

          {/* Drag Gesture Hint Overlay */}
          {!hasInteracted && !isLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center gap-3 animate-float transition-opacity duration-500">
              <div className="p-4 rounded-full glass-panel border-2 border-[var(--gold-primary)] text-[var(--gold-primary)] shadow-[0_0_25px_var(--gold-glow)]">
                <MoveHorizontal size={28} className="animate-pulse" />
              </div>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--gold-light)] glass-panel px-4 py-1.5 rounded">
                DRAG HORIZONTALLY TO ROTATE 360°
              </span>
            </div>
          )}

          {/* Hotspot Pins Overlay */}
          {HOTSPOTS.map((hotspot) => {
            const isVisible =
              currentFrame >= hotspot.frameRange[0] &&
              currentFrame <= hotspot.frameRange[1];

            if (!isVisible) return null;

            return (
              <div
                key={hotspot.id}
                style={{ left: `${hotspot.posX}%`, top: `${hotspot.posY}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setHasInteracted(true);
                  audioEngine.playClick();
                  setActiveHotspot(hotspot);
                }}
                className="hotspot-pin group"
                title={hotspot.title}
              >
                <hotspot.icon size={13} className="text-[var(--gold-primary)] group-hover:text-black" />
              </div>
            );
          })}
        </div>

        {/* Overlay Title Text */}
        <div className="absolute top-28 left-6 md:left-12 z-20 pointer-events-none max-w-lg">
          <div className="text-[10px] font-mono tracking-[0.35em] uppercase text-[var(--gold-primary)] mb-2 flex items-center gap-2">
            <Sparkles size={12} /> Ultra-Luxury Electric Super-Coupé
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl md:text-5xl italic font-light tracking-wide text-white drop-shadow-md">
            The Pinnacle of Perfection
          </h1>
          <p className="text-xs font-mono text-[var(--text-muted)] tracking-widest mt-2 hidden sm:block">
            SCROLL DOWN OR DRAG TO ROTATE 360°
          </p>
        </div>

        {/* Control Bar Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-4xl glass-panel p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          {/* Left: Play/Pause & Slider */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button
              onClick={() => {
                setHasInteracted(true);
                audioEngine.playClick();
                setIsPlaying(!isPlaying);
              }}
              className="p-2.5 border border-[var(--border-gold)] rounded-full hover:bg-[var(--gold-primary)] hover:text-black text-[var(--gold-primary)] transition-all flex items-center justify-center shrink-0"
              title={isPlaying ? "Pause Rotation" : "Auto 360 Spin"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <div className="flex-1 md:w-48 flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-dim)]">
                <span>0° FRONT</span>
                <span className="text-[var(--gold-primary)] font-bold">
                  FRAME {currentFrame + 1} / {TOTAL_FRAMES}
                </span>
                <span>360° ROTATION</span>
              </div>
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={currentFrame}
                onChange={(e) => {
                  setHasInteracted(true);
                  setIsPlaying(false);
                  setCurrentFrame(parseInt(e.target.value, 10));
                }}
                className="w-full accent-[var(--gold-primary)] bg-white/10 h-1 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Center: Angle Presets & X-Ray Toggle */}
          <div className="flex items-center gap-2 text-xs font-mono">
            {/* X-Ray Structural View Toggle */}
            <button
              onClick={() => {
                setHasInteracted(true);
                audioEngine.playClick();
                setIsXrayMode(!isXrayMode);
              }}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-all text-[11px] font-bold ${
                isXrayMode
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                  : 'border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              <Layers size={13} /> {isXrayMode ? 'X-RAY ACTIVE' : 'X-RAY BLUEPRINT'}
            </button>

            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => jumpToPreset(0)}
                className="px-2 py-1 border border-white/10 hover:border-[var(--gold-primary)] rounded text-[var(--text-muted)] hover:text-white transition-all text-[11px]"
              >
                FRONT
              </button>
              <button
                onClick={() => jumpToPreset(90)}
                className="px-2 py-1 border border-white/10 hover:border-[var(--gold-primary)] rounded text-[var(--text-muted)] hover:text-white transition-all text-[11px]"
              >
                PROFILE
              </button>
              <button
                onClick={() => jumpToPreset(180)}
                className="px-2 py-1 border border-white/10 hover:border-[var(--gold-primary)] rounded text-[var(--text-muted)] hover:text-white transition-all text-[11px]"
              >
                REAR
              </button>
            </div>
          </div>

          {/* Right: Full Specs Jump */}
          <button
            onClick={() => {
              setHasInteracted(true);
              audioEngine.playClick();
              onNavigateToSpecs();
            }}
            className="btn-luxury shrink-0 text-[10px] py-2 px-3"
          >
            <Eye size={14} /> Specs Blueprint
          </button>
        </div>

        {/* Hotspot Active Modal */}
        {activeHotspot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="w-full max-w-md glass-panel p-6 border-l-4 border-l-[var(--gold-primary)] animate-modal">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[var(--gold-primary)] text-xs font-mono tracking-widest uppercase">
                  <activeHotspot.icon size={14} /> Engineering Hotspot
                </div>
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveHotspot(null);
                  }}
                  className="text-white/60 hover:text-white text-xs font-mono"
                >
                  [CLOSE]
                </button>
              </div>
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-white mb-1">
                {activeHotspot.title}
              </h3>
              <p className="text-xs text-[var(--gold-light)] font-mono mb-4">
                {activeHotspot.subtitle}
              </p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                {activeHotspot.details}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    audioEngine.playClick();
                    setActiveHotspot(null);
                  }}
                  className="btn-luxury text-[10px]"
                >
                  Continue Inspection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
