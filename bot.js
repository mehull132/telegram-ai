const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
polling: true
});

console.log("Sophia AI Started");

bot.on('message', async (msg) => {

try {

```
const response = await axios.post(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    model: 'meta-llama/llama-3.1-8b-instruct',
    messages: [
      {
        role: 'system',
        content: `You are Sophia.
```

You are warm, friendly, caring and supportive.
Keep replies natural and conversational.
Keep responses under 80 words.`          },
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

bot.sendMessage(
  msg.chat.id,
  reply
);
```

} catch (err) {

```
console.log(err.response?.data || err.message);

bot.sendMessage(
  msg.chat.id,
  'Sorry ❤️ I am having trouble thinking right now.'
);
```

}

});

