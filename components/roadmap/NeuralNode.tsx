'use client';
import { motion } from 'motion/react';
import { CheckCircle2, Lock, Code, Palette, Cloud, Database, Search, Circle, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  code: Code,
  design: Palette,
  cloud: Cloud,
  database: Database,
  search: Search,
  default: Circle,
};

interface NeuralNodeData {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  status: 'completed' | 'active' | 'locked';
  coordinates: { x: number; y: number };
  icon_type: string;
  connections: string[];
  estimatedHours?: number;
}

interface Props {
  node: NeuralNodeData;
  onClick: (node: NeuralNodeData) => void;
  isSelected: boolean;
}

export const NeuralNode = ({ node, onClick, isSelected }: Props) => {
  const Icon = ICON_MAP[node.icon_type] || ICON_MAP.default;

  return (
    <motion.div
      style={{ left: node.coordinates.x, top: node.coordinates.y }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.4, delay: 0.1 }}
      whileHover={{ scale: 1.15 }}
      onClick={() => onClick(node)}
    >
      {/* Glow ring for active node */}
      {node.status === 'active' && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ width: 72, height: 72, left: -4, top: -4 }}
          animate={{
            boxShadow: [
              '0 0 0px 0px rgba(245,158,11,0.0)',
              '0 0 20px 8px rgba(245,158,11,0.35)',
              '0 0 0px 0px rgba(245,158,11,0.0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Selected ring */}
      {isSelected && (
        <div className="absolute -inset-1.5 rounded-full border-2 border-amber-500 animate-pulse" />
      )}

      {/* Main node circle */}
      <div
        className={`
          relative w-16 h-16 rounded-full border-2 flex items-center justify-center cursor-pointer backdrop-blur-md transition-all duration-300
          ${node.status === 'completed'
            ? 'bg-amber-50/80 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
            : node.status === 'active'
              ? 'bg-white/60 border-amber-400 shadow-xl'
              : 'bg-slate-50/40 border-slate-200/40 opacity-50 cursor-default'
          }
        `}
      >
        {node.status === 'completed' ? (
          <CheckCircle2 size={26} className="text-amber-600" />
        ) : node.status === 'locked' ? (
          <Lock size={22} className="text-slate-300" />
        ) : (
          <Icon size={24} className="text-slate-700" />
        )}

        {/* Active pulse ring */}
        {node.status === 'active' && (
          <span className="absolute inset-0 rounded-full animate-ping bg-amber-400/20" />
        )}
      </div>

      {/* Label */}
      <div className="whitespace-nowrap max-w-[120px]">
        <span className={`
          text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border block text-center truncate
          ${node.status === 'completed'
            ? 'text-amber-800 bg-amber-50/80 border-amber-200/50'
            : node.status === 'active'
              ? 'text-slate-800 bg-white/70 border-slate-200/50'
              : 'text-slate-400 bg-slate-50/50 border-slate-100/30'
          }
        `}>
          {node.title}
        </span>
      </div>
    </motion.div>
  );
};

export type { NeuralNodeData };
