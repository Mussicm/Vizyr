const chalk = require("chalk");

module.exports = (client, event, id) => {
    console.log(chalk.redBright(`[${new Date().toISOString()}] ==> Shard #${id} disconnected from Discord with event ${event}.`));
}
