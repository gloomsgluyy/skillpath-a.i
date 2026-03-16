'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

interface Testimonial {
  name: string;
  handle: string;
  review: string;
  avatar: string;
}

interface KineticTestimonialProps {
  testimonials: Testimonial[];
  className?: string;
  cardClassName?: string;
  avatarClassName?: string;
  desktopColumns?: number;
  tabletColumns?: number;
  mobileColumns?: number;
  speed?: number; // Speed multiplier
}

export default function KineticTestimonial({
  testimonials,
  className,
  cardClassName,
  avatarClassName,
  desktopColumns = 4,
  tabletColumns = 3,
  mobileColumns = 1,
  speed = 1
}: KineticTestimonialProps) {
  // Split testimonials into 3 uneven groups to create a staggered masonry/marquee effect
  const col1 = [...testimonials].slice(0, Math.ceil(testimonials.length / 3));
  const col2 = [...testimonials].slice(Math.ceil(testimonials.length / 3), Math.ceil((testimonials.length / 3) * 2));
  const col3 = [...testimonials].slice(Math.ceil((testimonials.length / 3) * 2));

  return (
    <div className={cn("relative flex h-[600px] w-full items-center justify-center overflow-hidden bg-transparent", className)}>
      <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none" />
      
      <div className="flex w-full gap-4 sm:gap-6 lg:gap-8 justify-center px-4 max-w-7xl">
        <TestimonialColumn testimonials={col1} speed={speed * 1.2} delay={0} cardClassName={cardClassName} avatarClassName={avatarClassName} />
        <TestimonialColumn testimonials={col2} speed={speed * 0.9} delay={2} cardClassName={cardClassName} avatarClassName={avatarClassName} className="hidden sm:flex" />
        <TestimonialColumn testimonials={col3} speed={speed * 1.5} delay={1} cardClassName={cardClassName} avatarClassName={avatarClassName} className="hidden lg:flex" />
      </div>
    </div>
  );
}

function TestimonialColumn({ 
  testimonials, 
  speed, 
  delay, 
  className, 
  cardClassName,
  avatarClassName 
}: { 
  testimonials: Testimonial[]; 
  speed: number; 
  delay: number;
  className?: string;
  cardClassName?: string;
  avatarClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create an infinite loop by duplicating the array
  const duplicatedItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div 
      ref={containerRef}
      className={cn("flex flex-col gap-6 w-full max-w-[320px] overflow-hidden py-4", className)}
    >
       <motion.div
         className="flex flex-col gap-6"
         animate={{ y: ['0%', '-33.33%'] }}
         transition={{
            duration: 20 / speed,
            ease: "linear",
            repeat: Infinity,
            delay: delay
         }}
       >
         {duplicatedItems.map((t, idx) => (
           <div 
             key={idx} 
             className={cn(
               "relative p-6 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-100/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)]",
               cardClassName
             )}
           >
             <div className="flex items-center gap-3 mb-4">
               <img 
                 src={t.avatar} 
                 alt={t.name}
                 className={cn("w-10 h-10 rounded-full object-cover shrink-0", avatarClassName)}
                 loading="lazy"
               />
               <div className="flex flex-col">
                 <span className="font-bold text-sm text-slate-800 leading-tight">{t.name}</span>
                 <span className="text-xs text-slate-500 font-medium">{t.handle}</span>
               </div>
             </div>
             <p className="text-sm text-slate-600 leading-relaxed font-medium">"{t.review}"</p>
           </div>
         ))}
       </motion.div>
    </div>
  );
}
