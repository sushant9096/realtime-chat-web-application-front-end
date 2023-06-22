const {Sequelize} = require("sequelize");
const {db} = require("../config");

const sequelize = new Sequelize(db.NAME, db.USER, db.PASS, {
    host: db.HOST,
    port: db.PORT,
    dialect: db.DIALECT,
});

const modelDefiners = [
    require('./conversation.model'),
    require('./message.model'),
    require('./user.model'),
    require('./participant.model')
];

for (let modelDefiner of modelDefiners) {
    modelDefiner(sequelize)
}

const {conversation, message, participant, user} = sequelize.models;

conversation.hasMany(participant, {as: 'participants'});
conversation.hasMany(message, {as: 'messages'});
user.hasMany(participant, {as: 'participants'});
user.belongsTo(participant, {foreignKey: 'userId', as: 'user'});
message.belongsTo(conversation, {foreignKey: 'conversationId', as: 'conversation'});
participant.belongsTo(conversation, {foreignKey: 'conversationId', as: 'conversation'});

module.exports = {
    conversationModel: conversation,
    messageModel: message,
    participantModel: participant,
    userModel: user,
    sequelize
};