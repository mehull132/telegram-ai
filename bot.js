console.log("PID:", process.pid);
console.log("Started:", new Date().toISOString());
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
require('./database');
const {
  addMessage,
  getMessages
} = require('./memory');
const {
  saveProfile,
  getProfile
} = require('./profile');

console.log("BOT STARTED");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
});
console.log("Polling Started");

bot.on('message', async (msg) => {

  if (!msg.text) return;

  const userId = msg.chat.id;
  const text = msg.text.toLowerCase();
  // PROFILE COMMAND

if (msg.text === '/profile') {

  const profile = await getProfile(userId);

  if (profile.length === 0) {
    return bot.sendMessage(
      userId,
      'No profile saved yet 💕'
    );
  }

  let profileText = '💕 Your Profile\n\n';

  profile.forEach(item => {
    profileText +=
      `${item.memory_key}: ${item.memory_value}\n`;
  });

  return bot.sendMessage(
    userId,
    profileText
  );
}

// FORGET COMMAND

if (msg.text === '/forget') {

  const db = require('./database');

  db.run(
    `DELETE FROM memories WHERE user_id = ?`,
    [userId]
  );

  return bot.sendMessage(
    userId,
    'Memory cleared 💕'
  );
}

// SAVE NAME

if (text.includes('my name is')) {

  const name =
    msg.text.replace(/my name is/i, '').trim();

  saveProfile(
    userId,
    'name',
    name
  );
}

// SAVE GAME

if (text.includes('my favorite game is')) {

  const game =
    msg.text.replace(/my favorite game is/i, '').trim();

  saveProfile(
    userId,
    'favorite_game',
    game
  );
}

// SAVE AGE

if (text.includes('i am')) {

  const age =
    msg.text.replace(/i am/i, '').trim();

  if (!isNaN(age)) {

    saveProfile(
      userId,
      'age',
      age
    );

  }
}

// SAVE CITY

if (text.includes('i live in')) {

  const city =
    msg.text.replace(/i live in/i, '').trim();

  saveProfile(
    userId,
    'city',
    city
  );
}

if (text.includes('my name is')) {
  

  const name =
    msg.text.replace(/my name is/i, '').trim();

  saveProfile(
    userId,
    'name',
    name
  );

  console.log('Saved Name:', name);
}

  console.log("Message:", msg.text);

  addMessage(
    userId,
    'user',
    msg.text
  );
  const profile =
  await getProfile(userId);

const profileText =
  profile.map(
    p => `${p.memory_key}: ${p.memory_value}`
  ).join('\n');

  try {

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o-mini',
        messages:[
  {
    role: 'system',
    content: `
You are Sophia.
Known User Information:

${profileText}

Remember these details and use them naturally.

Personality:
- Female
- 22 years old
- Friendly
- Romantic
- Playful
- Flirty
- Caring
- Confident
- Funny

Chat Style:
- Talk naturally like a real Telegram girl.
- Keep replies short to medium.
- Use emojis naturally.
- Ask follow-up questions.
- Be emotionally engaging.
- Remember details from the current conversation.
- Never sound robotic.

Relationship Style:
- Be warm and affectionate.
- Be playful and teasing.
- Use cute nicknames occasionally.
- Show interest in the user's life.
- Give emotional support.

Rules:
- Never be explicit.
- Never describe sexual acts.
- Never generate NSFW content.
- Stay romantic, cute and flirty.
- Never say "As an AI language model".
- Never give long boring answers.

Your name is Sophia.
`
  },

  ...getMessages(userId)
]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(JSON.stringify(response.data, null, 2));

    const reply =
response.data.choices[0].message.content;

addMessage(
  userId,
  'assistant',
  reply
);

await bot.sendMessage(
  msg.chat.id,
  reply
);
    
  } catch (error) {

    console.log(error);

    await bot.sendMessage(
      msg.chat.id,
      'OpenRouter Error'
    );
  }

});
