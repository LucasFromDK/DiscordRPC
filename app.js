const fs = require("fs");
const { clientId, refreshTime } = require("./config.json");
const DiscordRPC = require("discord-rpc");
const RPC = new DiscordRPC.Client({ transport:"ipc" });
const startTime = Date.now();
var stateText, detailText, largeImageText, smallImageText;
var largeImageKey, smallImageKey;
var hour, minute;

function updateText() {
    var jsonData = fs.readFileSync("./dynamicText.json", "utf8"); //To update the text, change value of the field in dynamicText.json
    var parsedData = JSON.parse(jsonData);
    stateText = parsedData.stateText;
    detailText = parsedData.detailText;
    largeImageText = parsedData.largeImageText;
    smallImageText = parsedData.smallImageText;
    return stateText, detailText, largeImageText, smallImageText;
  }

function updateImage() {
    var jsonData = fs.readFileSync("./dynamicImages.json", "utf8"); //To update the Image, change value of the field in dynamicImages.json
    var parsedData = JSON.parse(jsonData);
    largeImageKey = parsedData.largeImageKey
    smallImageKey = parsedData.smallImageKey
    return largeImageKey, smallImageKey;
}

async function updateTimestamp() {
    hour = new Date().getHours();
    minute = new Date().getMinutes();
    //Makes sure time format is hh:mm and not hh:m
    if (minute >= 0 && minute < 10) {
        minute = `0${minute}`;
    }
    //Makes sure time format is hh:mm and not h:mm
    if (hour >= 0 && hour < 10) {
        hour = `0${hour}`;
    }
    return hour, minute;
}

async function setActivity() {
    if (!RPC) return;
    updateText();
    updateImage();
    RPC.setActivity({
        details: `${detailText}`,
        state: `${stateText}`,
        startTimestamp: startTime,
        largeImageKey: `${largeImageKey}`, //If you want a gif here, replace largeimage with the gif link.
        largeImageText: `${largeImageText}`,
        smallImageKey: `${smallImageKey}`, //If you want a gif here, replace smallimage with the gif link.
        smallImageText: `${smallImageText}`,
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
    });
}

RPC.on("ready", async() => {
    setActivity();
    setInterval(() => {
        setActivity();
        updateTimestamp();
        console.log(` ${hour}:${minute} | RPC Updated Successfully! Next Update in ${refreshTime} seconds.`);
    }, refreshTime*1000) //Refresh Delay, refreshTime being in seconds.
    return hour, minute;
})

RPC.login({clientId}).catch(console.error(), updateTimestamp());
console.log(` ${hour}:${minute} | RPC Started Successfully! RPC Status updates every ${refreshTime} seconds, which is equal to ${refreshTime/60} minutes.`);