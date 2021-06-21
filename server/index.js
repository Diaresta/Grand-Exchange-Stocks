import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import RestaurantsDOA from './dao/restaurantsDAO.js';

dotenv.config();
const MongoClient = mongodb.MongoClient;

const PORT = process.env.PORT || 8000;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParse: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await RestaurantsDOA.injectDB(client);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  });

// import express from 'express';
// import cors from 'cors';
// import itemData from './api/itemData.route.js';
// import restaurants from './api/restaurants/route.js';

// const app = express();

// const PORT = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // app.use('/api', itemData);
// app.use('/api/v1/restaurants', restaurants);

// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // app.get('/api', (req, res) => {
// //   res.json({
// //     message: 'Ayyy boys',
// //   });
// //   console.log('reeee');
// // });

// // app.listen(PORT, () => {
// //   console.log(`Listening on port ${PORT}`);
// // });

// export default app;
