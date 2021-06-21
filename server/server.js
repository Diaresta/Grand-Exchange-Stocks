import express from 'express';
import cors from 'cors';
// import itemData from './api/itemData.route.js';
import restaurants from './api/restaurants.route.js';

import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/api', itemData);
app.use('/api/v1/restaurants', restaurants);

// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

app.get('/', async (req, res) => {
  const url =
    'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=4151';

  const options = {
    method: 'GET',
  };

  const response = await fetch(url, options);
  const data = await response.json();
  // res.json(response);
  console.log(data);
});
// ^^^^ when the route is reached, the api is called and logs data. Maybe add headers

export default app;

// CD TO SERVER BEFORE NODEMON SERVER
