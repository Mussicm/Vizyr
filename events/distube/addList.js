const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new MessageEmbed()
        .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#2f3136')
  
    try {
        await queue.textChannel.send({ embeds: [embed] });
    } catch (error) {
        console.error(`Failed to send message: ${error}`);
    }
}
