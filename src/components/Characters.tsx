import React from 'react';
import { motion } from 'motion/react';

interface CharacterProps {
  className?: string;
  color?: string;
}

export const DogCharacter: React.FC<CharacterProps> = ({ className, color = "bg-orange-500" }) => (
  <motion.svg viewBox="0 0 100 100" className={className}>
    {/* Tail */}
    <motion.path 
      d="M70 60 Q85 40 80 30" 
      stroke="currentColor" 
      strokeWidth="6" 
      fill="none" 
      strokeLinecap="round"
      animate={{ rotate: [0, 20, 0] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
      className="text-orange-600"
    />
    {/* Body */}
    <circle cx="50" cy="65" r="25" className="text-orange-500" fill="currentColor" />
    {/* Head */}
    <circle cx="50" cy="40" r="20" className="text-orange-400" fill="currentColor" />
    {/* Ears */}
    <motion.path 
      d="M35 30 Q25 20 30 45" 
      fill="currentColor" 
      className="text-orange-600"
      animate={{ rotate: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
    <motion.path 
      d="M65 30 Q75 20 70 45" 
      fill="currentColor" 
      className="text-orange-600"
      animate={{ rotate: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
    />
    {/* Eyes */}
    <circle cx="43" cy="38" r="3" fill="white" />
    <circle cx="57" cy="38" r="3" fill="white" />
    <circle cx="43" cy="38" r="1.5" fill="black" />
    <circle cx="57" cy="38" r="1.5" fill="black" />
    {/* Nose */}
    <circle cx="50" cy="45" r="2" fill="black" />
  </motion.svg>
);

export const CatCharacter: React.FC<CharacterProps> = ({ className }) => (
  <motion.svg viewBox="0 0 100 100" className={className}>
    {/* Tail */}
    <motion.path 
      d="M75 70 Q90 50 80 30" 
      stroke="currentColor" 
      strokeWidth="4" 
      fill="none" 
      strokeLinecap="round"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="text-indigo-600"
    />
    {/* Body */}
    <ellipse cx="50" cy="70" rx="20" ry="25" className="text-indigo-500" fill="currentColor" />
    {/* Head */}
    <circle cx="50" cy="40" r="18" className="text-indigo-400" fill="currentColor" />
    {/* Ears */}
    <path d="M35 30 L40 25 L45 35 Z" fill="currentColor" className="text-indigo-600" />
    <path d="M65 30 L60 25 L55 35 Z" fill="currentColor" className="text-indigo-600" />
    {/* Eyes */}
    <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.95, 1] }}>
      <circle cx="43" cy="40" r="3" fill="white" />
      <circle cx="57" cy="40" r="3" fill="white" />
      <circle cx="43" cy="40" r="1.5" fill="black" />
      <circle cx="57" cy="40" r="1.5" fill="black" />
    </motion.g>
    {/* Whiskers */}
    <path d="M30 45 L20 43 M30 48 L20 50" stroke="white" strokeWidth="1" opacity="0.5" />
    <path d="M70 45 L80 43 M70 48 L80 50" stroke="white" strokeWidth="1" opacity="0.5" />
  </motion.svg>
);

export const RabbitCharacter: React.FC<CharacterProps> = ({ className }) => (
  <motion.svg viewBox="0 0 100 100" className={className}>
    {/* Body */}
    <circle cx="50" cy="75" r="20" className="text-rose-500" fill="currentColor" />
    {/* Head */}
    <circle cx="50" cy="45" r="18" className="text-rose-400" fill="currentColor" />
    {/* Ears */}
    <motion.ellipse 
      cx="40" cy="20" rx="6" ry="20" 
      fill="currentColor" 
      className="text-rose-300"
      animate={{ rotate: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    />
    <motion.ellipse 
      cx="60" cy="20" rx="6" ry="20" 
      fill="currentColor" 
      className="text-rose-300"
      animate={{ rotate: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
    />
    {/* Eyes */}
    <circle cx="43" cy="45" r="2.5" fill="black" />
    <circle cx="57" cy="45" r="2.5" fill="black" />
    {/* Nose */}
    <motion.path 
      d="M48 52 L50 54 L52 52" 
      stroke="black" 
      strokeWidth="1" 
      fill="none"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
    />
  </motion.svg>
);

export const BirdCharacter: React.FC<CharacterProps> = ({ className }) => (
  <motion.svg viewBox="0 0 100 100" className={className}>
    {/* Body */}
    <circle cx="50" cy="55" r="25" className="text-sky-500" fill="currentColor" />
    {/* Wings */}
    <motion.path 
      d="M25 55 Q10 40 25 30" 
      fill="currentColor" 
      className="text-sky-600"
      animate={{ rotate: [0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 0.3 }}
    />
    <motion.path 
      d="M75 55 Q90 40 75 30" 
      fill="currentColor" 
      className="text-sky-600"
      animate={{ rotate: [0, 20, 0] }}
      transition={{ repeat: Infinity, duration: 0.3 }}
    />
    {/* Head */}
    <circle cx="50" cy="35" r="15" className="text-sky-400" fill="currentColor" />
    {/* Beak */}
    <path d="M50 40 L55 35 L50 30 Z" fill="#FBBF24" />
    {/* Eyes */}
    <circle cx="45" cy="35" r="2" fill="black" />
    <circle cx="55" cy="35" r="2" fill="black" />
  </motion.svg>
);

export const FishCharacter: React.FC<CharacterProps> = ({ className }) => (
  <motion.svg viewBox="0 0 100 100" className={className}>
    {/* Tail */}
    <motion.path 
      d="M20 50 L5 40 L5 60 Z" 
      fill="currentColor" 
      className="text-emerald-600"
      animate={{ x: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 0.5 }}
    />
    {/* Body */}
    <ellipse cx="55" cy="50" rx="30" ry="20" className="text-emerald-500" fill="currentColor" />
    {/* Fins */}
    <path d="M55 30 L65 20 L75 30 Z" fill="currentColor" className="text-emerald-600" />
    {/* Eye */}
    <circle cx="75" cy="45" r="4" fill="white" />
    <circle cx="77" cy="45" r="2" fill="black" />
    {/* Bubbles */}
    {[...Array(3)].map((_, i) => (
      <motion.circle
        key={i}
        cx="85" cy="50" r="2"
        fill="white"
        opacity="0.5"
        animate={{ y: [0, -30], x: [0, (i-1)*5], opacity: [0.5, 0] }}
        transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
      />
    ))}
  </motion.svg>
);

export const PlayerCharacter: React.FC<CharacterProps> = ({ className }) => (
  <motion.svg viewBox="0 0 100 100" className={className}>
    {/* Backpack */}
    <rect x="30" y="45" width="40" height="30" rx="5" className="text-emerald-800" fill="currentColor" />
    {/* Body */}
    <rect x="35" y="40" width="30" height="40" rx="10" className="text-emerald-600" fill="currentColor" />
    {/* Head */}
    <circle cx="50" cy="30" r="15" className="text-emerald-400" fill="currentColor" />
    {/* Cap */}
    <path d="M35 25 Q50 15 65 25 L75 30 L65 35 L35 35 Z" fill="#10B981" />
    {/* Eyes */}
    <circle cx="45" cy="30" r="2" fill="white" />
    <circle cx="55" cy="30" r="2" fill="white" />
    {/* Arms */}
    <motion.path 
      d="M35 50 Q25 60 30 70" 
      stroke="currentColor" 
      strokeWidth="4" 
      fill="none" 
      strokeLinecap="round"
      className="text-emerald-600"
      animate={{ rotate: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
    <motion.path 
      d="M65 50 Q75 60 70 70" 
      stroke="currentColor" 
      strokeWidth="4" 
      fill="none" 
      strokeLinecap="round"
      className="text-emerald-600"
      animate={{ rotate: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 1 }}
    />
  </motion.svg>
);
