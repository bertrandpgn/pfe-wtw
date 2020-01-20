import React, { Component } from 'react';
import MyContext from './MyContext'

class MyProvider extends Component {
    state = {
        poids_max: 40,
        angle_max: 180
    }

    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                updatePoids: (poids) => this.setState({
                    poids_max: poids
                }),
                updateAngle: (angle) => this.setState({
                    angle_max: angle
                })
            }}>
                {this.props.children}
            </MyContext.Provider>
        );
    }
}

export default MyProvider