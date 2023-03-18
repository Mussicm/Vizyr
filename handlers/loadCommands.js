const { readdir } = require("fs/promises");
const delay = require('delay');
const chalk = require("chalk");

module.exports = async (client) => {
  const load = async (dirs) => {
    const commands = await readdir(`./commands/${dirs}/`);
    for (const file of commands.filter((file) => file.endsWith(".js"))) {
      const pull = require(`../commands/${dirs}/${file}`);
      client.commands.set(pull.config.name, pull);
      if (pull.config.aliases) {
        pull.config.aliases.forEach((alias) =>
          client.aliases.set(alias, pull.config.name)
        );
      }
    }
  };

  await Promise.all(["music", "filters", "utilities"].map(load));
  await delay(4000);
  console.log(chalk.greenBright("[INFORMATION] Command Events Loaded"));
};
