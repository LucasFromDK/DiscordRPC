const { clientId, refreshTime } = require('./config.json')
const DiscordRPC = require("discord-rpc")
const RPC = new DiscordRPC.Client({ transport:"ipc" })
const startTime = Date.now()
var hour = new Date().getHours()
var minute = new Date().getMinutes()

async function updateTimestamp() {
    hour = new Date().getHours()
    minute = new Date().getMinutes()
    //Makes sure time format is hh:mm and not hh:m
    if (minute > 0 && minute < 10) {
        minute = `0${minute}`
    }
    return hour, minute
}

async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: "Welcome to my profile!",
        state: "Playing with RPC",
        startTimestamp: startTime,
        largeImageKey: "largeimage", //If you want a gif here, replace largeimage with the gif link.
        largeImageText: "Lorem Ipsum",
        smallImageKey: "smallimage", //If you want a gif here, replace smallimage with the gif link.
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
        updateTimestamp();
        console.log(` ${hour}:${minute} | RPC Updated Successfully! Next Update in ${refreshTime} seconds.`)
    }, refreshTime*1000) //Refresh Delay, refreshTime being in seconds.
    return hour, minute
})

RPC.login({clientId}).catch(console.error())
console.log(` ${hour}:${minute} | RPC Started Successfully! RPC Status updates every ${refreshTime} seconds, which is equal to ${refreshTime/60} minutes.`)