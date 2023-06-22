const express = require('express')
const router = express.Router();

const {participantController} = require("../controllers");

// generate Create route for Participant
router.post('/', participantController.createParticipant);

// generate Read route for Participant
router.get('/', participantController.findAllParticipants);

// generate Read route for Participant by id
router.get('/:id', participantController.findParticipantById);

// generate Update route for Participant by id
router.put('/:id', participantController.updateParticipantById);

// generate Delete route for Participant by id
router.delete('/:id', participantController.deleteParticipantById);

module.exports = router;