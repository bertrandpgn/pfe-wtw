import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Gradient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    height: 350,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -140,
                        endAngle: 140,
                        hollow: {
                            size: '70%',
                        }
                    },
                },
                labels: this.props.labels,
            },
        }
    }

    render() {
        return (
            <div className="gradient">
                <Chart options={this.state.options} series={this.props.series} type="radialBar" height="350" />
            </div>
        );
    }
}

export default Gradient;