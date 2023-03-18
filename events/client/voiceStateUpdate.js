module.exports = async (client, oldState, newState) => {
  // check for changes in streaming, server mute/deaf, self mute/deaf, and self video
  if (
    oldState.streaming !== newState.streaming ||
    oldState.serverDeaf !== newState.serverDeaf ||
    oldState.serverMute !== newState.serverMute ||
    oldState.selfDeaf !== newState.selfDeaf ||
    oldState.selfMute !== newState.selfMute ||
    oldState.selfVideo !== newState.selfVideo
  ) {
    return;
  }

  // check if user has joined a new voice channel
  if (!oldState.channelId && newState.channelId) {
    if (newState.channel.type === "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
      try {
        await newState.guild.me.voice.setSuppressed(false);
      } catch (e) {
        console.log(String(e).gray);
      }
    }
    return;
  }

  // check if user has left a voice channel
  if (oldState.channelId && !newState.channelId) {
    return;
  }

  // check if user has switched voice channels
  if (oldState.channelId && newState.channelId) {
    if (newState.channel.type === "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
      try {
        await newState.guild.me.voice.setSuppressed(false);
      } catch (e) {
        console.log(String(e).gray);
      }
    }
    return;
  }
};
