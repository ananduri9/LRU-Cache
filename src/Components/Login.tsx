import React from 'react';
import '../Style/App.css';
import { Button } from "reactstrap";
import SampleData from "./SampleData";
import Title from "./Title";
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
      this.setState({isLoggedIn: true})
    }
  }

  render() {
    return (
      <div className="data">
        {!this.state.isLoggedIn && <Title/>}
        <div>{
          this.state.isLoggedIn ?
          <SampleData/> :
          <Button onClick={this.handleLogin}>Click Here to Login</Button>
        } 
        </div>
      </div>
    );
  }
}

export default Login;