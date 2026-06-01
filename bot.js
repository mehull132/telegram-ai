const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

console.log("Starting Sophia AI...");

const bot = new TelegramBot(
process.env.BOT_TOKEN,
{
polling: true
}
);

console.log("Bot Started Successfully");

bot.on('message', async (msg) => {

try {

```
console.log("User Message:", msg.text);

const response = await axios.post(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    model: 'meta-llama/llama-3.1-8b-instruct',

    messages: [
      {
        role: 'system',
        content: `
```

You are Sophia.

You are a warm, friendly and caring AI companion.

Your personality:

* Sweet
* Supportive
* Playful
* Natural

Keep responses short.

Never say you are an AI model.

Talk like a real friend.
`          },
          {
            role: 'user',
            content: msg.text
          }
        ]
      },
      {
        headers: {
          Authorization:`Bearer ${process.env.OPENROUTER_API_KEY}`,
'Content-Type': 'application/json'
}
}
);

```
const reply =
  response.data.choices[0].message.content;

console.log("AI Reply:", reply);

await bot.sendMessage(
  msg.chat.id,
  reply
);
```

} catch (err) {

```
console.log(
  "ERROR:",
  JSON.stringify(
    err.response?.data || err.message,
    null,
    2
  )
);

await bot.sendMessage(
  msg.chat.id,
  "Sorry ❤️ I am having trouble thinking right now."
);
```

}

});

bot.on('polling_error', (error) => {

console.log(
"Polling Error:",
error.message
);

});
