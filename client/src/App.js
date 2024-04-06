import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

import Home from './components/Home';
import AddProperty from './components/AddProperty';

function App(){
  return(
    <Router>
        <Routes>
            <Route path="/">
              <Route index element={<Home/>}/>
              <Route path='add-property' element={<AddProperty/>}/>
            </Route>
            <Route path='*' element={<Home/>}/>
        </Routes>
      </Router>
  )
}

export default App;