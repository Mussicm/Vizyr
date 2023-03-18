const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    config: {
        name: "join",
        aliases: ["summon"],
        description: "Makes the bot join the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

        const { channel } = message.member.voice;
        if (!channel) return msg.edit({ embed: { description: "You must be in a voice channel!", color: "#2f3136" } });
        
        const permissions = channel.permissionsFor(message.guild.me);
        if (!permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return msg.edit({ embed: { description: "I don't have permission to join and speak in your voice channel!", color: "#2f3136" } });

        const clientVoice = message.guild.me.voice.channel;
        if (clientVoice && clientVoice !== channel) return msg.edit({ embed: { description: `You must be in the same voice channel as ${message.client.user} to use this command!`, color: "#2f3136" } });

        try {
            const connection = await channel.join();
            const embed = new MessageEmbed()
                .setColor('#2f3136')
                .setDescription(`\`🔊\` | **Joined:** \`${channel.name}\``);

            msg.edit({ content: ' ', embeds: [embed] });
        } catch (error) {
            console.log(error);
        }
    }
}
