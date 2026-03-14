import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Sparkles } from 'lucide-react';
import { PlayStyle, Species } from '../types';
import { SPECIES_DATA } from '../constants';

interface PlayInteractionProps {
  species: Species;
  playStyle: PlayStyle;
  onComplete: (success: boolean) => void;
}

export const PlayInteraction: React.FC<PlayInteractionProps> = ({ species, playStyle, onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [feedback, setFeedback] = useState<string | null>(null);
  const creature = SPECIES_DATA[species];

  const spawnTarget = useCallback(() => {
    if (playStyle === 'hide-and-seek') {
      setTargetPos({
        x: 10 + Math.random() * 80,
        y: 40 + Math.random() * 40
      });
    } else if (playStyle === 'chase') {
      setTargetPos({
        x: Math.random() * 90,
        y: Math.random() * 90
      });
    } else {
      setTargetPos({
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60
      });
    }
  }, [playStyle]);

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('finished');
            clearInterval(timer);
            setTimeout(() => onComplete(score >= 3), 1500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Special logic for Chase/Rhythm
      let interval: NodeJS.Timeout;
      if (playStyle === 'chase') {
        interval = setInterval(spawnTarget, 800);
      }

      return () => {
        clearInterval(timer);
        if (interval) clearInterval(interval);
      };
    }
  }, [gameState, score, onComplete, playStyle, spawnTarget]);

  const handleTap = () => {
    if (gameState !== 'playing') return;
    setScore(s => s + 1);
    setFeedback(['Great!', 'Yay!', 'Nice!', '✨'][Math.floor(Math.random() * 4)]);
    setTimeout(() => setFeedback(null), 500);
    spawnTarget();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/10 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="glass rounded-[3rem] p-8 max-w-md w-full soft-shadow relative overflow-hidden border-4 border-white/80"
      >
        <div className="text-center mb-6">
          <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.3em] mb-1">Adventure Mini-Game</div>
          <h2 className="text-3xl font-bold text-slate-700 capitalize tracking-tight">{playStyle.replace(/-/g, ' ')}</h2>
        </div>

        <div className="relative h-80 bg-mint/30 rounded-[2.5rem] border-2 border-white/50 flex items-center justify-center overflow-hidden cursor-crosshair soft-shadow">
          {gameState === 'ready' && (
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-8xl mb-8 drop-shadow-xl"
              >
                {creature.icon}
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setGameState('playing');
                  spawnTarget();
                }}
                className="bg-sky-400 text-white px-12 py-4 rounded-2xl font-bold shadow-lg hover:bg-sky-500 transition-all glow-sky uppercase tracking-widest text-sm"
              >
                Let's Play!
              </motion.button>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              <div className="absolute top-6 left-6 flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/50">
                <span className="text-xl">⭐</span>
                <span className="font-bold text-slate-700 text-lg">{score}</span>
              </div>
              <div className="absolute top-6 right-6 flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/50">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">{timeLeft}s</span>
              </div>
              
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ y: 0, opacity: 0, scale: 0.5 }}
                    animate={{ y: -30, opacity: 1, scale: 1.2 }}
                    exit={{ opacity: 0 }}
                    className="absolute font-bold text-emerald-500 text-2xl pointer-events-none z-10 drop-shadow-md"
                    style={{ left: `${targetPos.x}%`, top: `${targetPos.y - 10}%` }}
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                key={`${targetPos.x}-${targetPos.y}`}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                style={{ 
                  left: `${targetPos.x}%`, 
                  top: `${targetPos.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute cursor-pointer text-7xl select-none p-6"
                onClick={handleTap}
              >
                {playStyle === 'hide-and-seek' ? (
                  <div className="relative">
                    <span className="absolute bottom-0 left-0 text-5xl animate-sway">🌿</span>
                    <motion.span 
                      animate={{ y: [15, 0, 15] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="block drop-shadow-lg"
                    >
                      {creature.icon}
                    </motion.span>
                  </div>
                ) : (
                  <div className="drop-shadow-lg">{creature.icon}</div>
                )}
              </motion.div>

              {/* Decorative background elements */}
              <div className="absolute bottom-0 w-full h-20 bg-emerald-100/20 flex justify-around items-end pb-4 pointer-events-none">
                <Leaf className="text-emerald-300/40 w-10 h-10 animate-sway" />
                <Leaf className="text-emerald-300/40 w-8 h-8 rotate-45 animate-sway" style={{ animationDelay: '0.5s' }} />
                <Leaf className="text-emerald-300/40 w-10 h-10 -rotate-12 animate-sway" style={{ animationDelay: '1s' }} />
              </div>
            </>
          )}

          {gameState === 'finished' && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center glass p-10 rounded-full w-64 h-64 flex flex-col items-center justify-center border-4 border-white/80 glow-mint"
            >
              <Sparkles className="text-yellow-400 w-14 h-14 mb-3 animate-float" />
              <h3 className="text-2xl font-bold text-emerald-600 tracking-tight">
                {score >= 3 ? 'AMAZING!' : 'GOOD TRY!'}
              </h3>
              <div className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Final Score: {score}</div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-4 bg-white/40 p-5 rounded-[2rem] border border-white/50">
          <div className="bg-white/80 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-2xl">💡</div>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
            {playStyle === 'hide-and-seek' && "Find the creature peeking out from the grass!"}
            {playStyle === 'chase' && "Quick! Tap the creature as it zips around!"}
            {playStyle === 'catch' && "Catch the items the creature tosses!"}
            {playStyle === 'rhythm' && "Tap in time with the creature's magic!"}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
