import express from 'express';
import cors from 'cors';
// import itemData from './api/itemData.route.js';
import restaurants from './api/restaurants.route.js';

import fetch from 'node-fetch';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api', itemData);
app.use('/api/v1/restaurants', restaurants);

var itemArray = [2, 4151, 11832, 1073, 6585, 11802, 4587];
var tickerArray = [];
// var itemID = itemArray[Math.floor(Math.random() * itemArray.length)];

// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

const setTickerArray = async (itemID) => {
  const options = {
    method: 'GET',
  };

  const url =
    await `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemID}`;

  const response = await fetch(url, options);
  const data = await response.json();

  var item = {};

  item.name = data.item.name;
  item.trend = data.item.current.trend;
  item.price = data.item.current.price;
  item.percent = data.item.day30.change;

  tickerArray.push(item);

  return item;
};

app.get('/', async (req, res) => {
  for (let i = 0; i < 7; i++) {
    setTickerArray(itemArray[i]);
  }

  itemApiCall(
    req,
    res,
    itemArray[Math.floor(Math.random() * itemArray.length)],
    tickerArray
  );
});

app.get(`/item/:itemID`, (req, res) => {
  itemApiCall(req, res, parseInt(req.params.itemID), tickerArray);
});

const itemApiCall = async (req, res, itemID, tickerArray) => {
  const options = {
    method: 'GET',
  };

  // Grabs item name, photo, trend, 30-180day price changes
  const urlNameChange =
    await `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${itemID}`;

  const responseNameChange = await fetch(urlNameChange, options);
  const apiNameChange = await responseNameChange.json();

  const itemName = apiNameChange.item.name;
  const itemIcon = apiNameChange.item.icon;
  const itemTrend = apiNameChange.item.today.trend;
  const item30DayChange = apiNameChange.item.day30.change;
  const item90DayChange = apiNameChange.item.day90.change;
  const item180DayChange = apiNameChange.item.day180.change;

  // Ticker item name, price, percent change
  const tickerItem1 = `${itemName} ${apiNameChange.item.current.price} - (${item30DayChange})`;

  // --------------------------------------------------------

  // Grabs alch values/ge sell limit
  const urlAlchGeLimit =
    await 'https://prices.runescape.wiki/api/v1/osrs/mapping';

  const geLimitresponse = await fetch(urlAlchGeLimit, options);
  const apiGeLimit = await geLimitresponse.json();

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

  const highAlchVal = apiGeLimit[mappingTest].highalch;
  const lowAlchVal = apiGeLimit[mappingTest].lowalch;
  const geLimit = apiGeLimit[mappingTest].limit;

  // --------------------------------------------------------

  // Grabs current/offer price from 5min avg

  // const urlFiveMin = await 'https://prices.runescape.wiki/api/v1/osrs/5m';
  const urlFiveMin =
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${itemID}`;

  const fiveMinresponse = await fetch(urlFiveMin, options);
  const apiFiveMin = await fiveMinresponse.json();

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
  const urlLatest =
    await `https://prices.runescape.wiki/api/v1/osrs/latest?id=${itemID}`;

  const latestResponse = await fetch(urlLatest, options);
  const apiLatest = await latestResponse.json();

  const latestCurrentPrice = apiLatest.data[itemID].high;
  const latestOfferPrice = Math.floor(
    (apiLatest.data[itemID].high + apiLatest.data[itemID].low) / 2
  );
  const latestSellPrice = apiLatest.data[itemID].high;

  // --------------------------------------------------------

  // Grabs average high/low prices/hour and hourly volume
  // const urlHour = await 'https://prices.runescape.wiki/api/v1/osrs/1h';
  const urlHour =
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=5m&id=${itemID}`;

  const hourResponse = await fetch(urlHour, options);
  const apiHour = await hourResponse.json();

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

  // Five minute graph fetch
  const graphMinLink =
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${fiveMin}&id=${itemID}`;

  const graphMinFetch = await fetch(graphMinLink);

  const graphMinJSON = await graphMinFetch.json();

  graphArray.fiveMin['5 Minute'] = {
    price: Math.floor(
      (graphMinJSON.data[0].avgHighPrice + graphMinJSON.data[0].avgLowPrice) / 2
    ),
    volume:
      graphMinJSON.data[0].highPriceVolume +
      graphMinJSON.data[0].lowPriceVolume,
  };
  graphArray.fiveMin['4 Minute'] = {
    price: Math.floor(
      (graphMinJSON.data[59].avgHighPrice + graphMinJSON.data[59].avgLowPrice) /
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
  const graphHourLink =
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${oneHour}&id=${itemID}`;

  const graphHourFetch = await fetch(graphHourLink);

  const graphHourJSON = await graphHourFetch.json();

  graphArray.oneHour['1 Hour'] = {
    price: Math.floor(
      (graphHourJSON.data[0].avgHighPrice + graphHourJSON.data[0].avgLowPrice) /
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
  const graphSixHourLink =
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${sixHour}&id=${itemID}`;

  const graphSixHourFetch = await fetch(graphSixHourLink);

  const graphSixHourJSON = await graphSixHourFetch.json();

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
    todayTrend: itemTrend,
    item30DayTrend: item30DayChange,
    item90DayTrend: item90DayChange,
    item180DayTrend: item180DayChange,
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;

// CD TO SERVER BEFORE NODEMON SERVER
// localhost:5000 for api call
