import React from 'react';
import '../Style/App.css';
import { StitchAuthProvider } from "./StitchAuth";
import SampleData from "./SampleData"

const App: React.FC = () => {
  return (
    <StitchAuthProvider>
      <SampleData/>
    </StitchAuthProvider>
  );
}

export default App;
