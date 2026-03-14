import React from 'react';
import { motion } from 'motion/react';
import { Companion, InventoryItem, Quest } from '../types';
import { ITEMS, SPECIES_DATA } from '../constants';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Backpack, ScrollText } from 'lucide-react';

interface HUDProps {
  primaryPet: Companion | null;
  inventory: InventoryItem[];
  quests: Quest[];
  onOpenInventory: () => void;
  onMove?: (dx: number, dy: number) => void;
}

export const HUD: React.FC<HUDProps> = ({ primaryPet, inventory, quests, onOpenInventory, onMove }) => {
  const activeQuest = quests.find(q => !q.completed);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 p-4 md:p-8 flex flex-col justify-between">
      {/* Top Section: Pet Status & Inventory */}
      <div className="flex justify-between items-start">
        <div className="pointer-events-auto">
          {primaryPet ? (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="glass p-4 rounded-[2rem] soft-shadow flex items-center gap-4 border-2 border-white/80"
            >
              <div className="w-14 h-14 bg-pastel-green/80 rounded-2xl flex items-center justify-center text-3xl glow-mint border border-white/50">
                {SPECIES_DATA[primaryPet.species].icon}
              </div>
              <div className="pr-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-700 text-sm">{primaryPet.name}</h3>
                  <span className="bg-emerald-400/20 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">LV.{primaryPet.level}</span>
                </div>
                <div className="mt-1.5 w-28 h-2 bg-slate-100/50 rounded-full overflow-hidden border border-white/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(primaryPet.hp / primaryPet.hpCap) * 100}%` }}
                    className="h-full bg-emerald-400"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="glass p-4 rounded-[2rem] border-2 border-dashed border-slate-200 text-slate-400 font-bold text-xs">
              Explore to find a friend!
            </div>
          )}
        </div>

        <button 
          onClick={onOpenInventory}
          className="pointer-events-auto glass p-4 rounded-3xl soft-shadow border-2 border-white/50 hover:scale-105 active:scale-90 transition-all glow-sky"
        >
          <div className="relative">
            <Backpack className="w-6 h-6 text-sky-500" />
            {inventory.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-pastel-pink text-red-500 text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                {inventory.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Bottom Section: Quests & Controls */}
      <div className="flex justify-between items-end gap-4">
        <div className="pointer-events-auto max-w-[240px] w-full">
          {activeQuest && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass p-5 rounded-[2rem] soft-shadow border-2 border-white/50"
            >
              <div className="flex items-center gap-2 mb-2">
                <ScrollText className="w-4 h-4 text-orange-400" />
                <h4 className="font-bold text-slate-600 text-[10px] uppercase tracking-widest">{activeQuest.title}</h4>
              </div>
              <p className="text-[11px] text-slate-500 mb-3 leading-tight">{activeQuest.description}</p>
              <div className="w-full h-1.5 bg-slate-100/50 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(activeQuest.current / activeQuest.target) * 100}%` }}
                  className="h-full bg-orange-300"
                />
              </div>
              <div className="text-[9px] font-bold text-slate-400 mt-1.5 text-right tracking-tighter">
                PROGRESS: {activeQuest.current} / {activeQuest.target}
              </div>
            </motion.div>
          )}
        </div>

        {/* Playful Touch Controls */}
        <div className="pointer-events-auto flex flex-col items-center gap-1">
          <div className="flex gap-1">
            <div className="w-12 h-12" />
            <button 
              onPointerDown={() => onMove?.(0, -10)}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-sky-400 hover:bg-sky-50 active:scale-90 transition-all border-2 border-white/50 glow-sky"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <div className="w-12 h-12" />
          </div>
          <div className="flex gap-1">
            <button 
              onPointerDown={() => onMove?.(-10, 0)}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-sky-400 hover:bg-sky-50 active:scale-90 transition-all border-2 border-white/50 glow-sky"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onPointerDown={() => onMove?.(0, 10)}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-sky-400 hover:bg-sky-50 active:scale-90 transition-all border-2 border-white/50 glow-sky"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
            <button 
              onPointerDown={() => onMove?.(10, 0)}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-sky-400 hover:bg-sky-50 active:scale-90 transition-all border-2 border-white/50 glow-sky"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
