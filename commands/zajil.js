const Schema = require("../models/Schemas/Schema");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "zajil",
  aliases: ["ارسل", "زاجل"],
  category: "Fun",
  description: "Send An Anonymous Message To Someone",
  minArgs: 2,
  
  expectedArgs: "<User> <Message>",
  callback: async ({ message, client, args }) => {
    if (!message.guild) {
      let tagged = client.users.cache.get(args[0]);
      let zajilMessage = args.slice(1).join(" ");
      let zajilEmbed = new MessageEmbed()
        .setColor("Green")
        .setTitle("زاجل جديد .")
        .setThumbnail(tagged.displayAvatarURL({ dynamic: true, format: "png" }))
        .setAuthor(tagged.username, tagged.displayAvatarURL({ dynamic: true }))

        .setDescription(`**${zajilMessage}**`)
        .setTimestamp();
      let data = await Schema.findOneAndUpdate({ Guild: client.users.id });
      client.channels.cache
        .get(data.Channel)
        .send(`<@${tagged.id}>`, zajilEmbed);
    } else if (message.guild) {
      message.delete({ timeout: 500 });
      let tagged =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      let zajilMessage = args.slice(1).join(" ");
      let zajilEmbed = new MessageEmbed()
        .setColor("Green")
        .setTitle("زاجل جديد .")
        .setThumbnail(
          tagged.user.displayAvatarURL({ dynamic: true, format: "png" })
        )
        .setAuthor(
          tagged.user.username,
          tagged.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`**${zajilMessage}**`)
        .setTimestamp();
      let data = await Schema.findOneAndUpdate({ Guild: client.users.id });
      client.channels.cache
        .get(data.Channel)
        .send(`<@${tagged.id}>`, zajilEmbed);
    }
  },
};
