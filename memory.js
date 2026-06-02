const memory = {};

function addMessage(userId, role, content) {

  if (!memory[userId]) {
    memory[userId] = [];
  }

  memory[userId].push({
    role,
    content
  });

  if (memory[userId].length > 20) {
    memory[userId].shift();
  }
}

function getMessages(userId) {
  return memory[userId] || [];
}

module.exports = {
  addMessage,
  getMessages
};
