const express = require('express');
const { createWasteFood, getAllWasteFood } = require('../controllers/wasteFoodController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// POST endpoint to create waste food entry
router.post('/create', verifyToken, createWasteFood);

// GET endpoint to fetch all available waste food items
router.get('/all', verifyToken, getAllWasteFood);

module.exports = router;
