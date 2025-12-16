/**
 * GiftBox - Interactive gift box with watermelon + motivational card!
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WatermelonMascot } from '../components/WatermelonMascot';
import { PixelButton } from '../components/PixelButton';
import { useSound } from '../hooks/useSound';
import './GiftBox.css';

// 8 Kartu Semangat - Cute & Inspirational Quotes
const motivationalCards = [
  {
    title: "Kartu Semangat",
    message: "Hey kamu yang lagi baca ini~ Aku tau hari-harimu mungkin berat, tapi percayalah, kamu sudah melakukan yang terbaik! Istirahat itu bukan kelemahan, itu bagian dari perjuangan. Tetap semangat ya! ✨",
    emoji: "🌟",
    color: "#FFE66D"
  },
  {
    title: "Kartu Keberanian",
    message: "Semangka percaya sama kamu! Kamu lebih berani dari yang kamu kira. Setiap langkah kecil yang kamu ambil itu sudah luar biasa. Jangan bandingkan dirimu dengan orang lain, karena kamu punya jalan ceritamu sendiri~ 💪",
    emoji: "🦁",
    color: "#FF8585"
  },
  {
    title: "Kartu Kebahagiaan",
    message: "Tau gak? Senyummu itu berharga banget loh! Jangan lupa untuk bahagia hari ini, walau cuma hal-hal kecil. Minum air, makan yang enak, atau sekadar rebahan sebentar. Kamu layak bahagia! 🌈",
    emoji: "😊",
    color: "#A8E6CF"
  },
  {
    title: "Kartu Kekuatan",
    message: "Kamu itu kuat, tau gak sih? Semua yang sudah kamu lalui sampai hari ini adalah bukti bahwa kamu adalah pejuang sejati. Badai pasti berlalu, dan matahari akan bersinar lagi untukmu! ☀️",
    emoji: "💪",
    color: "#4ECDC4"
  },
  {
    title: "Kartu Harapan",
    message: "Besok adalah halaman baru yang belum ditulis. Kamu punya kesempatan untuk membuat cerita yang lebih baik! Jangan takut untuk bermimpi besar. Semangka selalu mendukungmu dari sini~ 🌻",
    emoji: "🌅",
    color: "#FFB347"
  },
  {
    title: "Kartu Persahabatan",
    message: "Walaupun kita mungkin jarang ketemu, tapi Semangka selalu ingat kamu! Terima kasih sudah jadi bagian dari hidupku. Kamu adalah orang yang spesial dan gak tergantikan. Sayang kamu! 💕",
    emoji: "🤝",
    color: "#FF6B9D"
  },
  {
    title: "Kartu Kreativitas",
    message: "Otak kamu itu penuh dengan ide-ide keren yang belum kamu sadari! Jangan takut untuk coba hal baru dan ekspresikan dirimu. Dunia butuh keunikanmu. Go create something awesome! 🎨",
    emoji: "🎨",
    color: "#C9B1FF"
  },
  {
    title: "Kartu Semangka Special",
    message: "Seperti semangka yang manis dan menyegarkan, semoga hidupmu juga selalu dipenuhi kebahagiaan dan hal-hal menyegarkan! Tetap jadi dirimu yang luar biasa. Semangka sayang kamu! 🍉✨",
    emoji: "🍉",
    color: "#FF6B6B"
  }
];

export function GiftBox() {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const navigate = useNavigate();
  const { playClick, playWin } = useSound();
  
  const triggerConfetti = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8585', '#2D5016', '#C9B1FF'];
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.4,
      size: 6 + Math.random() * 14,
      rotation: Math.random() * 360
    }));
    setConfetti(newConfetti);
    setShowConfetti(true);
  };
  
  const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * motivationalCards.length);
    return motivationalCards[randomIndex];
  };
  
  const handleOpenGift = () => {
    playClick();
    
    setTimeout(() => {
      setCurrentCard(getRandomCard());
      setIsOpened(true);
      playWin();
      triggerConfetti();
    }, 500);
  };
  
  const handleOpenAgain = () => {
    playClick();
    setIsOpened(false);
    setShowConfetti(false);
    setConfetti([]);
    setCurrentCard(null);
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
            <h1 className="gift-title">🎁 Hadiah Untukmu!</h1>
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
          {isOpened && currentCard && (
            <motion.div 
              className="gift-opened"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            >
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 150 }}
              >
                <h1 className="congrats-title rainbow">
                  🎉 SELAMAT! 🎉
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
              >
                <WatermelonMascot 
                  size="small" 
                  animate={true} 
                  interactive={true}
                  expression="laughing"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="prize-section"
              >
                <p className="prize-text">Kamu mendapat SEMANGKA! 🍉</p>
                <p className="prize-subtext">...dan sebuah kartu spesial:</p>
              </motion.div>
              
              {/* Kartu Semangat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="motivational-card pixel-card"
                style={{ borderColor: currentCard.color }}
              >
                <div 
                  className="card-accent"
                  style={{ background: `linear-gradient(90deg, ${currentCard.color}, transparent)` }}
                />
                <div className="card-header">
                  <span className="card-emoji">{currentCard.emoji}</span>
                  <h3 className="card-title" style={{ color: currentCard.color }}>
                    {currentCard.title}
                  </h3>
                </div>
                <p className="card-message">{currentCard.message}</p>
                <div className="card-footer">
                  <span className="card-signature">dengan cinta, Semangka 🍉</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="final-buttons"
              >
                <PixelButton 
                  onClick={handleOpenAgain}
                  variant="primary"
                  size="medium"
                >
                  🎁 BUKA LAGI!
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
