const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "move",
  description: "Перемещает дорожку в указанную позицию",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["m", "mv"],
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
        "<:N_:993656004636053524> ・ **Сейчас ничего не воспроизводится...**"
      );
    if (!args[0] || !args[1])
      return client.sendTime(message.channel, "<:N_:993656004636053524> ・ **Недопустимые аргументы**");

    // Check if (args[0] - 1) is a valid index
    let trackNum = parseInt(args[0] - 1);
    if (trackNum < 1 || trackNum > player.queue.length - 1) {
      return client.sendTime(message.channel, "<:N_:993656004636053524> ・ **Неверный номер трека**");
    }

    let dest = parseInt(args[1] - 1);
    if (dest < 1 || dest > player.queue.length - 1) {
      return client.sendTime(
        message.channel,
        "<:N_:993656004636053524> ・ **Неверный пункт назначения трека**"
      );
    }

    // Remove from and shift array
    const track = player.queue[trackNum];
    player.queue.splice(trackNum, 1);
    player.queue.splice(dest, 0, track);
    client.sendTime(
      message.channel,
      "<:Ready:985608370348257300>** | " +
        track.title +
        "** был перемещен в положение " +
        (dest + 1) +
        "."
    );
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "track",
        type: 4,
        required: true,
        description: "Трек для перемещения",
      },
      {
        name: "position",
        value: "track2",
        type: 4,
        required: true,
        description: "Перемещает выбранный трек в указанную позицию",
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
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);

      let player = await client.Manager.get(interaction.guild.id);
      if (!player)
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Сейчас ничего не воспроизводится...**"
        );
      if (!args[0].value || !args[1].value)
        return client.sendTime(interaction, "<:N_:993656004636053524> ・ **Недопустимые аргументы**");

      // Check if (args[0] - 1) is a valid index
      let trackNum = parseInt(args[0].value - 1);
      if (trackNum < 1 || trackNum > player.queue.length - 1) {
        return client.sendTime(interaction, "<:N_:993656004636053524> ・ **Неверный номер трека**");
      }

      let dest = parseInt(args[1].value - 1);
      if (dest < 1 || dest > player.queue.length - 1) {
        return client.sendTime(
          interaction,
          "<:N_:993656004636053524>** ・ Неверный пункт назначения трека**"
        );
      }

      // Remove from and shift array
      const track = player.queue[trackNum];
      player.queue.splice(trackNum, 1);
      player.queue.splice(dest, 0, track);
      client.sendTime(
        interaction,
        "<:Ready:985608370348257300>** ・ " +
          track.title +
          "** был перемещен в положение " +
          (dest + 1) +
          "."
      );
    },
  },
};
