import React from "react";
import ReactDOM from "react-dom";
import './styles/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { TwitterContextProvider } from "./context/tweet-context";
import App from './components/App';
import SignIn from './components/user/sign-in';
import SignUp from './components/user/sign-up';

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer />
    <TwitterContextProvider>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/signin" element={<SignIn />} />
      </Routes>
    </TwitterContextProvider>
  </BrowserRouter>
  , document.getElementById("root"));

