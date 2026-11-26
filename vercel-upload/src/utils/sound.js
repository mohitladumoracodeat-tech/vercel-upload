// Web Audio API Sound Synthesizer for rich interactive feedback

class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
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

  setEnabled(val) {
    this.enabled = Boolean(val);
  }

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.05) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback fails silently if restricted
    }
  }

  playClick() {
    this.playTone(600, 'sine', 0.05, 0.03);
  }

  playOptionSelect() {
    this.playTone(880, 'sine', 0.08, 0.04);
  }

  playQuestionNav() {
    this.playTone(520, 'sine', 0.06, 0.03);
  }

  playTimerWarning() {
    this.playTone(440, 'triangle', 0.15, 0.06);
    setTimeout(() => {
      this.playTone(550, 'triangle', 0.15, 0.06);
    }, 120);
  }

  playSubmitSuccess() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.2, 0.06);
      }, idx * 100);
    });
  }
}

export const sounds = new SoundManager();
