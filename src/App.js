import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { files: [], answer: { results: [] }, yo: '?' };
    this.utils = {
      baseUrl: 'http://localhost:3000'
    };
  }

  onDrop = files => {
    this.setState({
      files
    });
  };

  updateState = data => {
    console.log(data);
    this.setState({
      answer: data
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.files !== this.state.files) {
      this.callServer(this.state.files[0])
        .then(response => response.json())
        .then(data => this.updateState(data))
        .catch(err => console.log(err));
    }
  }

  callServer = data => {
    var formData = new FormData();
    formData.append('audio', data);
    return fetch(this.utils.baseUrl + '/shazam', {
      method: 'POST',
      body: formData
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./Logo.png')} className="App-logo" alt="logo" />
          <h1 className="App-title">Vinylla</h1>
        </header>
        <div className="dropZone">
          <Dropzone onDrop={this.onDrop}>
            <p>GIMME SOME GOOD MUSIC.</p>
          </Dropzone>
        </div>
        <div className="dropZone">
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>

          <p> {JSON.stringify(this.state.answer.results[0])} </p>
        </div>
      </div>
    );
  }
}

export default App;
