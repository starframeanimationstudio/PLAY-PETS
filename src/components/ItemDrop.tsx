import React from 'react';
import { motion } from 'motion/react';

interface ItemDropProps {
  icon: string;
  x: number;
  y: number;
  onComplete: () => void;
  DynamicIcon: React.FC<{ name: string; className?: string }>;
}

export const ItemDrop: React.FC<ItemDropProps> = ({ icon, x, y, onComplete, DynamicIcon }) => {
  return (
    <motion.div
      initial={{ x: x - 20, y: y - 20, scale: 0, opacity: 0 }}
      animate={{ 
        y: [y, y - 150, y - 100], 
        x: [x, x + (Math.random() - 0.5) * 200],
        scale: [0, 1.5, 1],
        opacity: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 1.5, 
        ease: "easeOut",
        times: [0, 0.3, 1]
      }}
      onAnimationComplete={onComplete}
      className="fixed z-[100] pointer-events-none"
    >
      <div className="bg-white p-4 rounded-full soft-shadow border-4 border-pastel-blue flex items-center justify-center">
        <DynamicIcon name={icon} className="w-12 h-12 text-pastel-blue" />
      </div>
    </motion.div>
  );
};
