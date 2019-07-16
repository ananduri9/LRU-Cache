import React from 'react';
import logo from './logo.svg';
import './App.css';
import { app } from './Stitch/';
import { StitchAuthProvider, useStitchAuth } from "./Components/StitchAuth";
import { Button } from "reactstrap";
import { any } from 'prop-types';
import {
  hasLoggedInUser,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser,
} from "./Stitch/authentication";

interface initialState {
  err: any;
  result: any;
}
// const {
//   isLoggedIn,
//   actions,
// } = useStitchAuth();

class SampleData extends React.Component<{}, initialState> {
  readonly state: initialState = {
    err: undefined,
    result: undefined
  };

  handleOnClick = () => {
    if (hasLoggedInUser()) {
      app.callFunction("findOne", [{}, "LRU", "sample_weatherdata", "data"])
      .then( res => this.setState({result: res.timestamp}))
      .catch( err => this.setState({err: err}));
    }
    else {
      loginAnonymous().then(() => app.callFunction("findOne", [{}, "LRU", "sample_weatherdata", "data"]))
      .then( (res: any) => this.setState({result: res.timestamp}))
      .catch( (err: any) => this.setState({err: err}));
    }
  }

  render() {
    return (
      <div className="data">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Results from query: 
          <Button onClick={this.handleOnClick}>Click Here to Login And Get Results</Button>
          {hasLoggedInUser() && this.state.result}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  } 
}

export default SampleData;
