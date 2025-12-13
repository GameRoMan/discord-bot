import type { CacheType, ChatInputCommandInteraction } from "discord.js";

import { getFeedTrending } from "websim";

async function findRandomWebsimProject() {
  const offset = Math.floor(Math.random() * 1e5);
  const { feed } = await getFeedTrending({ limit: 2, offset, range: "all" });
  const randomProject = feed.data[0];
  if (!randomProject) return null;
  const websimProjectURL = `https://websim.com${randomProject.site.link_url}`;
  return websimProjectURL;
}

/**
 * Find a random websim project
 */
export async function handle_random_websim(interaction: ChatInputCommandInteraction<CacheType>) {
  await interaction.reply("Searching...");
  try {
    const randomProjectURL = await findRandomWebsimProject();
    if (!randomProjectURL) {
      return await interaction.editReply(
        `Failed to found a random websim project. (No project found)`,
      );
    }
    await interaction.editReply(
      `Found a random websim project!\n**[Play on Websim](<${randomProjectURL}>)**`,
    );
  } catch (e) {
    console.error(e);
    await interaction.editReply("Error fetching random websim project.");
  }
}
