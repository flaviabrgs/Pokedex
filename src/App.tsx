import React from 'react';
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";


const App: React.FC = () => {
  return (
    <React.StrictMode>
    <div className="App">
     <Home/>
    </div>
    </React.StrictMode>
  );
}

export default App;







