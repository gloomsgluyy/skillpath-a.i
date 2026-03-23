'use client'

import { AlertTriangle, Home, RotateCcw } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="id">
      <body>
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2rem] shadow-2xl max-w-md w-full border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-500" />
            
            <div className="w-20 h-20 bg-red-50 rounded-[1.5rem] mx-auto flex items-center justify-center mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Terjadi Kesalahan Kritis</h1>
            <p className="text-slate-500 font-medium mb-8 text-sm leading-relaxed">
              Maaf, sistem mendeteksi error yang tidak terduga pada aplikasi kami. Laporan telah dicatat.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => reset()}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
              >
                <RotateCcw size={16} />
                Coba Lagi
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-700 font-bold rounded-xl transition-all active:scale-95"
              >
                <Home size={16} />
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
