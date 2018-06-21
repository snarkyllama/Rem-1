const { Command } = require('../../../core');

module.exports = class ServerinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            desc: 'Gives some information about your server or another server?',
            usage: '{prefix}serverinfo <server...>',
            aliases: [
                'server-info',
                'guildinfo'
            ],
            examples: [
                'serverinfo 336039472250748928',
                'serverinfo'
            ],
            category: "Utility",
            guild: true
        });
    }

    async execute(ctx, args) {
        if (!args[0]) {
            this.client.utils.resolveGuild(ctx.guild.id)
                .then((guild) => {
                    ctx.send({
                        title: "Server Information",
                        thumbnail: {
                            url: guild.icon ? guild.iconURL : null
                        },
                        color: this.client.utils.color,
                        fields: [{
                            name: '❯ Name',
                            value: guild.name,
                            inline: true
                        },
                        {
                            name: '❯ ID',
                            value: guild.id,
                            inline: true
                        },
                        {
                            name: '❯ Region',
                            value: guild.region,
                            inline: true
                        },
                        {
                            name: '❯ Owner',
                            value: `<@${guild.ownerID}> (\`${guild.ownerID}\`)`,
                            inline: true
                        },
                        {
                            name: '❯ Members',
                            value: guild.memberCount,
                            inline: true
                        },
                        {
                            name: '❯ Channels',
                            value: guild.channels.size,
                            inline: true
                        }, 
                        {
                            name: '❯ Emojis',
                            value: guild.emojis.length,
                            inline: true
                        }, 
                        {
                            name: "❯ Roles",
                            value: guild.roles.size,
                            inline: true
                        }],
                        color: this.client.utils.color
                    });
                });
        } else {
            this.client.utils.resolveGuild(args[0])
                .then((guild) => {
                    ctx.send({
                        title: "Server Information",
                        thumbnail: {
                            url: guild.icon ? guild.iconURL : null
                        },
                        color: this.client.utils.color,
                        fields: [{
                            name: '❯ Name',
                            value: guild.name,
                            inline: true
                        },
                        {
                            name: '❯ ID',
                            value: guild.id,
                            inline: true
                        },
                        {
                            name: '❯ Region',
                            value: guild.region,
                            inline: true
                        },
                        {
                            name: '❯ Owner',
                            value: `<@${guild.ownerID}> (\`${guild.ownerID}\`)`,
                            inline: true
                        },
                        {
                            name: '❯ Members',
                            value: guild.memberCount,
                            inline: true
                        }
                        ,
                        {
                            name: '❯ Channels',
                            value: guild.channels.size,
                            inline: true
                        }, 
                        {
                            name: '❯ Emojis',
                            value: guild.emojis.length,
                            inline: true
                        }, 
                        {
                            name: "❯ Roles",
                            value: guild.roles.size,
                            inline: true
                        }],
                        color: this.client.utils.color
                    });
                });       
        }
    }
};