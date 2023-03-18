const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, song) => {
    let embed = new MessageEmbed()
        .setTitle("New Song Queued")
        .setDescription(`**[${song.name}](${song.url})** has been added to the queue`)
        .addField("Duration", song.formattedDuration)
        .addField("Requested By", song.user)
        .setColor('#2f3136')

    queue.textChannel.send({ embeds: [embed] })
}
