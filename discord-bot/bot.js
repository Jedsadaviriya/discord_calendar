const { Client, GatewayIntentBits} = require('discord.js');
require('dotenv').config();
const client = new Client({intents:[GatewayIntentBits.Guilds]});
client.once('clientReady', ()=> {
  console.log(`discord bot logged in as ${client.user.tag}`)
})
client.login(process.env.DISCORD_TOKEN);
