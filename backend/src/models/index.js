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

conversation.belongsToMany(user, { through: participant });
conversation.hasMany(participant);
conversation.hasMany(message);

user.belongsToMany(conversation, { through: participant });

message.belongsTo(conversation);

participant.belongsTo(conversation);
participant.belongsTo(user);

sequelize.sync({
  // alter: true
}).then(r => {
  console.log('Database & tables synced!');
})

module.exports = {
  conversationModel: conversation,
  messageModel: message,
  participantModel: participant,
  userModel: user,
  sequelize
};