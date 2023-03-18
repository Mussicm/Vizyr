const figlet = require('figlet');
const chalk = require('chalk');

module.exports = async (client) => {
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log(chalk.red.bold('Something went wrong...'));
        console.dir(err);
        return;
    }
    console.log(chalk.red.bold(data));
  });

  const guilds = client.guilds.cache.size;
  const users = client.users.cache.size;
  const channels = client.channels.cache.size;

  const activities = [
      `${client.prefix}help | ${guilds} servers`,
      `${client.prefix}play <input> | ${users} users`,
      `${client.prefix}filterlist | ${channels} channels`,
  ];

  setInterval(() => {
      const activity = activities[Math.floor(Math.random() * activities.length)];
      client.user.setActivity(activity, { type: 'WATCHING' });
      console.log(chalk.green.bold(`Activity set to "${activity}"`));
  }, 15000);
};
