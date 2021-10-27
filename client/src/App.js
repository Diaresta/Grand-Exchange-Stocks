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
  // name: itemName,
  // icon: itemIcon,
  // currentPrice: fiveMinCurrentPrice.toLocaleString(),
  // geLimit: geLimit.toLocaleString(),
  // offerPrice: fiveMinOfferPrice.toLocaleString(),
  // avgHighHour: avgHighHour.toLocaleString(),
  // margin: (fiveMinCurrentPrice - fiveMinOfferPrice).toLocaleString(),
  // avgLowHour: avgLowHour.toLocaleString(),
  // highAlchValue: highAlchVal.toLocaleString(),
  // highAlchProfit: highAlchProfit.toLocaleString(),
  // todayTrend: itemTrend,
  // item30DayTrend: item30DayChange,
  // item90DayTrend: item90DayChange,
  // item180DayTrend: item180DayChange,

  // // Testing sending data to components
  // const itemID = 4151;
  // // const appAlchProfit = -927293;

  // // ----------------------------
  // const itemName = 'Abyssal Whip';
  // const itemIcon =
  //   'https://secure.runescape.com/m=itemdb_oldschool/1627468199533_obj_sprite.gif?id=';

  // const currentPrice = 2319566 + 'g';
  // const geLimit = 70;
  // const latestOfferPrice = 2313109 + 'g';
  // const avgHighHour = 2320565 + 'g';
  // // Margin instead of price high? buy price - sell price
  // const avgLowHour = 2316056 + 'g';

  // const highAlchVal = 1372382 + 'g';

  // ----------------------------

  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(true);

  var itemArray = [2, 4151, 11832, 1073, 6585];
  var homeGraphItem = itemArray[Math.floor(Math.random() * itemArray.length)];

  const apiCall = async (itemID) => {
    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      var url = await `http://localhost:5000/item/${homeGraphItem}`;
    } else {
      var url = await `http://localhost:5000/item/${itemLinkID}`;
    }

    console.log(url);

    const response = await fetch(url);
    const data = await response.json();
    setApiData(data);
    setLoading(false);
  };

  // Maybe have apiCall function call like below vvvvvvv. Find a way to useEffect on new components
  // {apiCall('item/11808')}

  useEffect(() => {
    apiCall('');
  }, []);

  return (
    <div className='App'>
      <Router>
        <Header loggedIn={loggedIn} />
        <Ticker />
        <Switch>
          <Route path={['', '/', '/home']} exact>
            <div id='item-page-container'>
              <div id='graph-container'>
                <Graph
                  // itemID={itemID}
                  itemName={apiData.name}
                  itemIcon={apiData.icon}
                  fiveMin={apiData.fiveMinGraph}
                  oneHour={apiData.oneHourGraph}
                  sixHour={apiData.sixHourGraph}
                  itemArray={homeGraphItem}
                />
                {/* <BarGraph
                  fiveMin={apiData.fiveMinGraph}
                  oneHour={apiData.oneHourGraph}
                  sixHour={apiData.sixHourGraph}
                /> */}
              </div>
              <div id='stats-cal-container'>
                <Stats
                  apiData={apiData}
                  currentPrice={apiData.currentPrice}
                  geLimit={apiData.geLimit}
                  latestOfferPrice={apiData.offerPrice}
                  avgHighHour={apiData.avgHighHour}
                  avgLowHour={apiData.avgLowHour}
                  highAlchVal={apiData.highAlchValue}
                  appAlchProfit={apiData.highAlchProfit}
                  margin={apiData.margin}
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
                <div>TEST REMOVE WHEN DONE</div>
                <Graph
                  // itemID={itemID}
                  itemName={apiData.name}
                  itemIcon={apiData.icon}
                  fiveMin={apiData.fiveMinGraph}
                  oneHour={apiData.oneHourGraph}
                  sixHour={apiData.sixHourGraph}
                />
                {/* <BarGraph
                  fiveMin={apiData.fiveMinGraph}
                  oneHour={apiData.oneHourGraph}
                  sixHour={apiData.sixHourGraph}
                /> */}
              </div>
              <div id='stats-cal-container'>
                <Stats
                  apiData={apiData}
                  currentPrice={apiData.currentPrice}
                  geLimit={apiData.geLimit}
                  latestOfferPrice={apiData.offerPrice}
                  avgHighHour={apiData.avgHighHour}
                  avgLowHour={apiData.avgLowHour}
                  highAlchVal={apiData.highAlchValue}
                  appAlchProfit={apiData.highAlchProfit}
                  margin={apiData.margin}
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
      </Router>
    </div>
  );
}

export default App;
