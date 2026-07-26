const { coupons } = require('../data/mockData');

const validateCoupon = (req, res) => {
  const { code, subtotal = 0 } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code is required' });
  }

  const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());

  if (!match) {
    return res.status(404).json({ success: false, message: 'Invalid or expired promo code' });
  }

  if (subtotal < match.minOrder) {
    return res.status(400).json({
      success: false,
      message: `Minimum subtotal of $${match.minOrder} required for ${match.code}`
    });
  }

  let discount = (subtotal * match.discountPercent) / 100;
  if (discount > match.maxDiscount) {
    discount = match.maxDiscount;
  }

  return res.json({
    success: true,
    coupon: match,
    discountAmount: Number(discount.toFixed(2)),
    message: `Promo code ${match.code} applied successfully!`
  });
};

const getCoupons = (req, res) => {
  return res.json({ success: true, coupons });
};

module.exports = {
  validateCoupon,
  getCoupons
};
