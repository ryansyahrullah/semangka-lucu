/**
 * WatermelonMascot - Super cute animated pixel art watermelon character!
 * More kawaii version with bigger eyes, blush, and cuter expressions
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import './WatermelonMascot.css';

const expressions = ['happy', 'surprised', 'laughing', 'wink', 'love', 'sleepy'];
const funnyMessages = [
  "Hehe, geli! 🤭",
  "Jangan diklik terus dong~",
  "Aku semangka, bukan tombol! 😤",
  "Kyaaa~ Stop!",
  "Awas nanti aku gigit! 🍉",
  "*blush* 😳",
  "Kenapa sih?! 💕",
  "Ehehehe~ 🥰",
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
  
  useEffect(() => {
    if (expression !== 'happy' && !forcedExpression) {
      const timer = setTimeout(() => setExpression('happy'), 2000);
      return () => clearTimeout(timer);
    }
  }, [expression, forcedExpression]);
  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const handleClick = () => {
    if (!interactive) return;
    
    playClick();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    const randomExp = expressions[Math.floor(Math.random() * expressions.length)];
    setExpression(randomExp);
    
    if (newCount >= 2) {
      const randomMsg = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
      setMessage(randomMsg);
      playLaugh();
      
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
        whileHover={interactive ? { scale: 1.1, rotate: 5 } : {}}
        whileTap={interactive ? { scale: 0.9, rotate: -5 } : {}}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        {/* Super Cute Pixel Art Watermelon SVG */}
        <svg viewBox="0 0 64 72" className="mascot-svg">
          {/* Shadow */}
          <ellipse cx="32" cy="68" rx="20" ry="4" fill="rgba(0,0,0,0.2)"/>
          
          {/* Stem/Leaf on top */}
          <rect x="29" y="2" width="6" height="8" fill="#2D5016"/>
          <rect x="25" y="4" width="4" height="4" fill="#4ECDC4"/>
          <rect x="35" y="4" width="4" height="4" fill="#4ECDC4"/>
          
          {/* Green rind outer - rounder shape */}
          <rect x="14" y="10" width="36" height="4" fill="#2D5016"/>
          <rect x="10" y="14" width="44" height="4" fill="#2D5016"/>
          <rect x="6" y="18" width="52" height="4" fill="#2D5016"/>
          
          {/* Light green rind */}
          <rect x="6" y="22" width="52" height="4" fill="#4ECDC4"/>
          
          {/* Red flesh - main body */}
          <rect x="6" y="26" width="52" height="24" fill="#FF6B6B"/>
          <rect x="10" y="50" width="44" height="4" fill="#FF6B6B"/>
          <rect x="14" y="54" width="36" height="4" fill="#FF6B6B"/>
          <rect x="18" y="58" width="28" height="4" fill="#FF6B6B"/>
          
          {/* Cute blush marks - always visible */}
          <rect x="10" y="40" width="6" height="4" fill="#FF9999" opacity="0.7"/>
          <rect x="48" y="40" width="6" height="4" fill="#FF9999" opacity="0.7"/>
          
          {/* Seeds - decorative */}
          <rect x="14" y="32" width="3" height="5" rx="1" fill="#1A1A2E"/>
          <rect x="24" y="44" width="3" height="5" rx="1" fill="#1A1A2E"/>
          <rect x="44" y="34" width="3" height="5" rx="1" fill="#1A1A2E"/>
          <rect x="36" y="48" width="3" height="5" rx="1" fill="#1A1A2E"/>
          
          {/* ===== EXPRESSIONS ===== */}
          
          {/* Happy Face - Big kawaii eyes */}
          {currentExpression === 'happy' && (
            <>
              {/* Left eye */}
              <ellipse cx="24" cy="36" rx="6" ry="7" fill="#1A1A2E"/>
              <ellipse cx="22" cy="34" rx="2" ry="2" fill="#FFFFFF"/>
              <ellipse cx="26" cy="38" rx="1" ry="1" fill="#FFFFFF"/>
              
              {/* Right eye */}
              <ellipse cx="40" cy="36" rx="6" ry="7" fill="#1A1A2E"/>
              <ellipse cx="38" cy="34" rx="2" ry="2" fill="#FFFFFF"/>
              <ellipse cx="42" cy="38" rx="1" ry="1" fill="#FFFFFF"/>
              
              {/* Cute smile - cat mouth style */}
              <path d="M 28 48 Q 32 52 36 48" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
              <rect x="26" y="46" width="2" height="2" fill="#1A1A2E"/>
              <rect x="36" y="46" width="2" height="2" fill="#1A1A2E"/>
            </>
          )}
          
          {/* Surprised Face */}
          {currentExpression === 'surprised' && (
            <>
              {/* Big round eyes */}
              <circle cx="24" cy="36" r="8" fill="#1A1A2E"/>
              <circle cx="22" cy="34" r="3" fill="#FFFFFF"/>
              <circle cx="40" cy="36" r="8" fill="#1A1A2E"/>
              <circle cx="38" cy="34" r="3" fill="#FFFFFF"/>
              
              {/* O mouth */}
              <ellipse cx="32" cy="50" rx="4" ry="5" fill="#1A1A2E"/>
            </>
          )}
          
          {/* Laughing Face */}
          {currentExpression === 'laughing' && (
            <>
              {/* Closed happy eyes - ^ ^ style */}
              <path d="M 18 34 L 24 30 L 30 34" stroke="#1A1A2E" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 34 34 L 40 30 L 46 34" stroke="#1A1A2E" strokeWidth="3" fill="none" strokeLinecap="round"/>
              
              {/* Big open smile */}
              <ellipse cx="32" cy="48" rx="8" ry="6" fill="#1A1A2E"/>
              <ellipse cx="32" cy="47" rx="6" ry="3" fill="#FF9999"/>
              

            </>
          )}
          
          {/* Wink Face */}
          {currentExpression === 'wink' && (
            <>
              {/* Normal left eye */}
              <ellipse cx="24" cy="36" rx="6" ry="7" fill="#1A1A2E"/>
              <ellipse cx="22" cy="34" rx="2" ry="2" fill="#FFFFFF"/>
              
              {/* Winking right eye */}
              <path d="M 34 36 L 40 33 L 46 36" stroke="#1A1A2E" strokeWidth="3" fill="none" strokeLinecap="round"/>
              
              {/* Playful smile */}
              <path d="M 26 48 Q 32 54 38 48" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
              
              {/* Sparkle near wink */}
              <polygon points="50,28 52,32 56,32 53,35 54,39 50,37 46,39 47,35 44,32 48,32" fill="#FFE66D"/>
            </>
          )}
          
          {/* Love Face */}
          {currentExpression === 'love' && (
            <>
              {/* Heart eyes */}
              <path d="M 20 32 C 16 28 20 24 24 28 C 28 24 32 28 28 32 L 24 38 Z" fill="#FF1493"/>
              <path d="M 36 32 C 32 28 36 24 40 28 C 44 24 48 28 44 32 L 40 38 Z" fill="#FF1493"/>
              
              {/* Sparkles around */}
              <polygon points="10,26 11,28 14,28 12,30 13,33 10,31 7,33 8,30 6,28 9,28" fill="#FFE66D"/>
              <polygon points="54,26 55,28 58,28 56,30 57,33 54,31 51,33 52,30 50,28 53,28" fill="#FFE66D"/>
              
              {/* Happy wavy mouth */}
              <path d="M 26 48 Q 29 52 32 48 Q 35 52 38 48" stroke="#1A1A2E" strokeWidth="2" fill="none"/>
              
              {/* Extra blush */}
              <rect x="10" y="40" width="8" height="4" fill="#FF9999"/>
              <rect x="46" y="40" width="8" height="4" fill="#FF9999"/>
            </>
          )}
          
          {/* Sleepy Face */}
          {currentExpression === 'sleepy' && (
            <>
              {/* Droopy eyes */}
              <path d="M 18 36 L 30 36" stroke="#1A1A2E" strokeWidth="3" fill="none" strokeLinecap="round"/>
              <path d="M 34 36 L 46 36" stroke="#1A1A2E" strokeWidth="3" fill="none" strokeLinecap="round"/>
              
              {/* Small mouth */}
              <ellipse cx="32" cy="50" rx="3" ry="2" fill="#1A1A2E"/>
              
              {/* Z z z */}
              <text x="50" y="20" fill="#87CEEB" fontSize="8" fontFamily="Press Start 2P">z</text>
              <text x="54" y="14" fill="#87CEEB" fontSize="6" fontFamily="Press Start 2P">z</text>
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
