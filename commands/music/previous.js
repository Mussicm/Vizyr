const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "previous",
        aliases: ["prev"],
        description: "Plays the previous song in the queue.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        // Set bot presence to "idle"
        await client.user.setPresence({ status: "idle" });

        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("There is nothing in the queue right now!");

        const { channel } = message.member.voice;
        if (!channel || message.guild.me.voice?.channel !== channel) {
            return message.channel.send("You need to be in the same voice channel as the bot.");
        }

        const previousSongs = queue.previousSongs();
        if (previousSongs.length === 0) {
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("`🚨` | **There are no previous songs**");

            await message.channel.send({ embeds: [embed] });
        } else {
            await client.distube.previous(message);
            const embed = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription("`⏮` | **Song has been set to previous**");

            await message.channel.send({ embeds: [embed] });
        }

        // Set bot presence back to "online"
        await client.user.setPresence({ status: "online" });
    }
};
