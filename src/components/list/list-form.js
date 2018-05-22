import React from 'react';

export default class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 33.831504,
      lng: -117.911949,
      radius: 25,
      distUnit: 'miles'
    }
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }

  update(e, field) {
    let updated = {};
    // TODO: better validation
    updated[field] = isNaN(Number(e.target.value)) ? 0.1 : Number(e.target.value);
    this.setState(updated, console.log(this.state));
  }

  render() {
    return (
      <div>
        Latitude: <input value={this.state.lat} onChange={(e) => this.update(e, 'lat')}/>
        Longitude: <input value={this.state.lng} onChange={(e) => this.update(e, 'lng')}/>
        <p>Search Radius: {this.props.radius} {this.state.distUnit}</p>
        <button onClick={this.props.request}>Search</button>
      </div>
    )
  }
}
