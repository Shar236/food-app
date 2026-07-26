import React, { useState } from 'react';
import { Truck, MapPin, Phone, CheckCircle2, Navigation, DollarSign, Wallet, ShieldCheck } from 'lucide-react';

export const DeliveryDashboardPage = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [accepted, setAccepted] = useState(true);
  const [earnings, setEarnings] = useState(142.50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Rider Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 p-8 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
            alt="Driver"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold">Speedy Sam</h1>
              <span className="bg-blue-500/30 text-blue-300 border border-blue-400/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                Tesla E-Scooter (#NY-402)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">Rating: 4.9 ★ • 582 Deliveries completed</p>
          </div>
        </div>

        {/* Online Status Switcher */}
        <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-2xl border border-slate-700">
          <span className={`w-3 h-3 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
          <span className="text-xs font-bold">{isOnline ? 'Online (Receiving Jobs)' : 'Offline'}</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="text-[11px] font-black bg-blue-600 px-3 py-1 rounded-xl text-white hover:bg-blue-500"
          >
            Toggle
          </button>
        </div>
      </div>

      {/* Rider Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Today's Earnings</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">${earnings.toFixed(2)}</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">12 orders completed</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Tips Received</span>
          <span className="text-2xl font-black text-amber-500">$36.00</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">100% tipped riders</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Wallet Payout</span>
          <button
            onClick={() => setEarnings(0)}
            className="w-full mt-2 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
          >
            Transfer to Bank Account
          </button>
        </div>
      </div>

      {/* Active Delivery Request */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
              ACTIVE DISPATCH REQUEST
            </span>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mt-1">Order #ML-9482</h3>
          </div>
          <span className="font-black text-xl text-emerald-600 dark:text-emerald-400">$12.50 payout</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pickup & Dropoff details */}
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-extrabold text-amber-500 uppercase block">1. Pickup Address</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">Nero's Wood-Fired Pizzeria</span>
              <span className="text-slate-500">42 Artisanal Way, Greenwich Village, NY</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-extrabold text-emerald-500 uppercase block">2. Dropoff Address</span>
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">Alex Johnson (Customer)</span>
              <span className="text-slate-500">742 Evergreen Terrace, New York, NY</span>
            </div>
          </div>

          {/* Turn-by-Turn GPS Map Preview */}
          <div className="relative h-44 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
            <Navigation size={32} className="text-emerald-400 animate-pulse" />
            <span className="absolute bottom-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-full text-[11px] font-bold text-white">
              Turn Left onto Broadway (1.2 miles)
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          {accepted ? (
            <button
              onClick={() => alert('Order marked as delivered! Earnings updated.')}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={16} /> Mark as Delivered to Customer
            </button>
          ) : (
            <>
              <button
                onClick={() => setAccepted(true)}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-600 text-white font-extrabold text-xs"
              >
                Accept Order
              </button>
              <button className="flex-1 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs">
                Decline
              </button>
            </>
          )}
        </div>
      </div>

    </div>
  );
};
