import React from "react";

import Welcome from "./Components/Welcome";
import Homepage from "./Components/Homepage";

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {


  return (
    
    <div className="app">
    
    {/* Yönlendirmeler */}
    <Router>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
