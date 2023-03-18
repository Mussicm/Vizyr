const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
        .setDescription(`\`📛\` | **Song has:** \`Ended\` \n\nThere are currently no songs in the queue. Use \`${queue.prefix}play <song name>\` to add a song to the queue.`)
        .setColor('#2f3136')

    queue.textChannel.send({ embeds: [embed] })
}
