import express from 'express';
import cors from 'cors';
import axios from 'axios';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Account from './db/dbAccounts.js';
import Transactions from './db/dbTransactions.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
mongoose.connect(process.env.GETELLERDB, {});

// Create account in db
app.post('/api/account', (req, res) => {
  const dbAccount = req.body;
  Account.create(dbAccount, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Parse db for account(s)
app.get('/api/account', (req, res) => {
  Account.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Parse db for account(s) by username
app.get('/api/account/:accountUsername', (req, res) => {
  Account.find(
    { username: req.params.accountUsername.toLowerCase() },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

// Parse db for account and update account info
app.put('/api/account/:accountUsername', (req, res) => {
  Account.findOneAndUpdate(
    { username: req.params.accountUsername.toLowerCase() },
    req.body,
    {
      new: true,
    }
  )
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

// Create item transtion in db
app.post('/api/transaction', (req, res) => {
  const dbTransaction = req.body;
  Transactions.create(dbTransaction, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Parse db for transaction(s)
app.get('/api/transaction', (req, res) => {
  Transactions.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

var itemArray = [2, 4151, 11832, 1073, 6585, 11802, 4587];
var tickerArray = [];
// var itemID = itemArray[Math.floor(Math.random() * itemArray.length)];

// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

app.use('/login', (req, res) => {
  res.send({
    token: 'testtoken0',
  });
});

app.get('/', (req, res) => res.status(200).send('welcome gamers'));

// app.get('/', async (req, res) => {
// for (let i = 0; i < 7; i++) {
//   setTickerArray(itemArray[i]);
// }
// itemApiCall(
//   req,
//   res,
//   itemArray[Math.floor(Math.random() * itemArray.length)],
//   tickerArray
// );
// });

app.get(`/item/:itemID`, (req, res) => {
  for (let i = 0; i < 7; i++) {
    setTickerArray(itemArray[i]);
  }

  itemApiCall(req, res, parseInt(req.params.itemID), tickerArray);
});

const setTickerArray = async (itemID) => {
  const options = {
    method: 'GET',
  };

  const url = await axios.get(
    `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemID}`,
    {
      headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
    }
  );

  var item = {};

  // error: cannot read property that's 'undefined'
  try {
    item.name = await url.data.item.name;
    item.trend = await url.data.item.day30.trend;
    item.price = await url.data.item.current.price.toString();
    item.percent = await url.data.item.day30.change;
    item.id = await url.data.item.id;
  } catch {
    item.name = '';
    item.trend = '';
    item.price = '';
    item.percent = '';
    item.id = '';
  }
  tickerArray.push(item);

  if (tickerArray.length > 7) {
    tickerArray.pop();
  }

  return item;
};

const itemApiCall = async (req, res, itemID, tickerArray) => {
  const options = {
    method: 'GET',
  };

  // Grabs item name, photo, trend, 30-180day price changes
  const urlNameChange = await axios.get(
    `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemID}`,
    {
      headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
    }
  );

  // FIX: Moved itemName to 3.2.1 to fix undefined from API || Fix icon sometimes returning undefined
  try {
    var itemIcon = await urlNameChange.data.item.icon;
  } catch {
    var itemIcon = '';
  }
  // const itemTrend = apiNameChange.item.today.trend;
  // const item30DayChange = apiNameChange.item.day30.change;
  // const item90DayChange = apiNameChange.item.day90.change;
  // const item180DayChange = apiNameChange.item.day180.change;

  // --------------------------------------------------------

  // Grabs alch values/ge sell limit
  const urlAlchGeLimit = await axios.get(
    'https://prices.runescape.wiki/api/v1/osrs/mapping',
    {
      headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
    }
  );

  const apiGeLimit = await urlAlchGeLimit.data;

  let mappingTest;
  // let itemUpdateObject = [];

  for (let i = 0; i < apiGeLimit.length; i++) {
    if (apiGeLimit[i].id === itemID) {
      mappingTest = i;
    }

    // ----- Update Item Database -----
    // itemUpdateObject.push({
    //   id: apiGeLimit[i].id,
    //   name: apiGeLimit[i].name,
    // });
  }
  // ---------------------------------------------------------------

  // FIX: Moved itemName from 3.2.1 to fix undefined from API
  const itemName = apiGeLimit[mappingTest].name;
  const highAlchVal = apiGeLimit[mappingTest].highalch;
  const lowAlchVal = apiGeLimit[mappingTest].lowalch;
  const geLimit = apiGeLimit[mappingTest].limit;

  // --------------------------------------------------------

  // Grabs current/offer price from 5min avg

  // const urlFiveMin = await 'https://prices.runescape.wiki/api/v1/osrs/5m';
  const urlFiveMin = await axios.get(
    `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${itemID}`,
    {
      headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
    }
  );

  const apiFiveMin = await urlFiveMin.data;

  if (apiFiveMin.data[0].avgHighPrice === null) {
    var fiveMinCurrentPrice = '???';
  } else {
    var fiveMinCurrentPrice = apiFiveMin.data[0].avgHighPrice;
  }

  if (apiFiveMin.data[0].avgLowPrice === null) {
    var fiveMinOfferPrice = '???';
  } else {
    var fiveMinOfferPrice = apiFiveMin.data[0].avgLowPrice;
  }

  if (
    apiFiveMin.data[0].highPriceVolume === null ||
    apiFiveMin.data[0].lowPriceVolume === null
  ) {
    var fiveMinVolume = '???';
  } else {
    var fiveMinVolume =
      apiFiveMin.data[0].highPriceVolume + apiFiveMin.data[0].lowPriceVolume;
  }

  const highAlchProfit = highAlchVal - fiveMinCurrentPrice;

  // const fiveMinCurrentPrice = apiFiveMin.data[itemID].avgHighPrice;
  // const fiveMinOfferPrice = apiFiveMin.data[itemID].avgLowPrice;
  // const fiveMinVolume =
  //   apiFiveMin.data[itemID].highPriceVolume +
  //   apiFiveMin.data[itemID].lowPriceVolume;
  // --------------------------------------------------------

  // Grabs current/offer/sell price from latest
  const urlLatest = await axios.get(
    `https://prices.runescape.wiki/api/v1/osrs/latest?id=${itemID}`,
    {
      headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
    }
  );

  const apiLatest = await urlLatest.data;

  const latestCurrentPrice = apiLatest.data[itemID].high;
  const latestOfferPrice = Math.floor(
    (apiLatest.data[itemID].high + apiLatest.data[itemID].low) / 2
  );
  const latestSellPrice = apiLatest.data[itemID].high;

  // --------------------------------------------------------

  // Grabs average high/low prices/hour and hourly volume
  // const urlHour = await 'https://prices.runescape.wiki/api/v1/osrs/1h';
  const urlHour = await axios.get(
    `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${itemID}`,
    {
      headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
    }
  );

  const apiHour = await urlHour.data;

  if (apiHour.data[0].avgHighPrice === null) {
    var avgHighHour = '???';
  } else {
    var avgHighHour = apiHour.data[0].avgHighPrice;
  }

  if (apiHour.data[0].avgLowPrice === null) {
    var avgLowHour = '???';
  } else {
    var avgLowHour = apiHour.data[0].avgLowPrice;
  }

  if (
    apiHour.data[0].highPriceVolume === null ||
    apiHour.data[0].lowPriceVolume === null
  ) {
    var hourVolume = '???';
  } else {
    var hourVolume =
      apiHour.data[0].highPriceVolume + apiHour.data[0].lowPriceVolume;
  }

  // const avgHighHour = apiHour.data[itemID].avgHighPrice;
  // const avgLowHour = apiHour.data[itemID].avgLowPrice;
  // const hourVolume =
  //   apiHour.data[itemID].highPriceVolume + apiHour.data[itemID].lowPriceVolume;
  // ------------------------- **************** -------------------------------

  const fiveMin = '5m';
  const oneHour = '1h';
  const sixHour = '6h';

  const graphArray = [];
  graphArray['fiveMin'] = {};
  graphArray['oneHour'] = {};
  graphArray['sixHour'] = {};

  try {
    // Five minute graph fetch
    const graphMinLink = await axios.get(
      `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${fiveMin}&id=${itemID}`,
      {
        headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
      }
    );

    const graphMinJSON = graphMinLink.data;

    graphArray.fiveMin['5 Minute'] = {
      price: Math.floor(
        (graphMinJSON.data[0].avgHighPrice + graphMinJSON.data[0].avgLowPrice) /
          2
      ),
      volume:
        graphMinJSON.data[0].highPriceVolume +
        graphMinJSON.data[0].lowPriceVolume,
    };
    graphArray.fiveMin['4 Minute'] = {
      price: Math.floor(
        (graphMinJSON.data[59].avgHighPrice +
          graphMinJSON.data[59].avgLowPrice) /
          2
      ),
      volume:
        graphMinJSON.data[59].highPriceVolume +
        graphMinJSON.data[59].lowPriceVolume,
    };
    graphArray.fiveMin['3 Minute'] = {
      price: Math.floor(
        (graphMinJSON.data[119].avgHighPrice +
          graphMinJSON.data[119].avgLowPrice) /
          2
      ),
      volume:
        graphMinJSON.data[119].highPriceVolume +
        graphMinJSON.data[119].lowPriceVolume,
    };
    graphArray.fiveMin['2 Minute'] = {
      price: Math.floor(
        (graphMinJSON.data[179].avgHighPrice +
          graphMinJSON.data[179].avgLowPrice) /
          2
      ),
      volume:
        graphMinJSON.data[179].highPriceVolume +
        graphMinJSON.data[179].lowPriceVolume,
    };
    graphArray.fiveMin['1 Minute'] = {
      price: Math.floor(
        (graphMinJSON.data[239].avgHighPrice +
          graphMinJSON.data[239].avgLowPrice) /
          2
      ),
      volume:
        graphMinJSON.data[239].highPriceVolume +
        graphMinJSON.data[239].lowPriceVolume,
    };

    // One hour graph fetch
    const graphHourLink = await axios.get(
      `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${oneHour}&id=${itemID}`,
      {
        headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
      }
    );

    const graphHourJSON = await graphHourLink.data;

    graphArray.oneHour['1 Hour'] = {
      price: Math.floor(
        (graphHourJSON.data[0].avgHighPrice +
          graphHourJSON.data[0].avgLowPrice) /
          2
      ),
      volume:
        graphHourJSON.data[0].highPriceVolume +
        graphHourJSON.data[0].lowPriceVolume,
    };
    graphArray.oneHour['45 Minute'] = {
      price: Math.floor(
        (graphHourJSON.data[74].avgHighPrice +
          graphHourJSON.data[74].avgLowPrice) /
          2
      ),
      volume:
        graphHourJSON.data[74].highPriceVolume +
        graphHourJSON.data[74].lowPriceVolume,
    };
    graphArray.oneHour['30 Minute'] = {
      price: Math.floor(
        (graphHourJSON.data[149].avgHighPrice +
          graphHourJSON.data[149].avgLowPrice) /
          2
      ),
      volume:
        graphHourJSON.data[149].highPriceVolume +
        graphHourJSON.data[149].lowPriceVolume,
    };
    graphArray.oneHour['15 Minute'] = {
      price: Math.floor(
        (graphHourJSON.data[224].avgHighPrice +
          graphHourJSON.data[224].avgLowPrice) /
          2
      ),
      volume:
        graphHourJSON.data[224].highPriceVolume +
        graphHourJSON.data[224].lowPriceVolume,
    };

    // Six hour graph fetch
    const graphSixHourLink = await axios.get(
      `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${sixHour}&id=${itemID}`,
      {
        headers: { 'User-Agent': 'Learning using APIs - @Diaresta#4220' },
      }
    );

    const graphSixHourJSON = await graphSixHourLink.data;

    graphArray.sixHour['6 Hour'] = {
      price: Math.floor(
        (graphSixHourJSON.data[0].avgHighPrice +
          graphSixHourJSON.data[0].avgLowPrice) /
          2
      ),
      volume:
        graphSixHourJSON.data[0].highPriceVolume +
        graphSixHourJSON.data[0].lowPriceVolume,
    };
    graphArray.sixHour['5 Hour'] = {
      price: Math.floor(
        (graphSixHourJSON.data[49].avgHighPrice +
          graphSixHourJSON.data[49].avgLowPrice) /
          2
      ),
      volume:
        graphSixHourJSON.data[49].highPriceVolume +
        graphSixHourJSON.data[49].lowPriceVolume,
    };
    graphArray.sixHour['4 Hour'] = {
      price: Math.floor(
        (graphSixHourJSON.data[99].avgHighPrice +
          graphSixHourJSON.data[99].avgLowPrice) /
          2
      ),
      volume:
        graphSixHourJSON.data[99].highPriceVolume +
        graphSixHourJSON.data[99].lowPriceVolume,
    };
    graphArray.sixHour['3 Hour'] = {
      price: Math.floor(
        (graphSixHourJSON.data[149].avgHighPrice +
          graphSixHourJSON.data[149].avgLowPrice) /
          2
      ),
      volume:
        graphSixHourJSON.data[149].highPriceVolume +
        graphSixHourJSON.data[149].lowPriceVolume,
    };
    graphArray.sixHour['2 Hour'] = {
      price: Math.floor(
        (graphSixHourJSON.data[199].avgHighPrice +
          graphSixHourJSON.data[199].avgLowPrice) /
          2
      ),
      volume:
        graphSixHourJSON.data[199].highPriceVolume +
        graphSixHourJSON.data[199].lowPriceVolume,
    };
    graphArray.sixHour['1 Hour'] = {
      price: Math.floor(
        (graphSixHourJSON.data[249].avgHighPrice +
          graphSixHourJSON.data[249].avgLowPrice) /
          2
      ),
      volume:
        graphSixHourJSON.data[249].highPriceVolume +
        graphSixHourJSON.data[249].lowPriceVolume,
    };
  } catch {
    // Five minute graph fetch
    graphArray.fiveMin['5 Minute'] = {
      price: 0,
      volume: 0,
    };
    graphArray.fiveMin['4 Minute'] = {
      price: 0,
      volume: 0,
    };
    graphArray.fiveMin['3 Minute'] = {
      price: 0,
      volume: 0,
    };
    graphArray.fiveMin['2 Minute'] = {
      price: 0,
      volume: 0,
    };
    graphArray.fiveMin['1 Minute'] = {
      price: 0,
      volume: 0,
    };

    // One hour graph fetch
    graphArray.oneHour['1 Hour'] = {
      price: 0,
      volume: 0,
    };
    graphArray.oneHour['45 Minute'] = {
      price: 0,
      volume: 0,
    };
    graphArray.oneHour['30 Minute'] = {
      price: 0,
      volume: 0,
    };
    graphArray.oneHour['15 Minute'] = {
      price: 0,
      volume: 0,
    };

    // Six hour graph fetch
    graphArray.sixHour['6 Hour'] = {
      price: 0,
      volume: 0,
    };
    graphArray.sixHour['5 Hour'] = {
      price: 0,
      volume: 0,
    };
    graphArray.sixHour['4 Hour'] = {
      price: 0,
      volume: 0,
    };
    graphArray.sixHour['3 Hour'] = {
      price: 0,
      volume: 0,
    };
    graphArray.sixHour['2 Hour'] = {
      price: 0,
      volume: 0,
    };
    graphArray.sixHour['1 Hour'] = {
      price: 0,
      volume: 0,
    };
  }

  // Fixing graph null values
  const fiveMinGraphFix = graphArray.fiveMin;
  const oneHourGraphFix = graphArray.oneHour;
  const sixHourGraphFix = graphArray.sixHour;

  for (const key in fiveMinGraphFix) {
    if (fiveMinGraphFix[key].price === null) {
      fiveMinGraphFix[key].price = '???';
    }

    if (fiveMinGraphFix[key].volume === null) {
      fiveMinGraphFix[key].volume = '???';
    }
  }

  for (const key in oneHourGraphFix) {
    if (oneHourGraphFix[key].price === null) {
      oneHourGraphFix[key].price = '???';
    }

    if (oneHourGraphFix[key].volume === null) {
      oneHourGraphFix[key].volume = '???';
    }
  }

  for (const key in sixHourGraphFix) {
    if (sixHourGraphFix[key].price === null) {
      sixHourGraphFix[key].price = '???';
    }

    if (sixHourGraphFix[key].volume === null) {
      sixHourGraphFix[key].volume = '???';
    }
  }

  const itemExport = {
    name: itemName,
    icon: itemIcon,
    currentPrice: latestCurrentPrice.toLocaleString(),
    geLimit: geLimit.toLocaleString(),
    offerPrice: latestOfferPrice.toLocaleString(),
    avgHighHour: avgHighHour.toLocaleString(),
    margin: (latestCurrentPrice - latestOfferPrice).toLocaleString(),
    avgLowHour: avgLowHour.toLocaleString(),
    highAlchValue: highAlchVal.toLocaleString(),
    highAlchProfit: parseInt(highAlchProfit).toLocaleString(),
    // todayTrend: itemTrend,
    // item30DayTrend: item30DayChange,
    // item90DayTrend: item90DayChange,
    // item180DayTrend: item180DayChange,
    fiveMinGraph: graphArray.fiveMin,
    oneHourGraph: graphArray.oneHour,
    sixHourGraph: graphArray.sixHour,
    ticker: tickerArray,
    // itemUpdate: itemUpdateObject,
  };

  // ------------------------- **************** -------------------------------
  try {
    res.status(200).json(itemExport);
  } catch {
    res.send('reee');
  }
};

// ------------ MOVED HERE FOR TESTING ------------

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;

// CD TO SERVER BEFORE NODEMON SERVER
// localhost:5000 for api call
