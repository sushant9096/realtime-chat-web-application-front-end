const {catchAsync} = require("../utils");
const {participantDAO} = require('../dao');

// create a new participant from participantDAO
const createParticipant = catchAsync(async (req, res) => {
  const data = req.body;
  const participant = await participantDAO.createParticipant(data);
  res.status(201).send(participant);
});

// find all participants from participantDAO
const findAllParticipants = catchAsync(async (req, res) => {
    const participants = await participantDAO.findAllParticipants();
    res.status(200).send(participants);
  }
);

// find a participant by id from participantDAO
const findParticipantById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const participant = await participantDAO.findParticipantById(id);
  if (!participant) {
    return res.sendStatus(404);
  }
  res.status(200).send(participant);
});

// update a participant by id from participantDAO
const updateParticipantById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const participant = await participantDAO.updateParticipantById(id, data);
  if (!participant) {
    return res.sendStatus(404);
  }
  res.status(200).send(participant);
});

// delete a participant by id from participantDAO
const deleteParticipantById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const participant = await participantDAO.deleteParticipantById(id);
  if (!participant) {
    return res.sendStatus(404);
  }
  res.sendStatus(204);
});

module.exports = {
  createParticipant,
  findAllParticipants,
  findParticipantById,
  updateParticipantById,
  deleteParticipantById
}