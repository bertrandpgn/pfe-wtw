import React, { Component } from 'react';
import { Container, Row, Col } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
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
        };
    }

    componentDidMount(){
        const socket = socketIOClient(process.env.REACT_APP_URL)

        socket.on('nouveau poids', (data) => { 
            this.setState({
                poids: Math.round(data.poids),
            })
        })

        socket.on('nouvel angle', (data) => { 
            this.setState({
                angle: Math.round(data.angle),
            })
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Gradient series={[(this.state.poids/this.state.poids_max)*100]} labels={["Poids"]} />
                        <br />
                        <br />
                        <h6>Poids maximum: {this.state.poids_max}</h6>
                        <h6>Poids actuel: {this.state.poids}</h6>
                    </Col>
                    <Col>
                        <Gradient series={[(this.state.angle/this.state.angle_max)*100]} labels={["Angle"]} />
                        <br />
                        <br />
                        <h6>Angle maximum: {this.state.angle_max}</h6>
                        <h6>Angle actuel: {this.state.angle}</h6>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Home.contextType = MyContext

export default Home;
