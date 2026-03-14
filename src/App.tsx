import React, { useState, useEffect, useCallback } from 'react';
import { World } from './components/World';
import { HUD } from './components/HUD';
import { EncounterModal } from './components/EncounterModal';
import { PlayInteraction } from './components/PlayInteraction';
import { Companion, GameState, InventoryItem, Species, Quest } from './types';
import { INITIAL_QUESTS, SPECIES_DATA, ITEMS } from './constants';
import { AnimatePresence, motion } from 'motion/react';

const INITIAL_STATE: GameState = {
  companions: [],
  inventory: [],
  quests: INITIAL_QUESTS,
  playerPos: { x: 1000, y: 1000 },
  isEncountering: false,
  currentEncounter: null,
};

export default function App() {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('play-pets-save');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [keys, setKeys] = useState<Record<string, boolean>>({});
  const [showPlay, setShowPlay] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [reward, setReward] = useState<{ icon: string; name: string } | null>(null);

  // Save game
  useEffect(() => {
    localStorage.setItem('play-pets-save', JSON.stringify(state));
  }, [state]);

  // Movement logic
  useEffect(() => {
    if (state.isEncountering || showPlay || showInventory) return;

    const handleKeyDown = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key.toLowerCase()]: true }));
    const handleKeyUp = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key.toLowerCase()]: false }));

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const moveInterval = setInterval(() => {
      let dx = 0;
      let dy = 0;
      const speed = 5;

      if (keys['w'] || keys['arrowup']) dy -= speed;
      if (keys['s'] || keys['arrowdown']) dy += speed;
      if (keys['a'] || keys['arrowleft']) dx -= speed;
      if (keys['d'] || keys['arrowright']) dx += speed;

      if (dx !== 0 || dy !== 0) {
        setState(prev => ({
          ...prev,
          playerPos: {
            x: Math.max(0, Math.min(2000, prev.playerPos.x + dx)),
            y: Math.max(0, Math.min(2000, prev.playerPos.y + dy))
          }
        }));
      }
    }, 16);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(moveInterval);
    };
  }, [keys, state.isEncountering, showPlay, showInventory]);

  const handleEncounter = useCallback((species: Species) => {
    setState(prev => ({
      ...prev,
      isEncountering: true,
      currentEncounter: { species, id: Math.random().toString(36).substr(2, 9) }
    }));
  }, []);

  const handlePet = () => {
    if (!state.currentEncounter) return;
    const species = state.currentEncounter.species;
    
    const newCompanion: Companion = {
      id: Math.random().toString(36).substr(2, 9),
      name: species,
      species: species,
      level: 1,
      xp: 0,
      hp: 30,
      hpCap: 30,
      abilities: ['forage'],
      evolutionLevel: 10,
      isPrimary: state.companions.length === 0
    };

    setState(prev => ({
      ...prev,
      companions: [...prev.companions, newCompanion],
      isEncountering: false,
      currentEncounter: null,
      quests: prev.quests.map(q => {
        if (q.id === 'q2' && !q.completed) {
          const newCurrent = q.current + 1;
          return { ...q, current: newCurrent, completed: newCurrent >= q.target };
        }
        return q;
      })
    }));
  };

  const handlePlay = () => {
    setShowPlay(true);
  };

  const handlePlayComplete = (success: boolean) => {
    setShowPlay(false);
    if (success) {
      const itemKeys = Object.keys(ITEMS);
      const randomItemKey = itemKeys[Math.floor(Math.random() * itemKeys.length)];
      const item = ITEMS[randomItemKey];
      
      setReward({ icon: item.icon, name: item.name });
      setTimeout(() => setReward(null), 3000);

      setState(prev => {
        const newInventory = [...prev.inventory];
        const existing = newInventory.find(i => i.itemId === randomItemKey);
        if (existing) {
          existing.quantity += 1;
        } else {
          newInventory.push({ itemId: randomItemKey, quantity: 1 });
        }

        return {
          ...prev,
          inventory: newInventory,
          isEncountering: false,
          currentEncounter: null,
          quests: prev.quests.map(q => {
            if (q.id === 'q1' && !q.completed) {
              const newCurrent = q.current + 1;
              return { ...q, current: newCurrent, completed: newCurrent >= q.target };
            }
            return q;
          })
        };
      });
    } else {
      setState(prev => ({ ...prev, isEncountering: false, currentEncounter: null }));
    }
  };

  const primaryPet = state.companions.find(c => c.isPrimary) || null;

  const handleManualMove = (dx: number, dy: number) => {
    setState(prev => ({
      ...prev,
      playerPos: {
        x: Math.max(0, Math.min(2000, prev.playerPos.x + dx)),
        y: Math.max(0, Math.min(2000, prev.playerPos.y + dy))
      }
    }));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-sky">
      <World 
        playerPos={state.playerPos} 
        primaryPet={primaryPet}
        onEncounter={handleEncounter}
        isPaused={state.isEncountering || showPlay || showInventory}
      />

      <HUD 
        primaryPet={primaryPet}
        inventory={state.inventory}
        quests={state.quests}
        onOpenInventory={() => setShowInventory(true)}
        onMove={handleManualMove}
      />

      <AnimatePresence>
        {state.isEncountering && state.currentEncounter && !showPlay && (
          <EncounterModal 
            species={state.currentEncounter.species}
            onPlay={handlePlay}
            onPet={handlePet}
            onClose={() => setState(prev => ({ ...prev, isEncountering: false, currentEncounter: null }))}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPlay && state.currentEncounter && (
          <PlayInteraction 
            species={state.currentEncounter.species}
            playStyle={SPECIES_DATA[state.currentEncounter.species].playStyle}
            onComplete={handlePlayComplete}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reward && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.5 }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 glass px-8 py-4 rounded-[2rem] soft-shadow flex items-center gap-4 border-2 border-white/80 glow-sky"
          >
            <span className="text-4xl animate-float">{reward.icon}</span>
            <div className="text-left">
              <div className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.2em]">New Discovery!</div>
              <div className="font-bold text-slate-700 text-lg">{reward.name}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inventory Modal */}
      <AnimatePresence>
        {showInventory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-md p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass rounded-[3rem] p-8 max-w-2xl w-full soft-shadow overflow-hidden border-4 border-white/80"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-700 tracking-tight">Adventure Log</h2>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-1">Your journey so far</p>
                </div>
                <button 
                  onClick={() => setShowInventory(false)} 
                  className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[55vh] overflow-y-auto pr-4 custom-scrollbar">
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-6 bg-pastel-green rounded-full" />
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Companions ({state.companions.length})</h3>
                  </div>
                  <div className="space-y-3">
                    {state.companions.map(c => (
                      <div key={c.id} className="bg-white/40 p-4 rounded-[2rem] flex items-center gap-4 border-2 border-white/60 hover:border-pastel-green transition-all group">
                        <div className="text-3xl bg-white/80 w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          {SPECIES_DATA[c.species].icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-slate-700">{c.name}</span>
                            <span className="text-[9px] bg-pastel-green/50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">LV.{c.level}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100/50 rounded-full mt-2.5 overflow-hidden border border-white/50">
                            <div className="h-full bg-emerald-400" style={{ width: `${(c.hp/c.hpCap)*100}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                    {state.companions.length === 0 && (
                      <div className="text-slate-400 text-sm italic p-8 text-center bg-white/30 rounded-[2rem] border-2 border-dashed border-white/50">
                        No companions yet...
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-6 bg-pastel-blue rounded-full" />
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Backpack ({state.inventory.length})</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {state.inventory.map(i => {
                      const item = ITEMS[i.itemId];
                      return (
                        <div key={i.itemId} className="bg-white/40 p-4 rounded-[1.5rem] flex flex-col items-center gap-2 border-2 border-white/60 hover:bg-white/60 transition-all">
                          <div className="text-3xl animate-float" style={{ animationDelay: `${Math.random() * 2}s` }}>{item.icon}</div>
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-slate-600 leading-tight">{item.name}</div>
                            <div className="text-[9px] text-sky-500 font-bold mt-0.5">QTY: {i.quantity}</div>
                          </div>
                        </div>
                      );
                    })}
                    {state.inventory.length === 0 && (
                      <div className="col-span-2 text-slate-400 text-sm italic p-8 text-center bg-white/30 rounded-[2rem] border-2 border-dashed border-white/50">
                        Backpack is empty...
                      </div>
                    )}
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
