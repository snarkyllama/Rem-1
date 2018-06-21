const { RemClient } = require('../core');
const config = require('./config.json');

new RemClient({
    token: config.tokens.Dev,
    clientOptions: {
        maxShards: 'auto',
        disableEveryone: true,
        autoReconnect: true,
        defaultImageFormat: 'png',
        getAllusers: true
    }
}).launch();

process.on('unhandledRejection', (err) => {
    console.error(err.stack);
});