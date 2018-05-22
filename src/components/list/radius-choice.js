import React, { Component } from 'react';
export default class RadiusChoice extends Component {

  render() {
    return (
      <p>
        Select Radius:
        {this.props.radiusChoice.map(r => {
          return (<button onClick={() => this.props.update('radius', r)} key={r}>{r}</button>)
        })}
      </p>
    );
  }
}