import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Species, Companion } from '../types';
import { SPECIES_DATA } from '../constants';

interface WorldProps {
  playerPos: { x: number; y: number };
  primaryPet: Companion | null;
  onEncounter: (species: Species) => void;
  isPaused: boolean;
}

const WORLD_SIZE = 2000;

export const World: React.FC<WorldProps> = ({ playerPos, primaryPet, onEncounter, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(0);
  const lastEncounterCheck = useRef(0);

  // Generate some static environment objects
  const envObjects = useMemo(() => {
    const objects = [];
    const seed = 123;
    for (let i = 0; i < 100; i++) {
      const x = (Math.sin(i * seed) * 0.5 + 0.5) * WORLD_SIZE;
      const y = (Math.cos(i * seed * 1.5) * 0.5 + 0.5) * WORLD_SIZE;
      const type = i % 4;
      objects.push({ x, y, type });
    }
    return objects;
  }, []);

  // Generate some floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      if (!isPaused) {
        setFrame(f => f + 1);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera offset
      const camX = playerPos.x - canvas.width / 2;
      const camY = playerPos.y - canvas.height / 2;

      // Draw Background (Soft Grass)
      ctx.fillStyle = '#d1fae5'; // emerald-100
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Soft Grid Pattern
      ctx.strokeStyle = 'rgba(198, 246, 213, 0.5)'; // more visible grid
      ctx.lineWidth = 2;
      const spacing = 150;
      const startX = -(camX % spacing);
      const startY = -(camY % spacing);

      for (let x = startX; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = startY; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Environment (Flowers/Trees)
      envObjects.forEach((obj, i) => {
        const screenX = obj.x - camX;
        const screenY = obj.y - camY;

        if (screenX > -100 && screenX < canvas.width + 100 && screenY > -100 && screenY < canvas.height + 100) {
          const sway = Math.sin(frame * 0.02 + i) * 3;
          ctx.save();
          ctx.translate(screenX, screenY);
          ctx.rotate(sway * Math.PI / 180);
          
          ctx.font = '32px serif';
          const icons = ['🌸', '🌳', '🌼', '🌿'];
          ctx.fillText(icons[obj.type], -16, 0);
          ctx.restore();
        }
      });

      // Draw Encounter "Items" (Floating Sparkles/Creatures)
      const encounterSeed = 999;
      for (let i = 0; i < 15; i++) {
        const x = (Math.sin(i * encounterSeed) * 0.5 + 0.5) * WORLD_SIZE;
        const y = (Math.cos(i * encounterSeed * 2) * 0.5 + 0.5) * WORLD_SIZE;
        const screenX = x - camX;
        const screenY = y - camY;

        if (screenX > -50 && screenX < canvas.width + 50 && screenY > -50 && screenY < canvas.height + 50) {
          const float = Math.sin(frame * 0.05 + i) * 10;
          const glow = Math.abs(Math.sin(frame * 0.03 + i)) * 0.5 + 0.2;
          
          // Glow effect
          const gradient = ctx.createRadialGradient(screenX, screenY + float, 0, screenX, screenY + float, 30);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${glow})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(screenX, screenY + float, 30, 0, Math.PI * 2);
          ctx.fill();

          ctx.font = '28px serif';
          ctx.fillText('✨', screenX - 14, screenY + float + 10);
        }
      }

      // Draw Primary Pet
      if (primaryPet) {
        const petData = SPECIES_DATA[primaryPet.species];
        const petOffset = 60;
        const targetPetX = canvas.width / 2 - petOffset;
        const targetPetY = canvas.height / 2 + petOffset;
        
        const petX = targetPetX + Math.sin(frame * 0.04) * 15;
        const petY = targetPetY + Math.cos(frame * 0.04) * 10;
        
        // Pet Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.ellipse(petX, petY + 10, 20, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Pet Aura (Brightness boost)
        const petAura = ctx.createRadialGradient(petX, petY - 15, 0, petX, petY - 15, 30);
        petAura.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        petAura.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = petAura;
        ctx.beginPath();
        ctx.arc(petX, petY - 15, 30, 0, Math.PI * 2);
        ctx.fill();

        // Pet Emoji
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'white';
        ctx.font = '42px serif';
        const petBounce = Math.abs(Math.sin(frame * 0.08)) * 8;
        ctx.fillText(petData.icon, petX - 21, petY - petBounce);
        ctx.restore();
        
        // Pet Info (Near player)
        const infoX = petX - 20;
        const infoY = petY - 60 - petBounce;
        
        // HP Bar
        const barWidth = 40;
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.roundRect?.(infoX, infoY, barWidth, 6, 3);
        ctx.fill();
        
        ctx.fillStyle = '#4ade80'; // emerald-400
        const hpPercent = primaryPet.hp / primaryPet.hpCap;
        ctx.roundRect?.(infoX, infoY, barWidth * hpPercent, 6, 3);
        ctx.fill();

        // Level Tag
        ctx.fillStyle = '#3b82f6'; // blue-500
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`LV.${primaryPet.level}`, infoX, infoY - 5);
      }

      // Draw Player
      const playerX = canvas.width / 2;
      const playerY = canvas.height / 2;
      
      // Player Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(playerX, playerY + 10, 25, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Player Aura (Brightness boost)
      const playerAura = ctx.createRadialGradient(playerX, playerY - 15, 0, playerX, playerY - 15, 40);
      playerAura.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
      playerAura.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = playerAura;
      ctx.beginPath();
      ctx.arc(playerX, playerY - 15, 40, 0, Math.PI * 2);
      ctx.fill();

      // Player Emoji
      ctx.save();
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'white';
      ctx.font = '48px serif';
      const bounce = Math.sin(frame * 0.1) * 4;
      ctx.fillText('🧑‍🌾', playerX - 24, playerY + bounce);
      ctx.restore();

      // Ambient Particles
      particles.forEach((p, i) => {
        const driftX = Math.sin(frame * 0.01 + p.offset) * 20;
        const driftY = (frame * p.speed) % canvas.height;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(p.x + driftX, (p.y - driftY + canvas.height) % canvas.height, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Encounter Check
      if (!isPaused && Date.now() - lastEncounterCheck.current > 2000) {
        lastEncounterCheck.current = Date.now();
        if (Math.random() < 0.1) {
          const speciesKeys = Object.keys(SPECIES_DATA) as Species[];
          const randomSpecies = speciesKeys[Math.floor(Math.random() * speciesKeys.length)];
          onEncounter(randomSpecies);
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [playerPos, primaryPet, isPaused, frame, onEncounter, envObjects, particles]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 z-0 bg-mint"
      id="game-canvas"
    />
  );
};
