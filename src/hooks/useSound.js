/**
 * useSound Hook - Easy sound playback in React components
 */

import { useCallback, useState } from 'react';
import {
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
} from '../utils/soundManager';

export function useSound() {
  const [isMuted, setIsMuted] = useState(getMuteState());
  
  const initialize = useCallback(() => {
    initializeSounds();
  }, []);
  
  const click = useCallback(() => {
    playClick();
  }, []);
  
  const catchSound = useCallback(() => {
    playCatch();
  }, []);
  
  const slice = useCallback(() => {
    playSlice();
  }, []);
  
  const win = useCallback(() => {
    playWin();
  }, []);
  
  const fail = useCallback(() => {
    playFail();
  }, []);
  
  const laugh = useCallback(() => {
    playLaugh();
  }, []);
  
  const toggle = useCallback(() => {
    const newState = toggleMute();
    setIsMuted(newState);
    return newState;
  }, []);
  
  const mute = useCallback((value) => {
    setMute(value);
    setIsMuted(value);
  }, []);
  
  return {
    isMuted,
    initialize,
    playClick: click,
    playCatch: catchSound,
    playSlice: slice,
    playWin: win,
    playFail: fail,
    playLaugh: laugh,
    toggleMute: toggle,
    setMute: mute
  };
}

export default useSound;
