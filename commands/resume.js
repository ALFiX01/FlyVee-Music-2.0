const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "resume",
  description: "Возобновляет воспроизведение музыки",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["res"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Сейчас ничего не воспроизводится...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Для использования этой команды вы должны быть в голосовом канале!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Для использования этой команды вы должны быть в том же голосовом канале, что и я!**"
      );

    if (player.playing)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Воспроизведение уже возобновлено!**"
      );
    player.pause(false);
    await message.react("<:Ready:985608370348257300>");
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Для использования этой команды вы должны быть в голосовом канале!**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Для использования этой команды вы должны быть в том же голосовом канале, что и я!**"
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Сейчас ничего не воспроизводится...**"
        );
      if (player.playing)
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Воспроизведение уже возобновлено!**"
        );
      player.pause(false);
      client.sendTime(interaction, "<:Resume:985661362879463474>** ・ Воспроизведение возобновлено!**");
    },
  },
};
