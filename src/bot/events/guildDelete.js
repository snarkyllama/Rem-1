const { GuildSchema } = require('../../core');
const games = require('../../assets/json/activities.json');
let newGame = games[Math.floor(Math.random() * games.length)];

module.exports = {
    name: 'guildDelete',
    execute: (client, guild) => {
        GuildSchema.findOneAndRemove({ id: guild.id })
        .catch((err) => {
            console.log(err);
        })

        client.log.info(`Left guild ${guild.name} (${guild.id})`);
        // client.utils.postToBotLists();

        for (const shard of client.shards.map(s => s)) {
            client.editStatus({
                name: `${newGame.name} | [#${shard.id + 1}] | ${client.guilds.size} Guilds`,
                type: newGame.type
            });

            setInterval(() => {
                client.editStatus({
                    name: `${newGame.name} | [#${shard.id + 1}] | ${client.guilds.size} Guilds`,
                    type: newGame.type
                });
            }, 60000);
        }
    }
};