'use strict'
const emailFunction = require('./email');

const functions = require('firebase-functions');

exports.daily_job = functions.pubsub.topic('daily-tick').onPublish((event) => {
    emailFunction.handler(event);
});
