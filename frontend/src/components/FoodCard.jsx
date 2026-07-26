import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, Heart, Plus, Flame, Sparkles, Check } from 'lucide-react';

export const FoodCard = ({ food, onSelectNutrition }) => {
  const { addToCart, cartItems } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const inCart = cartItems.find(item => item.id === food.id);
  const isWish = isWishlisted(food.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200/80 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary-700/10 transition-all duration-300 group"
    >
      <div>
        {/* Card Header & Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden cursor-pointer" onClick={() => onSelectNutrition(food)}>
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Veg / Non-Veg Tag */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md">
            <span className={`w-2 h-2 rounded-full ${food.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            <span className="text-slate-800 dark:text-slate-200">{food.isVeg ? 'Veg' : 'Non-veg'}</span>
          </div>

          {/* AI Score Badge if recommended */}
          {food.aiScore && (
            <div className="absolute top-3 right-12 bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full text-[10px] font-black shadow-md flex items-center gap-1">
              <Sparkles size={11} className="fill-slate-950" />
              <span>{food.aiScore}% AI Match</span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(food.id);
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-md hover:scale-110 transition-transform"
          >
            <Heart size={15} className={isWish ? 'fill-rose-500 text-rose-500' : ''} />
          </button>

          {/* Restaurant & Rating Footer overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
            <span className="font-medium text-slate-200 truncate max-w-[70%]">
              {food.restaurantName}
            </span>
            <div className="flex items-center gap-1 bg-amber-400/90 text-slate-950 px-2 py-0.5 rounded-full font-black text-[11px]">
              <Star size={11} className="fill-slate-950" />
              <span>{food.rating || 4.8}</span>
            </div>
          </div>
        </div>

        {/* Dish Details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              onClick={() => onSelectNutrition(food)}
              className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 group-hover:text-primary-700 dark:group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
            >
              {food.name}
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {food.description}
          </p>

          {/* Nutrition & Mood Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4 text-[11px]">
            {food.nutrition?.calories && (
              <span className="flex items-center gap-1 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-300 px-2 py-0.5 rounded-md font-semibold border border-orange-200/50 dark:border-orange-800/30">
                <Flame size={12} /> {food.nutrition.calories} kcal
              </span>
            )}
            {food.nutrition?.protein && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-semibold">
                {food.nutrition.protein}g Protein
              </span>
            )}
            {food.moods && food.moods[0] && (
              <span className="bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded-md font-bold">
                {food.moods[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Price & Add Button */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-0 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3">
        <div>
          <span className="text-xs text-slate-400 font-medium block">Price</span>
          <span className="font-extrabold text-lg sm:text-xl text-primary-700 dark:text-emerald-400">
            ${food.price.toFixed(2)}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => addToCart(food)}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold text-xs shadow-md transition-all ${
            inCart
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-primary-700 hover:bg-primary-800 text-white shadow-primary-700/25 hover:shadow-lg'
          }`}
        >
          {inCart ? (
            <>
              <Check size={14} />
              <span>Added ({inCart.quantity})</span>
            </>
          ) : (
            <>
              <Plus size={14} />
              <span>Add</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};
