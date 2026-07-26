import React, { useState } from 'react';
import { FoodCard } from '../components/FoodCard';
import { Star, Clock, MapPin, Sparkles, ChefHat, ArrowLeft } from 'lucide-react';

export const RestaurantDetailPage = ({ restaurant, menu, onBack, onSelectNutrition }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  if (!restaurant) return null;

  const categories = ['All', ...new Set(menu.map(m => m.category))];

  const filteredMenu = activeCategory === 'All'
    ? menu
    : menu.filter(m => m.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Restaurants
      </button>

      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden h-72 shadow-2xl">
        <img
          src={restaurant.banner || restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>

        <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                VERIFIED RESTAURANT
              </span>
              <span className="text-xs text-slate-300 font-bold">{restaurant.priceTier}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">{restaurant.name}</h1>
            <p className="text-xs text-slate-300 font-medium mt-1">{restaurant.cuisine} • {restaurant.address}</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-full font-black flex items-center gap-1">
              <Star size={14} className="fill-slate-950" /> {restaurant.rating} ({restaurant.reviewsCount} reviews)
            </span>
            <span className="bg-slate-900/80 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1 border border-slate-700">
              <Clock size={14} /> {restaurant.deliveryTime}
            </span>
          </div>
        </div>
      </div>

      {/* Chef Story */}
      {restaurant.chefStory && (
        <div className="bg-amber-50 dark:bg-amber-950/40 p-5 rounded-2xl border border-amber-200 dark:border-amber-800/40 flex items-start gap-3">
          <ChefHat size={24} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Chef's Story & Culinary Passion
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed font-medium">
              "{restaurant.chefStory}"
            </p>
          </div>
        </div>
      )}

      {/* Menu Categories Pills */}
      <div>
        <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 mb-4">Menu Items</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full font-bold text-xs transition-colors ${
                activeCategory === c
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMenu.map(f => (
          <FoodCard key={f.id} food={f} onSelectNutrition={onSelectNutrition} />
        ))}
      </div>

    </div>
  );
};
