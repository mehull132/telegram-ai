console.log("Message:", msg.text);

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

console.log(JSON.stringify(response.data, null, 2));
