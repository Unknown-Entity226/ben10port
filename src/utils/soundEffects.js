let audioContext;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return null;
  audioContext ||= new AudioContextConstructor();
  if (audioContext.state === 'suspended') void audioContext.resume();
  return audioContext;
}

export function playSound(name, enabled) {
  if (!enabled) return;
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
