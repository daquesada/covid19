import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Main from './Componets/Main'
function App() {
  return (
    <div className="container">
      <h1 className=" title ">COVID-19 <span className="text-muted subtitle">Global</span> </h1>
      <Main />
      <br/>
      <div className="text-center">
        <code style={{ color: 'grey',fontSize:'0.4cm' }}>
          <div>
          Made by <a href="https://github.com/daquesada/covid19">daquesada</a> / <a href="https://about-corona.net/">API</a> / <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports">Data Source</a>
          </div>
          <div>
          Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
          </div>
        </code>
      </div>
      <br />
    </div>
  );
}

export default App;
