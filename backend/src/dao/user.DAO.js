// define DAO methods for user
const {userModel} = require('../models');

const createUser = async (data) => {
  return userModel.create(data);
}

const findAllUsers = async () => {
  return userModel.findAll();
}

const findUserById = async (id) => {
  return userModel.findByPk(id);
}

const findUserByEmail = async (email) => {
  return userModel.findOne({where: {email}});
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
  updateUserById,
  deleteUserById
}