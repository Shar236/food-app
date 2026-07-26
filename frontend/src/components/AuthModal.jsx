import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, ShieldCheck, Check } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser } = useAuth();
  const [tab, setTab] = useState('login'); // login | register
  const [email, setEmail] = useState('alex@mealora.com');
  const [name, setName] = useState('Alex Johnson');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      id: 'usr-1',
      name: name || 'Alex Johnson',
      email: email || 'alex@mealora.com',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      walletBalance: 125.00,
      loyaltyCoins: 450,
    });
    onClose();
  };

  const handleGoogle = () => {
    loginUser({
      id: 'usr-1',
      name: 'Alex Johnson (Google OAuth)',
      email: 'alex.google@mealora.com',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      walletBalance: 150.00,
      loyaltyCoins: 500,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Welcome to Mealora</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Food that Matches Your Moment.</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                tab === 'login'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-extrabold transition-colors ${
                tab === 'register'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 outline-none border border-slate-200 dark:border-slate-700 focus:border-primary-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 outline-none border border-slate-200 dark:border-slate-700 focus:border-primary-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 outline-none border border-slate-200 dark:border-slate-700 focus:border-primary-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white font-extrabold text-xs shadow-md transition-transform active:scale-98"
            >
              {tab === 'login' ? 'Sign In with JWT' : 'Create Account'}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            <span className="text-[10px] uppercase font-bold text-slate-400">or</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <span>Sign in with Google OAuth</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
