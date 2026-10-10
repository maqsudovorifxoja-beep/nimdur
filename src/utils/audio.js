// Web Audio API sound generator for workout countdowns and cues
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBeep(freq = 440, duration = 0.15, type = 'sine') {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback silently catches if blocked by browser policy
    }
  }

  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 chord
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playBeep(freq, 0.25, 'triangle');
        }, idx * 120);
      });
    } catch {
      // Ignore audio error
    }
  }

  playCountdown() {
    this.playBeep(600, 0.12, 'sine');
  }

  playGo() {
    this.playBeep(880, 0.35, 'square');
  }

  playMessagePop() {
    this.playBeep(700, 0.08, 'sine');
  }

  playAiResponse() {
    try {
      this.init();
      if (!this.ctx) return;
      this.playBeep(520, 0.08, 'triangle');
      setTimeout(() => this.playBeep(780, 0.1, 'sine'), 90);
    } catch {}
  }
}

export const sounds = new SoundEffects();
