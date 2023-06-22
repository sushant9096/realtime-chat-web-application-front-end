// define DAO methods for conversation
const {conversationModel} = require('../models');

const createConversation = async (data) => {
  return conversationModel.create(data);
}

const findAllConversations = async () => {
  return conversationModel.findAll();
}

const findConversationById = async (id) => {
  return conversationModel.findByPk(id);
}

const updateConversationById = async (id, data) => {
  const conversation = await conversationModel.findByPk(id);
  if (!conversation) {
    return null;
  }
  return conversation.update(data);
}

const deleteConversationById = async (id) => {
  const conversation = await conversationModel.findByPk(id);
  if (!conversation) {
    return null;
  }
  return conversation.destroy();
}

module.exports = {
  createConversation,
  findAllConversations,
  findConversationById,
  updateConversationById,
  deleteConversationById
}