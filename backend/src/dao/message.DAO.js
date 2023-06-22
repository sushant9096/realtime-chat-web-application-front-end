// define DAO methods for message
const {messageModel} = require('../models');

const createMessage = async (data) => {
  return messageModel.create(data);
}

const findAllMessages = async () => {
  return messageModel.findAll();
}

const findMessageById = async (id) => {
  return messageModel.findByPk(id);
}

const updateMessageById = async (id, data) => {
  const message = await messageModel.findByPk(id);
  if (!message) {
    return null;
  }
  return message.update(data);
}

const deleteMessageById = async (id) => {
  const message = await messageModel.findByPk(id);
  if (!message) {
    return null;
  }
  return message.destroy();
}

module.exports = {
  createMessage,
  findAllMessages,
  findMessageById,
  updateMessageById,
  deleteMessageById
}