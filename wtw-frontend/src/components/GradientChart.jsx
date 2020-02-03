import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class GradientChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        dataLabels: {
                            name: {
                                show: true,
                                fontSize: '20px'
                            },
                            value: {
                                show: false,
                            }
                        },
                        startAngle: -130,
                        endAngle: 130,
                        hollow: {
                            size: '75%',
                        }
                    },
                },
                labels: this.props.labels,
                fill: {
                    colors: [function({ value, seriesIndex, w }) {
                      if(value > 75) {
                          return '#c4183c'
                      } else {
                          return '#008ffb'
                      }
                    }]
                  }           
            },
        }
    }
    
    render() {
        return (
            <div className="gradient w-100">
                <Chart options={this.state.options} series={this.props.series} type="radialBar" height="350" />
                <h3 style={{marginTop: -50}}>{this.props.value}</h3>
            </div>
        );
    }
}

export default GradientChart;