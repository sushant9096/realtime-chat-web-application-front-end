const {catchAsync} = require("../utils");
const {conversationDAO} = require('../dao');

// create a new conversation from conversionDAO
const createConversation = catchAsync(async (req, res) => {
  const data = req.body;
  const conversation = await conversationDAO.createConversation(data);
  res.status(201).send(conversation);
});

// find all conversations from conversationDAO
const findAllConversations = catchAsync(async (req, res) => {
    const conversations = await conversationDAO.findAllConversations();
    res.status(200).send(conversations);
  }
);

// find a conversation by id from conversationDAO
const findConversationById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const conversation = await conversationDAO.findConversationById(id);
  if (!conversation) {
    return res.sendStatus(404);
  }
  res.status(200).send(conversation);
});

// update a conversation by id from conversationDAO
const updateConversationById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const conversation = await conversationDAO.updateConversationById(id, data);
    if (!conversation) {
      return res.sendStatus(404);
    }
    res.status(200).send(conversation);
  }
);

// delete a conversation by id from conversationDAO
const deleteConversationById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const conversation = await conversationDAO.deleteConversationById(id);
  if (!conversation) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
});

module.exports = {
  createConversation,
  findAllConversations,
  findConversationById,
  updateConversationById,
  deleteConversationById
}