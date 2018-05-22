import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';

import axios from 'axios';
import config from './config/config.js';

import Form from './components/form/form.js';
import List from './components/list/list.js';
import Map from './components/map/map.js';
import MapInfo from './components/map/map-info.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sessionId: null,
      lat: 33.839268,
      lng: -117.915434,
      radius: 50,
      radiusChoice: [1, 2, 5, 10, 25, 50],
      markers: [
        {
          title: 'The marker`s title will appear as a tooltip.',
          name: 'SOMA',
          position: {lat: 37.778519, lng: -122.405640}
        },
        {
          name: 'Dolores park',
          position: {lat: 37.759703, lng: -122.428093}
        },
        // {
        //   name: 'Current location',
        //   // position: {lat: undefined, lng: undefined},
        // }
      ],
      view: 'map'
    };

    this.request = this.request.bind(this);
    this.changeView = this.changeView.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    // axios.post(config.URL_AUTH, {
    //   username: config.URL_USER,
    //   password: config.URL_PASS
    // }).then(response => {
    //   this.setState({sessionId: response.data.session.sessionId}, this.request);
    // }).catch(error => {
    //   console.log(error);
    //   // handle error
    // });
  }

  request() {
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
      filter: config.URL_FILTER,
      lat: this.state.lat,
      lng: this.state.lng,
      sessionId: this.state.sessionId
    };

    console.log(config.URL_REQUEST);
    console.log(payload);

    axios.post(config.URL_REQUEST, payload)
      .then(response => {
        console.log('success');
        console.log(response);
        // update markers in state
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Search Marker App</h1>
        </header>
        <p className="App-intro">
          Enter lat/long/radius.
        </p>

        <button onClick={this.changeView}>Toggle Map/List</button>
        
        {this.state.view === 'map'
          ? <div>
              <MapInfo
                lat={this.state.lat}
                lng={this.state.lng}
                radius={this.state.radius}
                update={this.update}/>
              <Map
                markers={this.state.markers}
                center={{lat: this.state.lat, lng: this.state.lng}}
                initialCenter={{lat: this.state.lat, lng: this.state.lng}}
                update={this.update}/>
            </div>
          : null}

        {this.state.view === 'list'
          ? <div>
              <Form
                lat={this.state.lat}
                lng={this.state.lng}
                request={this.request}
                radius={this.state.radius}/>
              <List
                markers={this.state.markers}/>
            </div>
          : null}

      </div>
    );
  }
}

export default App;
