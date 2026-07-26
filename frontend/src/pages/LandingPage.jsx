import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FoodCard } from '../components/FoodCard';
import { RestaurantCard } from '../components/RestaurantCard';
import { Sparkles, ArrowRight, Dices, ChevronDown, ChevronUp, Star, ShieldCheck, Flame, Heart, Utensils, Clock } from 'lucide-react';

export const LandingPage = ({
  foods,
  restaurants,
  categories,
  onOpenMood,
  onOpenSpin,
  onSelectNutrition,
  onSelectRestaurant,
  onOpenGroup
}) => {
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);
  const [surpriseFood, setSurpriseFood] = useState(null);

  const filteredFoods = selectedCat === 'All'
    ? foods
    : foods.filter(f => f.category.toLowerCase() === selectedCat.toLowerCase());

  const faqs = [
    { q: 'How does Mealora\'s AI food recommendation work?', a: 'Our AI Concierge evaluates your mood (e.g. Happy, Late Night, Gym Meal), local weather, budget limits, and nutritional targets to curate 3 best-fit meals in seconds.' },
    { q: 'Can I track my delivery in real time?', a: 'Yes! Mealora features live Socket.IO tracking showing kitchen preparation stages and an interactive vector map of your driver en-route.' },
    { q: 'What is QR Group Ordering & Split Bill?', a: 'You can generate a group QR code link for your friends. Everyone adds their favorite items to a single cart, and our system automatically calculates individual payment shares.' },
    { q: 'Does Mealora support dietary preferences?', a: 'Absolutely. Easily filter for Veg, Non-Veg, High-Protein, Keto, or custom calorie limits on every menu.' },
  ];

  const handleSurpriseMe = () => {
    const randomFood = foods[Math.floor(Math.random() * foods.length)];
    setSurpriseFood(randomFood);
  };

  return (
    <div className="space-y-20 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
        {/* Background glow highlights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-500/15 via-emerald-400/5 to-transparent blur-3xl rounded-full -z-10"></div>
        <div className="absolute -top-10 right-10 w-72 h-72 bg-amber-400/15 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-teal-100/90 dark:bg-slate-800 px-4 py-2 rounded-full text-xs font-black border border-teal-300 dark:border-slate-700 shadow-sm">
                <Sparkles size={15} className="text-amber-500 animate-spin-slow" />
                <span className="text-teal-900 dark:text-emerald-300">
                  NEW • AI CONCIERGE & LIVE SOCKET TRACKING
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Food that <span className="text-[#0F766E] dark:text-amber-400">Matches</span> Your Moment.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl font-medium leading-relaxed">
                Discover top restaurants, order delicious meals, track deliveries live, and receive AI-powered food recommendations tuned to your mood, budget, and calories.
              </p>

              {/* Call to action buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onOpenMood}
                  className="px-8 py-4 rounded-2xl bg-[#0F766E] hover:bg-[#0d9488] text-white font-extrabold text-sm shadow-xl shadow-teal-800/30 flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Order Now</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={handleSurpriseMe}
                  className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-extrabold text-sm border border-slate-300 dark:border-slate-700 shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                >
                  <Dices size={18} className="text-amber-500" />
                  <span>Surprise Me!</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Utensils size={16} className="text-[#0F766E] dark:text-emerald-400" />
                  <span>1200+ dishes</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Clock size={16} className="text-amber-500" />
                  <span>25 min avg delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span>4.8 avg rating</span>
                </div>
              </div>
            </div>

            {/* Right Hero Food Image Panel */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900"
              >
                {/* Mouthwatering Gourmet Food Item Image */}
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80"
                  alt="Delicious Gourmet Pizza Food Item"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                {/* Floating AI Pick Card */}
                <div className="absolute top-6 left-6 glass-panel p-3.5 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg">
                    ✨
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">AI MOMENT PICK</span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">Artisan Wood-Fired Pizza</span>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 block font-medium">Perfect for a cozy moment.</span>
                  </div>
                </div>

                {/* Floating Budget Pill */}
                <div className="absolute bottom-6 right-6 glass-panel p-3 rounded-2xl shadow-xl border border-white/50">
                  <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 block">Under $15</span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 block">6 healthy food picks</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400">Fits your budget.</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* SURPRISE ME MODAL */}
      {surpriseFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full text-center border border-slate-200 dark:border-slate-800 shadow-2xl">
            <span className="text-3xl">🎰</span>
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 mt-2">Your Surprise Moment Dish!</h3>
            <div className="my-4">
              <img src={surpriseFood.image} alt={surpriseFood.name} className="w-full h-40 object-cover rounded-2xl mb-2" />
              <h4 className="font-extrabold text-base text-[#0F766E] dark:text-emerald-400">{surpriseFood.name}</h4>
              <p className="text-xs text-slate-500">{surpriseFood.restaurantName} • ${surpriseFood.price.toFixed(2)}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSurpriseFood(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onSelectNutrition(surpriseFood);
                  setSurpriseFood(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#0F766E] text-white font-bold text-xs"
              >
                View Macros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORIES PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#0F766E] dark:text-emerald-400 uppercase tracking-widest block">Explore</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">Cravings, categorized.</h2>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.name)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedCat === c.name
                  ? 'bg-[#0F766E] text-white shadow-lg shadow-teal-700/25 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-bold">{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* POPULAR RESTAURANTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#0F766E] dark:text-emerald-400 uppercase tracking-widest block">Featured</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">Popular Restaurants</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.slice(0, 3).map((r) => (
            <RestaurantCard key={r.id} restaurant={r} onClick={onSelectRestaurant} />
          ))}
        </div>
      </section>

      {/* TRENDING TODAY DISHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#0F766E] dark:text-emerald-400 uppercase tracking-widest block">What's Hot</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">Trending Today</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.slice(0, 4).map((f) => (
            <FoodCard key={f.id} food={f} onSelectNutrition={onSelectNutrition} />
          ))}
        </div>
      </section>

      {/* MOOD ORDERING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/20 blur-3xl rounded-full"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">AI Concierge</span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Order by mood, not menu.
              </h2>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                Happy, sad, romantic, party or late-night? Tell us the vibe. We'll pick the meal.
              </p>
              <button
                onClick={onOpenMood}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <span>Try Mood Ordering</span>
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
                <span className="text-2xl">🥳</span>
                <span className="font-extrabold text-xs block text-slate-100 mt-1">Happy</span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
                <span className="text-2xl">🌹</span>
                <span className="font-extrabold text-xs block text-slate-100 mt-1">Romantic</span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
                <span className="text-2xl">🎉</span>
                <span className="font-extrabold text-xs block text-slate-100 mt-1">Party</span>
              </div>
              <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 text-center">
                <span className="text-2xl">🌙</span>
                <span className="font-extrabold text-xs block text-slate-100 mt-1">Late Night</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEALTHY PICKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Fuel Your Day</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">Healthy Picks</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.filter(f => f.category === 'Healthy' || f.isVeg).slice(0, 4).map((f) => (
            <FoodCard key={f.id} food={f} onSelectNutrition={onSelectNutrition} />
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-[#0F766E] dark:text-emerald-400 uppercase tracking-widest">FAQ</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">Everything you'd want to know</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-sm text-slate-900 dark:text-slate-100 flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
