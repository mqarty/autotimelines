// You can run these unit tests by running "npm run testWithJest" inside the pubsub-helloworld/functions directory.

'use strict';

jest.mock('sparkpost');

// Mock the Firebase configuration
require('firebase-functions').config = jest.fn(() => {
    console.log('Jest firebase functions.config being called');
    return {
      firebase: {
        databaseURL: 'https://not-a-project.firebaseio.com',
        storageBucket: 'not-a-project.appspot.com',
      },
      sparkpost: {
        key: 'mock'
      }
    };
  });
  
  const myFunctions = require('../index');
  
  describe('Sends messages', () => {
    beforeAll(() => {
      global.origConsole = global.console;
    });
    beforeEach(() => {
      global.console = { log: jest.fn(msg => { global.origConsole.log(msg); }) };
    });
    afterAll(() => {
      global.console = global.origConsole;
    });
  
    test('Send tick to daily-job topic', () => {
      const pubSubEvent = { data: { data: Buffer.from('Jest') } };
      myFunctions.daily_job(pubSubEvent).then(() => {
        expect(console.log).toHaveBeenCalledWith('This job is ran today!');
      });
    });
  
    test('Send no data to topic-name topic', () => {
      const pubSubEvent = { data: { } };
      myFunctions.daily_job(pubSubEvent).then(() => {
        expect(console.log).toHaveBeenCalledWith('Hello World!');
      });
    });
  });