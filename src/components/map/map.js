import React, { Component } from 'react';
import config from '../../config/config.js';      
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  renderChildren() {
    const {children} = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }
 
  onMarkerClick = (props, marker, e) => {
    console.log(this.state);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onInfoWindowClose = () => {
    console.log('window closed');
    // console.log(this.state);
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '50%'
    };

    return (
      <Map google={this.props.google} zoom={13} style={style}>
        
        {this.props.markers.map(marker => {
          // console.log(marker);
          return (<Marker
            name={marker.name} 
            onClick={this.onMarkerClick} 
            key={marker.name}
            position={marker.position ? {lat: marker.position.lat, lng: marker.position.lng} : undefined}/>)
        })}
 
        <InfoWindow onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                    marker={this.state.activeMarker}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
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