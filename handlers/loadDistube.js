const { readdirSync } = require("fs");
const chalk = require("chalk");
const delay = require("delay");

module.exports = async (client) => {
    try {
        readdirSync("./events/distube/").forEach(file => {
            const event = require(`../events/distube/${file}`);
            let eventName = file.split(".")[0];
            client.distube.on(eventName, event.bind(null, client));
          });
        console.log(chalk.greenBright(`[INFORMATION] Distube Events Loaded`));
    } catch (e) {
        console.log(chalk.redBright(`[ERROR] ${e.message}`));
    }
    await delay(4000);
};