import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';
import './authentication.css';

const Authentication = () => {
    return (
        <div className="background">
            <h1>Welcome back</h1>
            <Form>
                <Form.Row className="nameRow">
                    <Col xs={7}>
                        <Form.Control placeholder="Name" />
                    </Col>
                </Form.Row>

                <Link to={'./home'}>
                    <Button variant="primary">Submit</Button>
                </Link>
            </Form>


        </div>
    );
}

export default Authentication;