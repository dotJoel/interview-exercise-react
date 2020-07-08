import React from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import UserContext from './UserContext';

import './create.less';


export default class Create extends React.Component<{afterCreate: Function}, {message: string, errorMessage: string}> {

    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {message: '', errorMessage: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }
    
    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: this.context,
                message: this.state.message
            })
        };
        fetch('/api/tweets', requestOptions)
            .then(async response => {
                if (!response.ok) {
                    const data = await response.json();
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                this.props.afterCreate();
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Form.Row className="align-items-center">
                <Col xs="auto">
                    <Form.Label htmlFor="inlineFormInput" srOnly>
                        Name
                    </Form.Label>
                    <Form.Control
                        value={this.state.message}
                        onChange={this.handleChange}
                        className="mb-2"
                        id="inlineFormInput"
                        placeholder="What's happening?"
                        required
                        maxLength={240}
                    />
                    <Form.Control.Feedback type="invalid">
                        Max length is 240 characters.
                    </Form.Control.Feedback>
                </Col>
                
                <Col xs="auto">
                    <Button type="submit" className="mb-2">
                        Tweet
                    </Button>
                </Col>
                </Form.Row>
            </Form>
        );
    }
}
