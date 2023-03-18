const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "skip",
    aliases: ["s"],
    description: "Skips the current song.",
    accessableby: "Member",
    category: "music",
  },
  run: async (client, message, args) => {
    const msg = await message.channel.send("Processing.....");

    const queue = client.distube.getQueue(message);
    if (!queue) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription("\`🚨\` | **There are no** `Songs` **in queue**");
      return msg.edit({ content: " ", embeds: [embed] });
    }

    const { channel } = message.member.voice;
    if (!channel || channel !== queue.connection.voice.channel) {
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(
          "You need to be in the same voice channel as the bot to use this command."
        );
      return msg.edit({ content: " ", embeds: [embed] });
    }

    try {
      const song = await client.distube.skip(message);
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription(`\`⏭\` | **Skipped song:** \`${song.name}\``);
      msg.edit({ content: " ", embeds: [embed] });
    } catch (err) {
      console.error(err);
      const embed = new MessageEmbed()
        .setColor("#2f3136")
        .setDescription("An error occurred while skipping the song.");
      msg.edit({ content: " ", embeds: [embed] });
    }
  },
};
