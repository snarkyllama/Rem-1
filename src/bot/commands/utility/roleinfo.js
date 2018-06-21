const { Command } = require('../../../core');

module.exports = class RoleinfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'roleinfo',
            desc: 'Shows information about a role',
            usage: '{prefix}roleinfo [role]',
            aliases: [
                'role'
            ],
            examples: [
                'roleinfo am augu loli'
            ],
            guild: true,
            category: 'Utility'
        });
    }

    async execute(ctx, args) {
        if (!args[0]) return ctx.send({
            description: "You must provide a role to see what it is about~",
            color: this.client.utils.color
        });

        this.client.utils.resolveRole(args.length > 0 ? args.join(' ') : ctx.member.roles[ctx.member.roles.length - 1], ctx.guild)
            .then((role) => {
                ctx.send({
                    title: "Role Information",
                    fields: [{
                        name: '❯ Name',
                        value: role.name,
                        inline: true
                    },
                    {
                        name: '❯ ID',
                        value: role.id,
                        inline: true
                    },
                    {
                        name: '❯ Position',
                        value: role.position - 1,
                        inline: true
                    },
                    {
                        name: '❯ Hoisted?',
                        value: role.hoist ? "Yes" : "No",
                        inline: true
                    },
                    {
                        name: '❯ Mentionable',
                        value: role.mentionable ? "Yes" : "No",
                        inline: true
                    },
                    {
                        name: '❯ Managed?',
                        value: role.managed ? "Yes" : "No",
                        inline: true
                    }],
                    color: role.color
                });
            });
    }
};