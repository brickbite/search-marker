import React, { Component } from 'react';
export default class ListContainer extends Component {

  render() {
    const style = {
      width: '100%',
      height: '50%'
    };

    return (
      <div style={style}>
        {this.props.markers.map((marker, index) => {
          return (
            <div key={marker.name}>
              <h1>{index}: {marker.name}</h1>
              <p>{marker.position ? `lat: ${marker.position.lat}, lng: ${marker.position.lng}` : null}</p>
              <p>Distance (from search point) here</p>
              <p>description here</p>
            </div>
          )
        })}
      </div>
    );
  }
}