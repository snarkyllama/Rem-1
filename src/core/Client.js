const { loadErisMods } = require('../utils/other/OtherUtils');
const Eris = loadErisMods(require('eris')).Client;
const mongoose = require('mongoose');
const Logger = require('../utils/logger/Logger');
const Util = require('../utils/Util');
const conn = mongoose.connection;
const fs = require('fs');
const WebhookClient = require('../utils/other/WebhookClient');
const Collection = require('../utils/other/Collection');
const i18n = require('i18n');
const path = require('path');

module.exports = class RemClient extends Eris {
    constructor(options = {}) {
        super(options.token, options.clientOptions);

        this.cmds = [];
        this.aliases = [];
        this.utils = new Util(this);
        this.log = new Logger();
        this.config = require('../bot/config.json');
        this.snek = require('snekfetch');
        this.statistics = {
            messages: 0,
            commandsExecuted: 0,
            commandUsage: []
        };
        this.webhook = new WebhookClient(this, {
            url: this.config.webhook.url
        });
        this.queue = new Collection();
        this.emojis = {
            question: ":question:",
            money: ":yen:",
            success: "<:remSuccess:459224705744896000>",
            error: "<:remError:459224732093644820>",
            eject: ":eject:",
            input: ":inbox_tray:",
            output: ":output_tray:",
            loading: "<a:remLoading:459273346131951616>",
            love: "<:blobcatlove:459410911363596289>"
        };

        mongoose.connect('mongodb://127.0.0.1:27017');
        conn.on('open', () => this.log.custom('Database', 'Connected to the database.'));
    }

    async launch() {
        await this.load();
        this.connect().then(() => this.log.custom('WebSocket', 'Rem is currently connecting via WebSocket.'));
    }

    async load() {
        const categories = await fs.readdirSync('./commands');

        for (let i = 0; i < categories.length; i++) {
            fs.readdir(`./commands/${categories[i]}`, (err, files) => {
                if (err) throw err;
                files.forEach(f => {
                    try {
                        const Command = require(`../bot/commands/${categories[i]}/${f}`);
                        const cmd = new Command(this);

                        if (!cmd.options.enabled) return;
    
                        this.cmds.push(cmd);
    
                        if (!cmd.options.aliases) {
                            return;
                        } else {
                            for (const a of cmd.options.aliases) {
                                this.aliases.push(a);
                            }
                        }
                        
                        this.log.custom(categories[i].toString(), `Loaded command "${cmd.options.name}"~`);
                    } catch(e) {
                        this.log.error(e.stack);
                    }
                });
            });
        }

        fs.readdir('./events', (err, files) => {
            if (err) throw err;
            for (const f of files) {
                const event = require(`../bot/events/${f}`);
                
                const doWrapper = async(...args) => {
                    try {
                        await event.execute(this, ...args);
                    } catch(e) {
                        throw e;
                    }
                };

                this.on(event.name, doWrapper);
            }
        });
    }

    sleep(ms) {
        return new Promise(res => setTimeout(res, ms));
    }

    async reboot() {
        this.log.warn(`One of the developers (Mostly August) has rebooting me, so here we go!`);
        await process.exit()
            .then(async() => {
                this.sleep(60000); // 60 Seconds to let Rem go offline.
                await this.launch();
            });
    }

    /**
     * Cleans some shit TM
     * 
     * @param {String} str The shit TM
     * @returns {String} uwu
     */
    async clean(str) {
        if (str && str.constructor.name === 'Promise') str = await str;
        if (typeof str !== 'string') str = require('util').inspect(str, {
            depth: 0
        });

        str = str
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(this.config.tokens.Discord, 'Nope! Sorry~')
            .replace(this.config.tokens.osu, 'This is for a command, so... no~');

        return str;
    }
};