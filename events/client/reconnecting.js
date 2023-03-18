const chalk = require("chalk");

module.exports = client => {
    console.log(chalk.yellow(`[${client.user.username}] || Reconnecting at ${new Date()}.`))
}
