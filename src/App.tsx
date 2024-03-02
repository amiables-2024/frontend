import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import MeetingRoom from './components/MeetingRoom/MeetingRoom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import CreateProjectPage from './components/CreateProjectPage/CreateProjectPage';

// function App() {
//   return (
//     <div className="App">
// {/*      <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>*/}

// {/*    <SignIn />
//     <SignUp />*/}
//     <CreateProjectPage />
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/new-project" element={<CreateProjectPage />} />
        <Route path="/home-room" element={<MeetingRoom />} />
{/*        <Route path="/landing" element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        } />*/}
      </Routes>
    </Router>
  )
}

export default App;
