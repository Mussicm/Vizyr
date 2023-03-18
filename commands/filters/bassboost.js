const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "bassboost",
        description: "Turning on bassboost filter",
        category: "filters",
        accessableby: "Member",
        aliases: ["bb"]
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Processing.....");
        
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in the same voice channel as me.");

        await client.distube.setFilter(message, "bassboost");

        const embed = new MessageEmbed()
            .setAuthor('Turned on: Bassboost', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#2f3136');

        await new Promise(resolve => setTimeout(resolve, 5000));
        msg.edit({ content: ' ', embeds: [embed] });
    }
};
