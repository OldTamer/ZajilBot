const Schema = require("../models/Schemas/Schema");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "setChannel",
  category: "Config",
  aliases: ["setch"],
  permission: ["MANAGE_GUILD"],
  maxArgs: 1,
  expectedArgs: "<Channel>",
  description: "Set Up Zajil Channel.",
  callback: async ({ message, args }) => {
    try {
      let zajilChannel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.channel;
      let data;
      data = await Schema.findOne({ Guild: message.guild.id });
      if (!data) {
        let newData = await Schema.create({
          Guild: message.guild.id,
          Channel: zajilChannel.id,
        });
        newData.save();
      } else {
        await Schema.findOneAndUpdate({
          Guild: message.guild.id,
          Channel: zajilChannel.id,
        });
      }
      message.channel.send(
        new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `**${zajilChannel} has Been marked as a zajil channel.**`
          )
      );
    } catch (err) {
      console.error(err);
    }
  },
};
