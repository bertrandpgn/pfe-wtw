import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class LineChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    zoom: {
                        enabled: false
                    },
                    type: 'line',
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                }, 
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
            },
        };
    }

    render() {
        return (
            <div id="chart" className="w-100">
                <Chart options={this.props.options} series={this.props.series} type="line" height="400"/>
            </div>
        );
    }
}

export default LineChart;