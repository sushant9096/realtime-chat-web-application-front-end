// define DAO methods for participant
const {participantModel} = require('../models');

const createParticipant = async (data) => {
  return participantModel.create(data);
}

const findAllParticipants = async (filter) => {
  return participantModel.findAll(filter);
}

const findParticipantById = async (id) => {
  return participantModel.findByPk(id);
}

const updateParticipantById = async (id, data) => {
  const participant = await participantModel.findByPk(id);
  if (!participant) {
    return null;
  }
  return participant.update(data);
}

const deleteParticipantById = async (id) => {
  const participant = await participantModel.findByPk(id);
  if (!participant) {
    return null;
  }
  return participant.destroy();
}

module.exports = {
  createParticipant,
  findAllParticipants,
  findParticipantById,
  updateParticipantById,
  deleteParticipantById
}