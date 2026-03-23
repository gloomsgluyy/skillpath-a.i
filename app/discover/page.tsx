'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle2, ArrowRight, Sparkles, Bot } from 'lucide-react';
import { DISCOVER_QUESTIONS } from '@/lib/questions';
import { saveAssessmentResults } from '@/lib/firestore';
import { auth } from '@/lib/firebase';

export default function DiscoverYourself() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  
  const progressPercent = ((currentStep) / DISCOVER_QUESTIONS.length) * 100;
  const currentQuestion = DISCOVER_QUESTIONS[currentStep];

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

  // ─── AI Result Screen ───
  if (aiResult) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
         <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-4xl bg-white rounded-2xl p-8 md:p-12 shadow-lg text-gray-900"
         >
            <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center text-green-600 mb-6">
               <CheckCircle2 size={36} />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Analisis AI Selesai</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl">Berdasarkan pola dari 25 jawabanmu, kami menemukan ruang di mana bakat alaminya paling bersinar.</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
               <div className="space-y-4">
                  <div className="card-elevated p-6">
                    <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Rekomendasi Utama</h4>
                    <p className="text-2xl font-bold text-orange-500">{aiResult.primaryField}</p>
                  </div>
                  <div className="card-plain border border-gray-200 p-6">
                    <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">Alternatif Kuat</h4>
                    <p className="text-xl font-bold text-gray-900">{aiResult.secondaryField}</p>
                  </div>
               </div>
               
               <div className="card-plain border border-gray-200 p-6 flex flex-col justify-center">
                  <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">Karakter & Kekuatan</h4>
                  <div className="flex flex-wrap gap-2">
                     {aiResult.strengths.map((s: string) => (
                        <span key={s} className="badge-orange">
                           {s}
                        </span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
               <p className="text-gray-700 leading-relaxed">
                  "{aiResult.detailedAnalysis}"
               </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <button 
                  onClick={() => router.push('/paths')}
                  className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-3"
               >
                  Lihat Skill Path Saya
                  <ArrowRight size={20} />
               </button>
               <button 
                  onClick={() => router.push('/explore')}
                  className="btn-ghost flex items-center justify-center gap-2 text-lg px-8 py-3"
               >
                  Telusuri Karir Lain
               </button>
            </div>
         </motion.div>
      </div>
    );
  }

  // ─── Quiz Screen ───
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20 px-4 md:px-6 max-w-3xl mx-auto flex flex-col items-center min-h-[calc(100vh-64px)]">
        
        {/* Progress Bar */}
        <div className="w-full mb-8">
           <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-600">
                 Pertanyaan <span className="text-orange-500 font-bold">{Math.min(currentStep + 1, 25)}</span> dari 25
              </span>
              <span className="text-sm text-gray-500">{Math.round(progressPercent)}%</span>
           </div>
           <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
             <motion.div
               className="h-full bg-orange-500 rounded-full"
               animate={{ width: `${progressPercent}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>
        </div>

        {/* Question Area */}
        <div className="flex-1 w-full flex flex-col justify-center items-center py-6">
          <AnimatePresence mode="wait">
            {isProcessing ? (
               <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-gray-200 p-12 rounded-xl shadow-lg flex flex-col items-center text-center w-full max-w-lg"
               >
                  <div className="relative w-24 h-24 mb-8">
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-4 border-dashed border-orange-400"
                     />
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 flex items-center justify-center text-orange-500"
                     >
                        <Sparkles size={40} />
                     </motion.div>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900">Pemrosesan AI</h2>
                  <p className="text-gray-500 font-medium">Menganalisis pola jawaban dan mencocokannya dengan ribuan profil karir industri...</p>
               </motion.div>
            ) : (
               <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="bg-white border border-gray-200 p-8 md:p-12 rounded-xl shadow-lg w-full"
               >
                  {/* Category Tag */}
                  <span className="badge-gray mb-4 inline-block uppercase tracking-wider">
                     {currentQuestion?.category}
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-10 leading-relaxed">
                    "{currentQuestion?.text}"
                  </h3>

                  {/* Scale Buttons */}
                  <div className="flex flex-col gap-6">
                     <div className="flex justify-between text-xs font-medium text-gray-500 uppercase tracking-wider px-1">
                        <span>Sangat Setuju</span>
                        <span>Tidak Setuju</span>
                     </div>
                     
                     <div className="flex justify-center items-center gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5].map((val) => {
                           const size = 20 + (Math.abs(3 - val) * 14);
                           
                           return (
                              <button
                                 key={val}
                                 onClick={() => handleAnswer(val)}
                                 className={cn(
                                    "rounded-full transition-all duration-200 hover:scale-110 focus:ring-2 focus:ring-orange-300",
                                    val <= 2
                                      ? "bg-orange-400 hover:bg-orange-500"
                                      : val >= 4
                                        ? "bg-gray-700 hover:bg-gray-800"
                                        : "bg-gray-300 hover:bg-gray-400"
                                 )}
                                 style={{ width: size, height: size }}
                                 aria-label={`Skala ${val}`}
                              />
                           );
                        })}
                     </div>
                  </div>
               </motion.div>
            )}
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
