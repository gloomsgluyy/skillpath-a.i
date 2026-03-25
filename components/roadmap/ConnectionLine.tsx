'use client';
import { motion } from 'motion/react';

interface Props {
  start: { x: number; y: number };
  end: { x: number; y: number };
  status: 'completed' | 'active' | 'locked';
}

export const ConnectionLine = ({ start, end, status }: Props) => {
  // S-curve Bezier between two points
  const midX = (start.x + end.x) / 2;
  const path = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

  return (
    <motion.path
      d={path}
      fill="none"
      stroke={status === 'completed' ? '#f59e0b' : status === 'active' ? '#94a3b8' : '#e2e8f0'}
      strokeWidth={status === 'completed' ? 2.5 : 2}
      strokeDasharray={status === 'locked' ? '6,6' : 'none'}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{
        pathLength: 1,
        opacity: status === 'locked' ? 0.25 : status === 'active' ? 0.5 : 0.7,
      }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    />
  );
};
