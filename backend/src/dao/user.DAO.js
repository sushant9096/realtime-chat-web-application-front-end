// define DAO methods for user
const {userModel} = require('../models');
const {Op} = require("sequelize");

const createUser = async (data) => {
  return userModel.create(data);
}

const findAllUsers = async (filter) => {
  return userModel.findAll(filter);
}

const findUserById = async (id) => {
  return userModel.findByPk(id);
}

const findUserByEmail = async (email) => {
  return userModel.findOne({where: {email}});
}

// find user by email or first name or last name
const findUserByKeyword = async (keyword) => {
  return userModel.findAll({
    where: {
      [Op.or]: [
        {email: {[Op.like]: `%${keyword}%`}},
        {firstName: {[Op.like]: `%${keyword}%`}},
        {lastName: {[Op.like]: `%${keyword}%`}}
      ]
    }
  });
}

// find user by firebase uid
const findUserByFirebaseUid = async (uid) => {
  return userModel.findOne({where: {firebaseUID: uid}});
}

const updateUserById = async (id, data) => {
  const user = await userModel.findByPk(id);
  if (!user) {
    return null;
  }
  return user.update(data);
}

const deleteUserById = async (id) => {
  const user = await userModel.findByPk(id);
  if (!user) {
    return null;
  }
  return user.destroy();
}

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmail,
  findUserByKeyword,
  findUserByFirebaseUid,
  updateUserById,
  deleteUserById
}