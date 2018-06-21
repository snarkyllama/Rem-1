const games = require('../../assets/json/activities.json');
let newGame = games[Math.floor(Math.random() * games.length)];
let { PlayerManager } = require('eris-lavalink');

module.exports = {
    name: 'ready',
    execute: (client) => {
        client.log.info('Rem has connected via Discord.');
        client.webhook.send({
            description: `**${client.user.username}#${client.user.discriminator}** has logged into Discord~`,
            color: client.utils.color
        });
        client.voiceConnections = new PlayerManager(client, client.config.lavalink.nodes, {
            userId: client.user.id,
            numShards: client.shards.size
        });

        for (const shard of client.shards.map(s => s)) {
            client.editStatus({
                name: `${newGame.name} | [#${shard.id + 1}] | ${client.guilds.size} Guild${client.guilds.size > 1 ? "s" : ""}`,
                type: newGame.type
            });

            setInterval(() => {
                client.editStatus({
                    name: `${newGame.name} | [#${shard.id + 1}] | ${client.guilds.size} Guild${client.guilds.size > 1 ? "s" : ""}`,
                    type: newGame.type
                });
            }, 60000);
        }
    }
};