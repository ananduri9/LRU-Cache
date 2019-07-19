import React from 'react';
import { app } from '../Stitch/';
import IsFull from './IsFull';
import Delay from './Delay';

import {
  SERVICE_NAME,
  DB_NAME,
  COLLECTION_NAME
} from "../constants"

interface initialState {
  name: string;
  isFull: boolean;
  keepInserting: boolean;
  delay: number;
}

function timeout(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class InsertForm extends React.Component<{}, initialState> {
  readonly state: initialState = {
    name: '',
    isFull: false,
    keepInserting: false,
    delay: 0,
  }
  constructor(props:any) {
    super(props)

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit100 = this.handleSubmit100.bind(this);
    this.handleSubmitIndefinitely = this.handleSubmitIndefinitely.bind(this);
    this.stopInserting = this.stopInserting.bind(this);
    this.updateIsFull = this.updateIsFull.bind(this);
    this.handleChangeDelay = this.handleChangeDelay.bind(this);
  }

  updateIsFull() {
    app.callFunction("isFull", [SERVICE_NAME, DB_NAME, COLLECTION_NAME])
      .then( (res: boolean) => this.setState({isFull: res}))
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({name: event.target.value});
  }

  handleSubmit() {
    console.log('insert');
    const newDoc = {name: this.state.name}
    app.callFunction("insertOne", [newDoc, SERVICE_NAME, DB_NAME, COLLECTION_NAME])
      .then(() => app.callFunction("isFull", [SERVICE_NAME, DB_NAME, COLLECTION_NAME]))
      .then( (res: boolean) => this.setState({isFull: res}))
    this.setState({name: ''})

  }

  async handleSubmit100() {
    const newDoc = {name: this.state.name}
    for (let i = 0; i < 100; i++){
      await app.callFunction("insertOne", [newDoc, SERVICE_NAME, DB_NAME, COLLECTION_NAME])
    }
    this.setState({name: ''})
    this.updateIsFull()
  }

  async handleSubmitIndefinitely() {
    const newDoc = {name: this.state.name}
    await this.setState({keepInserting: true})
    while (this.state.keepInserting) {
      await app.callFunction("insertOne", [newDoc, SERVICE_NAME, DB_NAME, COLLECTION_NAME])
    }
    this.setState({name: ''})
    this.updateIsFull()
  }

  stopInserting() {
    this.setState({keepInserting: false})
  }

  handleChangeDelay(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({delay: parseInt(event.target.value, 10)});
  }

  render() {
    return (
      <div className='InsertForm'>
        <h3>Write:</h3>
        <div>
            <label>
              Name:      
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <div>
              <input type="submit" onClick={this.handleSubmit} value="Submit" />
            </div>
            <div>
              <input type="submit" onClick={this.handleSubmit100} value="Submit 100 times" />
            </div>
            <div>
              {
                !this.state.keepInserting ? 
                <input type="submit" onClick={this.handleSubmitIndefinitely} value="Submit Continuously" /> :
                <input type="submit" onClick={this.stopInserting} value="Stop Inserting" />
              }
            </div>
        </div>
        <div>
          <IsFull isFull={this.state.isFull}/>
        </div>
        <div>
          <Delay delay={this.state.delay} handleChangeDelay={this.handleChangeDelay}/>
        </div>
      </div>
    );
  }
}

export default InsertForm;