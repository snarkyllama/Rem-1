module.exports = {
    name: 'shardReady',
    execute: (client, id) => {
        client.log.custom(`Shard #${id}`, 'Shard is ready to be launched!');
        client.webhook.send({
            description: `[\`Shard #${id}\`]: **Shard is ready.**`,
            color: client.utils.color
        });
    }
};