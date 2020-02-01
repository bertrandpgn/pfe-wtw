import React, { Component } from 'react';
import MyContext from './MyContext'

class MyProvider extends Component {
    state = {
        poids_max: 40,
        angle_max: 180,
        session: false,
        patient: { _id: ''}, // default id for 'no user' mode dashboard
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                updatePoids: poids => this.setState({
                    poids_max: poids
                }),
                updateAngle: angle => this.setState({
                    angle_max: angle
                }),
                updateSession: _patient => {
                    _patient._id !== '' ? this.setState({ patient: _patient, session: true}) : this.setState({ patient: {}, session: false})
                },
            }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider