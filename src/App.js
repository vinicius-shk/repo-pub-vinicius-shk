import React from 'react';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <div>
      <Route path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </div>
  );
}

export default App;
