'use strict'
const functions = require('firebase-functions');
const moment = require('moment');
const sparkPost = require('sparkpost');

process.env.SPARKPOST_API_KEY = functions.config().sparkpost.key
const client = new sparkPost();

// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'StatusSonar Daily Reminder';

exports.handler = function(event){
  console.log("This job is ran today!");
  const email = 'mqarty@gmail.com'; //user.email; // The email of the user.
  const displayName = 'Marty'; //user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendStatusReminderEmail(email, displayName);
}

// Sends a status reminder email to the given user.
function sendStatusReminderEmail(email, displayName) {
  console.log('Enter with >', email);


  // schedule for today at 8am?
  //var today = moment(Date.now());
  //start_time = today.tz(today + '8 AM', 'America/Los_Angeles').format(); // 5am PDT

  client.transmissions.send({
      options: {
        start_time: "2017-10-04T08:00:00-04:00",
      },
      content: {
        from: `${APP_NAME} <hey@mail.statussonar.com>`,
        subject: `${APP_NAME}!`,
        html: `Hey ${displayName || ''}! It's time to update your status. So, <a href="https://goo.gl/forms/G4VZ98dfxj9aYVNR2" target="_blank">check-in</a>!`
      },
      recipients: [{
        address: email
      }]
    })
    .then(data => {
      console.log('Woohoo! You just sent your first mailing!');
      console.log(data);
    })
    .catch(err => {
      console.error('Whoops! Something went wrong');
      console.error(err);
    });
}