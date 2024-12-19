// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Intern from './intern/Intern';
import Ecommerce from './pages/Ecommerce';
import Workshop from './workshop/Workshop';
import DomainManager from './intern/DomainManager';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/intern" element={<Intern />} />
        <Route path="/ecommerce" element={<Ecommerce/>}/>       
        <Route path="/workshop" element={<Workshop/>}/>       
        <Route path="/domain" element={<DomainManager/>}/>       
        </Routes>
    </Router>
  );
};

export default App;
