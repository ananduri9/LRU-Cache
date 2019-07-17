import React from 'react';
import logo from '../Style/logo.svg';
import '../Style/App.css';
import { app } from '../Stitch/';
import { Button } from "reactstrap";
import {
  SERVICE_NAME,
  DB_NAME,
  COLLECTION_NAME
} from "../constants"
import {
  hasLoggedInUser,
  loginAnonymous,
} from "../Stitch/authentication";

interface initialState {
  err: any;
  result: any;
  inserted: string;
  isFull: boolean;
}

const newItem = {
  "name": "qwerty",
  "quantity": 10
};

class SampleData extends React.Component<{}, initialState> {
  readonly state: initialState = {
    err: undefined,
    result: undefined,
    inserted: "",
    isFull: false
  };

  handleOnClick = () => {
    if (hasLoggedInUser()) {
      app.callFunction("findOne", [{}, SERVICE_NAME, DB_NAME, COLLECTION_NAME])
      .then( (res: any) => this.setState({result: res.timestamp}))
      .catch( (err: any) => this.setState({err: err}));
    }
    else {
      loginAnonymous().then(() => app.callFunction("findOne", [{}, SERVICE_NAME, DB_NAME, COLLECTION_NAME]))
        .then( (res: any) => this.setState({result: res.timestamp}))
        .catch( (err: any) => this.setState({err: err}));
    }
  }

  insertDoc = () => {
    app.callFunction("insertOne", [newItem, SERVICE_NAME, DB_NAME, COLLECTION_NAME])
      .then( (res: any) => this.setState({inserted: "hello"}))
    app.callFunction("isFull", [SERVICE_NAME, DB_NAME, COLLECTION_NAME])
      .then( (res: boolean) => this.setState({isFull: res}))
  }

  render() {
    return (
      <div className="data">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <p>
            Results from query: 
            <Button onClick={this.handleOnClick}>Click Here to Get Results</Button>
            <p>
              {this.state.result}
            </p>
          </p>
          <p>
            Insert a document:
            {<Button onClick={this.insertDoc}>Click Here to insert a sample document</Button>}
            <p>
              {this.state.inserted}
            </p>
          </p>
        </div>
        The Cache is Now Full: {this.state.isFull.toString()}
      </div>
    );
  } 
}

export default SampleData;
