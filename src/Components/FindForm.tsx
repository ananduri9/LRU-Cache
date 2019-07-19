import React from 'react';
import { app } from '../Stitch/';
import Delay from './Delay';
import {
  SERVICE_NAME,
  DB_NAME,
  COLLECTION_NAME
} from "../constants"

interface initialState {
  result: string;
  err: any;
  keepFinding: boolean;
  delay: number;
}

class FindForm extends React.Component<{}, initialState> {
  readonly state: initialState = {
    keepFinding: false,
    err: undefined,
    result: '',
    delay: 0,
  }

  constructor(props:any){
    super(props)

    this.handleFindContinuous = this.handleFindContinuous.bind(this);
    this.stopFinding = this.stopFinding.bind(this);
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
  }

  async handleFindContinuous() {
    await this.setState({ keepFinding: true })
    while(this.state.keepFinding) {
      console.log('inside while')
      let res = await app.callFunction("findOne", [{}, SERVICE_NAME, DB_NAME, COLLECTION_NAME])
      this.setState({ result: res.name });
      console.log(res);
    }
  }

  stopFinding() {
    this.setState({ keepFinding: false });
    console.log("hello");
  }

  handleChangeDelay(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ delay: parseInt(event.target.value, 10) });
  }

  render () {
    return (
      <div className='Findform'>
        <h3>Read:</h3>
        <div>
          {
            !this.state.keepFinding ? 
            <input type="submit" onClick={this.handleFindContinuous} value="Find Continuously" /> :
            <input type="submit" onClick={this.stopFinding} value="Stop Finding" />
          }
        </div>
        <div>
          Results from query: {this.state.result}
        </div>
        <div>
          <Delay delay={this.state.delay} handleChangeDelay={this.handleChangeDelay}/>
        </div>
      </div>
    );
  }
}

export default FindForm;