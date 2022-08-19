const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "loop",
  description: "Зацикливает текущий трек",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["l", "lp", "repeat"],
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

    if (player.trackRepeat) {
      player.setTrackRepeat(false);
      client.sendTime(message.channel, `**<:loope:993649996496896061> ・ Повтор трека:** \`Выключен\``);
    } else {
      player.setTrackRepeat(true);
      client.sendTime(message.channel, `**<:loope:993649996496896061> ・ Повтор трека:** \`Включен\``);
    }
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
      const voiceChannel = member.voice.channel;
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Сейчас ничего не воспроизводится...**"
        );
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

      if (player.trackRepeat) {
        player.setTrackRepeat(false);
        client.sendTime(interaction, `**<:loope:993649996496896061> ・ Повтор трека:** \`Выключен\``);
      } else {
        player.setTrackRepeat(true);
        client.sendTime(interaction, `**<:loope:993649996496896061> ・ Повтор трека:** \`Включен\``);
      }
      console.log(interaction.data);
    },
  },
};
