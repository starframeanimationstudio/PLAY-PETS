import React from 'react';
import { motion } from 'motion/react';
import { Species } from '../types';
import { SPECIES_DATA } from '../constants';

interface EncounterModalProps {
  species: Species;
  onPlay: () => void;
  onPet: () => void;
  onClose: () => void;
}

export const EncounterModal: React.FC<EncounterModalProps> = ({ species, onPlay, onPet, onClose }) => {
  const creature = SPECIES_DATA[species];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-md">
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        className="glass rounded-[3rem] shadow-2xl max-w-sm w-full overflow-hidden border-4 border-white/80"
      >
        <div className="bg-pastel-green/30 h-56 flex items-center justify-center relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full blur-xl" />
            <div className="absolute bottom-8 right-8 w-20 h-20 bg-white rounded-full blur-2xl" />
          </div>
          
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-9xl drop-shadow-2xl z-10"
          >
            {creature.icon}
          </motion.div>
          
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10">
             <div className="glass px-4 py-1.5 rounded-full text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] border border-white/50">
               Wild Discovery
             </div>
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-4xl font-bold text-slate-700 mb-3 tracking-tight">{species}</h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 px-2">
            {creature.description}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onPlay}
              className="group relative bg-pastel-orange/40 hover:bg-pastel-orange/60 p-5 rounded-[2rem] transition-all active:scale-90 border-2 border-white/50 soft-shadow glow-lavender"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white/80 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 transition-transform">
                  🎾
                </div>
                <div>
                  <span className="block font-bold text-slate-700 text-sm">Play</span>
                  <span className="text-[9px] text-orange-500 font-bold uppercase tracking-widest mt-0.5 block">
                    {creature.playStyle.replace(/-/g, ' ')}
                  </span>
                </div>
              </div>
            </button>

            <button
              onClick={onPet}
              className="group relative bg-pastel-pink/40 hover:bg-pastel-pink/60 p-5 rounded-[2rem] transition-all active:scale-90 border-2 border-white/50 soft-shadow glow-lavender"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white/80 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                  💖
                </div>
                <div>
                  <span className="block font-bold text-slate-700 text-sm">Pet</span>
                  <span className="text-[9px] text-red-500 font-bold uppercase tracking-widest mt-0.5 block">Befriend</span>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-8 text-slate-400 font-bold text-xs hover:text-slate-600 transition-colors uppercase tracking-widest"
          >
            Maybe later...
          </button>
        </div>
      </motion.div>
    </div>
  );
};
