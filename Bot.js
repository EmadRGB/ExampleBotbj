import {} from 'dotenv/config';
import fs from 'fs';
import { Client, GatewayIntentBits } from 'discord.js';

// Create a new Client with the Guilds intent
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Fetch all js files in ./events
const events = fs
	.readdirSync('./events')
	.filter((file) => file.endsWith('.js'));

// Check for an event and execute the corresponding file in ./events
for (let event of events) {
	// The #events ES6 import-abbreviation is defined in the package.json
	// Note that the entries in the list of files (created by readdirSync) end with .js,
	// so the abbreviation is different to the #commands abbreviation
	const eventFile = await import(`#events/${event}`);
	// But first check if it's an event emitted once
	if (eventFile.once)
		client.once(eventFile.name, (...args) => {
			eventFile.invoke(...args);
		});
	else
		client.on(eventFile.name, (...args) => {
			eventFile.invoke(...args);
		});
	const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.3.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `hello`,
      "description": `test`,
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `helllo thats test`,
          "value": `nice`
        }
      ]
    }
  ]
});
}

// Login with the environment data
client.login(process.env.BOT_TOKEN);
