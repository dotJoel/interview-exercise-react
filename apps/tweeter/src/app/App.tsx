import React from 'react';

import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { Tweet, User } from '@jbyrnes/api-interfaces';

import Create from './Create';
import Tweets from './Tweets';
import UserContext from './UserContext';

import './app.less';


let currentUser = 0;
let users = [
  {
    email: 'byrnes.joel@gmail.com',
    firstName: 'Joel',
    lastName: 'Byrnes',
    username: 'jbyrnes'
  },
  {
    email: 'rick.sanchez@example.com',
    firstName: 'Rick',
    lastName: 'Sanchez',
    username: 'TheRickestRick'
  }
];


export default class App extends React.Component<{}, {tweets: Tweet[], user: User}> {

  state = {
    tweets: [],
    user: users[currentUser]
  };

  tweetRefresh = () => {
    fetch('/api/tweets')
      .then(res => res.json())
      .then(tweetList => {
        this.setState({
          tweets: tweetList
        });
      });
  } 

  switchUser = () => {
    currentUser = (currentUser === 0 ? 1 : 0);    
    this.setState({
      user: users[currentUser]
    });
  }

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        <Container>
          <Button className="userToggle" onClick={this.switchUser}>Toggle user ({this.state.user.firstName})</Button>
          <Row>
            <Create afterCreate={this.tweetRefresh}></Create>
          </Row>
          <Row>
            <Tweets tweets={this.state.tweets} onTweetRefresh={this.tweetRefresh}></Tweets>
          </Row>
        </Container>
      </UserContext.Provider>
    );
  }
}