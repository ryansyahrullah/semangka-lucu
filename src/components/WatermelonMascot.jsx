/**
 * WatermelonMascot - Animated pixel art watermelon character
 * Pure CSS/SVG pixel art mascot with expressions and animations
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import './WatermelonMascot.css';

const expressions = ['happy', 'surprised', 'laughing', 'wink', 'love'];
const funnyMessages = [
  "Hehe, geli!",
  "Jangan diklik terus!",
  "Aku semangka, bukan tombol!",
  "Stop! Stop!",
  "Awas nanti aku gigit!",
  "*blush*",
  "Kenapa sih?!",
];

export function WatermelonMascot({ 
  size = 'medium', 
  animate = true,
  interactive = true,
  expression: forcedExpression = null 
}) {
  const [expression, setExpression] = useState('happy');
  const [clickCount, setClickCount] = useState(0);
  const [message, setMessage] = useState('');
  const { playClick, playLaugh } = useSound();
  
  // Reset expression after a delay
  useEffect(() => {
    if (expression !== 'happy' && !forcedExpression) {
      const timer = setTimeout(() => setExpression('happy'), 2000);
      return () => clearTimeout(timer);
    }
  }, [expression, forcedExpression]);
  
  // Clear message after delay
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const handleClick = () => {
    if (!interactive) return;
    
    playClick();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Random expression on click
    const randomExp = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExp);
    
    // Show funny message after multiple clicks
    if (newCount >= 3) {
      const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setMessage(randomMsg);
      playLaugh();
      
      // Reset click count
      if (newCount >= 5) {
        setClickCount(0);
      }
    }
  };
  
  const currentExpression = forcedExpression || expression;
  
  return (
    <div className={`mascot-container mascot--${size}`}>
      <motion.div 
        className={`mascot ${animate ? 'mascot--animate' : ''}`}
        onClick={handleClick}
        whileHover={interactive ? { scale: 1.1 } : {}}
        whileTap={interactive ? { scale: 0.95, rotate: 5 } : {}}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        {/* Pixel Art Watermelon SVG */}
        <svg viewBox="0 0 64 64" className="mascot-svg">
          {/* Green rind outer */}
          <rect x="16" y="8" width="32" height="4" fill="#2D5016"/>
          <rect x="12" y="12" width="40" height="4" fill="#2D5016"/>
          <rect x="8" y="16" width="48" height="4" fill="#2D5016"/>
          
          {/* Light green rind */}
          <rect x="8" y="20" width="48" height="4" fill="#4ECDC4"/>
          
          {/* Red flesh */}
          <rect x="8" y="24" width="48" height="20" fill="#FF6B6B"/>
          <rect x="12" y="44" width="40" height="4" fill="#FF6B6B"/>
          <rect x="16" y="48" width="32" height="4" fill="#FF6B6B"/>
          <rect x="20" y="52" width="24" height="4" fill="#FF6B6B"/>
          
          {/* Seeds */}
          <rect x="16" y="28" width="4" height="4" fill="#1A1A2E"/>
          <rect x="28" y="32" width="4" height="4" fill="#1A1A2E"/>
          <rect x="40" y="28" width="4" height="4" fill="#1A1A2E"/>
          <rect x="20" y="38" width="4" height="4" fill="#1A1A2E"/>
          <rect x="36" y="40" width="4" height="4" fill="#1A1A2E"/>
          
          {/* Face - Eyes */}
          {currentExpression === 'happy' && (
            <>
              <rect x="20" y="30" width="6" height="6" fill="#1A1A2E"/>
              <rect x="38" y="30" width="6" height="6" fill="#1A1A2E"/>
              {/* Smile */}
              <rect x="24" y="42" width="4" height="2" fill="#1A1A2E"/>
              <rect x="28" y="44" width="8" height="2" fill="#1A1A2E"/>
              <rect x="36" y="42" width="4" height="2" fill="#1A1A2E"/>
            </>
          )}
          
          {currentExpression === 'surprised' && (
            <>
              {/* Big eyes */}
              <rect x="18" y="28" width="8" height="8" fill="#1A1A2E"/>
              <rect x="20" y="30" width="2" height="2" fill="#FFFFFF"/>
              <rect x="38" y="28" width="8" height="8" fill="#1A1A2E"/>
              <rect x="42" y="30" width="2" height="2" fill="#FFFFFF"/>
              {/* O mouth */}
              <rect x="28" y="42" width="8" height="6" fill="#1A1A2E"/>
            </>
          )}
          
          {currentExpression === 'laughing' && (
            <>
              {/* Closed happy eyes - like ^ ^ */}
              <rect x="18" y="32" width="2" height="2" fill="#1A1A2E"/>
              <rect x="20" y="30" width="2" height="2" fill="#1A1A2E"/>
              <rect x="22" y="32" width="2" height="2" fill="#1A1A2E"/>
              <rect x="40" y="32" width="2" height="2" fill="#1A1A2E"/>
              <rect x="42" y="30" width="2" height="2" fill="#1A1A2E"/>
              <rect x="44" y="32" width="2" height="2" fill="#1A1A2E"/>
              {/* Big smile */}
              <rect x="22" y="42" width="4" height="2" fill="#1A1A2E"/>
              <rect x="26" y="44" width="12" height="2" fill="#1A1A2E"/>
              <rect x="38" y="42" width="4" height="2" fill="#1A1A2E"/>
            </>
          )}
          
          {currentExpression === 'wink' && (
            <>
              {/* One normal eye, one wink */}
              <rect x="20" y="30" width="6" height="6" fill="#1A1A2E"/>
              <rect x="38" y="32" width="8" height="2" fill="#1A1A2E"/>
              {/* Smile */}
              <rect x="24" y="42" width="4" height="2" fill="#1A1A2E"/>
              <rect x="28" y="44" width="8" height="2" fill="#1A1A2E"/>
              <rect x="36" y="42" width="4" height="2" fill="#1A1A2E"/>
            </>
          )}
          
          {currentExpression === 'love' && (
            <>
              {/* Heart eyes */}
              <rect x="18" y="30" width="2" height="4" fill="#FF1493"/>
              <rect x="20" y="28" width="2" height="4" fill="#FF1493"/>
              <rect x="22" y="30" width="2" height="4" fill="#FF1493"/>
              <rect x="20" y="34" width="2" height="2" fill="#FF1493"/>
              
              <rect x="40" y="30" width="2" height="4" fill="#FF1493"/>
              <rect x="42" y="28" width="2" height="4" fill="#FF1493"/>
              <rect x="44" y="30" width="2" height="4" fill="#FF1493"/>
              <rect x="42" y="34" width="2" height="2" fill="#FF1493"/>
              {/* Blush */}
              <rect x="14" y="36" width="4" height="2" fill="#FF9999"/>
              <rect x="46" y="36" width="4" height="2" fill="#FF9999"/>
            </>
          )}
        </svg>
      </motion.div>
      
      {/* Speech bubble */}
      <AnimatePresence>
        {message && (
          <motion.div 
            className="mascot-speech"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WatermelonMascot;
