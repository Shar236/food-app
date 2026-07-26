import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { MapPin, Search, ShoppingBag, Heart, Sparkles, Sun, Moon, Wallet, Coins, Dices, CalendarHeart, Menu, X } from 'lucide-react';

export const GlassNavbar = ({ onOpenMood, onOpenSpin, onOpenPlanner, onOpenGroup, onOpenAuth, onSearchClick }) => {
  const { user } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState('New York, NY');

  return (
    <header className="sticky top-0 z-40 glass-nav transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-primary-700 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-primary-700/30 group-hover:scale-105 transition-transform duration-300">
            <span className="font-extrabold text-2xl tracking-tighter">M</span>
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-primary-700 via-teal-600 to-amber-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-amber-400">
              Mealora
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
              Food for Moments
            </span>
          </div>
        </a>

        {/* Location Selector */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-slate-200/80 dark:border-slate-700 cursor-pointer hover:border-primary-500 transition-colors">
          <MapPin size={14} className="text-primary-700 dark:text-emerald-400" />
          <span className="text-slate-700 dark:text-slate-200">{location}</span>
          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">25 min</span>
        </div>

        {/* Search Bar Input / Trigger */}
        <button
          onClick={onSearchClick}
          className="hidden lg:flex items-center gap-3 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 px-4 py-2 rounded-full text-xs text-slate-400 border border-slate-200/80 dark:border-slate-700 w-64 transition-all"
        >
          <Search size={15} className="text-slate-400" />
          <span>Search burgers, sushi, mood...</span>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Mood Ordering Trigger */}
          <button
            onClick={onOpenMood}
            className="flex items-center gap-1.5 bg-gradient-to-r from-primary-700 to-teal-600 hover:from-primary-800 hover:to-teal-700 text-white px-3.5 py-2 rounded-full text-xs font-bold shadow-md shadow-primary-700/20 hover:shadow-lg hover:shadow-primary-700/30 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles size={14} className="text-amber-300 animate-spin-slow" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Gamified Rewards */}
          <button
            onClick={onOpenSpin}
            title="Daily Reward Wheel"
            className="hidden sm:flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-3 py-2 rounded-full text-xs font-bold border border-amber-300/50 dark:border-amber-700/50 hover:bg-amber-200 transition-colors"
          >
            <Dices size={14} className="text-amber-500 animate-bounce" />
            <span>Spin</span>
          </button>

          {/* Healthy Planner */}
          <button
            onClick={onOpenPlanner}
            title="Healthy Meal Planner"
            className="hidden xl:flex items-center gap-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-2 rounded-full text-xs font-bold border border-emerald-300/50 dark:border-emerald-700/50 hover:bg-emerald-200 transition-colors"
          >
            <CalendarHeart size={14} className="text-emerald-600 dark:text-emerald-400" />
            <span>Planner</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Dark / Light Mode"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => alert(`Wishlist contains ${wishlist.length} saved moments.`)}
            className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Wishlist"
          >
            <Heart size={19} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2.5 sm:px-4 sm:py-2.5 rounded-full flex items-center gap-2 font-bold text-xs shadow-lg hover:scale-105 transition-all"
          >
            <ShoppingBag size={17} className="text-amber-400 dark:text-primary-700" />
            <span className="hidden sm:inline">Cart</span>
            {totalCount > 0 && (
              <span className="bg-primary-600 dark:bg-amber-400 text-white dark:text-slate-900 px-2 py-0.5 rounded-full text-[11px] font-black">
                {totalCount}
              </span>
            )}
          </button>

          {/* User Profile / Wallet */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                alt="Avatar"
                className="w-8 h-8 rounded-full ring-2 ring-primary-700 object-cover"
              />
              <div className="text-left hidden lg:block">
                <span className="block font-bold text-slate-800 dark:text-slate-100 text-[11px] leading-tight">
                  {user?.name || 'Alex Johnson'}
                </span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-1">
                  <Wallet size={10} /> ${user?.walletBalance?.toFixed(2) || '125.00'}
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 py-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
              <MapPin size={14} className="text-primary-700" />
              <span>{location}</span>
            </div>
            <span className="text-xs text-amber-500 font-extrabold flex items-center gap-1">
              <Coins size={12} /> {user?.loyaltyCoins || 450} Coins
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onOpenMood(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 bg-primary-700 text-white p-2.5 rounded-xl font-bold text-xs"
            >
              <Sparkles size={14} /> AI Concierge
            </button>
            <button
              onClick={() => { onOpenSpin(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 bg-amber-500 text-white p-2.5 rounded-xl font-bold text-xs"
            >
              <Dices size={14} /> Spin Rewards
            </button>
            <button
              onClick={() => { onOpenPlanner(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-2.5 rounded-xl font-bold text-xs"
            >
              <CalendarHeart size={14} /> Meal Planner
            </button>
            <button
              onClick={() => { onOpenGroup(); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-2 bg-slate-800 text-white p-2.5 rounded-xl font-bold text-xs"
            >
              Group Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
