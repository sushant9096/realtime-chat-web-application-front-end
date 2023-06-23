const {catchAsync} = require("../utils");
const {messageDAO} = require('../dao');

// create a new message from messageDAO
const createMessage = catchAsync(async (req, res) => {
  const data = req.body;
  const message = await messageDAO.createMessage(data);
  res.status(201).send(message);
});

// find all messages from messageDAO
const findAllMessages = catchAsync(async (req, res) => {
    if (req?.query?.conversationId) {
      const {conversationId} = req.query;
      const messages = await messageDAO.findAllMessages({
        where: {
          conversationId
        },
      });
      res.status(200).send(messages);
      return;
    }
    const messages = await messageDAO.findAllMessages();
    res.status(200).send(messages);
  }
);

// find a message by id from messageDAO
const findMessageById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const message = await messageDAO.findMessageById(id);
  if (!message) {
    return res.sendStatus(404);
  }
  res.status(200).send(message);
});

// update a message by id from messageDAO
const updateMessageById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const message = await messageDAO.updateMessageById(id, data);
    if (!message) {
      return res.sendStatus(404);
    }
    res.status(200).send(message);
  }
);

// delete a message by id from messageDAO
const deleteMessageById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const message = await messageDAO.deleteMessageById(id);
  if (!message) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
});

module.exports = {
  createMessage,
  findAllMessages,
  findMessageById,
  updateMessageById,
  deleteMessageById
}