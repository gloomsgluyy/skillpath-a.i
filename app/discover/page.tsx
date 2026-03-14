'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight, BrainCircuit, Sparkles } from 'lucide-react';

const QUESTIONS = [
  "Saya lebih suka memecahkan masalah infrastruktur yang rumit daripada mendesain tampilan depan website.",
  "Bekerja dengan data angka dan logika lebih memuaskan bagi saya daripada membuat konten visual.",
  "Saya merasa tertantang saat harus mengamankan sistem dari serangan siber.",
  "Membangun aplikasi mobile adalah impian saya sejak lama.",
  "Saya lebih suka bekerja dibelakang layar memastikan sistem berjalan lancar."
];

export default function DiscoverYourself() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      processAI();
    }
  };

  const processAI = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsFinished(true);
    }, 3000);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
        {!isFinished ? (
          <>
            {/* Progress Area */}
            <div className="w-full mb-12">
               <div className="flex justify-between items-end mb-4 font-bold text-xs uppercase tracking-widest text-muted-foreground">
                  <span className="flex items-center gap-2">
                     <BrainCircuit className="w-4 h-4 text-primary" />
                     Langkah {currentStep + 1} dari {QUESTIONS.length}
                  </span>
                  <span>{Math.round(progress)}% Selesai</span>
               </div>
               <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                     className="h-full bg-gradient-to-r from-primary to-sp-accent-gold shadow-[0_0_15px_rgba(139,34,82,0.4)]"
                  />
               </div>
            </div>

            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass p-12 rounded-[2rem] flex flex-col items-center text-center max-w-lg w-full"
                >
                  <div className="relative w-24 h-24 mb-8">
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-sp-accent-gold border-l-transparent"
                     />
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center text-primary"
                     >
                        <Sparkles size={32} />
                     </motion.div>
                  </div>
                  <h2 className="text-2xl font-display font-bold mb-4">Pemrosesan AI</h2>
                  <p className="text-muted-foreground">Mengkombinasikan bakat infrastrukturmu dengan tren industri saat ini...</p>
                </motion.div>
              ) : (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                  className="glass p-10 md:p-16 rounded-[2.5rem] w-full shadow-2xl relative overflow-hidden"
                >
                  {/* Decorative Glow */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sp-accent-gold/5 rounded-full blur-3xl" />

                  <h3 className="text-2xl md:text-4xl font-display font-bold text-center mb-16 leading-tight">
                    {QUESTIONS[currentStep]}
                  </h3>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 w-full">
                     <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-sp-accent-orange order-2 md:order-1">Sangat Setuju</span>
                     
                     <div className="flex items-center justify-center gap-4 md:gap-6 order-1 md:order-2">
                        {[1, 2, 3, 4, 5].map((val) => {
                           const size = 16 + (Math.abs(3 - val) * 12);
                           const color = val <= 2 ? "bg-sp-accent-orange" : val >= 4 ? "bg-primary" : "bg-muted-foreground/30";
                           return (
                              <button
                                 key={val}
                                 onClick={() => handleAnswer(val)}
                                 className={cn(
                                    "rounded-full transition-all hover:scale-125 hover:shadow-xl relative group",
                                    color
                                 )}
                                 style={{ width: size, height: size }}
                              >
                                 <div className="absolute inset-0 rounded-full bg-inherit blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                           );
                        })}
                     </div>

                     <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary order-3">Sangat Tidak Setuju</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-16 rounded-[2.5rem] flex flex-col items-center text-center max-w-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-8 border-4 border-emerald-50 shadow-xl">
               <CheckCircle2 size={40} />
            </div>
            <h2 className="text-4xl font-display font-extrabold mb-4">Analisis Selesai!</h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
               Berdasarkan jawabanmu, kamu memiliki potensi besar di bidang <strong>Cloud Infrastructure & Cybersecurity</strong>. 
               AI kami telah menyiapkan jalur belajar khusus untukmu.
            </p>
            <div className="flex gap-4">
               <Button 
                  onClick={() => window.location.href = '/paths'}
                  className="rounded-full px-8 py-7 bg-primary hover:bg-primary/95 text-white font-bold group"
               >
                  Lihat Skill Path Saya
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
               <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/explore'}
                  className="rounded-full px-8 py-7 border-2 border-primary/20 hover:bg-primary/5 font-bold"
               >
                  Telusuri Karir Lain
               </Button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
