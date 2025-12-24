import React from 'react'

export default function Input({ label, className = '', ...props }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-xs text-slate-300 mb-1">{label}</label>}
      <input
        className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500"
        {...props}
      />
    </div>
  )
}
