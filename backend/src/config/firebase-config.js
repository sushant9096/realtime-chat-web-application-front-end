const { initializeApp, cert } = require('firebase-admin/app');
const {getAuth} = require("firebase-admin/auth");
const {resolve} = require("path");

const firebaseApp = initializeApp({
    credential: cert(resolve('realtimechatwebapplication-firebase-adminsdk-kc4hx-08408de863.json')),
});

const auth = getAuth(firebaseApp);

module.exports = {auth};