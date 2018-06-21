const { Command } = require('../../../core');

module.exports = class About extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            desc: 'Shows some stuff about me, Rem!',
            usage: '{prefix}about',
            examples: [
                'about'
            ]
        });
    }

    execute(ctx) {
        return ctx.send({
            author: {
                name: `Rem | レム`,
                url: 'https://rembot.xyz',
                icon_url: ctx.client.user.avatarURL
            },
            description: `:wave: I am **RemBot**, your weeb bot for anything ~~even NSFW!~~\n\nI was made by <@280158289667555328>, <@229552088525438977>, and <@387043512232968193>\n\n\`\`\`diff\n+ Reaction commands 'kiss', 'hug', 'pat', etc.\n+ Image Manipulation 'iphonex', 'changemymind', etc (Powered by nekobot.xyz OwO)\n* and many more~\`\`\``,
            fields: [{
                name: '❯ Misc',
                value: `Guilds: **${this.client.guilds.size}**\nUsers: **${this.client.users.size}**\nChannels: **${Object.keys(this.client.channelGuildMap).length}**\nCommands: **${Object.keys(this.client.cmds).length}**`,
                inline: true
            },
            {
                name: '❯ Version-related',
                value: `Eris: **${require('eris').VERSION}**\nNode.js: **${process.version}**\nRem: **v${require('../../../../package.json').version}**`,
                inline: true
            }],
            color: this.client.utils.color
        });
    }
};