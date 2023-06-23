const conversationDAO = require('./conversation.DAO');
const messageDAO = require('./message.DAO');
const participantDAO = require('./participant.DAO');
const userDAO = require('./user.DAO');

module.exports = {
  conversationDAO,
  messageDAO,
  participantDAO,
  userDAO
}