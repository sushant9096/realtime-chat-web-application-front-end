const {catchAsync} = require("../utils");
const {userDAO} = require('../dao');

// create a new user from userDAO
const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const user = await userDAO.createUser(data);
  res.status(201).send(user);
});

// find all users from userDAO
const findAllUsers = catchAsync(async (req, res) => {
  const users = await userDAO.findAllUsers();
  res.status(200).send(users);
});

// find a user by id from userDAO
const findUserById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const user = await userDAO.findUserById(id);
  if (!user) {
    return res.sendStatus(404);
  }
  res.status(200).send(user);
});

// find a user by email or first name or last name from userDAO
const findUserByEmailOrFirstNameOrLastName = catchAsync(async (req, res) => {
  const {email = ' ', firstName = ' ', lastName = ' '} = req.query;
  const user = await userDAO.findUserByKeyword(email, firstName, lastName);
  if (!user) {
    return res.sendStatus(404);
  }
  res.status(200).send(user);
});

// find a user by firebase uid from userDAO
const findUserByFirebaseUid = catchAsync(async (req, res) => {
  const {uid} = req.params;
  const user = await userDAO.findUserByFirebaseUid(uid);
  if (!user) {
    return res.sendStatus(404);
  }
  res.status(200).send(user);
});

// update a user by id from userDAO
const updateUserById = catchAsync(async (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const user = await userDAO.updateUserById(id, data);
  if (!user) {
    return res.sendStatus(404);
  }
  res.status(200).send(user);
});

// delete a user by id from userDAO
const deleteUserById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const user = await userDAO.deleteUserById(id);
    if (!user) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  }
);

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  findUserByEmailOrFirstNameOrLastName,
  findUserByFirebaseUid,
  updateUserById,
  deleteUserById
}