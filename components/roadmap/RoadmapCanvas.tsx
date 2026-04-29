'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { NeuralNode, type NeuralNodeData } from './NeuralNode';
import { ConnectionLine } from './ConnectionLine';
import { ZoomIn, ZoomOut, Maximize2, X, Clock, BarChart3, Sparkles } from 'lucide-react';

interface Props {
  nodes: NeuralNodeData[];
  career: string;
  onNodeClick: (node: NeuralNodeData) => void;
}

export const RoadmapCanvas = ({ nodes, career, onNodeClick }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<NeuralNodeData | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingTranslateRef = useRef(translate);

  const queueTranslate = useCallback((next: { x: number; y: number }) => {
    pendingTranslateRef.current = next;
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      setTranslate(pendingTranslateRef.current);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    setScale(s => Math.min(2, Math.max(0.4, s + delta)));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.neural-node')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y });
  }, [translate]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    queueTranslate({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart, queueTranslate]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.neural-node')) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - translate.x, y: touch.clientY - translate.y });
  }, [translate]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    queueTranslate({ x: touch.clientX - dragStart.x, y: touch.clientY - dragStart.y });
  }, [isDragging, dragStart, queueTranslate]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  const resetView = () => { setScale(1); setTranslate({ x: 0, y: 0 }); };

  const handleNodeSelect = (node: NeuralNodeData) => {
    setSelectedNode(prev => prev?.id === node.id ? null : node);
    onNodeClick(node);
  };

  const validX = nodes.map(n => n.coordinates.x).filter(x => typeof x === 'number' && !isNaN(x));
  const validY = nodes.map(n => n.coordinates.y).filter(y => typeof y === 'number' && !isNaN(y));

  const maxX = (validX.length > 0 ? Math.max(...validX) : 800) + 400;
  const maxY = (validY.length > 0 ? Math.max(...validY) : 600) + 400;

  const yValues = [...new Set(validY)].sort((a, b) => a - b);

  const completedCount = nodes.filter(n => n.status === 'completed').length;
  const progressPct = nodes.length > 0 ? Math.round((completedCount / nodes.length) * 100) : 0;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50/30 to-sky-50/20" />
      <div className="absolute inset-0 opacity-[0.07]" style={{
        background: 'radial-gradient(at 20% 30%, #FFDAB9 0%, transparent 50%), radial-gradient(at 80% 20%, #89CFF0 0%, transparent 50%), radial-gradient(at 50% 80%, #98FF98 0%, transparent 50%)',
      }} />

      {/* Dot grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />

      {/* Title Header - MATCH REFERENCE */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-30 pointer-events-none max-w-[60%] sm:max-w-none">
        <h2 className="text-lg sm:text-2xl font-black text-slate-800 tracking-tight leading-none drop-shadow-sm">Neural Roadmap</h2>
        <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-1 sm:mt-1.5 flex items-center gap-1.5 sm:gap-2">
          <span className="w-4 sm:w-8 h-[1px] bg-slate-200" /> <span className="truncate">{career}</span>
        </p>
      </div>

      {/* Progress bar top-right */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-30 flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-xl rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/40 shadow-sm scale-90 sm:scale-100 origin-right">
        <div className="flex-1 w-16 sm:w-24 h-1 bg-slate-200/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="text-[8px] sm:text-[10px] font-black text-slate-500">{completedCount}/{nodes.length}</span>
      </div>

      {/* Timeline Y-axis markers - MATCH REFERENCE STYLE */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 z-20 flex flex-col pointer-events-none border-r border-slate-200/10">
        {yValues.map((y, i) => (
          <div
            key={i}
            className="absolute left-1.5 sm:left-3 flex items-center gap-1 sm:gap-2"
            style={{ top: y * scale + translate.y }}
          >
             <div className="h-6 sm:h-10 border-l border-slate-300/30" />
             <span className="text-[7px] sm:text-[10px] font-black text-slate-400/50 uppercase tracking-tight [writing-mode:vertical-lr] rotate-180">
              Bulan {i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Canvas (pan & zoom) */}
      <div
        ref={containerRef}
        className={`absolute inset-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ touchAction: 'none' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
            transformOrigin: '0 0',
            width: maxX,
            height: maxY,
            position: 'relative',
          }}
        >
          {/* SVG layer for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: maxX, height: maxY }}>
            {nodes.map(node =>
              (node.connections || []).map(targetId => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;
                return (
                  <ConnectionLine
                    key={`${node.id}-${targetId}`}
                    start={node.coordinates}
                    end={target.coordinates}
                    status={node.status}
                  />
                );
              })
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <div key={node.id} className="neural-node">
              <NeuralNode
                node={node}
                onClick={handleNodeSelect}
                isSelected={selectedNode?.id === node.id}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 w-80"
        >
          <div className="bg-white/90 backdrop-blur-2xl rounded-2xl border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.1)] p-5 relative">
            <button onClick={() => setSelectedNode(null)} className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors">
              <X size={16} />
            </button>
            <h4 className="font-black text-sm text-slate-900 mb-1 pr-6">{selectedNode.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{selectedNode.description}</p>
            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 mb-3">
              <span className="flex items-center gap-1"><Clock size={12} /> {selectedNode.duration || `${selectedNode.estimatedHours || '?'}h`}</span>
              <span className="flex items-center gap-1"><BarChart3 size={12} /> {selectedNode.difficulty || 'Menengah'}</span>
            </div>

            {selectedNode.learning_resources && selectedNode.learning_resources.length > 0 && (
              <div className="mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Sparkles size={10} className="text-amber-500" /> Referensi Belajar
                </p>
                <div className="flex flex-col gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {selectedNode.learning_resources.map((res: any, idx: number) => (
                    <a key={idx} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-700 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 transition-all group">
                      <span className="truncate pr-2 group-hover:underline">{res.title}</span>
                      <span className="text-[9px] uppercase tracking-wider text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">{res.type || 'Link'}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {selectedNode.status === 'active' && (
              <button
                onClick={() => onNodeClick(selectedNode)}
                className="w-full py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Tandai Selesai
              </button>
            )}
            {selectedNode.status === 'completed' && (
              <div className="text-center text-xs font-bold text-emerald-600 py-2">Sudah Selesai</div>
            )}
            {selectedNode.status === 'locked' && (
              <div className="text-center text-xs font-bold text-slate-400 py-2">Selesaikan tahap sebelumnya</div>
            )}
          </div>
        </motion.div>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        <button onClick={resetView} className="p-2 bg-white/70 backdrop-blur-md rounded-lg border border-white/40 text-slate-600 hover:bg-white hover:shadow-md transition-all text-xs font-bold flex items-center gap-1">
          <Maximize2 size={14} /> Reset
        </button>
        <button onClick={() => setScale(s => Math.min(2, s + 0.15))} className="p-2 bg-white/70 backdrop-blur-md rounded-lg border border-white/40 text-slate-600 hover:bg-white hover:shadow-md transition-all">
          <ZoomIn size={16} />
        </button>
        <button onClick={() => setScale(s => Math.max(0.4, s - 0.15))} className="p-2 bg-white/70 backdrop-blur-md rounded-lg border border-white/40 text-slate-600 hover:bg-white hover:shadow-md transition-all">
          <ZoomOut size={16} />
        </button>
      </div>
    </div>
  );
};
