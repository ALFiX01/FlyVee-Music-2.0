const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "pause",
  description: "Ставит музыку на паузу",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["ps"],
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
        "<:N_:993656004636053524>** ・ Вы должны быть в том же голосовом канале, что и я, чтобы использовать эту команду!**"
      );
    if (player.paused)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Воспроизведение уже приостановлено!**"
      );
    player.pause(true);
    let embed = new MessageEmbed()
      .setAuthor(`Воспроизведение приостановлено!`, client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .setDescription(`Введите \`${GuildDB.prefix}resume\` для возобновления!`);
    await message.channel.send(embed);
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
      if (player.paused)
        return client.sendTime(interaction, "**<:N_:993656004636053524> ・ Воспроизведение уже приостановлено!**");
      player.pause(true);
      client.sendTime(interaction, "**<:paus:993648792677130310> ・ Воспроизведение приостановлено!**");
    },
  },
};
