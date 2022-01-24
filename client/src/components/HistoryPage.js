import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogIn from './Log-In';
import { checkToken } from '../static/scripts/Utilities';

const itemHistoryCall = async () => {
  return axios
    .get('http://localhost:8000/api/transaction')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

const HistoryPage = ({ loggedIn }) => {
  const [itemHistory, setItemHistory] = useState([{}]);

  useEffect(() => {
    itemHistoryCall().then((data) => {
      setItemHistory(data);
    });
  }, []);

  return checkToken() ? (
    <div id='history-container'>
      <h1>Buy/Sell History</h1>
      <div id='table-container'>
        <table id='page-table'>
          <thead>
            <tr>
              {/* <th>Item</th> */}
              <th>Item</th>
              <th>Quantity</th>
              <th>Buy/Sell Price</th>
              <th>Overall</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {itemHistory.map((item) => (
              <tr>
                <td>
                  <a href={`/item/${item.name}/${item.id}`}>{item.name}</a>
                </td>
                <td>{item.quantity}</td>
                <td>{item.price}g</td>
                <td>{item.overall}g</td>
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
    (window.location.href = '/login')
  );
};

export default HistoryPage;
