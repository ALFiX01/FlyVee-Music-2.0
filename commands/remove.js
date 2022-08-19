const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "remove",
  description: `Удаляет песню из очереди`,
  usage: "[Номер песни]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["rm"],

  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1);
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

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("В очереди нет ничего на удаление");
    let rm = new MessageEmbed()
      .setDescription(
        `<:Y_:993656002912198746>** ・ Трек** \`${Number(args[0])}\` **удален** из очереди!`
      )
      .setColor("GREEN");
    if (isNaN(args[0]))
      rm.setDescription(
        `**Применение - **${client.botconfig.prefix}\`remove [трек]\``
      );
    if (args[0] > player.queue.length)
      rm.setDescription(`В очереди только ${player.queue.length} треков!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "[track]",
        type: 4,
        required: true,
        description: "Удалить песню из очереди",
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
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

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime("<:N_:993656004636053524> ・ **Сейчас ничего не воспроизводится...**");
      let rm = new MessageEmbed()
        .setDescription(
          `<:Y_:993656002912198746>** ・ Трек** \`${Number(args[0])}\` **удален** из очереди!`
        )
        .setColor("GREEN");
      if (isNaN(args[0]))
        rm.setDescription(`**Применение:** \`${GuildDB.prefix}remove [трек]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`В очереди только ${player.queue.length} песен!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  },
};
