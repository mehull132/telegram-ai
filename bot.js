const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});

console.log("Sophia AI Started");

bot.on('message', async (msg) => {
  try {

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages: [
         {
  role: 'system',
  content: 'You are Sophia, a friendly AI companion.'
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

    const reply = response.data.choices[0].message.content;

    await bot.sendMessage(msg.chat.id, reply);

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
      'OpenRouter Error'
    );
  }
});
