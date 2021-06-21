import React from 'react';
import './App.css'
import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from './components/Home/Home'
import Map from './components/Map/Map'
function App() {
  return (
    <div className="App">
      <Router>
      <Route path='/' exact component={Home} />
      <Route path='/map' exact component={Map} />
      </Router>
    </div>
  );
}

export default App;