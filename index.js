// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token, sixtyNineChannel } = require('./config.json');
const TextToIPA = require('text-to-ipa');
const env = require('dotenv').config();
const vision = require('@google-cloud/vision');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Google cloud vision client
const visionClient = new vision.ImageAnnotatorClient();

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('messageCreate', async message => {
	if (message.author.bot) return false;

	if (message.content.toLowerCase().includes('chup')) {
		message.reply('chup!');
		message.react('🏆');
	}
	if (message.content.toLowerCase().includes('go flames')) {
		message.reply('go flames!');
		message.react('🔥');
	}
	if (message.content.toLowerCase().includes('?!'))
	{
		sanitizedMsg = message.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
		words = sanitizedMsg.split(" ");
		lastWord = words[words.length - 1].toLowerCase();
		// we can have multiple ipa notations, eg; her => hɚ OR hɚˈ
		ipaText = TextToIPA.lookup(lastWord).text.split(" ")[0];
		if (ipaText.endsWith("ɚ")) {
			message.reply('I barely know \'er!');
		}
		else if (message.content.toLowerCase().includes('er?!'))
		{
			message.reply('I barely know \'er!');
		}
	}
	if (message.content.toLowerCase().includes('motorcycle'))
	{
		message.reply('OOOKAYYYYYY!');
		message.react('🏍️');
	}
	if (message.content == 'F')
	{
		message.channel.messages.fetch({ limit : 2}).then(messages => {
			messages.forEach(msg => {
				msg.react('🇫');
			});
		});
	}
	if ((message.attachments.size > 0) && (message.channelId == sixtyNineChannel))
	{
		console.log(message);
		message.attachments.forEach(async attachment => {
			const [result] = await visionClient.textDetection(attachment.proxyURL);
			const detections = result.textAnnotations;
			var BreakException = {};
			try {
				detections.forEach(text => {
					console.log(text);
					if (text.description.includes('69'))
					{
						message.reply('Nice!');
						throw BreakException;
					}	
				});
			} catch (e) {
				if (e != BreakException)
				{
					throw e;
				}
			}
		});
	}
});

// Login to Discord with your client's token
client.login(token);