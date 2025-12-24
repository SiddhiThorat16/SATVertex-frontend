import React from 'react'

export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none'
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    ghost: 'bg-transparent hover:bg-slate-800 text-white border border-transparent',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
  }
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
