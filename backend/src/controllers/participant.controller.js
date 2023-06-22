const {participantModel} = require('../models');
const {catchAsync} = require("../utils");

// create a new participant (sequelize)
const createParticipant = catchAsync(async (req, res) => {
  const data = req.body;
  const newParticipant = await participantModel.create(data);
  res.status(201).send(newParticipant);
});

// find all participants (sequelize)
const findAllParticipants = catchAsync(async (req, res) => {
  const participants = await participantModel.findAll();
  res.status(200).send(participants);
});

// find a participant by id (sequelize)
const findParticipantById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const participant = await participantModel.findByPk(id);
    if (!participant) {
      res.status(404).send({message: `Participant with id: ${id} not found`});
    }
    res.status(200).send(participant);
  }
);

// update a participant by id (sequelize)
const updateParticipantById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const participant = await participantModel.findByPk(id);
    if (!participant) {
      res.status(404).send({message: `Participant with id: ${id} not found`});
    }
    const updatedParticipant = await participant.update(data);
    res.status(200).send(updatedParticipant);
  }
);

// delete a participant by id (sequelize)
const deleteParticipantById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const participant = await participantModel.findByPk(id);
    if (!participant) {
      res.status(404).send({message: `Participant with id: ${id} not found`});
    }
    await participant.destroy();
    res.status(204).send();
  }
);

module.exports = {
  createParticipant,
  findAllParticipants,
  findParticipantById,
  updateParticipantById,
  deleteParticipantById
}