import React from 'react';
import logo from './logo.svg';
import './App.css';

import MeetingRoom from './components/MeetingRoom/MeetingRoom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import Navigation from './components/Navigation/Navigation';


function App() {
  return (
    <div>
      <div>
        <h1>Suite</h1>
        <MeetingRoom />
        {/* <Whiteboard /> // Integrate when ready */}
      </div>
      <div className="App">
  {/*      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>*/}
      <Navigation />
      <SignIn />
      <SignUp />
      
      </div>
    </div>
  );
}

export default App;
