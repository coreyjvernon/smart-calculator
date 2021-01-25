import React, { Component } from 'react';
import './App.css';
import endpointTarget from "./endpoint_config.json"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultToReturn: 0
    }
    this.handleEquation = this.handleEquation.bind(this)
  }

  handleEquation(event) {
    let action = event.target.textContent
    let inputOneField = document.getElementsByName('inputOne')[0].value
    let inputTwoField = document.getElementsByName('inputTwo')[0].value
    let url = endpointTarget.endpoint + "/" + action + "?inputOne=" + inputOneField + "&inputTwo=" + inputTwoField;

    if (inputOneField !== "" && inputTwoField !== "") {
      fetch(url,{
        method: 'POST',
        mode: 'no-cors'
      }).then(response => {
        if (response) {
          return response.json()
        } throw Error('There was an issue requesting the API')
      }).then(json => {
        this.setState({
          resultToReturn: json.result
        })
      })
    } else {
      this.setState({
        resultToReturn: "Please enter an integer in each field."
      })
    }

    
  }

  render() {
    return (
      <div className="App">
      <div className="page-title-container">
        <h1>Smart Calculator</h1>
      </div>
        <div className="input-container">
          <input type="text" name="inputOne" />
          <input type="text" name="inputTwo" />
        </div>
        <div className="button-container">
          <div onClick={this.handleEquation}>
            <h3>add</h3>
          </div>
          <div onClick={this.handleEquation}>
            <h3>subtract</h3>
          </div>
        </div>
        <div className="answer-container">
          <h4><span>Answer</span><br />{this.state.resultToReturn}</h4>
        </div>
      </div>
    );
  }
}

export default App;
