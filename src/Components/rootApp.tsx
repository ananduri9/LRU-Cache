import React from 'react';
import '../Style/App.css';
import { StitchAuthProvider } from "./StitchAuth";
import Login from "./Login";

const App: React.FC = () => {
  return (
    <StitchAuthProvider>
      <Login/>
    </StitchAuthProvider>
  );
}

export default App;
