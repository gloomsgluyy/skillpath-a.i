'use client';
import React, { useEffect, useState, ReactNode } from 'react';
import { motion } from 'motion/react';

interface Beam {
  id: number;
  x: number;
  duration: number;
}

interface BackgroundMeteorsProps {
  children?: ReactNode;
}

export default function BackgroundMeteors({
  children,
}: BackgroundMeteorsProps) {
  const [beams, setBeams] = useState<Beam[]>([]);
  const gridSize = 40;
  const totalLines = 35;

  const generateSafeGridPositions = (count: number): number[] => {
    const available: number[] = [];
    for (let i = 0; i < totalLines - 1; i++) {
      available.push(i);
    }

    const selected: number[] = [];
    while (available.length > 0 && selected.length < count) {
      const idx = Math.floor(Math.random() * available.length);
      const value = available[idx];
      selected.push(value);
      available.splice(
        0,
        available.length,
        ...available.filter((v) => Math.abs(v - value) > 1),
      );
    }

    return selected.map((line) => line * gridSize);
  };

  useEffect(() => {
    const generateBeams = () => {
      const count = Math.floor(Math.random() * 2) + 3;
      const xPositions = generateSafeGridPositions(count);

      const newBeams: Beam[] = xPositions.map((x) => ({
        id: Math.random(),
        x,
        duration: 4 + Math.random() * 1.5,
      }));

      setBeams(newBeams);

      const maxDuration = Math.max(...newBeams.map((b) => b.duration));
      setTimeout(generateBeams, (maxDuration - 0.5) * 1000);
    };

    generateBeams();
  }, []);

  return (
    <div className='relative w-full min-h-screen bg-[#fef0e6] dark:bg-black'>
      {/* Animated gradient blobs for depth (Sunset Horizon Theme) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top-left warm coral blob */}
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] rounded-full opacity-60 mix-blend-multiply"
          style={{ background: 'radial-gradient(circle, rgba(255,126,95,0.4) 0%, transparent 60%)' }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Center-right amber blob */}
        <motion.div
          className="absolute top-[10%] -right-[10%] w-[700px] h-[700px] rounded-full opacity-50 mix-blend-multiply"
          style={{ background: 'radial-gradient(circle, rgba(254,180,123,0.5) 0%, transparent 60%)' }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Bottom-left soft peach blob */}
        <motion.div
          className="absolute top-[50%] -left-[10%] w-[600px] h-[600px] rounded-full opacity-50 mix-blend-multiply"
          style={{ background: 'radial-gradient(circle, rgba(255,200,170,0.6) 0%, transparent 60%)' }}
          animate={{ x: [0, 35, 0], y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Bottom-right sunset glow */}
        <motion.div
          className="absolute top-[70%] right-[0%] w-[700px] h-[700px] rounded-full opacity-40 mix-blend-multiply"
          style={{ background: 'radial-gradient(circle, rgba(255,150,100,0.5) 0%, transparent 60%)' }}
          animate={{ x: [0, -25, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Fixed grid background */}
      <div
        className='fixed inset-0 z-[1] opacity-50'
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage:
          'linear-gradient(to right, #f0ddd0 1px, transparent 1px), linear-gradient(to bottom, #f0ddd0 1px, transparent 1px)',
        }}
      />
      <div
        className='fixed inset-0 dark:block hidden z-0'
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage:
            'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #024e6b  1px, transparent 1px)',
        }}
      />
      {/* Vignette mask */}
      <div
        className='pointer-events-none fixed inset-0 dark:bg-black z-[2]
        mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]
        bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(254,240,230,0.6)_100%)]'
      />
      {/* Meteor beams */}
      {beams.map((b) => (
        <motion.div
          key={b.id}
          className='fixed top-0 z-[3]'
          style={{ left: b.x }}
          initial={{ y: -150 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: b.duration,
            ease: 'linear',
          }}
        >
          <div
            className='h-14 w-px rounded-full
              bg-linear-to-t from-black to-transparent
              dark:from-indigo-500 dark:via-teal-500 dark:to-transparent'
            style={{ margin: '0 auto' }}
          />
        </motion.div>
      ))}

      {/* Scrollable content */}
      <div className='relative z-10'>
        {children}
      </div>
    </div>
  );
}
