import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Shield, Sparkles } from 'lucide-react';

export default function VideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changeSpeed = (speed) => {
    if (!videoRef.current) return;
    videoRef.current.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="video-section" className="py-24 px-6 md:px-12 bg-black border-t border-[var(--border-gold)] text-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--gold-primary)] mb-2 flex items-center justify-center gap-2">
            <Sparkles size={12} /> Signature Craftsmanship & Dynamics
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl font-light italic mb-4">
            Power-Assisted Coach Doors in Motion
          </h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">
            Observe the seamless, whisper-quiet closing sequence of Spectre’s laser-welded rear-hinged coach doors — operated effortless at the touch of a button.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative glass-panel p-2 overflow-hidden shadow-2xl group border border-[var(--border-gold)]">
          <video
            ref={videoRef}
            src="/videos/Doors_close_running_car_202605192052 (1).mp4"
            className="w-full aspect-video object-cover rounded cursor-pointer"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {/* Custom Controls Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 glass-panel p-3 flex flex-wrap items-center justify-between gap-4 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2 border border-[var(--border-gold)] rounded-full hover:bg-[var(--gold-primary)] hover:text-black text-[var(--gold-primary)] transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 text-[var(--text-muted)] hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <span className="text-xs font-mono text-[var(--gold-light)] font-medium">
                POWER COACH DOORS — LIVE DEMO
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[var(--text-dim)]">SPEED:</span>
              {[0.5, 1.0, 1.5, 2.0].map((speed) => (
                <button
                  key={speed}
                  onClick={() => changeSpeed(speed)}
                  className={`px-2 py-0.5 rounded ${
                    playbackSpeed === speed
                      ? 'bg-[var(--gold-primary)] text-black font-bold'
                      : 'text-[var(--text-muted)] hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}

              <button
                onClick={toggleFullscreen}
                className="p-1.5 text-[var(--text-muted)] hover:text-white ml-2"
                title="Fullscreen"
              >
                <Maximize size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Commentary Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--text-muted)]">
          <div className="glass-panel-light p-4">
            <div className="text-white font-medium mb-1 text-[var(--gold-light)] flex items-center gap-2">
              <Shield size={14} /> G-Sensor Telemetry
            </div>
            <p className="text-[11px] leading-relaxed">
              In-built G-sensors measure slope pitch and angle during closing, adjusting motor resistance so doors shut at a uniform, soothing velocity regardless of incline.
            </p>
          </div>

          <div className="glass-panel-light p-4">
            <div className="text-white font-medium mb-1 text-[var(--gold-light)] flex items-center gap-2">
              <Sparkles size={14} /> Effortless Brake Tap
            </div>
            <p className="text-[11px] leading-relaxed">
              When the driver depresses the brake pedal, the driver’s side coach door automatically closes quietly, welcoming the owner into the sanctuary of the cabin.
            </p>
          </div>

          <div className="glass-panel-light p-4">
            <div className="text-white font-medium mb-1 text-[var(--gold-light)] flex items-center gap-2">
              <Shield size={14} /> Ultrasonic Obstacle Radar
            </div>
            <p className="text-[11px] leading-relaxed">
              Radar sensors on door handles prevent door opening or closing if obstacles or oncoming hazards are detected within range.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
