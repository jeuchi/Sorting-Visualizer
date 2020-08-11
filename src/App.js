import React, { Component } from 'react';
import './App.css';

import ArrayVisual from './components/ArrayVisual/ArrayVisual';

class App extends Component {
  constructor() {
    super();
    this.state = {
      array: [],
      algorithm: 'bubble',
      sort: false,
    }
  }

  onGenerateArray = () => {
    const ARRAY_LENGTH = 6;
    const min = 1;
    const max = 80;
    this.setState({array: Array.from(Array(ARRAY_LENGTH)).map(x=>Math.floor(Math.random() * (max-min) + min))})
  }

  onBubbleChange = () => {
    this.setState({algorithm: 'bubble'})
  }

  onSort = () => {
    if(this.state.sort === false) {
      this.setState({sort: true})
    }else{
      this.setState({sort: false})
    }
  }

  render() {
    return (
      <div className="App">
        <ArrayVisual array={this.state.array} sort={this.state.sort} onSort={this.onSort}/>
      </div>
    );
  }
}

export default App;
