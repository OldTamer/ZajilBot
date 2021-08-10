require("dotenv").config();
const express = require("express")();
express.use("/", (req, res) => {
  res.send(`Zajil Bot Made by Tamer `);
});
express.listen(3000, () => {
  try {
    console.log(`Server is listening`);
  } catch (error) {
    console.error(`Invalid Port , Use 3000 Or 9999`);
  }
});
const {
  otherSettings,
  mongoSettings,
  botSettings,
} = require("./settings.json");
const { Client } = require("discord.js");
const client = new Client();
const wokcommands = require("wokcommands");
const { default: mongo } = require("wokcommands/dist/mongo");
client.on("ready", () => {
  const dbOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  new wokcommands(client, {
    commandsDir: "commands",
    showWarns: false,
    dbOptions,
  })
    .setBotOwner(otherSettings.owner)
    .setPrefix(botSettings.prefix)
    .setMongoPath(
      mongoSettings.mongoPath.replace("<password>", mongoSettings.password)
    );
});
client.login(process.env.TOKEN);
