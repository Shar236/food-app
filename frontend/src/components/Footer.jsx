import React from 'react';
import { Heart, Sparkles, Smartphone, ShieldCheck, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-700 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                M
              </div>
              <span className="font-extrabold text-2xl text-white">Mealora</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Food that Matches Your Moment. Elegant orders, real-time tracking, and AI picks tuned to your mood.
            </p>
            <div className="flex items-center gap-3 pt-2 text-white">
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold hover:bg-primary-700 cursor-pointer transition-colors">
                tw
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold hover:bg-primary-700 cursor-pointer transition-colors">
                ig
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold hover:bg-primary-700 cursor-pointer transition-colors">
                yt
              </span>
            </div>
          </div>

          {/* Moments & Features */}
          <div>
            <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Moments</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-amber-400 transition-colors">Happy & Celebratory</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Rainy Comfort Meals</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Late Night Cravings</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">High-Protein Gym Bowls</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Romantic Gourmet Dining</a></li>
            </ul>
          </div>

          {/* Portals & Roles */}
          <div>
            <h4 className="font-extrabold text-sm text-white mb-4 uppercase tracking-wider">Portals</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Customer Portal</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Restaurant Dashboard</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Delivery Driver App</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Admin Command Center</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">PWA Mobile Support</a></li>
            </ul>
          </div>

          {/* Newsletter / App */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">Get Mealora App</h4>
            <p className="text-xs text-slate-400">
              Enjoy one-tap reorders, live map tracking, and offline browsing on iOS & Android.
            </p>
            <div className="flex flex-col gap-2">
              <button className="bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors">
                <Smartphone size={16} /> iOS App Store
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-white py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors">
                <Smartphone size={16} /> Android Google Play
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Mealora Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
