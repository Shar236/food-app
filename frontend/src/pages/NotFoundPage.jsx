import React from 'react';
import { Utensils, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = ({ onGoHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-950 text-primary-700 dark:text-emerald-400 flex items-center justify-center text-4xl shadow-xl animate-bounce">
        🍱
      </div>
      <div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-slate-100">404 - Page Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
          Oops! Looks like this moment was devoured or doesn't exist on our menu.
        </p>
      </div>
      <button
        onClick={onGoHome}
        className="px-6 py-3.5 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95"
      >
        <Home size={16} /> Back to Mealora Home
      </button>
    </div>
  );
};
