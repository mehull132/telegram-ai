const TelegramBot = require('node-telegram-bot-api');

console.log("BOT STARTED SUCCESSFULLY");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
polling: true
});

bot.on('message', (msg) => {
console.log("MESSAGE RECEIVED:", msg.text);

bot.sendMessage(
msg.chat.id,
"WORKING 123"
);
});

