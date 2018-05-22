import React from 'react';
// import validate from '../../utility/validation.js';

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 33.839268,
      lng: -117.915434,
      radius: 1
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }

  update(e, field) {
    let updated = {};
    updated[field] = isNaN(Number(e.target.value)) ? 0.1 : Number(e.target.value);
    this.setState(updated, console.log(this.state));
  }

  render() {
    return (
      <div>
        Latitude: <input value={this.state.lat} onChange={(e) => this.update(e, 'lat')}/>
        Longitude: <input value={this.state.lng} onChange={(e) => this.update(e, 'lng')}/>
        Radius <input value={this.state.radius} onChange={(e) => this.update(e, 'radius')}/>
        <button onClick={this.props.request}>Search</button>
      </div>
    )
  }
}
