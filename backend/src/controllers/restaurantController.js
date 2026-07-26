const { restaurants, foods } = require('../data/mockData');

let restaurantList = [...restaurants];
let foodList = [...foods];

const getRestaurants = (req, res) => {
  const { search, cuisine, tag } = req.query;
  let result = [...restaurantList];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
  }

  if (cuisine) {
    result = result.filter(r => r.cuisine.toLowerCase().includes(cuisine.toLowerCase()));
  }

  if (tag) {
    result = result.filter(r => r.tags && r.tags.includes(tag));
  }

  return res.json({ success: true, count: result.length, restaurants: result });
};

const getRestaurantById = (req, res) => {
  const { id } = req.params;
  const restaurant = restaurantList.find(r => r.id === id);
  if (!restaurant) {
    return res.status(404).json({ success: false, message: 'Restaurant not found' });
  }

  const menu = foodList.filter(f => f.restaurantId === id || f.restaurantName === restaurant.name);

  return res.json({
    success: true,
    restaurant,
    menu
  });
};

const addFoodItem = (req, res) => {
  const { name, price, category, description, image, isVeg, calories, protein } = req.body;
  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Name and price are required' });
  }

  const newFood = {
    id: `food-${Date.now()}`,
    restaurantId: req.body.restaurantId || 'rest-1',
    restaurantName: "Nero's Wood-Fired Pizzeria",
    name,
    price: Number(price),
    category: category || 'Pizza',
    description: description || 'Special house recipe',
    image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    isVeg: Boolean(isVeg),
    nutrition: { calories: Number(calories || 500), protein: Number(protein || 20), carbs: 40, fat: 15 },
    moods: ['Happy', 'Party'],
  };

  foodList.unshift(newFood);
  return res.json({ success: true, food: newFood, message: 'Discreated/Added dish successfully' });
};

const deleteFoodItem = (req, res) => {
  const { id } = req.params;
  foodList = foodList.filter(f => f.id !== id);
  return res.json({ success: true, message: 'Food item deleted successfully' });
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  addFoodItem,
  deleteFoodItem,
  foodList,
  restaurantList
};
