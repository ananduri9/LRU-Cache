import React from 'react';
import logo from "../Style/logo.svg"
import '../Style/App.css';
import { app } from '../Stitch/';
import { Button } from "reactstrap";
import SampleData from "./SampleData";
import {
  hasLoggedInUser,
  loginAnonymous,
} from "../Stitch/authentication";

interface initialState {
  isLoggedIn: boolean;
}

class Login extends React.Component<{}, initialState> {
  readonly state: initialState = {
    isLoggedIn: hasLoggedInUser(),
  }

  handleLogin = async () => {
    if(!this.state.isLoggedIn){
      await loginAnonymous()
    }
  }

  render() {
    return (
      <div className="data">
        <p>{
          this.state.isLoggedIn ?
          <Button onClick={this.handleLogin}>Click Here to Login</Button> :
          <SampleData/>
        } 
        </p>
      </div>
    );
  }
}

export default SampleData;