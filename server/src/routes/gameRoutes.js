const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
    addGame,
    getGame,
    deleteGame,
    updateGame,
    searchGame,
} = require('../controllers/gameController');

// Add a new game
router.post('/', authMiddleware, addGame);

// Get all games
router.get('/', authMiddleware, getGame);

// Update game status
router.put('/:id', authMiddleware, updateGame);

// Delete a game
router.delete('/:id', authMiddleware, deleteGame);

// Search for a game by title
router.get('/search', searchGame);

module.exports = router;