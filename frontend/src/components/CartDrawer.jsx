import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { validateCouponApi, createOrderApi } from '../services/api';
import { X, Trash2, Plus, Minus, Ticket, Wallet, CreditCard, ArrowRight, ShoppingBag, Sparkles, Check } from 'lucide-react';

export const CartDrawer = ({ onOrderPlaced }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    discountAmount,
    setDiscountAmount,
    appliedCoupon,
    setAppliedCoupon,
    grandTotal
  } = useCart();

  const { user } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [tip, setTip] = useState(3.00);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput) return;

    const res = await validateCouponApi(couponInput, subtotal);
    if (res.success) {
      setAppliedCoupon(res.coupon);
      setDiscountAmount(res.discountAmount);
      setCouponSuccess(res.message);
    } else {
      setCouponError(res.message);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setLoadingCheckout(true);

    const total = grandTotal + tip;
    const orderPayload = {
      items: cartItems,
      subtotal,
      deliveryFee,
      discount: discountAmount,
      tip,
      totalAmount: total,
      paymentMethod: 'Mealora Wallet & Sandbox Card',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Alex Johnson',
    };

    const res = await createOrderApi(orderPayload);
    setLoadingCheckout(false);
    if (res.success) {
      clearCart();
      setIsCartOpen(false);
      onOrderPlaced(res.order);
    }
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        ></motion.div>

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary-700 dark:text-emerald-400" />
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">Your Moment Basket</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <ShoppingBag size={32} />
                  </div>
                  <h3 className="font-extrabold text-slate-700 dark:text-slate-300">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 mt-1">Discover foods tailored to your moment!</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-slate-400 block">{item.restaurantName}</span>
                        <span className="font-extrabold text-xs text-primary-700 dark:text-emerald-400">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-700 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-600">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-100"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="font-black text-xs px-1 text-slate-900 dark:text-slate-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-100"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}

              {/* Promo Code Box */}
              {cartItems.length > 0 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket size={15} className="absolute left-3 top-3 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Try MEALORA20 or MOOD50"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold uppercase text-slate-900 dark:text-slate-100 outline-none border border-slate-200 dark:border-slate-700 focus:border-primary-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-xs"
                    >
                      Apply
                    </button>
                  </form>
                  {couponSuccess && <p className="text-[11px] font-bold text-emerald-600 mt-1">{couponSuccess}</p>}
                  {couponError && <p className="text-[11px] font-bold text-rose-500 mt-1">{couponError}</p>}
                </div>
              )}
            </div>

            {/* Checkout Bottom Summary */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Delivery Fee</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-extrabold text-base pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                    <span>Total Amount</span>
                    <span className="text-primary-700 dark:text-emerald-400">${(grandTotal + tip).toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loadingCheckout}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary-700 to-teal-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-primary-700/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-98"
                >
                  <span>{loadingCheckout ? 'Placing Order...' : 'Place Order & Track Live'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
