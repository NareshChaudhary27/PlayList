const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    rawgId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['playing', 'completed', 'dropped', 'on-hold'],
        default: 'playing',
    },
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;