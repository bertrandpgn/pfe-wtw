import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, Badge } from "react-bootstrap";
import GradientChart from "./GradientChart"
import socketIOClient from "socket.io-client"
import MyContext from './MyContext';
import qs from 'querystring';
import api from '../api';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            poids: 0,
            poids_max: context.state.poids_max,
            angle: 0,
            angle_max: context.state.angle_max,
            session: context.state.session,
            patient: context.state.patient,
            formDisplay: false,
            isRecording: false,
            dataPoids: [],
            dataAngle: [],
            startTime: 0,
            endTime: 0, 
        };
    }

    componentDidMount() {
        const socket = socketIOClient(process.env.REACT_APP_URL)

        socket.on('nouveau poids', (data) => {
            if ((data.poids / this.state.poids_max * 100) < 105) {
                this.setState({
                    poids: Math.round(data.poids) ,
                })
                if( this.state.isRecording ){
                    this.setState({
                        dataPoids: this.state.dataPoids.concat([data.poids]),
                    })
                }
            }
        })

        socket.on('nouvel angle', (data) => {
            if ((data.angle / this.state.angle_max * 100) < 105) {
                this.setState({
                    angle: Math.round(data.angle),
                })
                if( this.state.isRecording ){
                    this.setState({
                        dataAngle: this.state.dataAngle.concat([data.angle]),
                    })
                }
            }
        })
    }
    
    formPatient() {
        return (
            <Row className="mt-4 w-100">
                    <Form className="w-100">
                        <Form.Group>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Ressenti patient</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col md={6}>
                                            <Form.Label>Commentaires</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => this.stopSession()}>
                                    Enregistrer
                                </Button>
                    </Form>
            </Row>
        );
    }
    
    startSession() {
        this.setState({
            formDisplay: true,
            isRecording: true,
            startTime: Date.now(),
            dataAngle: [],
            dataPoids: [],
        })
    }
                    
    stopSession = async (comKine,comPatient) =>  {
        this.setState({
            formDisplay: false,
            isRecording: false,
            endTime: Date.now(),
        })
        
        const payload = {
            appareil: "angle et poids",
            debut: this.state.startTime,
            fin: this.state.endTime,
            commentaireKine : comKine,
            commentairePatient : comPatient,
            userId : this.state.patient._id,
            data : this.state.dataPoids
        }
        
        await api.insertSession(qs.stringify(payload)).then(resp => {
            if (resp.data.success) {
                window.location.reload();
            } else alert(resp.data.msg)
        })
    }
                      
    
    render() {
        return (
            <Container>
                <Row className="w-100 mt-2">
                    {this.state.session ? <Badge variant="light" className="ml-auto">{this.state.patient.nom} {this.state.patient.prenom}</Badge> : null}
                    
                </Row>
                <Row>
                    <Col className="text-center">
                        <GradientChart series={[(this.state.poids / this.state.poids_max) * 100 - 5]} value={this.state.poids} labels={["Poids"]} />
                        <br />
                        <h4 className="mt-4">Limite: {this.state.poids_max}kg</h4>
                    </Col>
                    <Col className="text-center">
                        <GradientChart series={[(this.state.angle / this.state.angle_max) * 100]} value={this.state.angle} labels={["Angle"]} />
                        <br />
                        <h4 className="mt-4">Limite: {this.state.angle_max}°</h4>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="mt-4 text-center">
                        {this.state.session ? <Button onClick={()=>this.startSession()}>Enregistrer session</Button> : null}
                    </Col>
                </Row>
                {this.state.formDisplay ? this.formPatient() : null}
            </Container>
        );
    }
}

Home.contextType = MyContext

export default Home;
