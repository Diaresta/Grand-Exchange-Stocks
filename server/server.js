import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Account from './db/dbAccounts.js';
import Transactions from './db/dbTransactions.js';
import Contact from './db/dbContact.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();
mongoose.connect(process.env.GETELLERDB, {});

// Create account in db
app.post('/api/account/create', async (req, res) => {
  const passHash = await bcrypt.hash(req.body.password, 10);
  const dbAccount = await {
    username: req.body.username,
    password: passHash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    recoveryQuestion: req.body.recoveryQuestion,
    recoveryAnswer: req.body.recoveryAnswer,
    signUpDate: req.body.signUpDate,
  };

  // Backend check for form parameters ----------
  if (!dbAccount.username || typeof dbAccount.username !== 'string') {
    return res
      .status(400)
      .json({ status: 'Error', error: 'Please enter a valid username' });
  }

  if (dbAccount.username.length < 3 || dbAccount.username.length > 20) {
    return res.status(400).json({
      status: 'Error',
      error: 'Username must be 3- 20 characters',
    });
  }

  if (!dbAccount.email || typeof dbAccount.email !== 'string') {
    return res
      .status(400)
      .send({ status: 'Error', error: 'Please enter a valid email' });
  }

  if (dbAccount.email.length < 12 || dbAccount.email.length > 40) {
    return res.status(400).send({
      status: 'Error',
      error: 'Email must be 12- 40 characters',
    });
  }

  if (!dbAccount.firstName || typeof dbAccount.firstName !== 'string') {
    return res
      .status(400)
      .send({ status: 'Error', error: 'Please enter a valid first name' });
  }

  if (!dbAccount.lastName || typeof dbAccount.lastName !== 'string') {
    return res
      .status(400)
      .send({ status: 'Error', error: 'Please enter a valid last name' });
  }

  if (!req.body.password || typeof req.body.password !== 'string') {
    return res.status(400).send({
      status: 'Error',
      error: 'Please enter a valid password',
    });
  }

  if (req.body.password.length < 5) {
    return res.status(400).send({
      status: 'Error',
      error: 'Password must be >5 characters',
    });
  }

  if (
    !dbAccount.recoveryQuestion ||
    typeof dbAccount.recoveryQuestion !== 'string'
  ) {
    return res.status(400).json({
      status: 'Error',
      error: 'Please choose a valid recovery question',
    });
  }

  if (
    !dbAccount.recoveryAnswer ||
    typeof dbAccount.recoveryAnswer !== 'string'
  ) {
    return res.status(400).json({
      status: 'Error',
      error: 'Please enter a valid recovery answer',
    });
  }

  Account.create(dbAccount, (err, data) => {
    if (err) {
      if (err.code === 11000) {
        res
          .status(409)
          .json({ status: 'Error', error: 'Username/Email already in use' });
      } else {
        res.status(500).send(err);
      }
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

// Parse db for account(s) by username /* replaced with search id from jwt */
// app.get('/api/account/search/:accountUsername', (req, res) => {
//   Account.find(
//     { username: req.params.accountUsername.toLowerCase() },
//     (err, data) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.status(200).send(data);
//       }
//     }
//   );
// });

// Parse db for account by id and return data
app.post('/api/account/search/', (req, res) => {
  const { token } = req.body;
  const account = jwt.verify(JSON.parse(token), process.env.JWT_KEY);

  Account.findById({ _id: account.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Parse db for account and update account info
app.put('/api/account/search/:accountID', (req, res) => {
  Account.findOneAndUpdate({ _id: req.params.accountID }, req.body, {
    new: true,
  })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err));
});

// Parse db for account(s) by email
app.get('/api/account/email/search/:accountEmail', (req, res) => {
  Account.findOne(
    { email: req.params.accountEmail.toLowerCase() },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else if (!data) {
        res.status(500).send({ error: 'Email Not Found' });
      } else {
        res.status(200).send(data);
      }
    }
  );
});

// Parse db for account and change password
app.post('/api/account/password/change', async (req, res) => {
  const { token, newPassword, currentPassword, passwordToCheck } = req.body;

  if (!newPassword || typeof newPassword !== 'string') {
    return res.status(400).send({
      status: 'Error',
      error: 'Please enter a valid password',
    });
  }

  if (newPassword.length < 5) {
    return res.status(400).send({
      status: 'Error',
      error: 'Password must be >5 characters',
    });
  }

  if ((await bcrypt.compare(passwordToCheck, currentPassword)) === false) {
    return res.json({
      status: 'error',
      error: `Current Password is Incorrect`,
      text: `Current Password is Incorrect`,
      success: false,
    });
  } else if ((await bcrypt.compare(newPassword, currentPassword)) === true) {
    return res.json({
      status: 'error',
      error: `Please Use a New Password`,
      text: `Please Use a New Password`,
      success: false,
    });
  } else if (
    (await bcrypt.compare(passwordToCheck, currentPassword)) === true
  ) {
    try {
      const account = jwt.verify(JSON.parse(token), process.env.JWT_KEY);
      const passHash = await bcrypt.hash(newPassword, 10);

      await Account.updateOne(
        { _id: account.id },
        {
          $set: { password: passHash },
        }
      )
        .then((data) => {})
        .catch((err) => res.send(err));

      res.json({
        status: 'ok',
        data: token,
        text: `Password Successfully Changed!`,
        success: true,
      });
    } catch (err) {
      res.json({
        status: 'error',
        error: `Couldn't verify log-in authenticity `,
        success: false,
      });
    }
  }
});

// Parse db for account and recover and update password
app.post('/api/account/password/recover', async (req, res) => {
  const { accountID, newPassword } = req.body;

  if (!newPassword || typeof newPassword !== 'string') {
    return res.status(400).send({
      status: 'Error',
      error: 'Please enter a valid password',
    });
  }

  if (newPassword.length < 5) {
    return res.status(400).send({
      status: 'Error',
      error: 'Password must be >5 characters',
    });
  }

  try {
    const passHash = await bcrypt.hash(newPassword, 10);

    await Account.updateOne(
      { _id: accountID },
      {
        $set: { password: passHash },
      }
    )
      .then((data) => {})
      .catch((err) => res.send(err));

    res.json({
      status: 'ok',
      data: accountID,
      text: `Password Successfully Updated!`,
      success: true,
    });
  } catch (err) {
    res.json({
      status: 'error',
      error: `Couldn't verify log-in authenticity `,
      success: false,
    });
  }
});

// Parse db for account and log in
app.post('/api/account/login', async (req, res) => {
  const loginAttempt = await {
    logUsername: req.body.username.toLowerCase(),
    logPassword: req.body.password,
  };

  const account = await Account.findOne({
    username: loginAttempt.logUsername,
  });

  if (!account) {
    return res.json({
      status: 'error',
      error: 'No Account Found',
      user: false,
    });
  }

  if (
    (await bcrypt.compare(loginAttempt.logPassword, account.password)) === true
  ) {
    const token = jwt.sign(
      {
        id: account._id,
        username: account.username,
      },
      process.env.JWT_KEY
    );

    return res.json({ status: 200, token: token, user: true });
  } else {
    return res.json({
      status: 'error',
      error: 'Incorrect Password',
      user: false,
    });
  }
});

// Parse db for account and delete
app.delete('/api/account/delete/:accountID', async (req, res) => {
  Account.findByIdAndRemove({ _id: req.params.accountID })
    .then((data) => {
      return res.json({ status: 'Account Deleted!', info: data });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Create item transaction in db
app.post('/api/transaction', async (req, res) => {
  const dbTransaction = req.body;

  const findAccount = await Transactions.find({
    accountID: dbTransaction.accountID,
  }).count();

  if (findAccount === 1) {
    Transactions.findOneAndUpdate(
      { accountID: dbTransaction.accountID },
      {
        $addToSet: {
          transactions: dbTransaction.transactions,
        },
      }
    )
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  } else if (findAccount !== 1) {
    Transactions.create(dbTransaction, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  }
});

// Parse db for all transactions
app.get('/api/transaction', (req, res) => {
  Transactions.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Parse db for transactions by account
app.get('/api/transaction/:accountID', (req, res) => {
  const dbTransaction = req.params.accountID;

  Transactions.find({ accountID: dbTransaction }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Parse db for transaction by account and item
app.get('/api/transaction/:accountID/:itemID', (req, res) => {
  const dbTransaction = req.params.accountID;
  const itemID = parseInt(req.params.itemID);
  let itemReturn = [];

  Transactions.find({ accountID: dbTransaction }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else if (data.length === 0) {
      return;
    } else {
      for (let i = 0; i < data[0].transactions.length; i++) {
        var parseData = data[0].transactions[i];
        if (parseData.id === itemID) {
          itemReturn.push(parseData);
        }
      }
      res.status(200).send(itemReturn);
    }
  });
});

// Parsedb for transaction by account and item id and delete
app.delete('/api/transaction/delete', async (req, res) => {
  const dbTransaction = req.body;

  Transactions.findOneAndUpdate(
    {
      accountID: dbTransaction.userID,
    },
    {
      $pull: {
        transactions: { _id: dbTransaction._id },
      },
    },
    { new: true }
  )
    .then((data) => {
      res.status(200).send('Item removed from history!');
    })
    .catch((err) => {
      res.status(500).send('Something went wrong. Try again');
    });
});

// Parses item API and updates our item db to parity
app.get('/admin/api/items/itemupdate/', async (req, res) => {
  let itemDB = [];

  let getItemData = await axios.get(
    'https://prices.runescape.wiki/api/v1/osrs/mapping'
  );

  let itemReponse = await getItemData.data;

  for (let i = 0; i < itemReponse.length; i++) {
    itemDB.push({
      id: itemReponse[i].id,
      name: itemReponse[i].name.toLowerCase(),
    });
  }

  res.send(itemDB);
});

// Create contact message in db
app.post('/api/contact/create', async (req, res) => {
  const dbContact = await {
    username: req.body.username,
    email: req.body.email,
    message: req.body.message,
    contactDate: req.body.contactDate,
  };

  // Backend check for form parameters ----------
  if (!dbContact.username || typeof dbContact.username !== 'string') {
    return res
      .status(400)
      .json({ status: 'Error', error: 'Please enter a valid username' });
  }

  if (dbContact.username.length < 3 || dbContact.username.length > 20) {
    return res.status(400).json({
      status: 'Error',
      error: 'Username must be 3- 20 characters',
    });
  }

  if (!dbContact.email || typeof dbContact.email !== 'string') {
    return res
      .status(400)
      .send({ status: 'Error', error: 'Please enter a valid email' });
  }

  if (dbContact.email.length < 12 || dbContact.email.length > 40) {
    return res.status(400).send({
      status: 'Error',
      error: 'Email must be 12- 40 characters',
    });
  }

  if (dbContact.message.length < 5) {
    return res.status(400).json({
      status: 'Error',
      error: 'Message must be at least 5 characters',
    });
  }

  Contact.create(dbContact, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Array of items for ticker
var itemArray = [
  [24626, 4156, 12998, 1397, 573, 5631, 11836],
  [2, 4151, 11832, 1073, 6585, 11802, 4587],
  [2434, 12924, 19544, 4749, 9242, 13237, 20997],
  [561, 20097, 21012, 21021, 21024, 21034, 21079],
];
var tickerArray = [];

app.get('/', (req, res) => res.status(200).send('welcome gamers'));

app.get(`/item/:itemID`, async (req, res) => {
  let parsedArray = itemArray[Math.floor(Math.random() * 4)];

  for (let i = 0; i < 7; i++) {
    setTickerArray(parsedArray[i]);
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
