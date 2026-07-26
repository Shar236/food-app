import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchAdminStats } from '../services/api';
import { ShieldCheck, Users, Store, DollarSign, ShoppingBag, Settings, CheckCircle2, AlertTriangle } from 'lucide-react';

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminStats().then(data => {
      if (data.success) {
        setStats(data);
      }
    });
  }, []);

  const COLORS = ['#0F766E', '#FBBF24', '#10b981', '#f59e0b', '#8b5cf6'];

  if (!stats) return <div className="p-10 text-center font-bold">Loading Admin Command Center...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* SaaS Admin Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950 p-8 rounded-3xl text-white shadow-xl flex items-center justify-between border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
            <ShieldCheck size={16} />
            <span>SAAS SYSTEM COMMAND CENTER</span>
          </div>
          <h1 className="text-3xl font-extrabold mt-1">Mealora Platform Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Global platform metrics, user management, and restaurant verifications.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Total GMV Revenue</span>
          <span className="text-2xl font-black text-primary-700 dark:text-emerald-400">${stats.metrics.totalRevenue}</span>
          <span className="text-[11px] font-bold text-emerald-500 block mt-1">+24.2% MoM growth</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Total Platform Orders</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{stats.metrics.totalOrders}</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">99.2% successful fulfillment</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Active Restaurants</span>
          <span className="text-2xl font-black text-amber-500">{stats.metrics.activeRestaurants} Partners</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">All verified</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Registered Users</span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{stats.metrics.totalUsers}</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">Active customer base</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mb-4">Monthly Platform Revenue ($)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlySales}>
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#0F766E" fill="#0F766E" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mb-2">Category Share</h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Pizza', value: 35 },
                    { name: 'Burger', value: 25 },
                    { name: 'Indian', value: 20 },
                    { name: 'Healthy', value: 12 },
                    { name: 'Desserts', value: 8 },
                  ]}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]"></span> Pizza (35%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]"></span> Burger (25%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span> Indian (20%)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span> Healthy (12%)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
