/**
 * ReunionMessage - Main message page with typewriter effect
 * Updated: Roblox reunion story, no relationship references
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
    text: "Halo Semangka! 🍉",
    delay: 0
  },
  {
    text: "Gak nyangka ya kita ketemu lagi...",
    delay: 100
  },
  {
    text: "Aku sempat gak main Roblox lama banget,",
    delay: 100
  },
  {
    text: "Eh pas download lagi...",
    delay: 100
  },
  {
    text: "KETEMU KAMU LAGI! 🎮",
    delay: 200
  },
  {
    text: "Ya sudahlah, yang penting...",
    delay: 150
  },
  {
    text: "SENENG BISA KETEMU LAGI! 🎉",
    delay: 100
  },
  {
    text: "Iseng-iseng bikin ini buat kamu,",
    delay: 100
  },
  {
    text: "Semoga suka ya!",
    delay: 100
  },
  {
    text: "Oh iya, ada sesuatu untukmu...",
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
      // All messages shown
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
        {/* Mascot */}
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
        
        {/* Messages */}
        <div className="message-container pixel-card">
          {showAll ? (
            // Show all messages at once
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
            // Typewriter effect
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
          
          {/* Skip button */}
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
        
        {/* Continue button */}
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
                🎁 LANJUT!
              </PixelButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ReunionMessage;
