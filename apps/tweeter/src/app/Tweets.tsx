import React from 'react';

import Card from 'react-bootstrap/Card';
import ReactTimeAgo from 'react-time-ago'

import { Tweet } from '@jbyrnes/api-interfaces';
import './tweets.less';


export default class Tweets extends React.Component<{tweets: Tweet[], onTweetRefresh: Function}> {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onTweetRefresh();
    }

    render() {
        if (this.props.tweets.length === 0) {
            return null;
        }

        return (
            <>
            {this.props.tweets.map(tweet => (
                <Card key={tweet.timestamp}>
                    <Card.Header as="h5">
                        <img className={"avatar"} src={`https://www.gravatar.com/avatar/${tweet.user.email}`} alt={tweet.user.username}/>
                        {tweet.user.firstName} {tweet.user.lastName}
                        <span className={"text-muted"}>
                            &nbsp; @{tweet.user.username} &bull; <ReactTimeAgo date={tweet.timestamp}/>
                        </span>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {tweet.message}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
            </>
        );
    }
}
