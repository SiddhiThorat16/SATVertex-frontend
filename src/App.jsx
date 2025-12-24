// SATVertex/SATVertex-frontend/src/App.jsx

import './App.css'

// src/App.jsx
function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top bar */}
      <header className="bg-blue-500 px-6 py-4">
        <h1 className="text-2xl font-bold">SATVertex</h1>
        <p className="text-sm text-blue-100">
          Tailwind test – this bar should be blue.
        </p>
      </header>

      {/* Main content */}
      <main className="p-8">
        <div className="max-w-md mx-auto bg-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-3">
            Tailwind CSS is working
          </h2>
          <p className="text-sm text-slate-300">
            If you can see this card with dark background, rounded corners, and
            spacing, Tailwind is correctly configured in your Vite + React app.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App

