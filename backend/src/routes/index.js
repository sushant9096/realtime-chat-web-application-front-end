const express = require('express');
const conversationRoute = require('./conversation.route');
const messageRoute = require('./message.route');
const participantRoute = require('./participant.route');

const router = express.Router();

const allRoutes = [
    {
        path: '/conversation',
        route: conversationRoute,
    },
    {
        path: '/message',
        route: messageRoute,
    },
    {
        path: '/participant',
        route: participantRoute,
    }
]

allRoutes.forEach(value => {
    router.use(value.path, value.route)
})

module.exports = router;