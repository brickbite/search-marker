import React, { Component } from 'react';
import config from '../../config/config.js';      
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import myLoc from '../../myloc.png';

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    this.centerMoved = this.centerMoved.bind(this);
  }

  // componentDidMount() {
  //   console.log('map mouned');
  //   console.log(this.props);
  // }
 
  onMarkerClick = (props, marker, e) => {
    console.log(this.state);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose = () => {
    console.log('info window closed');
    this.setState({
      showingInfoWindow: false
    });
  }

  centerMoved(mapProps, map) {
    // console.log(map)
    mapProps.center.lat = map.center.lat();
    mapProps.center.lng = map.center.lng();
    // console.log(mapProps.center);
    this.props.update({lat: map.center.lat(), lng: map.center.lng()});
  }

  render() {
    const style = {
      width: '100%',
      height: '50%'
    };
    
    return (
      <Map
        google={this.props.google}
        zoom={10}
        center={this.props.center}
        initialCenter={this.props.initialCenter}
        onDragend={this.centerMoved}
        style={style}>
        
        {this.props.markers.map(marker => {
          // console.log(marker);
          return (
            <Marker
              name={marker.name} 
              onClick={this.onMarkerClick} 
              key={marker.name}
              position={marker.position
                ? {lat: marker.position.lat, lng: marker.position.lng}
                : undefined}/>
          )
        })}

        <Marker
          name={'Current search'}
          onClick={this.onMarkerClick} 
          icon={{
            url: myLoc,
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(32,32) 
          }}/>
 
        <InfoWindow onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                    marker={this.state.activeMarker}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <h2>address here</h2>
              <h2>description here</h2>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (config.MAPS_API_KEY)
})(MapContainer)