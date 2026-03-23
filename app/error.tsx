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
    console.error("App boundary caught error:", error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 w-full">
      <div className="bg-white border border-gray-200 p-8 rounded-lg text-center max-w-lg w-full shadow-sm">
        <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-7 h-7 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ups! Ada yang salah</h2>
        <p className="text-gray-500 font-medium mb-8 text-sm">
          {error.message || 'Kami tidak dapat memuat halaman ini.'}
        </p>
        
        <button
          onClick={() => reset()}
          className="btn-primary mx-auto flex items-center justify-center gap-2 py-3 px-6"
        >
          <RefreshCw size={16} />
          Muat Ulang
        </button>
      </div>
    </div>
  )
}
