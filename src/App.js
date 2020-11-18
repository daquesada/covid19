import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Componets/Main/Main'
import Footer from './Componets/Footer'
import { Country } from './Componets/Context/Country'
import { Timeline } from './Componets/Context/Timeline'

function App() {
  return (
    <div className="container">
      <h1 className=" title ">COVID-19 <span className="text-muted subtitle">Global</span> </h1>
      <Country>
        <Timeline>
          <Main />
        </Timeline>
      </Country>      
      <Footer/>
    </div>
  );
}

export default App;
