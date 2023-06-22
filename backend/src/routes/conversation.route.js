const express = require('express')
const {conversionController} = require("../controllers");
const router = express.Router();

// generate Create route for Conversion
router.post('/', conversionController.createConversation);

// generate Read route for Conversion
router.get('/', conversionController.findAllConversations);

// generate Read route for Conversion by id
router.get('/:id', conversionController.findConversationById);

// generate Update route for Conversion by id
router.put('/:id', conversionController.updateConversationById);

// generate Delete route for Conversion by id
router.delete('/:id', conversionController.deleteConversationById);

module.exports = router;