const { MessageEmbed } = require("discord.js");

module.exports = async (client, query, queue) => {
  try {
    const textChannel = queue.textChannel;
    if (!textChannel) return;
    
    const embed = new MessageEmbed()
      .setColor("#2f3136")
      .setDescription(`No results found for ${query}!`);

    await textChannel.send({ embeds: [embed] });
  } catch (err) {
    console.error(err);
  }
};
