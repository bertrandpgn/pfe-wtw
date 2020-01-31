import React, { Component } from 'react';
import { Container, Button, Row, Accordion, Form, Col } from "react-bootstrap";
import MyContext from './MyContext';
import api from '../api'

class Users extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            session: context.state.session,
            patient: context.state.patient,
            patients: [],
            nom: '',
            prenom: '',
        }
        this.updateSession = context.updateSession.bind(this);
        this.isActive = this.isActive.bind(this);
        this.session = this.session.bind(this);
    }

    componentDidMount = async () => {
        await api.getAllUsers().then(data => {
            console.log("data all users:" + data)
            // this.setState({
            //     patients: data.patients,
            // })
        })
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

    handleInsertUser = async () => {
        const payload = {
            nom: this.state.nom,
            prenom: this.state.prenom
        }

        await api.getAllUsers(payload).then(res => {
            if (res.success) {
                window.alert(res.msg)
                this.setState({
                    nom: '',
                    prenom: '',
                })
            }
            else {
                window.alert(res.msg)
            }
        })
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

                    {this.state.patients.map((value) => {
                        return <Button
                            className={this.isActive(value)} onClick={() => this.session(value)}
                            variant="outline-primary"
                        > {value}
                        </Button>
                    })}

                </Row>
                <Accordion>
                    <Row className="mt-4 flex-row-reverse">
                        <Accordion.Toggle as={Button} variant="outline-primary" eventKey="0">+ Ajout patient</Accordion.Toggle>
                    </Row>
                    <Row>
                        <Accordion.Collapse eventKey="0" className="w-100">
                            <Form>
                                <Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Nom</Form.Label>
                                            <Form.Control type="name" onChange={(e) => this.setState({ nom: e.target.value })} />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Prénom</Form.Label>
                                            <Form.Control type="name" onChange={(e) => this.setState({ prenom: e.target.value })} />
                                        </Col>
                                    </Row>

                                </Form.Group>
                                <Button variant="primary" onClick={this.handleInsertUser}>
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