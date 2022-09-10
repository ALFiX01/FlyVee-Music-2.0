const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Показывает информацию о боте",
  usage: "[Команда]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd", "h", "р"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        `Мои команды`,
        client.botconfig.IconURL
      )
      .setImage(`https://media.discordapp.net/attachments/985227216612905063/1010546264997384232/Help_Menu_2.png?width=1440&height=433`)
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        `Для получения подробной информации о команде, введите ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [Команда]`
      ).setDescription(`${Commands.join("\n")}
  
  Версия: 3.3
  [Сервер Тех. Поддержки](${
    client.botconfig.SupportServer})`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `<:N_:993656004636053524>** ・ Нет команды с таким названием**`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Команда: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("#82acb5")
        .addField("Название", cmd.name, true)
        .addField("Псевдонимы:", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Применение:",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Разрешения:",
          "Для участника: " +
            cmd.permissions.member.join(", ") +
            "\nДля бота: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Префикс: ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Показывает информацию о боте",
        value: "command",
        type: 3,
        required: false,
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
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          `Мои команды`,
          client.botconfig.IconURL
        )
        .setImage(`https://media.discordapp.net/attachments/985227216612905063/1010546264997384232/Help_Menu_2.png?width=1440&height=433`)
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `Для получения подробной информации о команде, введите ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [Команда]`
        ).setDescription(`${Commands.join("\n")}
  
        Версия: 3.3
  [Сервер Тех. Поддержки](${
    client.botconfig.SupportServer})`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `<:N_:993656004636053524>** ・ Нет команды с таким названием**`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Команда: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("#82acb5")
          .addField("Название", cmd.name, true)
          .addField("Псевдонимы:", cmd.aliases.join(", "), true)
          .addField(
            "Применение:",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Разрешения:",
            "Для участника: " +
              cmd.permissions.member.join(", ") +
              "\nДля бота: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Префикс: ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};
