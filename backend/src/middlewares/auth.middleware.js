const {auth} = require("../config/firebase-config");

module.exports = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(401).json({message: 'Unauthorized'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {uid} = await auth.verifyIdToken(token);
        req.uid = uid;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({message: 'Unauthorized'});
    }
};