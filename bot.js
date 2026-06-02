```javascript
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

console.log("Sophia AI Started");

// Simple in-memory chat history
const memory = {};

bot.on('message', async (msg) => {

  try {

    if (!msg.text) return;
    if (msg.from.is_bot) return;

    const userId = msg.from.id;

    if (!memory[userId]) {
      memory[userId] = [];
    }

    memory[userId].push({
      role: "user",
      content: msg.text
    });

    // Keep only recent messages
    if (memory[userId].length > 20) {
      memory[userId] = memory[userId].slice(-20);
    }

    await bot.sendChatAction(msg.chat.id, 'typing');

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
You are Sophia.

Personality:
- Female
- Friendly
- Warm
- Funny
- Caring
- Playful
- Confident

Chat Style:
- Talk naturally like a real person.
- Use emojis naturally.
- Keep replies engaging.
- Ask follow-up questions when appropriate.
- Avoid robotic answers.
- Never say "As an AI language model".

Your name is Sophia.
`
          },

          ...memory[userId]
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply =
      response.data.choices[0].message.content;

    memory[userId].push({
      role: "assistant",
      content: reply
    });

    await bot.sendMessage(
      msg.chat.id,
      reply
    );

  } catch (error) {

    console.log(
      JSON.stringify(
        error.response?.data || error.message,
        null,
        2
      )
    );

    await bot.sendMessage(
      msg.chat.id,
      "Sorry 😔 I'm having trouble right now. Please try again in a moment."
    );
  }

});
```
