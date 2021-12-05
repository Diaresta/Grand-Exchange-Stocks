import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './static/css/App.css';
import Header from './components/Header';
import Ticker from './components/Ticker';
import Graph from './components/Graph';
import BarGraph from './components/Bar-Graph';
import Stats from './components/Stats';
import Calculator from './components/Calculator';
import SearchPage from './components/Search-Page';
import History from './components/History';
import HistoryPage from './components/HistoryPage';
import LogIn from './components/Log-In';
import SignUp from './components/Sign-Up';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import Terms from './components/Terms';

function App() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedIn] = useState(true);

  var itemArray = [2, 4151, 11832, 1073, 6585];
  var homeGraphItem = itemArray[Math.floor(Math.random() * itemArray.length)];

  const apiCall = async (itemID) => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/home'
    ) {
      setLoading(true);
    }

    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      var url = await `http://localhost:8000/item/${homeGraphItem}`;
    } else {
      var url = await `http://localhost:8000/item/${itemLinkID}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setApiData(data);
    setLoading(false);
  };

  useEffect(() => {
    apiCall('');
  }, []);

  return (
    <div className='App'>
      <Router>
        <Header loggedIn={loggedIn} />
        <span id={`loading-span-${loading.toString()}`} />
        <div id={loading.toString()}>
          <Ticker />
          <Switch>
            <Route path={['', '/', '/home']} exact>
              <div id='item-page-container'>
                <div id='graph-container'>
                  <Graph itemArray={homeGraphItem} />
                  {/* <BarGraph
                  fiveMin={apiData.fiveMinGraph}
                  oneHour={apiData.oneHourGraph}
                  sixHour={apiData.sixHourGraph}
                /> */}
                </div>
                <div id='stats-cal-container'>
                  <Stats
                    itemArray={homeGraphItem}
                    // itemID={itemID}
                  />
                  <Calculator />
                  <History />
                </div>
              </div>
            </Route>
            <Route path='/search/'>
              <SearchPage />
            </Route>
            <Route path={['/item/:itemName/:itemID']}>
              <div id='item-page-container'>
                <div id='graph-container'>
                  <Graph />
                  {/* <BarGraph
                  fiveMin={apiData.fiveMinGraph}
                  oneHour={apiData.oneHourGraph}
                  sixHour={apiData.sixHourGraph}
                /> */}
                </div>
                <div id='stats-cal-container'>
                  <Stats
                    itemArray={homeGraphItem}
                    // itemID={itemID}
                  />
                  <Calculator />
                  <History />
                </div>
              </div>
            </Route>
            <Route path={'/history'} exact>
              <div className='history-page-container'>
                <HistoryPage />
              </div>
            </Route>
            <Route path={['/login', '/log-in']} exact>
              <div className='log-sign-app-container'>
                <LogIn />
              </div>
            </Route>
            <Route path={['/signup', '/sign-up']} exact>
              <div className='log-sign-app-container'>
                <SignUp />
              </div>
            </Route>
            <Route path={['/contact', '/contact-us']} exact>
              <div className='log-sign-app-container'>
                <Contact />
              </div>
            </Route>
            <Route path={['/account-recovery', '/forgot-password']} exact>
              <div className='log-sign-app-container'>
                <ForgotPassword />
              </div>
            </Route>
            <Route path={['/privacy-policy']} exact>
              <Terms />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
