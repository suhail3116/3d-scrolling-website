// Web Audio API Synthesizer for Luxury Rolls-Royce Soundscape
class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.humOsc = null;
    this.humGain = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }

  // Soft luxury metallic click sound
  playClick() {
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.audioCtx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.05);
  }

  // Smooth EV acceleration hum pitch shift based on speed/frame velocity
  playEvHum(velocity = 1) {
    this.init();
    if (!this.audioCtx) return;

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    // Low sub-bass frequency hum (55Hz to 120Hz)
    const baseFreq = 55 + Math.min(velocity * 10, 80);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.2);
  }
}

export const audioEngine = new SoundEngine();
