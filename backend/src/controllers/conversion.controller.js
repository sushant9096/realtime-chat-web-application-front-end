const {conversationModel} = require('../models');
const {catchAsync} = require("../utils");

// create a new conversation (sequelize)
const createConversation = catchAsync(async (req, res) => {
    const data = req.body;
    const newConversation = await conversationModel.create(data);
    res.status(201).send(newConversation);
});

// find all conversations (sequelize)
const findAllConversations = catchAsync(async (req, res) => {
    const conversations = await conversationModel.findAll();
    res.status(200).send(conversations);
});

// find a conversation by id (sequelize)
const findConversationById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const conversation = await conversationModel.findByPk(id);
    if (!conversation) {
        res.status(404).send({message: `Conversation with id: ${id} not found`});
    }
    res.status(200).send(conversation);
});

// update a conversation by id (sequelize)
const updateConversationById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const conversation = await conversationModel.findByPk(id);
    if (!conversation) {
        res.status(404).send({message: `Conversation with id: ${id} not found`});
    }
    const updatedConversation = await conversation.update(data);
    res.status(200).send(updatedConversation);
});

// delete a conversation by id (sequelize)
const deleteConversationById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const conversation = await conversationModel.findByPk(id);
    if (!conversation) {
        res.status(404).send({message: `Conversation with id: ${id} not found`});
    }
    await conversation.destroy();
    res.status(204).send();
});

module.exports = {
    createConversation,
    findAllConversations,
    findConversationById,
    updateConversationById,
    deleteConversationById
}