import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FoodCard } from '../components/FoodCard';
import { RestaurantCard } from '../components/RestaurantCard';
import { Search, Sparkles, Sun, Clock, Filter, Dices } from 'lucide-react';

export const HomePage = ({
  foods,
  restaurants,
  categories,
  onOpenMood,
  onSelectNutrition,
  onSelectRestaurant
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFoods = foods.filter(f => {
    const matchesCat = activeCategory === 'All' || f.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = !searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Greeting & Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Hello, {user?.name?.split(' ')[0] || 'User'} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            What moment are we satisfying today?
          </p>
        </div>

        {/* Weather Widget */}
        <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 px-4 py-2 rounded-2xl">
          <Sun size={20} className="text-amber-500 animate-spin-slow" />
          <div className="text-xs">
            <span className="font-extrabold text-slate-900 dark:text-slate-100 block">74°F • Sunny NYC</span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">Great weather for cold gelato & crisp salad!</span>
          </div>
        </div>
      </div>

      {/* Search Bar Input */}
      <div className="relative max-w-2xl">
        <Search size={20} className="absolute left-4 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search dishes, cuisines, ingredients or moments..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-800 rounded-2xl text-sm font-medium text-slate-900 dark:text-slate-100 outline-none border border-slate-200/80 dark:border-slate-700 shadow-md focus:border-primary-600 transition-all"
        />
      </div>

      {/* Categories Bar */}
      <div>
        <h3 className="font-black text-lg text-slate-900 dark:text-slate-100 mb-4">Categories</h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-3 no-scrollbar">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-5 py-2.5 rounded-full font-extrabold text-xs whitespace-nowrap transition-colors ${
              activeCategory === 'All'
                ? 'bg-primary-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Cravings
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.name)}
              className={`px-4 py-2.5 rounded-full font-extrabold text-xs whitespace-nowrap flex items-center gap-2 transition-colors ${
                activeCategory === c.name
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Banner Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-primary-800 to-teal-700 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="space-y-1">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">PROMO CODE</span>
            <h3 className="text-2xl font-black">20% OFF Your First Order</h3>
            <p className="text-xs text-teal-100">Use promo code MEALORA20 at checkout.</p>
          </div>
          <button
            onClick={onOpenMood}
            className="self-start px-4 py-2 rounded-xl bg-white text-primary-900 font-extrabold text-xs shadow-md hover:bg-amber-300 transition-colors"
          >
            Claim Promo
          </button>
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between h-48">
          <div className="space-y-1">
            <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">AI FEATURE</span>
            <h3 className="text-2xl font-black">Order by Moment & Mood</h3>
            <p className="text-xs text-amber-200">Personalized calorie & macro balanced recommendations.</p>
          </div>
          <button
            onClick={onOpenMood}
            className="self-start px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md hover:bg-amber-300 transition-colors"
          >
            Launch AI Concierge
          </button>
        </div>
      </div>

      {/* Popular Near You */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Popular Near You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r} onClick={onSelectRestaurant} />
          ))}
        </div>
      </div>

      {/* Recommended Food Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Recommended For You</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map(f => (
            <FoodCard key={f.id} food={f} onSelectNutrition={onSelectNutrition} />
          ))}
        </div>
      </div>

    </div>
  );
};
