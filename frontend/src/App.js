import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { data : 1};

    this.updateState = this.updateState.bind(this);
  }

  updateState(e){
    this.setState({ data: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <input value={this.state.data} type="text" onChange={this.updateState}/>
        {this.state.data}
      </div>
    );
  }
}

export default App;
