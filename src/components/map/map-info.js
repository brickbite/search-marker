import React from 'react';

export default class MapInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null,
      radius: null,
      distUnit: 'miles'
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }

  render() {
    return (
      <div>
        <p>Latitude: {this.state.lat}</p>
        <p>Longitude: {this.state.lng}</p>
        <p>Search Radius: {this.state.radius} {this.state.distUnit}</p>
      </div>
    )
  }
}
