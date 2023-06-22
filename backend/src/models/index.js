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

conversation.hasMany(participant, {as: 'participant'});
conversation.hasMany(message, {as: 'message'});

user.hasMany(participant, {as: 'participant'});

message.belongsTo(conversation, {foreignKey: 'conversationId', as: 'conversation'});

participant.belongsTo(conversation, {foreignKey: 'conversationId', as: 'conversation'});
participant.belongsTo(user, {foreignKey: 'userId', as: 'user'});

sequelize.sync({
  alter: true
}).then(r => {
  console.log('Database & tables altered!');
})

module.exports = {
  conversationModel: conversation,
  messageModel: message,
  participantModel: participant,
  userModel: user,
  sequelize
};