import React from 'react';
import { motion } from 'motion/react';
import { Backpack, ScrollText, Heart, ArrowUpCircle } from 'lucide-react';
import { Item, Quest } from '../types';

interface InventoryPanelProps {
  inventory: Item[];
  DynamicIcon: React.FC<{ name: string; className?: string }>;
  onClose: () => void;
}

export const InventoryPanel: React.FC<InventoryPanelProps> = ({ inventory, DynamicIcon, onClose }) => {
  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full scrollbar-hide bg-white/60 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-sans font-bold text-slate-800 flex items-center gap-3">
          <Backpack className="w-8 h-8 text-pastel-blue" /> My Bag
        </h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <span className="text-xl font-bold text-slate-600">×</span>
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 pb-12">
        {inventory.map(item => (
          <motion.div 
            key={item.id} 
            whileHover={{ scale: 1.05 }}
            className="relative group"
          >
            <div className="bg-white p-6 rounded-[2.5rem] soft-shadow border border-white/50 flex flex-col items-center gap-3 hover:bg-slate-50 transition-all">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                <DynamicIcon name={item.icon} className="w-10 h-10" />
              </div>
              <span className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider leading-tight">{item.name}</span>
              
              <div className="absolute -top-2 -right-2 bg-pastel-blue text-blue-800 text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center soft-shadow border-2 border-white">
                {item.count}
              </div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 hidden group-hover:block z-50 w-48 p-4 bg-white rounded-2xl soft-shadow border border-white/50">
              <p className="text-xs font-bold text-slate-800 mb-1">{item.name}</p>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">{item.description}</p>
              {item.hpRestore && <p className="text-[10px] text-pastel-pink font-bold mt-2 flex items-center gap-1"><Heart className="w-3 h-3" /> +{item.hpRestore} HP</p>}
              {item.xpValue && <p className="text-[10px] text-pastel-blue font-bold mt-1 flex items-center gap-1"><ArrowUpCircle className="w-3 h-3" /> +{item.xpValue} XP</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

interface QuestPanelProps {
  quests: Quest[];
  onClose: () => void;
}

export const QuestPanel: React.FC<QuestPanelProps> = ({ quests, onClose }) => {
  return (
    <div className="p-8 space-y-8 overflow-y-auto h-full scrollbar-hide bg-white/60 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-sans font-bold text-slate-800 flex items-center gap-3">
          <ScrollText className="w-8 h-8 text-pastel-blue" /> Adventures
        </h2>
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-slate-200/50 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <span className="text-xl font-bold text-slate-600">×</span>
        </button>
      </div>
      <div className="space-y-6 pb-12">
        {quests.map(quest => (
          <motion.div 
            key={quest.id} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative p-8 rounded-[3rem] border overflow-hidden transition-all bg-white soft-shadow ${
              quest.status === 'completed' 
                ? 'opacity-60 border-pastel-green/20' 
                : 'border-white/50'
            }`}
          >
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-2">
                <h3 className="font-sans font-bold text-2xl text-slate-800">{quest.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-md italic">{quest.description}</p>
              </div>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest soft-shadow ${
                quest.status === 'completed' 
                  ? 'bg-pastel-green text-green-800' 
                  : 'bg-pastel-blue text-blue-800'
              }`}>
                {quest.status}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between relative z-10">
              <div className="flex gap-3">
                {quest.rewards.hpCapBoost && (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-pastel-pink bg-pastel-pink/10 px-4 py-2 rounded-2xl border border-pastel-pink/20 uppercase tracking-widest">
                    <Heart className="w-4 h-4" /> +{quest.rewards.hpCapBoost} HP CAP
                  </div>
                )}
                {quest.rewards.xp && (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-pastel-blue bg-pastel-blue/10 px-4 py-2 rounded-2xl border border-pastel-blue/20 uppercase tracking-widest">
                    <ArrowUpCircle className="w-4 h-4" /> {quest.rewards.xp} XP
                  </div>
                )}
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pastel-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
