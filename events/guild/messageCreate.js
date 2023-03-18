const { Permissions, MessageEmbed } = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type !== "GUILD_TEXT") return;

  const PREFIX = client.prefix;

  const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(mention)) {
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`**Don't ping me okeh? My prefix is \`${PREFIX}\`**`);
    message.channel.send({ embeds: [embed] });
  }
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`
  );
  if (!prefixRegex.test(message.content)) return;
  const [matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  const permissions = message.guild.me.permissions;
  if (!permissions.has(Permissions.FLAGS.SEND_MESSAGES)) {
    message.author.send(
      `I don't have perm **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute command!`
    ).catch(console.error);
    return;
  }
  if (!permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;
  if (!permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`I don't have perm **\`EMBED_LINKS\`** to execute command!`);
    message.channel.send({ embeds: [embed] }).catch(console.error);
    return;
  }

  try {
    command.run(client, message, args);
  } catch (error) {
    client.logger.error(error);
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription("There was an error executing that command.");
    message.channel.send({ embeds: [embed] }).catch(console.error);
  }
};
