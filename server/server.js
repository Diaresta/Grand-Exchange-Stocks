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
  const itemIcon = apiNameChange.item.icon_large;
  const itemTrend = apiNameChange.item.today.trend;
  const item30DayChange = apiNameChange.item.day30.change;
  const item90DayChange = apiNameChange.item.day90.change;
  const item180DayChange = apiNameChange.item.day180.change;

  // Ticker item name, price, percent change
  const tickerItem1 = `${itemName} ${apiNameChange.item.current.price} - (${item30DayChange})`;
  console.log(tickerItem1);

  // Grabs alch values/ge sell limit
  const alchGeLimit = async () => {
    const urlAlchGeLimit =
      await 'https://prices.runescape.wiki/api/v1/osrs/mapping';

    const options = {
      method: 'GET',
    };

    const response = await fetch(urlAlchGeLimit, options);
    const apiGeLimit = await response.json();

    // random for testing
    const randomMapping = Math.floor(Math.random() * apiGeLimit.length);

    const highAlchVal = apiGeLimit[randomMapping].highalch;
    const lowAlchVal = apiGeLimit[randomMapping].lowalch;
    const geLimit = apiGeLimit[randomMapping].limit;

    console.log(highAlchVal, lowAlchVal, geLimit);
  };

  alchGeLimit();

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
