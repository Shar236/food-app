import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, MapPin, Phone, Truck, ChefHat, ShieldCheck, X, Navigation } from 'lucide-react';

export const LiveOrderTrackerModal = ({ isOpen, onClose, order }) => {
  const [currentStep, setCurrentStep] = useState(2); // 0: Received, 1: Preparing, 2: Out for Delivery, 3: Delivered
  const [driverPos, setDriverPos] = useState({ x: 45, y: 55 });

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setDriverPos(prev => ({
        x: Math.min(85, prev.x + (Math.random() * 2)),
        y: Math.max(25, prev.y - (Math.random() * 1.5))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const steps = [
    { title: 'Order Received', desc: 'Sent to restaurant kitchen', icon: Clock },
    { title: 'Kitchen Preparing', desc: 'Chef Nero is handcrafting your dish', icon: ChefHat },
    { title: 'Out for Delivery', desc: 'Speedy Sam is en-route', icon: Truck },
    { title: 'Delivered', desc: 'Enjoy your moment!', icon: CheckCircle2 }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-primary-800 to-teal-700 text-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase">
                  LIVE SOCKET.IO TRACKING
                </span>
                <span className="text-xs text-teal-200 font-bold">{order.orderNumber || '#ML-9482'}</span>
              </div>
              <h2 className="text-2xl font-extrabold mt-1">Order Status: {steps[currentStep].title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {/* Arrival Time Banner */}
            <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-md">
                  12
                </div>
                <div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-300 font-bold block uppercase tracking-wide">
                    Estimated Arrival
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    Arriving in 12 - 15 minutes
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Deliver To</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[150px] block">
                  {order.address}
                </span>
              </div>
            </div>

            {/* Step Progress */}
            <div className="grid grid-cols-4 gap-2 relative">
              {steps.map((s, idx) => {
                const Icon = s.icon;
                const isDone = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-primary-700 text-white ring-4 ring-primary-100 dark:ring-primary-950 shadow-md'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      } ${isCurrent ? 'animate-bounce ring-4 ring-amber-400' : ''}`}
                    >
                      <Icon size={18} />
                    </div>
                    <span className={`text-xs font-bold mt-2 ${isDone ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400'}`}>
                      {s.title}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:block mt-0.5">{s.desc}</span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Vector Map Canvas */}
            <div className="relative h-56 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 shadow-inner">
              {/* Map background grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              {/* Simulated Map Route Path */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M 50 150 Q 150 50, 300 120 T 550 80"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="4"
                  strokeDasharray="6,6"
                  className="animate-pulse"
                />
              </svg>

              {/* Restaurant Hub Pin */}
              <div className="absolute top-28 left-12 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg font-black text-xs">
                  🍕
                </div>
                <span className="text-[10px] font-bold text-amber-300 bg-slate-950/80 px-1.5 py-0.5 rounded mt-1">
                  Nero's Pizzeria
                </span>
              </div>

              {/* Destination Pin */}
              <div className="absolute top-16 right-16 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg font-black text-xs">
                  🏠
                </div>
                <span className="text-[10px] font-bold text-white bg-slate-950/80 px-1.5 py-0.5 rounded mt-1">
                  Your Address
                </span>
              </div>

              {/* Moving Driver Icon */}
              <motion.div
                animate={{ x: `${driverPos.x}%`, y: `${driverPos.y}%` }}
                transition={{ duration: 1.8, ease: 'linear' }}
                className="absolute flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-9 h-9 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center shadow-xl shadow-teal-400/50 ring-4 ring-teal-400/30 animate-pulse">
                  <Navigation size={18} className="fill-slate-950 transform rotate-45" />
                </div>
                <span className="text-[10px] font-extrabold text-teal-300 bg-slate-950 px-2 py-0.5 rounded-full mt-1 shadow-md border border-teal-500/40">
                  Speedy Sam (Live)
                </span>
              </motion.div>
            </div>

            {/* Delivery Rider Details */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
                  alt="Driver"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Speedy Sam</h4>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                      4.9 ★
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Tesla E-Scooter (#NY-402)
                  </p>
                </div>
              </div>

              <a
                href="tel:+15550192834"
                className="flex items-center gap-1.5 bg-primary-700 hover:bg-primary-800 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors"
              >
                <Phone size={14} /> Call Driver
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
