const { clientId } = require('./config.json')
const DiscordRPC = require("discord-rpc")
const RPC = new DiscordRPC.Client({ transport:"ipc" })

async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: "Test",
        state: "Playing with RPC",
        startTimestamp: Date.now(),
        largeImageKey: "largeimage",
        largeImageText: "Lorem Ipsum",
        smallImageKey: "smallimage",
        smallImageText: "Lorem Ipsum",
        instance: false,
        buttons: [
            {
                label: "My GitHub",
                url: "https://github.com/LucasFromDK"
            },
            {
                label: "My Website",
                url: "https://lucasfromdk.github.io/"
            }
        ]
    })
}

RPC.on("ready", async() => {
    setActivity()
    setInterval(() => {
        setActivity();
    
    }, 30*1000) //Refresh Delay In Seconds X*1000, X being seconds.
})

RPC.login({clientId}).catch(console.error())