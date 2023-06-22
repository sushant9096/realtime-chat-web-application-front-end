const {UserModel} = require('../models/user.model');
const {catchAsync} = require("../utils");

// create a new user (sequelize)
const createUser = catchAsync(async (req, res) => {
    const data = req.body;
    const newUser = await UserModel.create(data);
    res.status(201).send(newUser);
  }
);

// find all users (sequelize)
const findAllUsers = catchAsync(async (req, res) => {
  const users = await UserModel.findAll();
  res.status(200).send(users);
});

// find a user by id (sequelize)
const findUserById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      res.status(404).send({message: `User with id: ${id} not found`});
    }
    res.status(200).send(user);
  }
);

// update a user by id (sequelize)
const updateUserById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const user = await UserModel.findByPk(id);
    if (!user) {
      res.status(404).send({message: `User with id: ${id} not found`});
    }
    const updatedUser = await user.update(data);
    res.status(200).send(updatedUser);
  }
);

// delete a user by id (sequelize)
const deleteUserById = catchAsync(async (req, res) => {
    const {id} = req.params;
    const user = await UserModel.findByPk(id);
    if (!user) {
      res.status(404).send({message: `User with id: ${id} not found`});
    }
    await user.destroy();
    res.status(204).send();
  }
);

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  deleteUserById
}