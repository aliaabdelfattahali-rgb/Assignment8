import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('_id name email');

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    message: 'Profile fetched successfully',
    user: { id: user._id, name: user.name, email: user.email }
  });
});

export default router;
