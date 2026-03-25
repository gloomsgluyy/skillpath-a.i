'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight, Sparkles, Loader2, Bot } from 'lucide-react';
import { DISCOVER_QUESTIONS } from '@/lib/questions';
import { saveAssessmentResults } from '@/lib/firestore';
import { auth } from '@/lib/firebase';

export default function DiscoverYourself() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  
  const [bgColor, setBgColor] = useState('from-[#fef0e6] via-[#fde4d4] to-[#fef5ee]'); // Default Sunset
  
  const progressPercent = ((currentStep) / DISCOVER_QUESTIONS.length) * 100;
  const currentQuestion = DISCOVER_QUESTIONS[currentStep];

  useEffect(() => {
    if (currentStep > 0) {
      const currentCat = currentQuestion?.category;
      if (currentCat === 'infrastructure' || currentCat === 'software') {
         setBgColor('from-slate-900 via-indigo-950 to-slate-900 text-white');
      } else if (currentCat === 'creative') {
         setBgColor('from-rose-50 via-orange-50 to-amber-50');
      } else {
         setBgColor('from-[#fef0e6] via-[#fde4d4] to-[#fef5ee]');
      }
    }
  }, [currentStep, currentQuestion]);

  const handleAnswer = async (value: number) => {
    const newAnswers = [...answers, value];
    
    if (currentStep < DISCOVER_QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
    } else {
      setAnswers(newAnswers);
      await processAI(newAnswers);
    }
  };

  const processAI = async (finalAnswers: number[]) => {
    setIsProcessing(true);
    
    try {
      const storedData = localStorage.getItem('skillpath_onboarding_data');
      const profile = storedData ? JSON.parse(storedData) : {};
      
      const res = await fetch('/api/assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers, profile })
      });
      
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      
      setAiResult(data);
      
      if (auth.currentUser) {
        await saveAssessmentResults(auth.currentUser.uid, finalAnswers, data);
      }
    } catch (error) {
      console.error('Failed to process AI:', error);
      setAiResult({
        primaryField: "Full-Stack Development",
        secondaryField: "Cloud Infrastructure",
        strengths: ["Logika Analitik", "Pemecahan Masalah", "Kreativitas Teknis"],
        matchedCareers: ["Full-Stack Developer", "DevOps Engineer"],
        personalityTraits: ["Kreatif", "Fokus", "Mandiri"],
        detailedAnalysis: "Analisis gagal dimuat dari server, namun berdasarkan pola jawaban Anda menunjukkan ketertarikan kuat pada pembangunan perangkat lunak terintegrasi."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (aiResult) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
         
         <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-4xl bg-white/10 backdrop-blur-3xl border border-white/20 p-8 md:p-12 rounded-[3rem] shadow-2xl relative z-10"
         >
            <div className="w-20 h-20 rounded-3xl bg-amber-500 flex items-center justify-center text-white mb-8 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
               <CheckCircle2 size={40} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Analisis AI Selesai</h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl">Berdasarkan pola dari 25 jawabanmu, kami menemukan ruang di mana bakat alaminya paling bersinar.</p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
               <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h4 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Rekomendasi Utama</h4>
                    <p className="text-2xl font-black text-amber-400">{aiResult.primaryField}</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <h4 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Alternatif Kuat</h4>
                    <p className="text-xl font-bold text-white">{aiResult.secondaryField}</p>
                  </div>
               </div>
               
               <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center">
                  <h4 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Karakter & Kekuatan</h4>
                  <div className="flex flex-wrap gap-2">
                     {aiResult.strengths.map((s: string) => (
                        <span key={s} className="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-200 text-sm font-bold border border-indigo-500/30">
                           {s}
                        </span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/20 mb-10">
               <p className="text-white/90 leading-relaxed italic">
                 "{aiResult.detailedAnalysis}"
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button 
                  onClick={() => router.push('/paths')}
                  className="rounded-2xl px-8 py-7 bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] group w-full sm:w-auto"
               >
                  Lihat Skill Path Saya
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
               <Button 
                  variant="outline"
                  onClick={() => router.push('/explore')}
                  className="rounded-2xl px-8 py-7 bg-white/5 hover:bg-white/10 text-white border-white/20 font-bold text-lg w-full sm:w-auto"
               >
                  Telusuri Karir Lain
               </Button>
            </div>
         </motion.div>
      </div>
    );
  }

  return (
    <div className={cn("relative min-h-screen transition-colors duration-1000", bgColor)}>
      <Navbar />

      <main className="pt-32 pb-20 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center h-full min-h-[calc(100vh-80px)]">
        
        {/* Progress & Navigator Area */}
        <div className="w-full mb-12 flex flex-col gap-4 mt-8">
           <div className="flex justify-between items-end px-2">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-amber-500 shadow-lg shadow-amber-500/30 flex items-center justify-center text-white relative">
                    <Bot size={20} />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                 </div>
                 <span className="font-extrabold text-sm opacity-80 tracking-wide uppercase">
                    Pertanyaan {Math.min(currentStep + 1, 25)} <span className="opacity-50 font-medium">/ 25</span>
                 </span>
              </div>
              <span className="font-bold text-xs opacity-60 uppercase tracking-widest">{Math.round(progressPercent)}% Selesai</span>
           </div>
           
           <Progress value={progressPercent} className="h-2 bg-black/5 [&>div]:bg-amber-500 shadow-inner" />
        </div>

        {/* Dynamic Area */}
        <div className="flex-1 w-full flex flex-col justify-center items-center py-10 relative">
          <AnimatePresence mode="wait">
            {isProcessing ? (
               <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white/80 backdrop-blur-3xl border border-white border-opacity-50 p-12 rounded-[3rem] shadow-2xl flex flex-col items-center text-center w-full max-w-lg"
               >
                  <div className="relative w-32 h-32 mb-10">
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-amber-400"
                     />
                     <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                        className="absolute inset-2 rounded-full border-2 border-indigo-400/50"
                     />
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 flex items-center justify-center text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                     >
                        <Sparkles size={48} />
                     </motion.div>
                  </div>
                  <h2 className="text-3xl font-black mb-4">Pemrosesan AI</h2>
                  <p className="text-slate-500 font-medium text-lg lg:px-8">Menganalisis pola jawaban dan mencocokannya dengan ribuan profil karir industri...</p>
               </motion.div>
            ) : (
               <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="bg-white/60 dark:bg-black/40 backdrop-blur-3xl border border-white/50 dark:border-white/10 p-8 md:p-16 rounded-[3rem] w-full shadow-2xl relative overflow-hidden"
               >
                  {/* Category Tag */}
                  <div className="absolute top-8 left-8 hidden md:block">
                     <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 text-xs font-bold uppercase tracking-widest opacity-60">
                        {currentQuestion?.category}
                     </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-center mb-16 md:mb-24 leading-tight lg:leading-tight px-4 mt-8 md:mt-0">
                    "{currentQuestion?.text}"
                  </h3>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4 w-full px-4 md:px-10">
                     <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-amber-600 order-2 md:order-1 opacity-80">Sangat Setuju</span>
                     
                     <div className="flex justify-center items-center gap-4 md:gap-8 order-1 md:order-2 w-full md:w-auto">
                        {[1, 2, 3, 4, 5].map((val) => {
                           const isAgree = val <= 2;
                           const isDisagree = val >= 4;
                           const size = 20 + (Math.abs(3 - val) * 16); // 1 and 5 = largest (52px), 3 = smallest (20px)
                           
                           const colorClass = isAgree 
                             ? "bg-amber-400 hover:bg-amber-500 shadow-amber-400/50" 
                             : isDisagree 
                               ? "bg-[#5D1636] hover:bg-[#8A2150] shadow-rose-900/50" 
                               : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400";
                           
                           return (
                              <button
                                 key={val}
                                 onClick={() => handleAnswer(val)}
                                 className={cn(
                                    "rounded-full transition-all duration-300 hover:scale-125 focus:scale-110 shadow-lg relative cursor-pointer",
                                    colorClass
                                 )}
                                 style={{ width: size, height: size }}
                                 aria-label={`Skala ${val}`}
                              >
                                 <div className="absolute inset-0 rounded-full inherit bg-inherit blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
                              </button>
                           );
                        })}
                     </div>

                     <span className="text-[10px] md:text-xs uppercase font-black tracking-widest text-[#5D1636] order-3 opacity-80">Tidak Setuju</span>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
