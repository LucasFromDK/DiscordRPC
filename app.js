const { clientId } = require('./config.json')
const DiscordRPC = require("discord-rpc")
const RPC = new DiscordRPC.Client({ transport:"ipc" })
const startTime = Date.now()
const refreshTime = 120 //Value will be converted from milliseconds to seconds.

async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: "Welcome to my profile!",
        state: "Playing with RPC",
        startTimestamp: startTime,
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
        console.log(` RPC Updated Successfully! Next Update in ${refreshTime} seconds.`)
    }, refreshTime*1000) //Refresh Delay, refreshTime being in seconds.
})

RPC.login({clientId}).catch(console.error())
console.log(` RPC Started Successfully! RPC Status Updates every ${refreshTime} seconds.`)