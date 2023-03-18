const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "loop",
        aliases: ["repeat"],
        description: "Loop the song currently playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing...");

        const queue = client.distube.getQueue(message);
        if (!queue) {
            return msg.edit("There is nothing in the queue right now!");
        }
        
        const { channel } = message.member.voice;
        if (!channel || channel.id !== queue.voiceConnection.voiceChannel.id) {
            return msg.edit("You need to be in the same voice channel as the bot to use this command!");
        }

        const repeatMode = client.distube.setRepeatMode(message, queue.repeatMode === 0 ? 1 : 0);
        const embed = new MessageEmbed()
            .setColor("#2f3136")
            .setDescription(`\`🔁\` | **Song is ${repeatMode === 0 ? "unlooped" : "looped"}:** \`Current\``)

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
