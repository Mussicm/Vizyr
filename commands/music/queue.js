const { MessageEmbed } = require("discord.js");
const pagequeue = require('../../structures/pagequeue.js');

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "que"],
        description: "Display the queue",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`);
        const { channel } = message.member.voice;
        if (!channel || channel !== queue.voiceChannel) return message.channel.send("You need to be in the same voice channel as me.");

        const pagesNum = Math.ceil(queue.songs.length / 10);
        let qduration = queue.formattedDuration;
        if (!qduration) qduration = "00:00";

        const songStrings = [];
        for (let i = 0; i < queue.songs.length; i++) {
            const song = queue.songs[i];
            songStrings.push(`**${i + 1}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}\n`);
        }

        const pages = [];
        for (let i = 0; i < pagesNum; i++) {
            const str = songStrings.slice(i * 10, (i + 1) * 10).join("");
            const embed = new MessageEmbed()
                .setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(queue.songs[0].thumbnail)
                .setColor("#2f3136")
                .setDescription(`**Currently Playing:**\n[${queue.songs[0].name}](${queue.songs[0].url}) \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue:**\n${str == "" ? "Nothing" : str}`)
                .setFooter(`Page • ${i + 1}/${pagesNum} | ${queue.songs.length} • Songs | ${qduration} • Total duration`);
            pages.push(embed);
        }

        if (!args[0]) {
            if (pages.length > 1) {
                pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
            } else {
                message.channel.send({ embeds: [pages[0]] });
            }
        } else {
            const pageNum = parseInt(args[0]) - 1;
            if (isNaN(pageNum)) return message.channel.send("Page number must be a valid number.");
            if (pageNum >= pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
            message.channel.send({ embeds: [pages[pageNum]] });
        }
    },
};
