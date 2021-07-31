import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './static/css/App.css';
import Header from './components/Header';
import Ticker from './components/Ticker';
import Graph from './components/Graph';
import BarGraph from './components/Bar-Graph';
import Stats from './components/Stats';
import Calculator from './components/Calculator';
import History from './components/History';
import LogIn from './components/Log-In';
import SignUp from './components/Sign-Up';
import Contact from './components/Contact';
import ForgotPassword from './components/ForgotPassword';
import Terms from './components/Terms';

function App() {
  // Testing sending data to components
  const itemID = 4151;
  const appAlchProfit = -927293;

  // ----------------------------
  const itemName = 'Abyssal Whip';
  const itemIcon =
    'https://secure.runescape.com/m=itemdb_oldschool/1627468199533_obj_sprite.gif?id=';

  const currentPrice = 2319566 + 'g';
  const geLimit = 70;
  const latestOfferPrice = 2313109 + 'g';
  const avgHighHour = 2320565 + 'g';
  // Margin instead of price high? buy price - sell price
  const avgLowHour = 2316056 + 'g';

  const highAlchVal = 1372382 + 'g';

  // ----------------------------

  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState(true);
  const [loggedIn] = useState(true);

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
      <Router>
        <Header loggedIn={loggedIn} />
        <Ticker />
        <Switch>
          <Route path={['', '/', '/home']} exact>
            <div id='item-page-container'>
              <div id='graph-container'>
                <Graph
                  itemID={itemID}
                  itemName={itemName}
                  itemIcon={itemIcon}
                />
                <BarGraph />
              </div>
              <div id='stats-cal-container'>
                <Stats
                  apiData={apiData}
                  currentPrice={currentPrice}
                  geLimit={geLimit}
                  latestOfferPrice={latestOfferPrice}
                  avgHighHour={avgHighHour}
                  avgLowHour={avgLowHour}
                  highAlchVal={highAlchVal}
                  appAlchProfit={appAlchProfit}
                  itemID={itemID}
                />
                <Calculator />
                <History />
              </div>
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
