let audioContext;

// ── Mute state ─────────────────────────────────────────────────────────────
// Default: muted when the OS reports prefers-reduced-motion; otherwise on.
const _prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function _readMuted() {
  try {
    const stored = localStorage.getItem('omnitrix-muted');
    if (stored !== null) return stored === 'true';
  } catch {
    // localStorage unavailable (private browsing, storage quota, etc.)
  }
  return _prefersReducedMotion; // default: muted if reduced-motion is set
}

function _writeMuted(value) {
  try {
    localStorage.setItem('omnitrix-muted', String(value));
  } catch {
    // ignore storage errors
  }
}

let _muted = _readMuted();

/** Returns the current muted state. */
export function isMuted() {
  return _muted;
}

/** Toggle or explicitly set the muted state; persists to localStorage. */
export function setMuted(value) {
  _muted = value;
  _writeMuted(value);
}

export function toggleMute() {
  setMuted(!_muted);
}

// ── Audio context ───────────────────────────────────────────────────────────
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  audioContext ||= new AudioContextConstructor();
  if (audioContext.state === 'suspended') void audioContext.resume();
  return audioContext;
}

export function playSound(name) {
  if (_muted) return;
  const context = getAudioContext();
  if (!context) return;
  const presets = {
    tick: [620, 430, 0.07, 'sine', 0.035],
    switch: [390, 720, 0.16, 'triangle', 0.04],
    activate: [125, 880, 0.58, 'sawtooth', 0.055],
    click: [500, 340, 0.055, 'sine', 0.025],
    return: [700, 240, 0.25, 'triangle', 0.035],
  };
  const [startFrequency, endFrequency, duration, wave, peak] = presets[name] || presets.tick;
  const now = context.currentTime;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = wave;
  oscillator.frequency.setValueAtTime(startFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.02);
}
