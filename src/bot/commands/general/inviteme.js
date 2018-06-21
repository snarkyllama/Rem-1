const { Command } = require('../../../core');

module.exports = class InviteMeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'inviteme',
            desc: 'Gets my invite and discord link~',
            usage: '{prefix}inviteme',
            aliases: [
                'invite'
            ]
        });
    }

    async execute(ctx) {
        ctx.send({
            description: "Here are my Discord and Invite links~",
            fields: [{
                name: 'Invite me!',
                value: 'https://rembot.xyz/invite'
            },
            {
                name: 'Discord Server',
                value: 'https://rembot.xyz/discord'
            }],
            color: this.client.utils.color
        });
    }
};