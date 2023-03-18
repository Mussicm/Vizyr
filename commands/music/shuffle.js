const { MessageEmbed } = require('discord.js');

module.exports = { 
  config: {
    name: 'shuffle',
    aliases: ['mix'],
    description: 'Shuffles the current queue.',
    accessableby: 'Member',
    category: 'music',
  },
  run: async (client, message, args) => {
    const msg = await message.channel.send('Processing...');

    const queue = client.distube.getQueue(message);
    if (!queue) return msg.edit('There is nothing in the queue right now!');
    
    const { channel } = message.member.voice;
    if (!channel || channel !== message.guild.me.voice.channel) {
      return msg.edit('You need to be in the same voice channel as me!');
    }

    await client.distube.shuffle(message);

    const embed = new MessageEmbed()
      .setColor('#2f3136')
      .setDescription('`🔀` | **Queue has been shuffled.**');

    msg.edit({ content: ' ', embeds: [embed] });
  },
};
