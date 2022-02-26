import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import AccountPage from './components/Account-Page';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import Terms from './components/Terms';
import PageNotFound from './components/Page-Not-Found';
import useToken from './components/useToken';
import useInterval from './components/useInterval';
import { checkToken } from './static/scripts/Utilities';

function App() {
  const [apiData, setApiData] = useState([]);
  const [tickerData, setTickerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshCheck, setRefreshCheck] = useState(false);
  const [logData, setLogData] = useState();

  const { token, setToken } = useToken();

  // Items to show on page load
  var itemArray = [
    2, 385, 444, 536, 560, 561, 1073, 4151, 6585, 10034, 11284, 11832, 13652,
    20097, 21012, 21021, 21024, 21034, 21079,
  ];
  var homeGraphItem = itemArray[Math.floor(Math.random() * itemArray.length)];

  // Gets account info from server by account
  const accountInfoCall = async () => {
    axios
      .post(`http://localhost:8000/api/account/search/`, {
        token: localStorage.getItem('token'),
      })
      .then(({ data }) => {
        setLogData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Check if logged in and sends data to components
  const logDataCheck = () => {
    if (checkToken() === true) {
      accountInfoCall();
    }
  };

  const apiCall = async (itemID) => {
    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      setLoading(true);
      var url = await `http://localhost:8000/item/${homeGraphItem}`;
    } else if (defaultWindow === 'item') {
      setLoading(true);
      var url = await `http://localhost:8000/item/${itemLinkID}`;
    } else {
      var url = await `http://localhost:8000/item/${itemLinkID}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setApiData(data);
    setTickerData(data.ticker);
  };

  // Check for loading state then prompts user to refresh page if loading !== false
  useInterval(
    () => {
      if (loading !== false) {
        setRefreshCheck(true);
      } else {
        setRefreshCheck(false);
      }
    },
    10000,
    []
  );

  useEffect(() => {
    apiCall('').then(() => {
      setLoading(false);
    });
    logDataCheck();
  }, []);

  return (
    <div className='App'>
      <Router>
        <Header checkToken={checkToken()} logData={logData} />
        <div id={`refresh-span-${refreshCheck.toString()}`}>
          <h2>Page Not Responding?</h2>
          <button
            id='input-btn'
            onClick={(e) => {
              window.location.reload();
            }}
          >
            Click to Refesh
          </button>
        </div>
        <span id={`loading-span-${loading.toString()}`} />
        <div id={loading.toString()}>
          <Ticker tickerData={tickerData} />
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
                  <div id='stats-cal-mediaQ'>
                    <Stats
                      itemArray={homeGraphItem}
                      // itemID={itemID}
                    />
                    <Calculator
                      checkToken={checkToken()}
                      itemArray={homeGraphItem}
                    />
                  </div>
                  <History
                    checkToken={checkToken()}
                    itemArray={homeGraphItem}
                  />
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
                  <Calculator
                    checkToken={checkToken()}
                    itemArray={homeGraphItem}
                  />
                  <History
                    checkToken={checkToken()}
                    itemArray={homeGraphItem}
                  />
                </div>
              </div>
            </Route>
            <Route path={'/history'} exact>
              <div className='history-page-container'>
                <HistoryPage checkToken={checkToken()} />
              </div>
            </Route>
            <Route path={['/login', '/log-in']} exact>
              <div className='log-sign-app-container'>
                <LogIn checkToken={checkToken()} setToken={setToken} />
              </div>
            </Route>
            <Route path={['/signup', '/sign-up']} exact>
              <div className='log-sign-app-container'>
                <SignUp checkToken={checkToken()} />
              </div>
            </Route>
            <Route path={'/account'}>
              <div className='account-container'>
                <AccountPage checkToken={checkToken()} />
              </div>
            </Route>
            <Route path={['/contact', '/contact-us']} exact>
              <div className='log-sign-app-container'>
                <Contact checkToken={checkToken()} />
              </div>
            </Route>
            <Route path={['/account-recovery', '/forgot-password']} exact>
              <div className='log-sign-app-container'>
                <ForgotPassword checkToken={checkToken()} />
              </div>
            </Route>
            <Route path={['/privacy-policy']} exact>
              <Terms />
            </Route>
            <Route path='*' exact>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
