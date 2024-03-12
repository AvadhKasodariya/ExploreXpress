// client/src/App.js

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from './components/context/contextAuthentication'; // Adjust the import path as needed
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    

  );
}

export default App;
