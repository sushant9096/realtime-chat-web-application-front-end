const { initializeApp, cert } = require('firebase-admin/app');
const {getAuth} = require("firebase-admin/auth");
const {resolve} = require("path");

const firebaseApp = initializeApp({
    credential: cert(resolve(process.env.FIREBASE_CREDENTIALS_PATH)),
});

const auth = getAuth(firebaseApp);

module.exports = {auth};