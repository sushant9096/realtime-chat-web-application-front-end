const express = require('express')
const router = express.Router();

const {userController} = require("../controllers");

// generate Create route for User
router.post('/', userController.createUser);

// generate Read route for User
router.get('/', userController.findAllUsers);

// generate Read route for User by keyword
router.get('/search', userController.findUserByEmailOrFirstNameOrLastName);

// generate Read route for User by firebase uid
router.get('/firebase/:uid', userController.findUserByFirebaseUid);

// generate Read route for User by id
router.get('/:id', userController.findUserById);

// generate Update route for User by id
router.put('/:id', userController.updateUserById);

// generate Delete route for User by id
router.delete('/:id', userController.deleteUserById);

module.exports = router;