/**
 * ReunionMessage - Introduction page
 * Updated: Self-introduction from Semangka, leads to gift
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WatermelonMascot } from '../components/WatermelonMascot';
import { PixelButton } from '../components/PixelButton';
import { useSound } from '../hooks/useSound';
import './ReunionMessage.css';

const messages = [
  {
    text: "Halo! 👋",
    delay: 0
  },
  {
    text: "Perkenalkan...",
    delay: 100
  },
  {
    text: "Aku SEMANGKA! 🍉",
    delay: 150
  },
  {
    text: "Aku punya sesuatu untukmu...",
    delay: 100
  },
  {
    text: "Sebuah hadiah spesial!",
    delay: 100
  },
  {
    text: "Mau lihat? 🎁",
    delay: 200
  }
];

function TypewriterText({ text, onComplete, speed = 50 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);
  
  return (
    <span className={isComplete ? 'complete' : ''}>
      {displayedText}
      {!isComplete && <span className="cursor blink">_</span>}
    </span>
  );
}

export function ReunionMessage() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();
  const { playClick, playWin } = useSound();
  
  const handleMessageComplete = () => {
    if (currentMessage < messages.length - 1) {
      setTimeout(() => {
        setCurrentMessage(prev => prev + 1);
      }, messages[currentMessage + 1]?.delay || 100);
    } else {
      setTimeout(() => {
        setShowButtons(true);
        playWin();
      }, 500);
    }
  };
  
  const handleSkip = () => {
    setShowAll(true);
    setShowButtons(true);
    playClick();
  };
  
  const handleContinue = () => {
    playClick();
    navigate('/gift');
  };
  
  return (
    <div className="reunion-page">
      <div className="scanlines" />
      
      <div className="reunion-content">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <WatermelonMascot 
            size="medium" 
            animate={true} 
            interactive={true}
            expression="happy"
          />
        </motion.div>
        
        <div className="message-container pixel-card">
          {showAll ? (
            <div className="messages-all">
              {messages.map((msg, idx) => (
                <motion.p 
                  key={idx}
                  className="message-line"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {msg.text}
                </motion.p>
              ))}
            </div>
          ) : (
            <div className="messages-typewriter">
              {messages.slice(0, currentMessage + 1).map((msg, idx) => (
                <motion.p 
                  key={idx}
                  className="message-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {idx === currentMessage ? (
                    <TypewriterText 
                      text={msg.text} 
                      onComplete={handleMessageComplete}
                      speed={40}
                    />
                  ) : (
                    msg.text
                  )}
                </motion.p>
              ))}
            </div>
          )}
          
          {!showAll && !showButtons && (
            <motion.button 
              className="skip-btn"
              onClick={handleSkip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Skip ▶▶
            </motion.button>
          )}
        </div>
        
        <AnimatePresence>
          {showButtons && (
            <motion.div 
              className="action-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PixelButton 
                onClick={handleContinue}
                variant="primary"
                size="large"
              >
                🎁 MAU!
              </PixelButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Credit */}
      <p className="credit">Dibuat oleh Ryan</p>
    </div>
  );
}

export default ReunionMessage;
