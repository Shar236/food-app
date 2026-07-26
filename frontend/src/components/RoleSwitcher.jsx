import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Store, Truck, ShieldCheck } from 'lucide-react';

export const RoleSwitcher = () => {
  const { activeRole, switchRole } = useAuth();

  const roles = [
    { key: 'user', label: 'Customer', icon: User, color: 'hover:text-emerald-500' },
    { key: 'restaurant', label: 'Restaurant Owner', icon: Store, color: 'hover:text-amber-500' },
    { key: 'delivery', label: 'Delivery Rider', icon: Truck, color: 'hover:text-blue-500' },
    { key: 'admin', label: 'Admin Panel', icon: ShieldCheck, color: 'hover:text-purple-500' },
  ];

  return (
    <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Role Switcher (Instant Demo Preview):</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = activeRole === r.key;
            return (
              <button
                key={r.key}
                onClick={() => switchRole(r.key)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                  isActive
                    ? 'bg-primary-700 text-white shadow-md shadow-primary-900/40 ring-1 ring-emerald-400/40'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-amber-300' : ''} />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
