const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const Gamedig = require("gamedig");

// ======================
// CONFIG
// ======================
const TOKEN = "ODA4MzA2MTQ3OTM3MzUzNzU5.GNvV44.TwDt0VkFNGRaKO0Wany8FW-5bUldmh0M05L3yk";
const RUST_IP = "92.118.16.152";
const QUERY_PORT = 28016;
const UPDATE_INTERVAL = 30000;

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

async function updateStatus() {
    try {
        const state = await Gamedig.query({
            type: 'rust',
            host: RUST_IP,
            port: QUERY_PORT
        });

        const online = state.players.length;
        const max = state.maxplayers;
        const text = `${online}/${max} Online`;

        client.user.setPresence({
            activities: [{ name: text, type: ActivityType.Playing }],
            status: "online"
        });

        console.log("Status aggiornato:", text);

    } catch (err) {
        console.log("Errore Query:", err);
    }
}

client.on("ready", () => {
    console.log(`Bot avviato come ${client.user.tag}`);
    updateStatus();
    setInterval(updateStatus, UPDATE_INTERVAL);
});

client.login(TOKEN);
