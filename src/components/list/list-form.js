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
    let val = Number(e.target.value)
    let updated = {};

    // TODO: better validation to allow entry of decimal values
    if (isNaN(val)) {
      val = 0;
    } else if (field === 'lat' && (val > 90 || val < -90)) {
      val = 0;
    } else if (field === 'lng' && (val > 180 || val < -180)) {
      val = 0;
    }
    updated[field] = val;
    this.setState(updated);
  }

  render() {
    return (
      <div>
        Latitude: <input value={this.state.lat} onChange={(e) => this.update(e, 'lat')}/>
        Longitude: <input value={this.state.lng} onChange={(e) => this.update(e, 'lng')}/>
        <p>Search Radius: {this.props.radius} {this.state.distUnit}</p>
        <button onClick={() => this.props.request(this.state.lat, this.state.lng)}>Search</button>
      </div>
    )
  }
}
