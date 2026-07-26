const { foods, categories } = require('../data/mockData');

const getFoods = (req, res) => {
  const { category, search, veg, maxPrice, mood, minRating } = req.query;

  let result = [...foods];

  if (category && category !== 'All') {
    result = result.filter(f => f.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.restaurantName.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
    );
  }

  if (veg === 'true') {
    result = result.filter(f => f.isVeg === true);
  }

  if (maxPrice) {
    result = result.filter(f => f.price <= Number(maxPrice));
  }

  if (minRating) {
    result = result.filter(f => f.rating >= Number(minRating));
  }

  if (mood) {
    result = result.filter(f => f.moods && f.moods.includes(mood));
  }

  return res.json({ success: true, count: result.length, foods: result });
};

const getFoodById = (req, res) => {
  const { id } = req.params;
  const food = foods.find(f => f.id === id);
  if (!food) {
    return res.status(404).json({ success: false, message: 'Food item not found' });
  }
  return res.json({ success: true, food });
};

const getCategories = (req, res) => {
  return res.json({ success: true, categories });
};

module.exports = {
  getFoods,
  getFoodById,
  getCategories
};
