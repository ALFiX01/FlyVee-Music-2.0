const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "update",
  description: "Показыкавет описание последнего обновления",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["upd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let embed = new MessageEmbed()
      .setAuthor(`Описание последнего обновления - 3.1`, client.botconfig.IconURL)
      .setColor("#77acb8")
      .setDescription(`1. Небольшие изменения в коде.`
      );
    message.channel.send(embed);
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
      let embed = new MessageEmbed()
      .setAuthor(`Описание последнего обновления - 3.1`, client.botconfig.IconURL)
      .setColor("#77acb8")
      .setDescription(`1. Небольшие изменения в коде.`
        );
        interaction.send(embed);
    },
  },
};
