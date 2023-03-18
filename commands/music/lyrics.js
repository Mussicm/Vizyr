const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        aliases: [],
        description: "Display lyrics of a song",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.reply("There is nothing in the queue right now!");

        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("You need to be in the same voice channel as me.");

        const msg = await message.reply("Searching for lyrics...");

        let song = args.join(" ");
        let currentSong = queue.songs[0];
        if (!song && currentSong) song = currentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song);
            if (!lyrics) return msg.edit("Couldn't find any lyrics for that song!");
        } catch (err) {
            console.log(err);
            return msg.edit("Couldn't find any lyrics for that song!");
        }

        let lyricsEmbed = new MessageEmbed()
            .setColor('#2f3136')
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter(`Requested by ${message.author}`)
            .setTimestamp();

        if (!lyrics) {
            lyricsEmbed.setDescription("Couldn't find any lyrics for that song!");
        } else if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("Lyrics too long to display!");
        }

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            const total = queue.songs[0].duration * 1000;
            const current = queue.currentTime * 1000;
            const time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};
