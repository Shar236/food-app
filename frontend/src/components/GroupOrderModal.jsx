import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Users, Calculator, Copy, Check, X, Share2 } from 'lucide-react';

export const GroupOrderModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [peopleCount, setPeopleCount] = useState(3);
  const [totalBill] = useState(78.50);

  const shareUrl = "https://mealora.app/group/ord-9482";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const perPerson = (totalBill / peopleCount).toFixed(2);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 mb-2">
            <Users size={24} />
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">QR Group Order & Split Bill</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Invite friends to add dishes to a single cart and automatically split the bill!
          </p>

          {/* QR Code Canvas Mock */}
          <div className="w-44 h-44 mx-auto bg-slate-900 p-3 rounded-2xl border-4 border-emerald-500 shadow-xl flex flex-col items-center justify-center mb-6">
            <div className="bg-white p-2 rounded-xl">
              <QrCode size={110} className="text-slate-950" />
            </div>
            <span className="text-[10px] font-extrabold text-amber-300 mt-1 uppercase tracking-widest">
              Scan to Join Group
            </span>
          </div>

          {/* Copy Share Link */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl mb-6 border border-slate-200 dark:border-slate-700">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="bg-transparent text-xs font-mono text-slate-700 dark:text-slate-300 px-2 flex-1 outline-none"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 bg-primary-700 hover:bg-primary-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Split Bill Calculator */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Calculator size={14} /> Split Bill Estimator
              </span>
              <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                Total Cart: ${totalBill}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">People:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPeopleCount(Math.max(2, peopleCount - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 font-black text-slate-800 dark:text-slate-200"
                  >
                    -
                  </button>
                  <span className="font-extrabold text-sm text-primary-700 dark:text-emerald-400">{peopleCount}</span>
                  <button
                    onClick={() => setPeopleCount(peopleCount + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 font-black text-slate-800 dark:text-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Each Pays</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">${perPerson}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
