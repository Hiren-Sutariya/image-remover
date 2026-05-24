const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route    POST api/pricing/select
// @desc     Stub endpoint (pricing plans are managed via contact/free)
// @access   Private
router.post('/select', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Direct mock success for compatibility if called
    user.subscriptionPlan = 'Free';
    user.subscriptionStatus = 'active';
    await user.save();

    const userObject = user.toObject();
    delete userObject.password;

    return res.json({
      status: 'success',
      message: 'Starter plan activated successfully!',
      user: userObject,
    });
  } catch (err) {
    console.error('Pricing selection error:', err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/pricing/verify
// @desc     Stub verification endpoint
// @access   Private
router.post('/verify', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.subscriptionPlan = 'Free';
    user.subscriptionStatus = 'active';
    await user.save();

    const userObject = user.toObject();
    delete userObject.password;

    res.json({
      status: 'success',
      message: 'Subscription activated successfully!',
      user: userObject
    });
  } catch (err) {
    console.error('Payment verification error:', err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
