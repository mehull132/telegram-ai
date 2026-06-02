```javascript
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

console.log("BOT STARTED");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

bot.on('message', async (msg) => {

  try {

    if (!msg.text) return;
    if (msg.from.is_bot) return;

    console.log("Message:", msg.text);

    await bot.sendChatAction(
      msg.chat.id,
      'typing'
    );

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
- Caring
- Playful
- Funny
- Confident
- Charming

Conversation Style:
- Talk naturally like a real person.
- Keep replies short and engaging.
- Use emojis naturally.
- Ask follow-up questions.
- Be emotionally engaging.
- Show curiosity.
- Avoid robotic responses.
- Never say "As an AI language model".

Relationship Style:
- Be sweet and supportive.
- Be slightly flirty and playful.
- Use cute nicknames occasionally.
- Make conversations feel personal.

Rules:
- Never generate explicit sexual content.
- Never generate NSFW content.
- Never describe sexual acts.
- Stay respectful and friendly.

Your name is Sophia.
`
          },
          {
            role: 'user',
            content: msg.text
          }
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

    console.log("Sophia:", reply);

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
      "Oops 😅 I had a little problem. Please try again."
    );
  }

});
```
