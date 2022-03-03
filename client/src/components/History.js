import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { accountInfoCall } from '../static/scripts/Utilities';

const History = ({ checkToken, itemArray }) => {
  const [itemHistory, setItemHistory] = useState([]);

  // Calls API for item data
  const itemLinkCheck = async (accountID) => {
    const defaultWindow = window.location.pathname.split('/')[1];
    const itemLinkID = window.location.pathname.split('/')[3];

    if (defaultWindow === '' || defaultWindow === 'home') {
      var url =
        await `http://localhost:8000/api/transaction/${accountID}/${itemArray}`;
    } else {
      url =
        await `http://localhost:8000/api/transaction/${accountID}/${itemLinkID}`;
    }

    axios
      .get(url)
      .then(({ data }) => {
        setItemHistory(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    accountInfoCall().then((data) => {
      if (!data) {
        return;
      } else itemLinkCheck(data._id);
    });
  }, []);

  return checkToken ? (
    itemHistory.length ? (
      <div id='history-container'>
        <h4>
          <Link to='/history'>History</Link>
        </h4>
        <div id='table-container'>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Buy/Sell Price</th>
                <th>Overall</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {itemHistory.slice(0, 3).map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.quantity.toLocaleString()}</td>
                  <td>{item.price.toLocaleString()}g</td>
                  <td>{item.overall.toLocaleString()}g</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div id='history-btn-div'>
            <button id='next-btn'>Next</button>
            <button id='prev-btn'>Previous</button>
          </div>
          <p id='page-text'>Page 1 of 4</p> */}
        </div>
      </div>
    ) : (
      <div id='history-container'>
        <h4>
          <Link to='/history'>History</Link>
        </h4>

        <div id='history-log-container'>
          <p>
            You haven't bought any of this item. <br />
            Make a purchase above to track it's trend. <br />
          </p>
        </div>
      </div>
    )
  ) : (
    <div id='history-container'>
      <h4>
        <Link to='/history'>History</Link>
      </h4>

      <div id='history-log-container'>
        <p>
          Create an account to track your purchases and get full access to
          <span id='site-name'>
            &nbsp;ge<span id='period-color'>.</span>teller's
          </span>{' '}
          features!
        </p>

        <div id='log-sign-button-container'>
          <Link to='/login' className='log-in log-btn'>
            Log In
          </Link>
          <Link to='/signup' className='sign-up log-btn'>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default History;
