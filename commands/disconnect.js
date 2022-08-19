const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Остановливает музыку",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop", "dis", "diss", "st"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Для использования этой команды вы должны быть в голосовом канале!**"
      );
    if (!player)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Сейчас ничего не играет...**"
      );
    await client.sendTime(message.channel, "<:stop:985661646372491335>**・Воспроизведение остановлено!**");
    await message.react("<:Ready:985608370348257300>");
    player.destroy();
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
          "<:N_:993656004636053524>** ・ Для использования этой команды вы должны быть в том же голосовом канале, что и я!**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `<:N_:993656004636053524>** ・ Вы должны быть в ${guild.me.voice.channel}, чтобы использовать эту команду**`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Сейчас ничего не воспроизводится...**"
        );
      player.destroy();
      client.sendTime(interaction, "<:stop:985661646372491335>** ・ Воспрозведение остановлено!**");
    },
  },
};
