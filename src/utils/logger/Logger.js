const time = `[${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}]`;

class Logger {
    info(message) {
        return console.info(`${time} \x1b[42mINFO\x1b[0m: \x1b[32m${message}\x1b[0m`);
    }

    warn(message) {
        return console.warn(`${time} \x1b[43mWARN\x1b[0m: \x1b[33m${message}\x1b[0m`);
    }

    error(message) {
        return console.error(`${time} \x1b[41mERROR\x1b[0m: \x1b[31m${message}\x1b[0m`);
    }

    debug(message) {
        return console.debug(`${time} \x1b[45mDEBUG\x1b[0m: \x1b[35m${message}\x1b[0m`);
    }

    custom(title, message) {
        return console.log(`${time} \x1b[100m${title}\x1b[0m: ${message}`);
    }
}

module.exports = Logger;
