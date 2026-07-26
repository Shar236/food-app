const { foods } = require('../data/mockData');

const recommendFoods = (req, res) => {
  const { mood = 'Happy', budget = 30, diet = 'Any', maxCalories = 1000, weather = 'Sunny' } = req.body;

  let scoredFoods = foods.map(food => {
    let score = 0;
    let rationale = [];

    // Mood match (+30 points)
    if (food.moods && food.moods.includes(mood)) {
      score += 30;
      rationale.push(`Perfect match for a **${mood}** moment`);
    }

    // Budget match (+20 points)
    if (food.price <= Number(budget)) {
      score += 20;
      rationale.push(`Fits within your $${budget} limit`);
    } else {
      score -= 15;
    }

    // Diet match (+25 points)
    if (diet === 'Veg' && food.isVeg) {
      score += 25;
      rationale.push(`100% Vegetarian`);
    } else if (diet === 'Non-Veg' && !food.isVeg) {
      score += 25;
    } else if (diet === 'High-Protein' && food.nutrition.protein >= 25) {
      score += 25;
      rationale.push(`High Protein (${food.nutrition.protein}g)`);
    }

    // Calorie match (+15 points)
    if (food.nutrition.calories <= Number(maxCalories)) {
      score += 15;
      rationale.push(`Comfortable ${food.nutrition.calories} kcal intake`);
    }

    // Rating bonus
    score += (food.rating * 5);

    return {
      ...food,
      aiScore: Math.min(Math.round((score / 85) * 100), 99),
      aiRationale: rationale.length > 0 ? rationale.join(' • ') : 'Handpicked high-quality dish based on community popularity.'
    };
  });

  // Sort descending by score
  scoredFoods.sort((a, b) => b.aiScore - a.aiScore);

  const topPicks = scoredFoods.slice(0, 4);

  return res.json({
    success: true,
    momentSummary: {
      mood,
      budget: `$${budget}`,
      diet,
      weather,
      aiConfidence: '98.4%'
    },
    recommendations: topPicks
  });
};

module.exports = {
  recommendFoods
};
