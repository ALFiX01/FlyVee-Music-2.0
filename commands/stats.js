const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
  name: "stats",
  description: "Показывает статистику бота",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["about", "ping", "info", "inf", "stat"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(message.client.uptime)
        .format(" D[ дн], H[ ч], m[ мин]");

      const embed = new MessageEmbed();
      embed.setColor(client.botconfig.EmbedColor);
      embed.setAuthor(`Моя статитстика`, client.botconfig.IconURL)
      embed.addFields(
        {
          name: "<:ping:985647507109449788>・Пинг",
          value: `┕\`${Math.round(client.ws.ping)} мс\``,
          inline: true,
        },
        {
          name: "<:time:985647505784070234>・Время работы",
          value: `┕\`${duration}\``,
          inline: true,
        },
        {
          name: "<:mem:985647503963717672>・Память",
          value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )} мб\``,
          inline: true,
        }
      );
      
      embed.addFields(
        {
          name: "<:Ver:985651443061112904>・Версия",
          value: `┕\`${require("../package.json").version}\``,
          inline: true,
        },
        {
          name: "<:DS:985651439424659496>・Discord.js",
          value: `┕\`${version}\``,
          inline: true,
        },
        {
          name: "<:Node:985651441127546920>・Node",
          value: `┕\`${process.version}\``,
          inline: true,
        }
      );

      return message.channel.send(embed);
    });
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction) => {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D[ дн], H[ ч], m[ мин]");

        const embed = new MessageEmbed();
        embed.setColor(client.botconfig.EmbedColor);
        embed.setAuthor(`Моя статитстика`, client.botconfig.IconURL)
        embed.addFields(
          {
            name: "<:ping:985647507109449788>・Пинг",
            value: `┕\`${Math.round(client.ws.ping)} мс\``,
            inline: true,
          },
          {
            name: "<:time:985647505784070234>・Время работы",
            value: `┕\`${duration}\``,
            inline: true,
          },
          {
            name: "<:mem:985647503963717672>・Память",
            value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} мб\``,
            inline: true,
          }
        );

        embed.addFields(
          {
            name: "<:Ver:985651443061112904>・Версия",
            value: `┕\`${require("../package.json").version}\``,
            inline: true,
          },
          {
            name: "<:DS:985651439424659496>・Discord.js",
            value: `┕\`${version}\``,
            inline: true,
          },
          {
            name: "<:Node:985651441127546920>・Node",
            value: `┕\`${process.version}\``,
            inline: true,
          }
        );

        return interaction.send(embed);
      });
    },
  },
};
