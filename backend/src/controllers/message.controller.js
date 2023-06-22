const {messageModel} = require('../models');
const {catchAsync} = require("../utils");

// create a new message (sequelize)
const createMessage = catchAsync(async (req, res) => {
  const data = req.body;
  const newMessage = await messageModel.create(data);
  res.status(201).send(newMessage);
});

// find all messages (sequelize)
const findAllMessages = catchAsync(async (req, res) => {
  const messages = await messageModel.findAll();
  res.status(200).send(messages);
});

// find a message by id (sequelize)
const findMessageById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const message = await messageModel.findByPk(id);
    if (!message) {
      res.status(404).send({message: `Message with id: ${id} not found`});
    }
    res.status(200).send(message);
  }
);

// update a message by id (sequelize)
const updateMessageById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const message = await messageModel.findByPk(id);
  if (!message) {
    res.status(404).send({message: `Message with id: ${id} not found`});
  }
  const updatedMessage = await message.update(data);
  res.status(200).send(updatedMessage);
});

// delete a message by id (sequelize)
const deleteMessageById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const message = await messageModel.findByPk(id);
  if (!message) {
    res.status(404).send({message: `Message with id: ${id} not found`});
  }
  await message.destroy();
  res.status(204).send();
});

module.exports = {
  createMessage,
  findAllMessages,
  findMessageById,
  updateMessageById,
  deleteMessageById
}