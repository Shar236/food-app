import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Flame, Dumbbell, GlassWater, Plus, CheckCircle2, X } from 'lucide-react';

export const MealPlannerModal = ({ isOpen, onClose }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [waterGlasses, setWaterGlasses] = useState(5);
  const [dailyCalorieTarget] = useState(2100);
  const [currentCalories] = useState(1450);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const sampleWeeklyPlan = {
    Monday: { breakfast: 'Avocado Toast & Espresso', lunch: 'Rainbow Buddha Bowl', dinner: 'Grilled Salmon Power Bowl' },
    Tuesday: { breakfast: 'Oatmeal Berry Bowl', lunch: 'Veggie Bao Trio', dinner: 'Truffle Tagliatelle' },
    Wednesday: { breakfast: 'Greek Yogurt Parfait', lunch: 'Grilled Chicken Power Bowl', dinner: 'Margherita Napoletana' },
    Thursday: { breakfast: 'Fruit Smoothie', lunch: 'Pork Soup Dumplings', dinner: 'Butter Chicken & Naan' },
    Friday: { breakfast: 'Acai Bowl', lunch: 'Double Truffle Smash Burger', dinner: 'Dark Chocolate Fondant' },
    Saturday: { breakfast: 'Protein Pancakes', lunch: 'Rainbow Buddha Bowl', dinner: 'Artisan Wood-Fired Pizza' },
    Sunday: { breakfast: 'Eggs Benedict', lunch: 'Curry Vault Biryani', dinner: 'Light Green Detox Bowl' },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
              <Calendar size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Healthy Meal Planner</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Plan weekly nutrition, monitor macro goals, and stay hydrated.
              </p>
            </div>
          </div>

          {/* Calorie & Water Summary Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-50 dark:bg-orange-950/40 p-4 rounded-2xl border border-orange-200 dark:border-orange-800/50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-700 dark:text-orange-300 flex items-center gap-1">
                  <Flame size={14} /> Calorie Tracker
                </span>
                <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                  {currentCalories} / {dailyCalorieTarget} kcal
                </span>
              </div>
              <div className="w-full h-3 bg-orange-200 dark:bg-orange-900/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-700"
                  style={{ width: `${(currentCalories / dailyCalorieTarget) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border border-sky-200 dark:border-sky-800/50 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-1 mb-1">
                  <GlassWater size={14} /> Hydration Reminder
                </span>
                <span className="font-extrabold text-base text-slate-900 dark:text-slate-100 block">
                  {waterGlasses} / 8 Glasses Hydrated
                </span>
              </div>
              <button
                onClick={() => setWaterGlasses(prev => Math.min(12, prev + 1))}
                className="w-10 h-10 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black flex items-center justify-center shadow-md transition-transform active:scale-95"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Days Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
            {days.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-colors ${
                  selectedDay === d
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Day Schedule Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-2">
              {selectedDay}'s Scheduled Menu
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-black uppercase text-amber-500 block">Breakfast</span>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1 block">
                  {sampleWeeklyPlan[selectedDay].breakfast}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-black uppercase text-emerald-500 block">Lunch</span>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1 block">
                  {sampleWeeklyPlan[selectedDay].lunch}
                </span>
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-black uppercase text-purple-500 block">Dinner</span>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1 block">
                  {sampleWeeklyPlan[selectedDay].dinner}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
