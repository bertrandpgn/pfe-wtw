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
            poids_pour: 0,
            poids_max: context.state.poids_max,
            angle: 0,
            angle_pour: 0,
            angle_max: context.state.angle_max,
            session: context.state.session,
            patient: context.state.patient,
            isSessionPoids: false,
            isSessionAngle: false,
            formDisplay: false,
            isRecording: false,
            dataPoids: [],
            dataAngle: [],
            startTime: 0,
            endTime: 0,
            comKine: '',
            comPatient: '',
        };
    }

    componentDidMount() {
        const socket = socketIOClient(process.env.REACT_APP_URL)

        socket.on('nouveau poids', (data) => {
            if (data.poids >= 0) {
                var pourcentPoids
                if(data.poids <= this.state.poids_max)
                    pourcentPoids = data.poids / this.state.poids_max * 100;
                else pourcentPoids = 100;
                this.setState({
                    poids: Math.round(data.poids),
                    poids_pour: pourcentPoids
                })
                if (this.state.isRecording) {
                    this.setState({
                        dataPoids: this.state.dataPoids.concat([data.poids]),
                    })
                }
            }
        })

        socket.on('nouvel angle', (data) => {
            var pourcentAngle
            if(data.angle <= this.state.angle_max)
                pourcentAngle = data.angle / this.state.angle_max * 100;
            else pourcentAngle = 100;
            this.setState({
                angle: Math.round(data.angle),
                angle_pour: pourcentAngle
            })
            if (this.state.isRecording) {
                this.setState({
                    dataAngle: this.state.dataAngle.concat([data.angle]),
                })
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
                                <Form.Control type="text" onChange={(e) => this.setState({ comPatient: e.target.value })} />
                            </Col>
                            <Col md={6}>
                                <Form.Label>Commentaires</Form.Label>
                                <Form.Control type="text" onChange={(e) => this.setState({ comKine: e.target.value })} />
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

    stopSession = async () => {
        this.setState({
            formDisplay: false,
            isRecording: false,
            endTime: Date.now(),
        })

        var _appareil
        var _dataAngle
        var _dataPoids
        
        if(this.state.isSessionPoids && this.state.isSessionAngle){
            _appareil = "Poids et angle"
            _dataAngle = this.state.dataAngle
            _dataPoids = this.state.dataPoids
        } else if (this.state.isSessionPoids){
            _appareil = "Poids"
            _dataAngle = []
            _dataPoids = this.state.dataPoids
        } else if (this.state.isSessionAngle){
            _appareil = "Angle"
            _dataAngle = this.state.dataAngle
            _dataPoids = []
        }
        
        const payload = {
            appareil: _appareil,
            debut: this.state.startTime,
            fin: this.state.endTime,
            commentaireKine: this.state.comKine,
            commentairePatient: this.state.comPatient,
            userId: this.state.patient._id,
            dataAngle: _dataAngle,
            dataPoids: _dataPoids
        }

        await api.insertSession(qs.stringify(payload)).then(resp => {
            if (resp.data.success) {
                this.setState({
                    comKine: '',
                    comPatient: '',
                })
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
                    <Col sm={12} md={6} className="text-center">
                        <GradientChart series={[this.state.poids_pour]} value={this.state.poids} labels={["Poids"]} />
                        <br />
                        <h4 className="mt-4">Limite: {this.state.poids_max}kg</h4>
                        {this.state.session ? <input type="checkbox" label="Enregistrer" onClick={() => this.setState({ isSessionPoids : !this.state.isSessionPoids})}/> : null}
                    </Col>
                    <Col sm={12} md={6} className="text-center">
                        <GradientChart series={[this.state.angle_pour]} value={this.state.angle} labels={["Angle"]} />
                        <br />
                        <h4 className="mt-4">Limite: {this.state.angle_max}°</h4>
                        {this.state.session ? <input type="checkbox" label="Enregistrer" onClick={() => this.setState({ isSessionAngle : !this.state.isSessionAngle})}/> : null}
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="mt-4 text-center">
                        {this.state.session ? <Button onClick={() => this.startSession()}>Enregistrer session</Button> : null}
                    </Col>
                </Row>
                {this.state.formDisplay ? this.formPatient() : null}
            </Container>
        );
    }
}

Home.contextType = MyContext

export default Home;
