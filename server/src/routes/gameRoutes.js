const express = require('express');
const router = express.Router();

const {
    addGame,
    getGame,
    deleteGame,
    updateGame,
    searchGame,
} = require('../controllers/gameController');

// Add a new game
router.post('/', addGame);

// Get all games
router.get('/', getGame);

// Update game status
router.put('/:id', updateGame);

// Delete a game
router.delete('/:id', deleteGame);

// Search for a game by title
router.get('/search', searchGame);

module.exports = router;