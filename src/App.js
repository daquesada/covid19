import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Componets/Main'
function App() {
  return (
    <div>
      <div className="container">
        <h1 className=" title ">COVID-19 <span className="text-muted subtitle">Global</span> </h1>
        <Main />
        <h6 className="text-muted text-center mt-5">Made by me</h6>
      </div>
    </div>
  );
}

export default App;
