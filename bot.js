// 2020 Nithil Krishnaraj

require("dotenv").config();

// import Discord.js
const Discord = require("discord.js");
// import Discord Client
const client = new Discord.Client({
    // lets the bot look at previous messages
    partials: ["MESSAGE"]
})
//import fetch
const fetch = require("node-fetch");

// logs message when the bot is ready
client.on("ready", () => {
    // show a presence message for the bot
    client.user.setPresence({ game: { name: '$help for commands' }, status: 'online' })
    // show that the bot is ready with current time
    console.log(`${new Date().toLocaleString()}: Bot is ready!`);
})

// prefix for commands
const pf = '$';

// listening for commands/messages
client.on("message", msg => {

    if (msg.content === `${pf}joke`) {
        // says a joke using a separate function
        randomJoke(msg.channel)
    } else if (msg.content === `${pf}help`) {
        // help command
        help(msg.channel);
    } else if (msg.content === `${pf}about`) {
        about(msg.channel);
    }
})

// display a joke
async function randomJoke(i) {
    // fetch a joke from the api
    await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept':'application/json'
            }
        })
        // converts the data to json format
        .then(response => response.json())
        .then(data => {
            // send a message with the joke
            i.send(data['joke'])
        })
}

// help function
function help(i) {
    const helpEmbed = new Discord.MessageEmbed()
        // styles
        .setColor("#ffff00")
        // content
        .setTitle("All Commands")
        .setDescription("A list of all the commands you can use with Joke Bot.")
        .setAuthor("Nithil Krishnaraj", "https://i.imgur.com/LGE202g.png", "https://realtechnerd.github.io")
        .setThumbnail("https://i.imgur.com/LGE202g.png")
        .addFields(
            { name: '$joke', value: 'Displays a random joke', inline: true },
            { name: '$about', value: 'About the Bot', inline: true },
            { name: '$help', value: 'Displays all commands', inline: true }
        )
        .setTimestamp()
        .setFooter("Thanks for using Joke Bot!", "https://i.imgur.com/LGE202g.png")
    i.send(helpEmbed);
}

// about the bot
function about(i) {
    const aboutEmbed = new Discord.MessageEmbed()
        // styles
        .setColor("#ffff00")
        // content
        .setTitle("About")
        .setAuthor("Nithil Krishnaraj", "https://i.imgur.com/LGE202g.png", "https://realtechnerd.github.io")
        .setDescription("Joke Bot is a simple Joke Bot developed by Nithil Krishnaraj. Written in Javascript.")
        .addField('Privacy', "I don't track your messages. You have my word.", true)
        .addFields(
            { name: 'GitHub', value: 'https://github.com/realtechnerd/Joke-Bot', inline: true },
            { name: 'My Website', value: 'https://realtechnerd.github.io/', inline: true },
            { name: 'API', value: 'https://icanhazdadjoke.com/api', inline: true },
        )
        .setTimestamp()
        .setFooter("Thanks for using Joke Bot!", "https://i.imgur.com/LGE202g.png")
    i.send(aboutEmbed);
}

// connects the bot to the server
client.login(process.env.BOT_TOKEN);