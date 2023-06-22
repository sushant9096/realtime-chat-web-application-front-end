const {catchAsync} = require("../utils");
const {conversationDAO} = require('../dao');
const {participantDAO} = require('../dao');
const {sequelize} = require("../models");

// create a new conversation from conversionDAO
const createConversation = catchAsync(async (req, res) => {
  const data = req.body;
  const { participants, type = 0 } = data;

  if (!participants) {
    return res.status(400).send({
      message: 'Participants are required'
    });
  } else if (participants.length < 2 && type === 1) {
    return res.status(400).send({
      message: 'At least 2 participants are required'
    });
  } else if (participants.length < 1 && type === 0) {
    return res.status(400).send({
      message: 'At least 1 participant is required'
    });
  }

  let conversation;
  await sequelize.transaction(async (t) => {
    conversation = await conversationDAO.createConversation(data, {transaction: t});
    for (let i = 0; i < participants.length; i++) {
      await participantDAO.createParticipant({
        conversationId: conversation.id,
        userId: participants[i]
      }, {transaction: t});
    }
    return conversation;
  });
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