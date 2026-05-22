const { Client, GatewayIntentBits, MessageFlags } = require('discord.js');
require('dotenv').config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
  ]
});
client.login(process.env.DISCORD_TOKEN);

client.on('error', (err) => console.error('Discord client error:', err));

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'link') {
    const discordId = interaction.user.id;
    const code = Math.random().toString(36).substring(7);
    try {
      await interaction.reply({
        content: `Go to http://localhost:3000/discord-link?code=${code}&discordId=${discordId}`,
        flags: MessageFlags.Ephemeral
      });
    } catch (err) {
      console.error('Failed to reply to interaction:', err);
    }
  }
});

client.once('ready', async () => {
  console.log(`Discord bot logged in as ${client.user.tag}`);
  const commands = [
    {
      name: 'link',
      description: 'Link your Discord account to the calendar'
    }
  ];

  // Clear global commands to remove any stale duplicates
  await client.application.commands.set([]);

  const guildId = process.env.DISCORD_GUILD_ID;
  if (guildId) {
    const guild = client.guilds.cache.get(guildId);
    if (guild) {
      await guild.commands.set(commands);
      console.log('Slash commands registered to guild');
    } else {
      console.warn('Guild not found — make sure the bot is in the server');
    }
  } else {
    await client.application.commands.set(commands);
    console.log('Slash commands registered globally (may take up to 1 hour)');
  }
});

async function postEventToDiscord(discordId,eventTitle, startTime){
  try {
    const user = await client.users.fetch(discordId);
    await user.send({
      content: `New event: **${eventTitle}**\nTime: ${new Date(startTime).toLocaleString()}`
    })
  }catch (err){
    console.error('Failed to send DM:', err);
  }
}

module.exports = { postEventToDiscord };