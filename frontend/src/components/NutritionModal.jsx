import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Dumbbell, Wheat, Droplet, ChefHat } from 'lucide-react';

export const NutritionModal = ({ isOpen, onClose, food }) => {
  if (!isOpen || !food) return null;

  const nutrition = food.nutrition || { calories: 650, protein: 32, carbs: 70, fat: 22 };

  const macros = [
    { label: 'Calories', value: `${nutrition.calories} kcal`, pct: Math.min(100, (nutrition.calories / 2000) * 100), color: 'bg-orange-500', icon: Flame },
    { label: 'Protein', value: `${nutrition.protein}g`, pct: Math.min(100, (nutrition.protein / 60) * 100), color: 'bg-emerald-500', icon: Dumbbell },
    { label: 'Carbohydrates', value: `${nutrition.carbs}g`, pct: Math.min(100, (nutrition.carbs / 250) * 100), color: 'bg-amber-500', icon: Wheat },
    { label: 'Fats', value: `${nutrition.fat}g`, pct: Math.min(100, (nutrition.fat / 70) * 100), color: 'bg-rose-500', icon: Droplet },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Dish Overview */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={food.image}
              alt={food.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-primary-600/30"
            />
            <div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${food.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                {food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{food.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{food.restaurantName}</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
              <ChefHat size={14} className="text-primary-600" /> Nutritional Facts & Macro Breakdown
            </h4>

            <div className="space-y-4">
              {macros.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center text-xs font-bold mb-1">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                        <Icon size={14} className="text-slate-400" />
                        {m.label}
                      </span>
                      <span className="text-slate-900 dark:text-slate-100">{m.value}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.pct}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-center text-slate-400">
            * Values are calculated per serving based on standard recipe proportions.
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
