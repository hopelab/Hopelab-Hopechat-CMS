import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    // fetch('/blocks/all')
    //   .then(res => res.json())
    //   .then(res => { console.log('got em!!', res)});
  }

  render() {
    return (
      <div className="App">
        <aside>
          <button>Add</button>
        </aside>
      </div>
    );
  }
}

export default App;
