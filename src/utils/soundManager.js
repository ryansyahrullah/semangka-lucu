/**
 * Sound Manager - Howler.js Wrapper
 * Manages all audio for the Semangka app
 */

import { Howl, Howler } from 'howler';

// Sound definitions - will be loaded/generated
const sounds = {
  bgm: null,
  click: null,
  catch: null,
  slice: null,
  win: null,
  fail: null,
  laugh: null
};

let isMuted = false;
let isInitialized = false;

/**
 * Initialize all sounds
 * Call this after first user interaction (to comply with browser autoplay policy)
 */
export function initializeSounds() {
  if (isInitialized) return;
  
  // For now, we'll create simple oscillator-based sounds
  // This avoids the need for external audio files
  isInitialized = true;
  console.log('🔊 Sound system initialized');
}

/**
 * Play a blip/click sound using Web Audio API
 * This is a simple retro-style blip sound
 */
export function playClick() {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Sound error:', e);
  }
}

/**
 * Play a success/catch sound
 */
export function playCatch() {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Rising pitch for success feeling
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.15);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch (e) {
    console.log('Sound error:', e);
  }
}

/**
 * Play a slice/swoosh sound
 */
export function playSlice() {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Descending pitch for slice feeling
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Sound error:', e);
  }
}

/**
 * Play a win/victory jingle
 */
export function playWin() {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'square';
      
      const startTime = audioContext.currentTime + i * 0.15;
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.15);
    });
  } catch (e) {
    console.log('Sound error:', e);
  }
}

/**
 * Play a fail/bonk sound
 */
export function playFail() {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Low descending pitch for fail
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.3);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (e) {
    console.log('Sound error:', e);
  }
}

/**
 * Play a laugh/funny sound
 */
export function playLaugh() {
  if (isMuted) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [400, 500, 400, 600, 400, 700];
    
    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'square';
      
      const startTime = audioContext.currentTime + i * 0.08;
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.08);
    });
  } catch (e) {
    console.log('Sound error:', e);
  }
}

/**
 * Toggle mute state
 */
export function toggleMute() {
  isMuted = !isMuted;
  return isMuted;
}

/**
 * Get current mute state
 */
export function getMuteState() {
  return isMuted;
}

/**
 * Set mute state
 */
export function setMute(muted) {
  isMuted = muted;
}

export default {
  initializeSounds,
  playClick,
  playCatch,
  playSlice,
  playWin,
  playFail,
  playLaugh,
  toggleMute,
  getMuteState,
  setMute
};
