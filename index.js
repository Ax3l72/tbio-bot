require('dotenv').config();

const tmi = require('tmi.js');
const { Client, Partials, GatewayIntentBits } = require('discord.js');
const { TWITCH_TOKEN_CHANNEL, DISCORD_TOKEN_BOT } = process.env;

const Tcli = new tmi.client({
    options: {
        debug: false
    },
    connection: {
        reconnect:  true
    },
    identity: {
        username: "botname",
        password: `${TWITCH_TOKEN_CHANNEL}`
    },
    channels: [
        "terrabiodao"
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

Tcli.on('chat', (user, message, isSelf) => {
    if (isSelf) return;
    Dcli.channels.cache.get("1040253673693003826").send(`**\`\`${user['display-name']}\`\`** : ${message}`)
});

Dcli.on("messageCreate", async (message) => {
    
    let msgold= message.content
    useRegex(msgold) 
    function useRegex(input) {
        let regex = /`\*_\($/gm;
        return console.log(regex.test(input));
    }
    Tcli.say("iamfri42",`${message.author.tag} > ${message.content}`)
});