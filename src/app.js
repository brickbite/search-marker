import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';

import axios from 'axios';

import Map from './components/map/map.js';
import MapInfo from './components/map/map-info.js';
import List from './components/list/list.js';
import Form from './components/list/form.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      sessionId: null,
      lat: 33.839268,
      lng: -117.915434,
      radius: 50,
      radiusChoice: [1, 2, 5, 10, 25, 50],
      searchByPanning: false,
      searchByZooming: false,
      markers: [
        {
          name: 'SOMArts Cultural Center',
          address: '934 Brannan St, San Francisco, CA 94103',
          position: {lat: 37.778519, lng: -122.405640}
        },
        {
          name: 'Dolores Park Cafe',
          address: '501 Dolores St, San Francisco, CA 94110',
          position: {lat: 37.759703, lng: -122.428093}
        },
        {
          name: 'Disneyland Park',
          address: '1313 Disneyland Dr, Anaheim, CA 92802',
          position: {lat: 33.812677, lng: -117.920322}
        },
        {
          name: 'In-N-Out Burger',
          address: '4115 Campus Dr, Irvine, CA 92612',
          position: {lat: 33.650152, lng: -117.840631}
        },
        {
          name: 'Blizzard Entertainment',
          address: '1 Blizzard Way, Irvine, CA 92618',
          position: {lat: 33.657433, lng: -117.766788}
        }
      ],
      view: 'map'
    };

    this.request = this.request.bind(this);
    this.changeView = this.changeView.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    axios.post(process.env.REACT_APP_URL_AUTH, {
      username: process.env.REACT_APP_URL_USER,
      password: process.env.REACT_APP_URL_PASS
    }).then(response => {
      this.setState({sessionId: response.data.session.sessionId}, this.request);
    }).catch(error => {
      console.log(error);
      // handle error
    });
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
      filter: process.env.REACT_APP_URL_FILTER,
      lat: this.state.lat,
      lng: this.state.lng,
      sessionId: this.state.sessionId
    };

    console.log(process.env.REACT_APP_URL_REQUEST);
    console.log(payload);

    axios.post(process.env.REACT_APP_URL_REQUEST, payload)
      .then(response => {
        console.log('success');
        console.log(response);
        // update markers in state
        // this.update(response.markers);
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
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Search Marker App</h1>
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
                requestMarkers={this.request}/>
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
