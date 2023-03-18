const chalk = require("chalk");
const delay = require("delay");

module.exports = async (client, id) => { 
    await delay(2000); 
    console.log(chalk.greenBright(`[${new Date().toLocaleString()}] || ==> || Shard #${id} Ready`))
}
