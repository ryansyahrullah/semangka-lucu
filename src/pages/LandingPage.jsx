/**
 * LandingPage - Welcome screen with loading animation
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WatermelonMascot } from '../components/WatermelonMascot';
import { PixelButton } from '../components/PixelButton';
import { useSound } from '../hooks/useSound';
import './LandingPage.css';

export function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('MEMUAT...');
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();
  const { initialize, playClick, playWin } = useSound();
  
  // Fake loading sequence with funny texts
  useEffect(() => {
    const loadingSteps = [
      { progress: 10, text: 'MEMUAT...' },
      { progress: 25, text: 'MENDETEKSI SEMANGKA...' },
      { progress: 40, text: 'MENGANALISIS KESEMANGKAAN...' },
      { progress: 55, text: 'MENCARI BIJI-BIJI...' },
      { progress: 70, text: 'MENGUKUR TINGKAT KEMANISAN...' },
      { progress: 85, text: 'SEMANGKA TERDETEKSI!' },
      { progress: 100, text: 'SIAP!' },
    ];
    
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          playWin();
          setTimeout(() => setShowContent(true), 300);
        }, 500);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, [playWin]);
  
  const handleStart = () => {
    initialize();
    playClick();
    navigate('/message');
  };
  
  return (
    <div className="landing-page">
      {/* Scanlines effect */}
      <div className="scanlines" />
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="loading-screen"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <WatermelonMascot size="medium" animate={false} interactive={false} />
            </motion.div>
            
            <div className="loading-bar-container">
              <motion.div 
                className="loading-bar"
                initial={{ width: 0 }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <motion.p 
              className="loading-text"
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {loadingText}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div 
            className="landing-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Floating decorations */}
            <div className="decorations">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="decoration-seed"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -20, 0],
                  }}
                  transition={{
                    delay: i * 0.1,
                    y: {
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  style={{
                    left: `${10 + (i * 12)}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
            
            {/* Hero section */}
            <motion.div 
              className="hero"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.h1 
                className="hero-title rainbow"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                HAI KAMU! 🍉
              </motion.h1>
              
              <motion.p 
                className="hero-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Aku Semangka~
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <WatermelonMascot size="large" animate={true} interactive={true} />
              </motion.div>
              
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Ada sesuatu yang spesial untukmu...
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <PixelButton 
                  onClick={handleStart}
                  size="large"
                >
                  MULAI! ▶
                </PixelButton>
              </motion.div>
            </motion.div>
            
            {/* Footer hint */}
            <motion.p 
              className="hint blink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              💡 Coba klik semangkanya!
            </motion.p>
            
            {/* Credit */}
            <motion.p 
              className="credit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Dibuat oleh Ryan
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LandingPage;
