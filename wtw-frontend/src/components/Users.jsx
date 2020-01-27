import React, { Component } from 'react';
import { Container, Button, Row, Accordion, Form, Col } from "react-bootstrap";
import MyContext from './MyContext';

class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            session: context.state.session,
            patient: context.state.patient,
        }
        this.updateSession = context.updateSession.bind(this);
        this.isActive = this.isActive.bind(this);
        this.session = this.session.bind(this);
    }

    isActive(value) {
        return 'mr-2 ' + ((value === this.state.patient) ? 'active' : 'default');
    }

    session(filter) {
        this.updateSession(filter)
        this.setState({ patient: filter })
    }

    infoPatient() {
        return (
            <Container>
                <h1>{this.state.patient}</h1>
                <p>Mes supers infos maggle</p>
            </Container>
        )
    }

    render() {
        return (
            <Container className="mt-4">
                <Row>
                    <Button
                        className={this.isActive('')} onClick={() => this.session('')}
                        variant="outline-secondary"
                    >
                        Sans patient
                    </Button>
                    <Button
                        className={this.isActive('Beber')} onClick={() => this.session('Beber')}
                        variant="outline-primary"
                    >
                        Beber
                    </Button>
                </Row>
                <Accordion>
                    <Row className="mt-4 flex-row-reverse">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            <Button className="mr-2" variant="outline-primary">+ Ajout patient</Button>
                        </Accordion.Toggle>
                    </Row>

                    <Row>

                        <Accordion.Collapse eventKey="0" className="w-100">
                            <Form>
                                <Form.Group controlId="formPatient">
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="name" />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Prénom</Form.Label>
                                            <Form.Control type="name" />
                                        </Col>
                                    </Row>

                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Ajouter
                                </Button>
                            </Form>
                        </Accordion.Collapse>

                    </Row>
                </Accordion>

                {this.state.patient !== '' ? this.infoPatient() : null}

            </Container>
        );
    }
}

Users.contextType = MyContext

export default Users;