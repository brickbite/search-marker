import React, { Component } from 'react'; 
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import targetLoc from '../../targetloc.png';

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
    this.onCenterMoved = this.onCenterMoved.bind(this);
    this.onZoomChanged = this.onZoomChanged.bind(this);
  }

  // componentDidMount() {
  //   console.log('map mounted');
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
    console.log(this.state);
    this.setState({
      showingInfoWindow: false
    });
  }

  onCenterMoved(mapProps, map) {
    // console.log(map)
    if (this.props.searchByPanning) {
      mapProps.center.lat = map.center.lat();
      mapProps.center.lng = map.center.lng();
      // console.log(mapProps.center);
      this.props.update({lat: map.center.lat(), lng: map.center.lng()});
      this.props.requestMarkers();
    }
  }

  onZoomChanged(event) {
    if (this.props.searchByZooming) {
      console.log('zoom event', event);
      // TODO: check for changed zoom level, translate into an update for miles before requesting new markers.
      this.props.requestMarkers();
    }
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
        onDragend={this.onCenterMoved}
        onZoom_changed={this.onZoomChanged}
        style={style}>
        
        {this.props.markers.map(marker => {
          // console.log(marker);
          return (
            <Marker
              name={marker.name} 
              onClick={this.onMarkerClick} 
              key={marker.name}
              address={marker.address}
              position={marker.position
                ? {lat: marker.position.lat, lng: marker.position.lng}
                : undefined}/>
          )
        })}

        <Marker
          name={'Current search'}
          onClick={this.onMarkerClick} 
          icon={{
            url: targetLoc,
            anchor: new this.props.google.maps.Point(32,32),
            scaledSize: new this.props.google.maps.Size(32,32) 
          }}/>
 
        <InfoWindow onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                    marker={this.state.activeMarker}>
            <div>
              <h1>{this.state.activeMarker.name}</h1>
              <h2>{this.state.activeMarker.address}</h2>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_MAPS_API_KEY)
})(MapContainer)