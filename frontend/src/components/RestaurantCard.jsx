import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Sparkles } from 'lucide-react';

export const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(restaurant)}
      className="glass-card rounded-3xl overflow-hidden cursor-pointer border border-slate-200/80 dark:border-slate-800 hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

        {/* Cuisine & Verified tag */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-xs font-bold border border-amber-500/30">
          <Sparkles size={12} />
          <span>{restaurant.cuisine.split(',')[0]}</span>
        </div>

        {/* Price Tier */}
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md">
          {restaurant.priceTier || '$$'}
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-extrabold text-lg text-white group-hover:text-amber-300 transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-1 font-medium">
            {restaurant.cuisine}
          </p>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-bold text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-full">
            <Star size={13} className="fill-amber-500" />
            {restaurant.rating} ({restaurant.reviewsCount})
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {restaurant.deliveryTime}
          </span>
        </div>

        {restaurant.tags && restaurant.tags[0] && (
          <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[11px]">
            {restaurant.tags[0]}
          </span>
        )}
      </div>
    </motion.div>
  );
};
