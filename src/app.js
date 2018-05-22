import React, { Component } from 'react';
import './app.css';
import throttle from 'lodash/throttle';
import axios from 'axios';

import Map from './components/map/map.js';
import MapInfo from './components/map/map-info.js';
import List from './components/list/list.js';
import Form from './components/list/list-form.js';
import RadiusChoice from './components/list/radius-choice';
import testMarkers from './utility/default-markers'

class App extends Component {
  constructor() {
    super();

    this.state = {
      sessionId: null,
      lat: 33.831504,
      lng: -117.911949,
      radius: 25,
      radiusChoice: [5, 10, 25, 50, 100],
      searchByPanning: false,
      searchByZooming: false,
      markers: testMarkers,
      view: 'map'
    };

    this.getSession = throttle(this.getSession.bind(this), 2000);
    this.requestMarkers = throttle(this.requestMarkers.bind(this), 2000);
    this.changeView = this.changeView.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.getSession();    
  }

  getSession() {
    axios.post(process.env.REACT_APP_URL_AUTH, {
      username: process.env.REACT_APP_URL_USER,
      password: process.env.REACT_APP_URL_PASS
    }).then(response => {
      this.setState({sessionId: response.data.session.sessionId}, this.requestMarkers);
    }).catch(error => {
      console.log(error);
      // handle error
    });
  }

  requestMarkers(lat = this.state.lat, lng = this.state.lng) {
    // console.log(lat, lng);

    // TODO: check if valid session to expire invalid sessions
    if (!this.state.sessionId) {
      console.log('no id!');
      return // TODO: get sessionId, then do request;
    }

    const payload = {
      paging: {
        page: 5,
        pageSize: 10
      },
      radius: this.state.radius,
      useLatLng: false,
      filter: process.env.REACT_APP_URL_FILTER,
      lat: lat,
      lng: lng,
      sessionId: this.state.sessionId
    };

    console.log(`POST to ${process.env.REACT_APP_URL_REQUEST}`);
    console.log('payload is:', payload);

    axios.post(process.env.REACT_APP_URL_REQUEST, payload)
      .then(response => {
        console.log('success');
        console.log(response);
        // update markers in state
        // this.update({lat: lat
        // lng: lng,
        // markers: response.markers});
      })  
      .catch(error => {
        console.log('error');
        console.log(error);
        // handle error
      });
  }

  changeView() {
    this.state.view === 'map' ? this.setState({view: 'list'}) : this.setState({view: 'map'});
  }

  update(field, value) {
    if (typeof field === 'object' && value === undefined) {
      console.log('updating state to: ', field);
      this.setState(field);
    } else {
      let updated = {};
      updated[field] = value;
      this.setState(updated);
    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Search For Map Markers</h1>
        </header>
        <p className="App-intro">
          Find nearby locations!
        </p>

        <button onClick={this.changeView}><h1>Toggle Map/List</h1></button>

        {this.state.view === 'map'
          ? <div>
              <div>
                <input type="checkbox" onChange={() => this.update({
                  searchByPanning: !this.state.searchByPanning
                  })}/>
                Search by panning
                <input type="checkbox" onChange={() => this.update({
                  searchByZooming: !this.state.searchByZooming
                  })}/>
                Search by zooming
                <RadiusChoice
                  radiusChoice={this.state.radiusChoice}
                  update={this.update}/>
              </div>
              <MapInfo
                lat={this.state.lat}
                lng={this.state.lng}
                radius={this.state.radius}
                update={this.update}/>
              <Map
                markers={this.state.markers}
                center={{lat: this.state.lat, lng: this.state.lng}}
                initialCenter={{lat: this.state.lat, lng: this.state.lng}}
                update={this.update}
                searchByPanning={this.state.searchByPanning}
                searchByZooming={this.state.searchByZooming}
                requestMarkers={this.requestMarkers}/>
            </div>
          : null}

        {this.state.view === 'list'
          ? <div>
              <RadiusChoice
                radiusChoice={this.state.radiusChoice}
                update={this.update}/>
              <Form
                lat={this.state.lat}
                lng={this.state.lng}
                radius={this.state.radius}
                request={this.requestMarkers}
                update={this.update}/>
              <List
                markers={this.state.markers}/>
            </div>
          : null}

      </div>
    );
  }
}

export default App;
