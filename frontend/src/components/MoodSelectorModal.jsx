import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAiRecommendation } from '../services/api';
import { FoodCard } from './FoodCard';
import { Sparkles, X, Heart, Flame, DollarSign, CloudSun, Check, RefreshCw } from 'lucide-react';

export const MoodSelectorModal = ({ isOpen, onClose, onSelectNutrition }) => {
  const [selectedMood, setSelectedMood] = useState('Happy');
  const [budget, setBudget] = useState(30);
  const [diet, setDiet] = useState('Any');
  const [weather, setWeather] = useState('Sunny');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [summary, setSummary] = useState(null);

  const moods = [
    { name: 'Happy', emoji: '🥳', color: 'from-amber-400 to-yellow-500', desc: 'Upbeat & celebratory treats' },
    { name: 'Sad', emoji: '🌧️', color: 'from-blue-400 to-indigo-500', desc: 'Warm comfort food hug' },
    { name: 'Party', emoji: '🎉', color: 'from-purple-500 to-pink-500', desc: 'Shareable & bold finger foods' },
    { name: 'Romantic', emoji: '🌹', color: 'from-rose-400 to-red-500', desc: 'Artisanal & decadent flavors' },
    { name: 'Family Dinner', emoji: '🥘', color: 'from-emerald-400 to-teal-600', desc: 'Hearty multi-portion meals' },
    { name: 'Late Night', emoji: '🌙', color: 'from-slate-700 to-slate-900', desc: 'Quick midnight cravings' },
    { name: 'Gym Meal', emoji: '💪', color: 'from-orange-400 to-amber-600', desc: 'High protein & lean macros' },
    { name: 'Healthy Meal', emoji: '🥗', color: 'from-green-400 to-emerald-600', desc: 'Clean organic fuel' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await getAiRecommendation({ mood: selectedMood, budget, diet, weather });
      if (data.success) {
        setRecommendations(data.recommendations);
        setSummary(data.momentSummary);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-700 to-amber-400 flex items-center justify-center text-white shadow-lg">
              <Sparkles size={24} className="text-amber-200 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                AI Food Concierge
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Tell us your moment, vibe & budget. Our AI matches your exact craving in seconds.
              </p>
            </div>
          </div>

          {!recommendations ? (
            <div className="space-y-6">
              {/* Step 1: Select Mood */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  1. How are you feeling right now?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {moods.map((m) => {
                    const isSel = selectedMood === m.name;
                    return (
                      <button
                        key={m.name}
                        onClick={() => setSelectedMood(m.name)}
                        className={`p-3.5 rounded-2xl text-left border transition-all duration-200 ${
                          isSel
                            ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/40 ring-2 ring-primary-500 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                        }`}
                      >
                        <div className="text-2xl mb-1">{m.emoji}</div>
                        <div className="font-extrabold text-sm text-slate-900 dark:text-slate-100">{m.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{m.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <DollarSign size={14} className="text-emerald-500" /> Max Budget Per Person
                    </label>
                    <span className="font-black text-lg text-primary-700 dark:text-emerald-400">${budget}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-primary-700 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
                    <span>$10 (Budget)</span>
                    <span>$40 (Standard)</span>
                    <span>$80 (Gourmet)</span>
                  </div>
                </div>

                {/* Dietary Filter */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Dietary Preference
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Any', 'Veg', 'Non-Veg', 'High-Protein'].map(d => (
                      <button
                        key={d}
                        onClick={() => setDiet(d)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          diet === d
                            ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-700 via-teal-600 to-amber-500 hover:opacity-95 text-white font-black text-base shadow-xl shadow-primary-700/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-98"
              >
                {loading ? (
                  <>
                    <RefreshCw size={20} className="animate-spin text-amber-300" />
                    <span>Curating your moment...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={20} className="text-amber-300" />
                    <span>Match My Moment Dishes</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div>
              {/* AI Recommendation Results */}
              <div className="flex items-center justify-between bg-primary-50 dark:bg-primary-950/40 p-4 rounded-2xl border border-primary-200 dark:border-primary-800 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-emerald-400">
                    AI Match Summary ({summary?.aiConfidence} confidence)
                  </span>
                  <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    Top Picks for a "{summary?.mood}" moment within {summary?.budget}
                  </p>
                </div>
                <button
                  onClick={() => setRecommendations(null)}
                  className="flex items-center gap-1 text-xs font-bold text-primary-700 dark:text-emerald-400 hover:underline"
                >
                  <RefreshCw size={12} /> Reset Filter
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map(food => (
                  <FoodCard key={food.id} food={food} onSelectNutrition={onSelectNutrition} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
