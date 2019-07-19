import React from 'react';
import Iframe from 'react-iframe';

interface initialState {
}

class Metrics extends React.Component<{}, initialState> {
  readonly state: initialState = {
  };


  render() {
    return (
      <div className="metrics">
        <Iframe
          width="640"
          height="480"
          url="https://charts.mongodb.com/charts-lru-rvktx/embed/charts?id=123628cf-3cec-49c9-b1dc-c27cdc1fcd18&tenant=d56a7591-552d-4c8e-bb8b-0453f0b74323">
         ></Iframe>
      </div>
    );
  } 
}

export default Metrics;
