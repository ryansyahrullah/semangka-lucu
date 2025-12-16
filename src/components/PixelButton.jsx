/**
 * PixelButton - Retro pixel-styled button component
 */

import { motion } from 'framer-motion';
import { useSound } from '../hooks/useSound';
import './PixelButton.css';

export function PixelButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  ...props 
}) {
  const { playClick } = useSound();
  
  const handleClick = (e) => {
    if (disabled) return;
    playClick();
    onClick?.(e);
  };
  
  return (
    <motion.button
      className={`pixel-btn pixel-btn--${variant} pixel-btn--${size} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default PixelButton;
