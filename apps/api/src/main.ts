import * as express from 'express';

import { Message } from '@jbyrnes/api-interfaces';
import { validateTweet } from './app/validation';


const jsonErrorHandler = async (err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(500).send({ error: err });
}

const app = express();
app.use(express.json());
app.use(jsonErrorHandler)

const greeting: Message = { message: 'Welcome to api!' };

let tweetStore = [
  {
    user: {
      email: 'byrnes.joel@gmail.com',
      firstName: 'Joel',
      lastName: 'Byrnes',
      username: 'jbyrnes'
    },
    message: 'I can say whatever I want on Jack\'s website!!!',
    timestamp: 1594179146155
  },
  {
    id: 1002,
    user: {
      email: 'rick.sanchez@example.com',
      firstName: 'Rick',
      lastName: 'Sanchez',
      username: 'TheRickestRick'
    },
    message: '::burp:: 🤮🤮',
    timestamp: 1584122146155
  }
];

function saveTweet(tweet) {
  tweetStore.unshift(tweet); // i know.. but looks like i don't have time for a datastore
}

app.get('/api', (req, res) => {
  res.send(greeting);
});

app.get('/api/tweets', (req, res) => {
  res.send(tweetStore);
});

app.post('/api/tweets', (req, res) => {
  validateTweet(req.body);
  req.body.timestamp = new Date().getTime();
  saveTweet(req.body);
  res.sendStatus(200);
});



const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
