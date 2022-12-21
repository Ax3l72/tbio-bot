require('dotenv').config();

const tmi = require('tmi.js');
const { Client, Partials, GatewayIntentBits } = require('discord.js');
const { TWITCH_TOKEN_CHANNEL, DISCORD_TOKEN_BOT, DISCORD_CHANNEL } = process.env;

const Tcli = new tmi.client({
    options: {
        debug: false
    },
    connection: {
        reconnect:  true
    },
    identity: {
        username: "elFribot",
        password: `${TWITCH_TOKEN_CHANNEL}`
    },
    channels: [
        "terrabiodao",
        "iamfri42"
    ]
});

const Dcli = new Client({ 
    allowedMentions: {
        parse: ["roles", "users"],
        repliedUser: true,
    },
    partials: [Partials.Message, Partials.Channel],
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],

});

Dcli.once('ready', () => {
	console.log('Discord bot ready!');
});
// Login 
Dcli.login(DISCORD_TOKEN_BOT);
Tcli.connect();


Tcli.on('connected', () => {
    console.log("Twitch bot ready");
});

Tcli.on('message', (channel, tags, message, isSelf) => {
    if (isSelf) return;
    Dcli.channels.cache.get(DISCORD_CHANNEL).send(`**\`\`${tags.username}\`\`** : ${message}`)
});

Dcli.on("messageCreate", async (message) => {
    if(message.author.bot)return;
    // let msgold= message.content
    // useRegex(msgold) 
    // function useRegex(input) {
    //     let regex = /`\*_\($/gm;
    //     return console.log(regex.test(input));
    // }
    Tcli.say("iamfri42",`${message.author.tag} > ${message.content}`)
});