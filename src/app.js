import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';

import axios from 'axios';
import config from './config/config.js';

import Form from './components/form/form.js';
import Map from './components/map/map.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionId: null,
      lat: 33.839268,
      lng: -117.915434,
      radius: 50,
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
        {
          name: 'Current location',
          // position: {lat: undefined, lng: undefined}
        }
      ]
    };

    this.request = this.request.bind(this);
  }

  componentDidMount() {
    console.log(axios);
    axios.post(config.URL_AUTH, {
      username: config.URL_USER,
      password: config.URL_PASS
    }).then(response => {
      // set sessionId and do a request for markers
      this.setState({sessionId: response.data.session.sessionId}, this.request);
    }).catch(error => {
      console.log(error);
      // handle error
    });
  }

  request() {
    
    console.log(`id for marker request: ${this.state.sessionId}`);
    if (!this.state.sessionId) {
      console.log('no id!');
      return;
    }
    let payload = {
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
    console.log('request: state: ', this.state);
    console.log('request: payload: ', payload);
    axios.post(config.URL_REQUEST, payload)
      .then(response => {
        console.log(response);
        // update markers in state
      })
      .catch(error => {
        console.log(error);
        // handle error
      });
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Form/>
        <Map markers={this.state.markers}/>
      </div>
    );
  }
}

export default App;
