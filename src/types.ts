export type Species = 'Mosskit' | 'Fluffin' | 'Pebblit' | 'Bloomlet' | 'Aquafin' | 'Stonehoof' | 'Glowwing';

export type PlayStyle = 'hide-and-seek' | 'chase' | 'catch' | 'rhythm';

export interface Companion {
  id: string;
  name: string;
  species: Species;
  level: number;
  xp: number;
  hp: number;
  hpCap: number;
  abilities: string[];
  evolutionLevel: number;
  isPrimary: boolean;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'food' | 'xp' | 'evolution';
  value: number;
  icon: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  objective: string;
  target: number;
  current: number;
  reward: string;
  completed: boolean;
}

export interface InventoryItem {
  itemId: string;
  quantity: number;
}

export interface MapObject {
  id: string;
  type: string;
  x: number;
  y: number;
  collected: boolean;
}

export interface GameState {
  companions: Companion[];
  inventory: InventoryItem[];
  quests: Quest[];
  playerPos: { x: number; y: number };
  isEncountering: boolean;
  currentEncounter: { species: Species; id: string } | null;
}
