import React, { Component } from 'react';
import ParkMap from './Map';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bristol Parks</h1>
        <ParkMap/>
      </div>
    );
  }
}

export default App;
