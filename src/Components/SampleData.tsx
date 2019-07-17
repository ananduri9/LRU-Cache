import React from 'react';
import logo from './logo.svg';
import './App.css';
import { app } from '../Stitch/';
import { StitchAuthProvider } from "./StitchAuth";
import { Button } from "reactstrap";
import { any } from 'prop-types';
import {
  hasLoggedInUser,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser,
} from "../Stitch/authentication";

interface initialState {
  err: any;
  result: any;
}

const newItem = {
  "name": "samepleItem",
  "quantity": 10
};

class SampleData extends React.Component<{}, initialState> {
  readonly state: initialState = {
    err: undefined,
    result: undefined
  };

  handleOnClick = () => {
    if (hasLoggedInUser()) {
      app.callFunction("findOne", [{}, "LRU", "sample_weatherdata", "data"])
      .then( (res: any) => this.setState({result: res.timestamp}))
      .catch( (err: any) => this.setState({err: err}));
    }
    else {
      loginAnonymous().then(() => app.callFunction("findOne", [{}, "LRU", "sample_weatherdata", "data"]))
      .then( (res: any) => this.setState({result: res.timestamp}))
      .catch( (err: any) => this.setState({err: err}));
    }
  }

  insertDoc = () => {
    app.callFunction("insertOne", [newItem, "LRU", "sample_weatherdata", "data"])
  }

  render() {
    return (
      <div className="data">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Results from query: 
          <Button onClick={this.handleOnClick}>Click Here to Login And Get Results</Button>
          {hasLoggedInUser() && this.state.result}
        </p>
        <p>
          Insert a document:
          {hasLoggedInUser() && <Button onClick={this.insertDoc}>Click Here to insert a sample Document</Button>}

        </p>
      </div>
    );
  } 
}

export default SampleData;
