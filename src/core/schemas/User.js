const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    coins: {
        type: Number,
        default: 0
    },
    profile: {
        osu: {
            type: String,
            default: null
        },
        mal: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: "I am a lazy bum without a description!"
        }
    }
}));