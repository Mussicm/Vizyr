const { MessageEmbed } = require("discord.js");

module.exports = {
  config: {
    name: "replay",
    aliases: [],
    description: "Replays the current song.",
    accessableby: "Member",
    category: "music",
  },
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return message.channel.send("There is nothing in the queue right now!");

    const { channel } = message.member.voice;
    if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) {
      return message.channel.send("You need to be in the same voice channel as me.");
    }

    await queue.seek(0);

    const response = {
      content: "",
      embeds: [
        new MessageEmbed()
          .setColor("#2f3136")
          .setDescription("`🔁` | **Song has been:** `Replay`"),
      ],
    };

    const msg = await message.channel.send("Processing...");
    msg.edit(response);
  },
};
