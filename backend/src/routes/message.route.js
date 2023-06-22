const express = require('express')
const router = express.Router();

const {messageController} = require("../controllers");

// generate Create route for Message
router.post('/', messageController.createMessage);

// generate Read route for Message
router.get('/', messageController.findAllMessages);

// generate Read route for Message by id
router.get('/:id', messageController.findMessageById);

// generate Update route for Message by id
router.put('/:id', messageController.updateMessageById);

// generate Delete route for Message by id
router.delete('/:id', messageController.deleteMessageById);

module.exports = router;