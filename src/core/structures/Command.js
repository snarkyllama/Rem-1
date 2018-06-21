const Context = require('./Context');

class Command {
    constructor(client, {
        name = null,
        desc = "No description avaliable.",
        usage = "No usages avaliable.",
        category = "General",
        aliases = [],
        examples = [],
        nsfw = false,
        owner = false,
        guild = false,
        enabled = true
    }) {
        this.client = client;
        this.options = {
            name, desc, usage,
            category, aliases, examples,
            nsfw, owner, guild, enabled
        };
    }

    /**
     * Execute the command~
     * 
     * @param {Context} ctx The command context
     * @param {String[]|string[]} args The arguments
     */
    async execute(ctx, args) {
        throw new Error('[Command#execute]: Sorry, you must override the `execute()` function on the command.');
    }
}

module.exports = Command;