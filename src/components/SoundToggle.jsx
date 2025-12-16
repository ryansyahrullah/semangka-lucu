/**
 * SoundToggle - Mute/Unmute button component
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import './SoundToggle.css';

export function SoundToggle() {
  const { isMuted, toggleMute, playClick } = useSound();
  
  const handleToggle = () => {
    if (!isMuted) {
      playClick();
    }
    toggleMute();
  };
  
  return (
    <motion.button
      className="sound-toggle-btn"
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? '🔇' : '🔊'}
    </motion.button>
  );
}

export default SoundToggle;
