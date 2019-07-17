import React from 'react';
import logo from './logo.svg';
import './App.css';
import { app } from '../Stitch/'
import { StitchAuthProvider } from "./StitchAuth";
import SampleData from "./SampleData"
import { Button } from "reactstrap"

const App: React.FC = () => {
  return (
    <StitchAuthProvider>
      <SampleData/>
    </StitchAuthProvider>
  );
}

export default App;
