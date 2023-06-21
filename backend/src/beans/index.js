const UserData = require("./user");
const ConversationData = require("./conversation");
const ParticipantData = require("./participant");
const MessageData = require("./message");

module.exports = {
    User: UserData,
    Conversation: ConversationData,
    Participant: ParticipantData,
    Message: MessageData
}