const axios = require('axios');
const Game = require('../models/game');


// Fetch game data from RAWG API
const addGame = async (req, res) => {
    try {
        const { title, rawgId, status } = req.body;
        
        const existingGame = await Game.findOne({ rawgId })
        if(existingGame) {
            return res.status(400).json({ message: 'Game already exists in the list'});
        }
        
        const newGame = new Game({
            title,
            rawgId,
            status,
        });
        
        await newGame.save();
        res.status(201).json({ message: 'Game added successfully', game: newGame})
    } catch (error) {
        res.status(500).json({ message: 'Error adding game', error: error.message });
    } 
};

// all games from the database
const getGame = async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching games', error: error.message });
    }
};

// Update game status
const updateGame = async (req, res) => {
    try {
        const { status } = req.body;
        const updateGame = await Game.findByIdAndUpdate(req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json({ message: 'Games status updated successfully', game: updateGame });
    } catch (error) {
        res.status(500).json({ message: 'Error updating game status', error: error.message });
    }
};

// Delete game
const deleteGame = async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Games deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting game', error: error.message });
    }
};

// Search game by title
const searchGame = async (req, res) => {
    try {
        const query = req.query.q;
        const response = await axios.get(`https://api.rawg.io/api/games`, {
            params: {
                key: process.env.RAWG_API_KEY,
                search: query,
            },
        });
        res.status(200).json(response.data.results);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for game', error: error.message });
    }
};

module.exports = {
    addGame,
    getGame,
    updateGame,
    deleteGame,
    searchGame,
}