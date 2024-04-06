import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from './components/Home';
import AddProperty from './components/AddProperty';
import Property from './components/Property';

function App(){
  return(
    <Router>
        <Routes>
            <Route path="/">
              <Route index element={<Home/>}/>
              <Route path='add-property' element={<AddProperty/>}/>
              <Route path='property/:id' element={<Property/>}/>
            </Route>
            <Route path='*' element={<Home/>}/>
        </Routes>
      </Router>
  )
}

export default App;