const mongoose = require('mongoose');

module.exports = mongoose.model('Guilds', new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    logging: {
        enable: {
            type: Boolean,
            default: false
        },
        channel: {
            type: String,
            default: null
        }
    },
    prefix: {
        type: String,
        default: require('../../bot/config.json').prefix
    },
    greetings: {
        enabled: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: '[`$(user.name)`]: Welcome to `$(guild.name)`~'
        },
        channel: { 
            type: String,
            default: null
        }
    },
    farewell: {
        enabled: {
            type: Boolean,
            default: false
        },
        message: {
            type: String,
            default: '[`$(user.name)`]: Goodbye... :<'
        },
        channel: {
            type: String,
            default: null
        }
    },
    mutedRole: {
        type: String,
        default: null
    },
    modLog: {
        channel: {
            type: String,
            default: null
        }
    }
}));