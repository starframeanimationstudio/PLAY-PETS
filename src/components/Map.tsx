import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, MapPin, Leaf, Users, Sparkles } from 'lucide-react';
import { Companion, MapObject } from '../types';
import { SPECIES_DATA, MAP_OBJECT_TYPES } from '../constants';

interface MapProps {
  position: { x: number; y: number };
  primaryPet: Companion | undefined;
  movePlayer: (dx: number, dy: number) => void;
  encounterActive: boolean;
  DynamicIcon: React.FC<{ name: string; className?: string }>;
  timeOfDay: number;
  mapObjects: MapObject[];
  collectObject: (id: string) => void;
}

export const Map: React.FC<MapProps> = ({ 
  position, 
  primaryPet, 
  movePlayer, 
  encounterActive, 
  DynamicIcon,
  timeOfDay,
  mapObjects,
  collectObject
}) => {
  const isNear = (objPos: { x: number, y: number }) => {
    const dist = Math.sqrt(Math.pow(position.x - objPos.x, 2) + Math.pow(position.y - objPos.y, 2));
    return dist < 8;
  };

  return (
    <div className="relative w-full h-full overflow-hidden transition-colors duration-1000 bg-pastel-green">
      {/* Grassy Field Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '40px 40px' }} />

      {/* Animated Grass Tufts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute"
            animate={{ 
              rotate: [-5, 5, -5],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            style={{ 
              left: `${(i * 17) % 100}%`, 
              top: `${(i * 23) % 100}%`,
              opacity: 0.3
            }}
          >
            <div className="flex gap-0.5">
              <div className="w-1 h-4 bg-green-400/40 rounded-full" />
              <div className="w-1 h-6 bg-green-400/40 rounded-full -mt-2" />
              <div className="w-1 h-4 bg-green-400/40 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Objects */}
      <AnimatePresence>
        {mapObjects.map(obj => (
          <motion.div
            key={obj.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute z-10"
            style={{ left: `${obj.position.x}%`, top: `${obj.position.y}%` }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2 group">
              <div className={`p-4 rounded-full glass soft-shadow animate-float flex items-center justify-center`}>
                <DynamicIcon name={obj.icon} className="w-8 h-8 text-slate-600" />
              </div>
              {isNear(obj.position) && !encounterActive && (
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  onClick={() => collectObject(obj.id)}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-pastel-blue px-4 py-2 rounded-full text-xs font-bold uppercase soft-shadow border border-pastel-blue/20 whitespace-nowrap z-50"
                >
                  Collect
                </motion.button>
              )}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/5 rounded-full blur-md" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Player */}
      <motion.div 
        className="absolute z-20"
        animate={{ x: `${position.x}%`, y: `${position.y}%` }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2 group">
          <div className="w-16 h-16 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <DynamicIcon name="PlayerCharacter" className="w-14 h-14 mt-2" />
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-3 bg-black/10 rounded-full blur-md" />
        </div>
      </motion.div>

      {/* Primary Pet Following */}
      {primaryPet && (
        <motion.div 
          className="absolute z-10"
          animate={{ 
            x: `${position.x - 8}%`, 
            y: `${position.y + 4}%` 
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.1 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2 group">
            <div className="w-12 h-12 flex items-center justify-center animate-float">
              <DynamicIcon name={SPECIES_DATA[primaryPet.species].icon} className="w-10 h-10" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/5 rounded-full blur-sm" />
          </div>
        </motion.div>
      )}

      {/* Movement Controls - Playful & Touch Friendly */}
      <div className="absolute bottom-24 right-8 flex flex-col items-center gap-2 z-40">
        <button 
          onClick={() => movePlayer(0, -5)} 
          disabled={encounterActive}
          className="w-14 h-14 glass rounded-full soft-shadow flex items-center justify-center active:scale-90 transition-transform disabled:opacity-30"
        >
          <ChevronRight className="-rotate-90 text-slate-600" />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => movePlayer(-5, 0)} 
            disabled={encounterActive}
            className="w-14 h-14 glass rounded-full soft-shadow flex items-center justify-center active:scale-90 transition-transform disabled:opacity-30"
          >
            <ChevronRight className="rotate-180 text-slate-600" />
          </button>
          <button 
            onClick={() => movePlayer(0, 5)} 
            disabled={encounterActive}
            className="w-14 h-14 glass rounded-full soft-shadow flex items-center justify-center active:scale-90 transition-transform disabled:opacity-30"
          >
            <ChevronRight className="rotate-90 text-slate-600" />
          </button>
          <button 
            onClick={() => movePlayer(5, 0)} 
            disabled={encounterActive}
            className="w-14 h-14 glass rounded-full soft-shadow flex items-center justify-center active:scale-90 transition-transform disabled:opacity-30"
          >
            <ChevronRight className="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  );
};
