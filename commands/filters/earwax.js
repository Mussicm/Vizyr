const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "earwax",
        description: "Turning on earwax filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.reply(`There is nothing in the queue right now!`);

        const { channel } = message.member.voice;
        if (!channel || channel !== queue.voiceChannel) {
            return message.reply("You need to be in the same voice channel as me to use this command!");
        }

        client.distube.setFilter(message, "earwax");

        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`🎧 Earwax filter enabled!`);

        message.channel.send({ embeds: [embed] });
    }
};
