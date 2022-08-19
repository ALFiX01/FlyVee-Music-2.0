const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "Начинает сеанс YouTube Together",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["yt"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {require("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524>** ・ Для воспроизведения чего-либо вы должны быть в голосовом канале!**"
      );
    if (
      !message.member.voice.channel
        .permissionsFor(message.guild.me)
        .has("CREATE_INSTANT_INVITE")
    )
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524> ・ **У меня нет разрешения на создание приглашения**"
      );

    let Invite = await message.member.voice.channel.activityInvite(
      "880218394199220334"
    ); //Made using discordjs-activity package
    let embed = new MessageEmbed()
      .setAuthor(
        "YouTube Together",
        "https://media.discordapp.net/attachments/584675674900660224/985542226811703346/youtube.png"
      )
      .setColor("#FF0000").setDescription(`
      Используя **YouTube Together**, вы можете смотреть YouTube вместе с друзьями в голосовом канале. Нажмите *Присоединиться к YouTube Together*, чтобы присоединиться!

__**[Присоединиться к YouTube Together](https://discord.com/invite/${Invite.code})**__

<:warn:985644331480264714>・**Примечание:** *Это работает только на рабочем столе.*
`);
    message.channel.send(embed);
  },
  SlashCommand: {
    options: [],
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
        !member.voice.channel
          .permissionsFor(guild.me)
          .has("CREATE_INSTANT_INVITE")
      )
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ У меня нет разрешения на создание приглашения**"
        );

      let Invite = await member.voice.channel.activityInvite(
        "755600276941176913"
      ); //Made using discordjs-activity package
      let embed = new MessageEmbed()
        .setAuthor(
          "YouTube Together",
          "https://media.discordapp.net/attachments/584675674900660224/985542226811703346/youtube.png"
        )
        .setColor("#FF0000").setDescription(`
        Используя **YouTube Together**, вы можете смотреть YouTube вместе с друзьями в голосовом канале. Нажмите *Присоединиться к YouTube Together*, чтобы присоединиться!

__**[Присоединиться к YouTube Together](https://discord.com/invite/${Invite.code})**__

<:warn:985644331480264714>・**Примечание:** *Это работает только на рабочем столе.*
`);
      interaction.send(embed.toJSON());
    },
  },
};
