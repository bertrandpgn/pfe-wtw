import React, { Component } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import Gradient from "./Gradient"
import socketIOClient from "socket.io-client"
import MyContext from './MyContext';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            poids: 0,
            poids_max: context.state.poids_max,
            angle: 0,
            angle_max: context.state.angle_max,
            session: context.state.session,
        };
    }

    componentDidMount() {
        const socket = socketIOClient(process.env.REACT_APP_URL)

        socket.on('nouveau poids', (data) => {
            if ((data.poids / this.state.poids_max * 100) < 105) {
                this.setState({
                    poids: Math.round(data.poids),
                })
            }
        })

        socket.on('nouvel angle', (data) => {
            if ((data.angle / this.state.angle_max * 100) < 105) {
                this.setState({
                    angle: Math.round(data.angle),
                })
            }
        })
    }
    
    render() {
        return (
            <Container>
                <Row>
                    <Col className="text-center">
                        <Gradient series={[(this.state.poids / this.state.poids_max) * 100 - 5]} value={this.state.poids} labels={["Poids"]} />
                        <br />
                        <h4 className="mt-4">Limite: {this.state.poids_max}kg</h4>
                    </Col>
                    <Col className="text-center">
                        <Gradient series={[(this.state.angle / this.state.angle_max) * 100]} value={this.state.angle} labels={["Angle"]} />
                        <br />
                        <h4 className="mt-4">Limite: {this.state.angle_max}°</h4>
                    </Col>
                </Row>
                <Row className="flex-row-reverse mt-4">
                    <br />
                    {this.state.session ? <Button>Enregistrer session</Button> : null}
                </Row>
            </Container>
        );
    }
}

Home.contextType = MyContext

export default Home;
