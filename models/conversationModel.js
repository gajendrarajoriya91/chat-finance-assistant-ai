const conversations = {};

const getConversation = (userId) => {
  const messages = conversations[userId] || [];
  return messages.slice(-25); // return last 25 messages
};

const saveConversation = (userId, messages) => {
  conversations[userId] = messages;
};

module.exports = {
  getConversation,
  saveConversation,
};
