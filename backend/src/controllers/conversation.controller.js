const {catchAsync} = require("../utils");
const {conversationDAO, userDAO} = require('../dao');
const {participantDAO} = require('../dao');
const {sequelize, participantModel, userModel} = require("../models");
const {Op} = require("sequelize");

// create a new conversation from conversionDAO
const createConversation = catchAsync(async (req, res) => {
  const data = req.body;
  const {participants, type = 0} = data;

  if (!participants) {
    return res.status(400).send({
      message: 'Participants are required'
    });
  } else if (participants.length < 2 && type === 1) {
    return res.status(400).send({
      message: 'At least 2 participants are required'
    });
  } else if (participants.length !== 2 && type === 0) {
    return res.status(400).send({
      message: '2 participants are required'
    });
  }

  if (type === 0) {
    // find conversation with the same participants
    const filter = {
      where: {
        type: 0,
      },
      include: [{
        model: participantModel,
        where: {
          userId: {
            [Op.in]: participants
          }
        },
        having: sequelize.literal(`COUNT(*) = ${participants.length}`)
      }]
    }
    const dupConversation = await conversationDAO.findAllConversations(filter);
    if (dupConversation.length > 0) {
      return res.status(400).send('Conversation already exists');
    }
  }

  let conversation;
  await sequelize.transaction(async (t) => {
    conversation = await conversationDAO.createConversation({
      type
    }, {transaction: t});
    for (let i = 0; i < participants.length; i++) {
      console.log('participant: ', participants[i])
      const user = await userDAO.findUserById(participants[i]);
      if (!user)
        throw new Error('User not found');
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
    const conversations = await conversationDAO.findAllConversations({
      include: [
        {
          model: userModel,
        },
        {
          model: participantModel,
          where: {
            userId: req?.user?.id
          },
          attributes: []
        }
      ],
    });
    console.log('user: ', req?.user?.id)
    console.log('conversations: ', JSON.stringify(conversations, null, 2));
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