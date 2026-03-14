import React from 'react';
import { motion } from 'motion/react';
import { Users, Sparkles, ArrowUpCircle, Apple, Heart } from 'lucide-react';
import { Companion, Item } from '../types';
import { SPECIES_DATA, XP_PER_LEVEL } from '../constants';

interface CompanionPanelProps {
  companions: Companion[];
  inventory: Item[];
  setPrimaryPet: (id: string) => void;
  feedPet: (companionId: string, itemId: string) => void;
  upgradeAbility: (companionId: string, abilityName: string) => void;
  DynamicIcon: React.FC<{ name: string; className?: string }>;
  onClose: () => void;
}

export const CompanionPanel: React.FC<CompanionPanelProps> = ({ 
  companions, 
  inventory, 
  setPrimaryPet, 
  feedPet, 
  upgradeAbility,
  DynamicIcon,
  onClose
}) => {
  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full scrollbar-hide bg-white/60 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-sans font-bold text-slate-800 flex items-center gap-3">
          <Users className="w-8 h-8 text-pastel-blue" /> My Friends
        </h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <span className="text-xl font-bold text-slate-600">×</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        {companions.map(companion => (
          <motion.div 
            key={companion.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative p-6 rounded-[3rem] border transition-all overflow-hidden bg-white soft-shadow ${
              companion.isPrimary 
                ? 'border-pastel-blue/50 glow-sky' 
                : 'border-white/50'
            }`}
          >
            {/* Background Pastel Glow */}
            <div className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[60px] opacity-10 ${SPECIES_DATA[companion.species].color}`} />

            <div className="flex gap-6 relative z-10">
              <div className="flex flex-col items-center gap-3">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden soft-shadow bg-slate-50`}>
                  <DynamicIcon name={SPECIES_DATA[companion.species].icon} className="w-16 h-16 z-10" />
                  <div className="absolute inset-0 bg-white/20 animate-pulse-soft" />
                </div>
                <div className="bg-slate-100 px-3 py-1 rounded-full border border-white/50">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">LV. {companion.level}</span>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans font-bold text-2xl text-slate-800">{companion.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{companion.species}</p>
                  </div>
                  {companion.isPrimary && (
                    <div className="bg-pastel-blue text-blue-800 text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">
                      Primary
                    </div>
                  )}
                </div>
                
                {/* Stats */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-pastel-pink" /> HP</span>
                      <span>{companion.hp} / {companion.hpCap}</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-white/50">
                      <motion.div 
                        className="h-full bg-pastel-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${(companion.hp / companion.hpCap) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-pastel-blue" /> XP</span>
                      <span>{companion.xp} / {XP_PER_LEVEL(companion.level)}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-white/50">
                      <motion.div 
                        className="h-full bg-pastel-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${(companion.xp / XP_PER_LEVEL(companion.level)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Abilities Section */}
            <div className="mt-6 p-4 bg-slate-50 rounded-[2rem] border border-white/50 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pastel-blue" /> Points: <span className="text-slate-800 text-sm">{companion.abilityPoints}</span>
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {companion.abilities.map(ability => (
                  <div key={ability} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-white/50 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{ability}</span>
                      <span className="text-[10px] text-pastel-blue font-bold uppercase">Level {companion.abilityLevels[ability] || 1}</span>
                    </div>
                    <button 
                      onClick={() => upgradeAbility(companion.id, ability)}
                      disabled={companion.abilityPoints <= 0}
                      className={`p-2 rounded-xl transition-all ${
                        companion.abilityPoints > 0 
                          ? 'bg-pastel-blue/20 text-blue-600 hover:bg-pastel-blue hover:text-white' 
                          : 'text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      <ArrowUpCircle className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              {!companion.isPrimary && (
                <button 
                  onClick={() => setPrimaryPet(companion.id)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
                >
                  Set Primary
                </button>
              )}
              <button 
                onClick={() => {
                  const food = inventory.find(i => i.type === 'food');
                  if (food) feedPet(companion.id, food.id);
                }}
                className="flex-1 py-3 bg-pastel-pink/30 text-red-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-pastel-pink/50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Apple className="w-4 h-4" /> Feed
              </button>
            </div>
          </motion.div>
        ))}
        {companions.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white/40 rounded-[3rem] border-dashed border-2 border-slate-200">
            <Users className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 italic font-medium">No companions yet. The field is full of friends waiting to meet you!</p>
          </div>
        )}
      </div>
    </div>
  );
};
