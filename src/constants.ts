import { Species, Item, Quest, Companion, PlayStyle } from './types';

export const SPECIES_DATA: Record<Species, { description: string; icon: string; color: string; playStyle: PlayStyle }> = {
  Mosskit: {
    description: "A tiny fox made of soft moss and forest dreams.",
    icon: "🦊",
    color: "#86efac",
    playStyle: 'hide-and-seek'
  },
  Fluffin: {
    description: "A round, bouncy bird that loves high places.",
    icon: "🐦",
    color: "#fde047",
    playStyle: 'chase'
  },
  Pebblit: {
    description: "A sturdy little stone creature with a heart of gold.",
    icon: "🪨",
    color: "#d1d5db",
    playStyle: 'catch'
  },
  Bloomlet: {
    description: "A bunny that grows flowers wherever it hops.",
    icon: "🐰",
    color: "#f9a8d4",
    playStyle: 'rhythm'
  },
  Aquafin: {
    description: "A playful water spirit that shimmers in the sun.",
    icon: "💧",
    color: "#7dd3fc",
    playStyle: 'catch'
  },
  Stonehoof: {
    description: "A small, strong creature that loves to run.",
    icon: "🦌",
    color: "#b45309",
    playStyle: 'chase'
  },
  Glowwing: {
    description: "A moth-like creature that lights up the night.",
    icon: "🦋",
    color: "#c4b5fd",
    playStyle: 'rhythm'
  }
};

export const ITEMS: Record<string, Item> = {
  berry: { id: 'berry', name: 'Sun Berry', description: 'A sweet berry that restores 10 HP.', type: 'food', value: 10, icon: '🍒' },
  leaf: { id: 'leaf', name: 'Golden Leaf', description: 'A rare leaf that gives 50 XP.', type: 'xp', value: 50, icon: '🍃' },
  dew: { id: 'dew', name: 'Crystal Dew', description: 'Pure water that boosts HP cap by 5.', type: 'evolution', value: 5, icon: '💧' },
  nectar: { id: 'nectar', name: 'Flower Nectar', description: 'Sweet nectar used for evolution.', type: 'evolution', value: 0, icon: '🍯' }
};

export const XP_PER_LEVEL = (level: number) => 100 * level;

export const MAP_OBJECT_TYPES = {
  berry: { icon: '🍒', name: 'Sun Berry' },
  leaf: { icon: '🍃', name: 'Golden Leaf' },
  dew: { icon: '💧', name: 'Crystal Dew' },
};

export const INITIAL_QUESTS: Quest[] = [
  { id: 'q1', title: 'Field Trials', description: 'Play with 3 creatures in the wild.', objective: 'Play with 3 creatures', target: 3, current: 0, reward: 'HP Cap +20%', completed: false },
  { id: 'q2', title: 'New Friends', description: 'Befriend 2 different species.', objective: 'Befriend 2 species', target: 2, current: 0, reward: 'New Item: Golden Leaf', completed: false }
];
