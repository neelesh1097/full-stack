import express from 'express';
import userAuth from '../middleware/userAuth.js';
import userModel from '../models/userModel.js';

const cartRouter = express.Router();

// Get cart
cartRouter.post('/get', userAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, cartItems: user.cartData || {} });
  } catch (error) {
    console.error('Cart get error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add to cart (increment by quantity)
cartRouter.post('/add', userAuth, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body || {};
    if (!itemId) {
      return res.status(400).json({ success: false, message: 'itemId is required' });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const current = user.cartData?.[itemId] || 0;
    user.cartData[itemId] = current + Number(quantity);
    await user.save();

    return res.json({ success: true, cartItems: user.cartData });
  } catch (error) {
    console.error('Cart add error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update quantity (set exact quantity)
cartRouter.post('/update', userAuth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body || {};
    if (!itemId || typeof quantity !== 'number') {
      return res.status(400).json({ success: false, message: 'itemId and numeric quantity are required' });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (quantity <= 0) {
      delete user.cartData[itemId];
    } else {
      user.cartData[itemId] = quantity;
    }

    await user.save();

    return res.json({ success: true, cartItems: user.cartData });
  } catch (error) {
    console.error('Cart update error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default cartRouter;
