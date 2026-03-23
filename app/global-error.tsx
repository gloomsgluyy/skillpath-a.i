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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border border-gray-200 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-500" />
            
            <div className="w-16 h-16 bg-red-50 rounded-lg mx-auto flex items-center justify-center mb-6">
              <AlertTriangle className="w-9 h-9 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Terjadi Kesalahan Kritis</h1>
            <p className="text-gray-500 font-medium mb-8 text-sm leading-relaxed">
              Maaf, sistem mendeteksi error yang tidak terduga pada aplikasi kami. Laporan telah dicatat.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => reset()}
                className="btn-primary w-full flex items-center justify-center gap-2 py-3"
              >
                <RotateCcw size={16} />
                Coba Lagi
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="btn-ghost w-full flex items-center justify-center gap-2 py-3"
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
