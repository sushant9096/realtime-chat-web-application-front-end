const {auth} = require("../config/firebase-config");
const {userDAO} = require("../dao");
const {userModel} = require("../models");

module.exports = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {uid} = await auth.verifyIdToken(token);
        const firebaseUser = await auth.getUser(uid);
        let user = await userModel.findOne({where: {firebaseUID: uid}});
        if (!user) {
            user = await userDAO.createUser({
                firebaseUID: uid,
                firstName: firebaseUser.displayName.split(' ')[0],
                lastName: firebaseUser.displayName.split(' ')[1],
                email: firebaseUser.email
            });
            req.user = user.get({plain: true});
        } else {
            req.user = user.get({plain: true});
        }
        req.uid = uid;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({message: 'Unauthorized'});
    }
};