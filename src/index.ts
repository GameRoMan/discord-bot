import { Client, GatewayIntentBits, Events, Routes, SlashCommandBuilder } from "discord.js";

import { handle_random_websim } from "./handlers";

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) throw new Error("DISCORD_BOT_TOKEN is missing in .env");

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder().setName("random_websim").setDescription("Find a random websim project"),
].map((command) => command.toJSON());

bot.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  switch (interaction.commandName) {
    case "random_websim": {
      return handle_random_websim(interaction);
    }
  }
});

bot.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${bot.user?.tag}`);

  if (process.env.NODE_ENV === "production") {
    await bot.rest.put(Routes.applicationCommands(bot.user!.id), { body: commands });
  }
});

await bot.login(token);
