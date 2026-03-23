'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("App boundary caught error:", error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 w-full">
      <div className="glass-card p-8 rounded-[2rem] text-center max-w-lg w-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-transparent pointer-events-none" />
        
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
          <AlertCircle className="w-8 h-8 text-rose-500" />
        </div>
        
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3">Ups! Ada yang salah</h2>
        <p className="text-slate-500 font-medium mb-8 text-sm">
          {error.message || 'Kami tidak dapat memuat halaman ini.'}
        </p>
        
        <button
          onClick={() => reset()}
          className="mx-auto flex items-center justify-center gap-2 py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md active:scale-95"
        >
          <RefreshCw size={16} />
          Muat Ulang
        </button>
      </div>
    </div>
  )
}
