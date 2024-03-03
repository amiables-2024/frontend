import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import './assets/css/dragula.css'
import 'react-toastify/dist/ReactToastify.min.css';

import {ChakraProvider} from '@chakra-ui/react'

import MeetingRoom from './components/MeetingRoom/MeetingRoom';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import CreateProjectPage from './components/CreateProjectPage/CreateProjectPage';
import Dashboard from "./components/Dashboard/Dashboard";
import ChatApp from "./components/ChatApp/ChatApp";
import ProjectDashboard from './components/ProjectDashboard/ProjectDashboard';
// import Home from './components/Home/Home';
import ErrorPage from './components/ErrorPage/ErrorPage';
import IndexPage from "./components/IndexPage/IndexPage";
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
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<IndexPage/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/project/:projectId" element={<ProjectDashboard/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </ChakraProvider>
    )
}

export default App;
