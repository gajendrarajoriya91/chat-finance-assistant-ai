const conversations = {};

const getConversation = (userId) => {
  const messages = conversations[userId] || [];
  return messages.slice(-25); 
};

const saveConversation = (userId, messages) => {
  conversations[userId] = messages;
};

module.exports = {
  getConversation,
  saveConversation,
};
