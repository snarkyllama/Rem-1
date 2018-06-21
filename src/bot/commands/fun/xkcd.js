const { Command } = require('../../../core');

module.exports = class XKCDCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            desc: "Gets a random XKCD comic or gets one by a number.",
            usage: '{prefix}xkcd [comic_number:int]',
            aliases: [
                'comic'
            ],
            category: "Fun"
        });
    }

    async execute(ctx, args) {
        if (!args[0]) {
            this.client.snek.get('https://xkcd.com/info.0.json')
                .then((result) => {
                    const random = Math.floor(Math.random() * result.body.num) + 1;
                    this.client.snek.get(`https://xkcd.com/${random}/info.0.json`)
                        .then((res) => {
                            ctx.send({
                                title: res.body.safe_title,
                                description: result.body.alt,
                                color: this.client.utils.color,
                                image: {
                                    url: res.body.img
                                }
                            });
                        });
                });
        } else {
            if (isNaN(args[0])) return ctx.send({
                description: "The comic number must be a number.",
                color: this.client.utils.color
            });
            if (Number(args[0]) < 1) return ctx.send({
                description: "The comic number must be greater then 1.",
                color: this.client.utils.color
            });

            this.client.snek.get('https://xkcd.com/info.0.json')
                .then((result) => {
                    if (Number(args[0]) > result.body.num) return ctx.send({
                        description: `The comic number needs to be less or equal to \`${result.body.num}\``,
                        color: this.client.utils.color
                    });

                    this.client.snek.get(`https://xkcd.com/${Number(args[0])}/info.0.json`)
                        .then((res) => {
                            ctx.send({
                                title: res.body.safe_title,
                                description: result.body.alt,
                                color: this.client.utils.color,
                                image: {
                                    url: res.body.img
                                }
                            });     
                        });
                });
        }
    }
};