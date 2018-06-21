module.exports = {
    name: 'shardDisconnect',
    execute: (client, id) => {
        client.log.custom(`Shard #${id}`, 'Shard has been disconnected from Discord, reconnecting....');
        client.webhook.send({
            description: `[\`Shard #${id}\`]: **Shard has been disconnected from Discord, currently reconnecting...**`,
            color: client.utils.color
        });
    }
};