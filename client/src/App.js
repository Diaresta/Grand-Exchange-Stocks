import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './static/css/App.css';
import Header from './components/Header';
import Ticker from './components/Ticker';
import Graph from './components/Graph';
import Stats from './components/Stats';
import Calculator from './components/Calculator';

function App() {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);

  const apiCall = async () => {
    const url = await 'https://prices.runescape.wiki/api/v1/osrs/latest';

    const response = await fetch(url);
    const data = await response.json();
    setApiData(data.results);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className='App'>
      <Header />
      <Ticker />
      <div id='item-page-container'>
        <Graph />
        <div id='stats-cal-container'>
          <Stats apiData={apiData} />
          <Calculator />
        </div>
      </div>
    </div>
  );
}

export default App;
