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

	sanitizedMsg = message.content.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
	sanitizedMsg = sanitizedMsg.toLowerCase();
	words = sanitizedMsg.split(" ");
	var BreakException = {};
	if (sanitizedMsg.includes('chup')) {
		message.reply('chup!');
		message.react('ð');
	}
	if (sanitizedMsg.includes('go flames')) {
		message.reply('go flames!');
		message.react('ð¥');
	}
	if (message.content.includes('?!'))
	{
		lastWord = words[words.length - 1];
		// we can have multiple ipa notations, eg; her => hÉ OR hÉË
		ipaText = TextToIPA.lookup(lastWord).text.split(" ")[0];
		if (ipaText.endsWith("É")) {
			message.reply('I barely know \'er!');
		}
		else if (message.content.includes('er?!'))
		{
			message.reply('I barely know \'er!');
		}
	}
	if (sanitizedMsg.includes('motorcycle'))
	{
		message.reply('OOOKAYYYYYY!');
		message.react('ðï¸');
	}
	if (sanitizedMsg == 'F')
	{
		message.channel.messages.fetch({ limit : 2}).then(messages => {
			messages.forEach(msg => {
				msg.react('ð«');
			});
		});
	}
	// Hi Daryl
	try {
		words.forEach(word => {
			if ((word == 'hi') || (word == 'hey') || (word == 'hello'))
			{
				message.reply('Hi Daryl');
				throw BreakException;
			}
		});
	} catch (e) {
		if (e != BreakException)
		{
			throw e;
		}
	}
	if ((message.attachments.size > 0) && (message.channelId == sixtyNineChannel))
	{
		console.log(message);
		message.attachments.forEach(async attachment => {
			const [result] = await visionClient.textDetection(attachment.proxyURL);
			const detections = result.textAnnotations;
			try {
				detections.forEach(text => {
					sanitizedText = text.description.replace(/\s+/g, "");
					sanitizedText = sanitizedText.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g,"");
					console.log(sanitizedText);
					if (sanitizedText.includes('69'))
					{
						message.reply('Nice!');
						message.react('â');
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