const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap"],
        description: "Toggles autoplay for the current guild.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit("There is nothing in the queue right now!");

        const { channel } = message.member.voice;
        if (!channel || channel.id !== queue.voiceChannel.id) return msg.edit("You need to be in the same voice channel as me to use this command!");

        const autoplay = client.distube.toggleAutoplay(message);
        const embed = new MessageEmbed()
            .setColor(message.client.color)
            .setDescription(`\`⏯\` ${autoplay ? "Activate" : "Disable"} **Autoplay** mode.`);

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
