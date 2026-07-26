import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';

import { RoleSwitcher } from './components/RoleSwitcher';
import { GlassNavbar } from './components/GlassNavbar';
import { Footer } from './components/Footer';

import { MoodSelectorModal } from './components/MoodSelectorModal';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { SpinWheelModal } from './components/SpinWheelModal';
import { NutritionModal } from './components/NutritionModal';
import { MealPlannerModal } from './components/MealPlannerModal';
import { GroupOrderModal } from './components/GroupOrderModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';

import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { RestaurantDetailPage } from './pages/RestaurantDetailPage';
import { RestaurantDashboardPage } from './pages/RestaurantDashboardPage';
import { DeliveryDashboardPage } from './pages/DeliveryDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { fetchFoods, fetchRestaurants, fetchCategories } from './services/api';

const AppContent = () => {
  const { activeRole } = useAuth();

  const [view, setView] = useState('landing'); // landing, home, restaurantDetail
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Modals
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  const [isSpinOpen, setIsSpinOpen] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedNutritionFood, setSelectedNutritionFood] = useState(null);
  const [trackedOrder, setTrackedOrder] = useState(null);

  useEffect(() => {
    fetchFoods().then(res => res.success && setFoods(res.foods));
    fetchRestaurants().then(res => res.success && setRestaurants(res.restaurants));
    fetchCategories().then(res => res.success && setCategories(res.categories));
  }, []);

  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('restaurantDetail');
  };

  const handleAddFood = (newFood) => {
    setFoods(prev => [newFood, ...prev]);
  };

  const handleDeleteFood = (foodId) => {
    setFoods(prev => prev.filter(f => f.id !== foodId));
  };

  const renderRoleView = () => {
    if (activeRole === 'restaurant') {
      return <RestaurantDashboardPage foods={foods} onAddFood={handleAddFood} onDeleteFood={handleDeleteFood} />;
    }
    if (activeRole === 'delivery') {
      return <DeliveryDashboardPage />;
    }
    if (activeRole === 'admin') {
      return <AdminDashboardPage />;
    }

    // Default Customer View
    if (view === 'home') {
      return (
        <HomePage
          foods={foods}
          restaurants={restaurants}
          categories={categories}
          onOpenMood={() => setIsMoodOpen(true)}
          onSelectNutrition={(food) => setSelectedNutritionFood(food)}
          onSelectRestaurant={handleSelectRestaurant}
        />
      );
    }

    if (view === 'restaurantDetail') {
      return (
        <RestaurantDetailPage
          restaurant={selectedRestaurant}
          menu={foods.filter(f => f.restaurantId === selectedRestaurant?.id || f.restaurantName === selectedRestaurant?.name)}
          onBack={() => setView('home')}
          onSelectNutrition={(food) => setSelectedNutritionFood(food)}
        />
      );
    }

    return (
      <LandingPage
        foods={foods}
        restaurants={restaurants}
        categories={categories}
        onOpenMood={() => setIsMoodOpen(true)}
        onOpenSpin={() => setIsSpinOpen(true)}
        onSelectNutrition={(food) => setSelectedNutritionFood(food)}
        onSelectRestaurant={handleSelectRestaurant}
        onOpenGroup={() => setIsGroupOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <RoleSwitcher />
        <GlassNavbar
          onOpenMood={() => setIsMoodOpen(true)}
          onOpenSpin={() => setIsSpinOpen(true)}
          onOpenPlanner={() => setIsPlannerOpen(true)}
          onOpenGroup={() => setIsGroupOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onSearchClick={() => setView('home')}
        />

        {/* Dynamic Navigation Sub-Bar for Customer view */}
        {activeRole === 'user' && (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 py-2.5 px-4 sticky top-20 z-30">
            <div className="max-w-7xl mx-auto flex items-center gap-4 text-xs font-extrabold">
              <button
                onClick={() => setView('landing')}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  view === 'landing'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Landing Page
              </button>
              <button
                onClick={() => setView('home')}
                className={`px-3.5 py-1.5 rounded-full transition-colors ${
                  view === 'home'
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Home Feed & Search
              </button>
              {trackedOrder && (
                <button
                  onClick={() => setTrackedOrder(trackedOrder)}
                  className="px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 font-black flex items-center gap-1 shadow-sm"
                >
                  <span>Track Active Order ({trackedOrder.orderNumber})</span>
                </button>
              )}
            </div>
          </div>
        )}

        <main>{renderRoleView()}</main>
      </div>

      <Footer />

      {/* Interactive Modals */}
      <MoodSelectorModal
        isOpen={isMoodOpen}
        onClose={() => setIsMoodOpen(false)}
        onSelectNutrition={(food) => setSelectedNutritionFood(food)}
      />

      <SpinWheelModal
        isOpen={isSpinOpen}
        onClose={() => setIsSpinOpen(false)}
      />

      <NutritionModal
        isOpen={Boolean(selectedNutritionFood)}
        food={selectedNutritionFood}
        onClose={() => setSelectedNutritionFood(null)}
      />

      <MealPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
      />

      <GroupOrderModal
        isOpen={isGroupOpen}
        onClose={() => setIsGroupOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <CartDrawer
        onOrderPlaced={(order) => {
          setTrackedOrder(order);
        }}
      />

      <LiveOrderTrackerModal
        isOpen={Boolean(trackedOrder)}
        order={trackedOrder}
        onClose={() => setTrackedOrder(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
