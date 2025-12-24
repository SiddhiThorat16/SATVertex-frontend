import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-sm ${className}`}>
      {children}
    </div>
  )
}
