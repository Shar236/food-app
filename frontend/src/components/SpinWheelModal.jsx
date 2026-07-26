import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Dices, Sparkles, X, Gift, Coins, CheckCircle2 } from 'lucide-react';

export const SpinWheelModal = ({ isOpen, onClose }) => {
  const { addLoyaltyCoins } = useAuth();
  const { setAppliedCoupon, setDiscountAmount, subtotal } = useCart();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState(null);

  const rewards = [
    { label: '50 Coins', type: 'coins', value: 50, color: '#0F766E' },
    { label: '20% OFF (MEALORA20)', type: 'coupon', code: 'MEALORA20', pct: 20, color: '#FBBF24' },
    { label: '100 Coins', type: 'coins', value: 100, color: '#0d9488' },
    { label: 'Free Delivery', type: 'free_delivery', color: '#10b981' },
    { label: '50% OFF (MOOD50)', type: 'coupon', code: 'MOOD50', pct: 50, color: '#f59e0b' },
    { label: '250 Coins', type: 'coins', value: 250, color: '#134e4a' },
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setReward(null);

    const randomIndex = Math.floor(Math.random() * rewards.length);
    const degreesPerSegment = 360 / rewards.length;
    const targetDegree = 360 * 5 + (randomIndex * degreesPerSegment) + (degreesPerSegment / 2);

    setRotation(targetDegree);

    setTimeout(() => {
      setSpinning(false);
      const won = rewards[randomIndex];
      setReward(won);

      // Trigger Confetti Explosion
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      if (won.type === 'coins') {
        addLoyaltyCoins(won.value);
      } else if (won.type === 'coupon') {
        setAppliedCoupon({ code: won.code, discountPercent: won.pct });
        const calcDisc = (subtotal * won.pct) / 100;
        setDiscountAmount(calcDisc);
      }
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-500 mb-2">
            <Dices size={24} className="animate-bounce" />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Daily Moment Spin</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Spin the wheel to unlock free coupons, loyalty coins & moment perks!
          </p>

          {/* Wheel Graphic */}
          <div className="relative w-64 h-64 mx-auto mb-6 flex items-center justify-center">
            {/* Top Pointer Arrow */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-500 drop-shadow-md"></div>

            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.15, 0.9, 0.25, 1] }}
              className="w-full h-full rounded-full border-4 border-slate-900 shadow-2xl overflow-hidden relative"
              style={{
                background: `conic-gradient(
                  #0F766E 0deg 60deg,
                  #FBBF24 60deg 120deg,
                  #0d9488 120deg 180deg,
                  #10b981 180deg 240deg,
                  #f59e0b 240deg 300deg,
                  #134e4a 300deg 360deg
                )`
              }}
            >
              {/* Wheel center pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border-2 border-slate-900 shadow-inner flex items-center justify-center font-black text-xs text-slate-900 dark:text-slate-100">
                  Mealora
                </div>
              </div>
            </motion.div>
          </div>

          {reward ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-2xl border border-emerald-300 dark:border-emerald-800 mb-4 text-emerald-800 dark:text-emerald-300"
            >
              <CheckCircle2 size={24} className="mx-auto mb-1 text-emerald-600 dark:text-emerald-400" />
              <h4 className="font-extrabold text-base">You Won: {reward.label}!</h4>
              <p className="text-xs mt-0.5">Applied automatically to your Mealora account.</p>
            </motion.div>
          ) : (
            <button
              onClick={handleSpin}
              disabled={spinning}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-sm shadow-xl hover:opacity-95 transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>{spinning ? 'Spinning...' : 'Spin the Wheel!'}</span>
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
