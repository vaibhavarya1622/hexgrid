import React from 'react';
import './App.css'
import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from './components/Home/Home'
import Map from './components/Map/Map'
import Fetch from './components/Fetch/Fetch.js'
function App() {
  return (
    <div className="App">
      <Router>
      <Route path='/' exact component={Home} />
      <Route path='/map' exact component={Map} />
      <Route path='/get_data' exact component={Fetch} />
      </Router>
    </div>
  );
}

export default App;