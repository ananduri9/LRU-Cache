import React from 'react';
import '../Style/App.css';
import InsertForm from "./InsertForm";
import FindForm from "./FindForm"
import Metrics from "./Metrics";
import Title from "./Title";
import Reset from "./Reset";

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

  render() {
    return (
      <div className="data">
        <Title/>
        <Metrics/>
        <div>
          <div className='row'>
            <div className='column'>
              <FindForm/>
            </div>
            <div className='column'>
              <InsertForm/>
            </div>
            <div className='column'>
              <Reset/>
            </div>
          </div>
        </div>
        
      </div>
    );
  } 
}

export default SampleData;
