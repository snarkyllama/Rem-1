module.exports = {
    name: 'disconnect',
    execute: (client) => {
        client.log.warn('All shards has disconnected!!!!111');
    }
};