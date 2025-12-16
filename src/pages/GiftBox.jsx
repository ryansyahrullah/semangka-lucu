/**
 * GiftBox - Interactive gift box that explodes to reveal watermelon!
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WatermelonMascot } from '../components/WatermelonMascot';
import { PixelButton } from '../components/PixelButton';
import { useSound } from '../hooks/useSound';
import './GiftBox.css';

export function GiftBox() {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const navigate = useNavigate();
  const { playClick, playWin } = useSound();
  
  const triggerConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8585', '#2D5016'];
    const newConfetti = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.3,
      size: 8 + Math.random() * 12,
      rotation: Math.random() * 360
    }));
    setConfetti(newConfetti);
    setShowConfetti(true);
  };
  
  const handleOpenGift = () => {
    playClick();
    
    // Shake animation before opening
    setTimeout(() => {
      setIsOpened(true);
      playWin();
      triggerConfetti();
    }, 500);
  };
  
  return (
    <div className="gift-page">
      <div className="scanlines" />
      
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="confetti-container">
            {confetti.map(piece => (
              <motion.div
                key={piece.id}
                className="confetti"
                initial={{ 
                  x: `${piece.x}vw`, 
                  y: -20, 
                  opacity: 1,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: '110vh', 
                  opacity: [1, 1, 0],
                  rotate: piece.rotation + 720,
                  scale: [0, 1, 1]
                }}
                transition={{ 
                  duration: 2.5 + Math.random(),
                  delay: piece.delay,
                  ease: 'linear'
                }}
                style={{
                  width: piece.size,
                  height: piece.size,
                  backgroundColor: piece.color,
                  left: 0
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      <div className="gift-content">
        {/* Before opening */}
        {!isOpened && (
          <motion.div 
            className="gift-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="gift-title">🎁 Ada Kado Untukmu!</h1>
            <p className="gift-subtitle">Klik untuk membukanya...</p>
            
            <motion.div 
              className="gift-box-container"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenGift}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <div className="gift-box">
                <div className="gift-lid">
                  <div className="gift-bow">🎀</div>
                </div>
                <div className="gift-body">
                  <div className="gift-pattern"></div>
                </div>
              </div>
              <p className="click-hint blink">👆 KLIK!</p>
            </motion.div>
          </motion.div>
        )}
        
        {/* After opening */}
        <AnimatePresence>
          {isOpened && (
            <motion.div 
              className="gift-opened"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
              >
                <h1 className="congrats-title rainbow">
                  🎉 SELAMAT! 🎉
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              >
                <WatermelonMascot 
                  size="large" 
                  animate={true} 
                  interactive={true}
                  expression="laughing"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="congrats-message pixel-card"
              >
                <h2>Kamu Mendapatkan...</h2>
                <p className="prize-text">✨ SEMANGKA! ✨</p>
                <p className="prize-subtitle">
                  Ini dia aku, Semangka! 🍉<br />
                  Inilah aku!
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="final-buttons"
              >
                <PixelButton 
                  onClick={() => {
                    playClick();
                    setIsOpened(false);
                    setShowConfetti(false);
                    setConfetti([]);
                  }}
                  variant="secondary"
                  size="medium"
                >
                  🔄 BUKA LAGI!
                </PixelButton>
                
                <PixelButton 
                  onClick={() => {
                    playClick();
                    navigate('/');
                  }}
                  variant="outline"
                  size="small"
                >
                  ◀ AWAL
                </PixelButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default GiftBox;
