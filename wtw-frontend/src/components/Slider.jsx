import React from "react";
import { Slider } from "shards-react";
import MyContext from "./MyContext";

export default class SliderCustomRange extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSlide = this.handleSlide.bind(this);
    this.updatePoids = context.updatePoids.bind(this);
    this.updateAngle = context.updateAngle.bind(this);
    this.state = { value: this.props.value, max: this.props.max, label: this.props.label };
  }

  handleSlide(e) {
    this.setState({
      value: parseInt(e[0])
    });
    
    this.state.label === 'Poids' ? this.updatePoids(this.state.value) : this.updateAngle(this.state.value)
  }

  render() {
    return (
      <div style={{ width: '100%'}}>
        <h6>{this.state.label}: {this.state.value}</h6>
        <Slider
          onSlide={this.handleSlide}
          connect={[true, false]}
          start={[this.state.value]}
          range={{ min: 0, max: this.state.max }}
        />
      </div>
    );
  }
}

SliderCustomRange.contextType = MyContext