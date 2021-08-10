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

// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

app.get('/', async (req, res) => {
  const options = {
    method: 'GET',
  };

  // Grabs item name, photo, trend, 30-180day price changes
  const urlNameChange =
    await 'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=4151';

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
  // console.log(tickerItem1);

  // --------------------------------------------------------

  // Grabs alch values/ge sell limit

  const urlAlchGeLimit =
    await 'https://prices.runescape.wiki/api/v1/osrs/mapping';

  const geLimitresponse = await fetch(urlAlchGeLimit, options);
  const apiGeLimit = await geLimitresponse.json();

  // random for testing
  const randomMapping = Math.floor(Math.random() * apiGeLimit.length);

  const highAlchVal = apiGeLimit[randomMapping].highalch;
  const lowAlchVal = apiGeLimit[randomMapping].lowalch;
  const geLimit = apiGeLimit[randomMapping].limit;

  // --------------------------------------------------------

  // Grabs current/offer price from 5min avg
  const urlFiveMin = await 'https://prices.runescape.wiki/api/v1/osrs/5m';

  const fiveMinresponse = await fetch(urlFiveMin, options);
  const apiFiveMin = await fiveMinresponse.json();

  const fiveMinCurrentPrice = apiFiveMin.data[4151].avgHighPrice;
  const fiveMinOfferPrice = apiFiveMin.data[4151].avgLowPrice;
  const fiveMinVolume =
    apiFiveMin.data[4151].highPriceVolume +
    apiFiveMin.data[4151].lowPriceVolume;
  const highAlchProfit = highAlchVal - fiveMinCurrentPrice;

  // --------------------------------------------------------

  // Grabs current/offer/sell price from latest
  const urlLatest =
    await 'https://prices.runescape.wiki/api/v1/osrs/latest?id=4151';

  const latestResponse = await fetch(urlLatest, options);
  const apiLatest = await latestResponse.json();

  const latestCurrentPrice = apiLatest.data[4151].low;
  const latestOfferPrice = Math.floor(
    (apiLatest.data[4151].high + apiLatest.data[4151].low) / 2
  );
  const latestSellPrice = apiLatest.data[4151].high;

  // --------------------------------------------------------

  // Grabs average high/low prices/hour and hourly volume

  const urlHour = await 'https://prices.runescape.wiki/api/v1/osrs/1h';

  const hourResponse = await fetch(urlHour, options);
  const apiHour = await hourResponse.json();

  const avgHighHour = apiHour.data[2].avgHighPrice;
  const avgLowHour = apiHour.data[2].avgLowPrice;
  const hourVolume =
    apiHour.data[2].highPriceVolume + apiHour.data[2].lowPriceVolume;

  // console.log(avgHighHour, avgLowHour, hourVolume);

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
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${fiveMin}&id=4151`;

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

  // ------------------------- **************** -------------------------------

  // 5min - 60 x min || 1hr - 5 x min || 6 hr - 1.2 x min
  // One hour graph fetch

  const graphHourLink =
    await `https://prices.runescape.wiki/api/v1/osrs/timeseries?timestep=${oneHour}&id=4151`;

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
      (graphHourJSON.data[59].avgHighPrice +
        graphHourJSON.data[59].avgLowPrice) /
        2
    ),
    volume:
      graphHourJSON.data[59].highPriceVolume +
      graphHourJSON.data[59].lowPriceVolume,
  };
  graphArray.oneHour['30 Minute'] = {
    price: Math.floor(
      (graphHourJSON.data[119].avgHighPrice +
        graphHourJSON.data[119].avgLowPrice) /
        2
    ),
    volume:
      graphHourJSON.data[119].highPriceVolume +
      graphHourJSON.data[119].lowPriceVolume,
  };
  graphArray.oneHour['15 Minute'] = {
    price: Math.floor(
      (graphHourJSON.data[179].avgHighPrice +
        graphHourJSON.data[179].avgLowPrice) /
        2
    ),
    volume:
      graphHourJSON.data[179].highPriceVolume +
      graphHourJSON.data[179].lowPriceVolume,
  };
  graphArray.oneHour['1 Minute'] = {
    price: Math.floor(
      (graphHourJSON.data[239].avgHighPrice +
        graphHourJSON.data[239].avgLowPrice) /
        2
    ),
    volume:
      graphHourJSON.data[239].highPriceVolume +
      graphHourJSON.data[239].lowPriceVolume,
  };

  console.log(graphArray);

  // ------------------------- **************** -------------------------------
  try {
    res.status(200).json({
      name: itemName,
      icon: itemIcon,
      currentPrice: fiveMinCurrentPrice.toLocaleString(),
      geLimit: geLimit.toLocaleString(),
      offerPrice: fiveMinOfferPrice.toLocaleString(),
      avgHighHour: avgHighHour.toLocaleString(),
      margin: (fiveMinCurrentPrice - fiveMinOfferPrice).toLocaleString(),
      avgLowHour: avgLowHour.toLocaleString(),
      highAlchValue: highAlchVal.toLocaleString(),
      highAlchProfit: parseInt(highAlchProfit).toLocaleString(),
      todayTrend: itemTrend,
      item30DayTrend: item30DayChange,
      item90DayTrend: item90DayChange,
      item180DayTrend: item180DayChange,
    });
  } catch {
    res.send('reee');
  }

  // ------------------------- **************** -------------------------------

  // --------------------------------------------------------

  // buySellHour();
  // latestCurrOfferSell();
  // fiveMinCurrOffer();
  // alchGeLimit();

  // const url = await 'https://prices.runescape.wiki/api/v1/osrs/latest';

  // const header = new Headers({
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  //   'User-Agent':
  //     'Hi, using for personal project to learn APIs. Thank you! @Diaresta#4220',
  // });

  // res.json(response);

  let itemIDS = [];

  // for (let i = 0; i < Object.keys(apiData.data).length; i++) {
  // const itemsArray = itemIDS.push(apiData.data[i]);
  // return itemsArray;
  // const stringAPI = JSON.stringify(apiData);
  // itemIDS.push(apiData.data[i]);
  // }

  // console.log(apiData.item.current.price);

  // console.log(itemIDS);
});
// ^^^^ when the route is reached, the api is called and logs data. Maybe add headers

export default app;

// CD TO SERVER BEFORE NODEMON SERVER
// localhost:5000 for api call
