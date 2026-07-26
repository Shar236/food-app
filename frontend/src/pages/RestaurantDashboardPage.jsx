import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Store, Plus, Trash2, CheckCircle2, Clock, DollarSign, Package, ChefHat, Sparkles } from 'lucide-react';

export const RestaurantDashboardPage = ({ foods, onAddFood, onDeleteFood }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Pizza');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isVeg, setIsVeg] = useState(true);

  const salesData = [
    { day: 'Mon', sales: 420 },
    { day: 'Tue', sales: 580 },
    { day: 'Wed', sales: 740 },
    { day: 'Thu', sales: 890 },
    { day: 'Fri', sales: 1250 },
    { day: 'Sat', sales: 1680 },
    { day: 'Sun', sales: 1420 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onAddFood({
      name,
      price: Number(price),
      category,
      description: description || 'Artisanal kitchen preparation',
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      isVeg,
      calories: 650,
      protein: 24,
    });
    setName('');
    setPrice('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Dashboard Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-primary-950 p-8 rounded-3xl text-white shadow-xl flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
            <Store size={16} />
            <span>RESTAURANT MANAGEMENT PORTAL</span>
          </div>
          <h1 className="text-3xl font-extrabold mt-1">Nero's Wood-Fired Pizzeria</h1>
          <p className="text-xs text-slate-400 mt-1">Manage dishes, monitor live orders, and review sales analytics.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 transition-transform active:scale-95"
        >
          <Plus size={16} />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Weekly Revenue</span>
          <span className="text-2xl font-black text-slate-900 dark:text-slate-100">$6,980.00</span>
          <span className="text-[11px] font-bold text-emerald-500 block mt-1">+18.4% vs last week</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Active Kitchen Orders</span>
          <span className="text-2xl font-black text-amber-500">4 Orders</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">2 preparing, 2 ready</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Menu Dishes</span>
          <span className="text-2xl font-black text-primary-700 dark:text-emerald-400">{foods.length} Items</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">All in stock</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
          <span className="text-xs font-bold text-slate-400 block uppercase">Customer Rating</span>
          <span className="text-2xl font-black text-amber-400">4.85 ★</span>
          <span className="text-[11px] font-bold text-slate-400 block mt-1">420 verified reviews</span>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mb-4">Daily Sales Analytics</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F766E" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0F766E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#0F766E" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Menu Management Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 mb-4">Dishes in Menu</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase">
                <th className="py-3 px-2">Dish</th>
                <th className="py-3 px-2">Category</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Diet</th>
                <th className="py-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <img src={food.image} alt={food.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 block">{food.name}</span>
                      <span className="text-[10px] text-slate-400">{food.restaurantName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-300">{food.category}</td>
                  <td className="py-3 px-2 font-black text-primary-700 dark:text-emerald-400">${food.price.toFixed(2)}</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${food.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {food.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => onDeleteFood(food.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Food Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="font-extrabold text-xl text-slate-900 dark:text-slate-100 mb-4">Add Dish to Menu</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-500 mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none border border-slate-200 dark:border-slate-700"
                  >
                    <option>Pizza</option>
                    <option>Burger</option>
                    <option>Chinese</option>
                    <option>Indian</option>
                    <option>Desserts</option>
                    <option>Healthy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="veg"
                  checked={isVeg}
                  onChange={e => setIsVeg(e.target.checked)}
                  className="accent-primary-700"
                />
                <label htmlFor="veg" className="font-bold text-slate-700 dark:text-slate-300">Is Vegetarian Dish</label>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-primary-700 text-white font-bold"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
