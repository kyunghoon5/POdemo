import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Hello } from './components/hello';
import { Search } from './components/search';
function App() {
  
 

  return (
    <div className="App">
      <Search/>
    </div>
  );
}

export default App;
