module.exports = {
    name: 'shardResume',
    execute: (client, id) => {
        client.log.custom(`Shard #${id}`, 'Shard has been resumed~');
        client.webhook.send({
            description: `[\`Shard #${id}\`]: **Shard has been resumed.**`,
            color: client.utils.color
        });
    }
};