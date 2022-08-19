const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Приглашает бота на ваш сервер",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["inv"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let embed = new MessageEmbed()
      .setAuthor(
        "Спасибо за доверие!",
        client.user.displayAvatarURL()
      )
      .setColor("#77acb8")
      .setDescription(`Чтобы пригласить меня, нажми [здесь](https://discord.com/api/oauth2/authorize?client_id=1010126172228698192&permissions=2147503168&scope=bot%20applications.commands)`
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
        .setAuthor(
          "Спасибо за доверие!",
          client.user.displayAvatarURL()
        )
        .setColor("#77acb8")
        .setDescription(`Чтобы пригласить меня, нажми [здесь](https://discord.com/api/oauth2/authorize?client_id=1010126172228698192&permissions=2147503168&scope=bot%20applications.commands)`
        );
        interaction.send(embed);
    },
  },
};
