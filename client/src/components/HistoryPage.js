import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LogIn from './Log-In';

// Gets transactions from server by account
const itemHistoryCall = async (accountID) => {
  return axios
    .get(`http://localhost:8000/api/transaction/${accountID}`)
    .then(({ data }) => {
      return data[0].transactions;
    })
    .catch((err) => {
      console.error(err);
    });
};

const sortItems = (arrayToSort, sortBy) => {
  if (sortBy === 'itemName') {
    return arrayToSort.sort((a, b) => a.name > b.name);
  }

  return sortBy;
};

const HistoryPage = ({ checkToken, logData }) => {
  const [itemHistory, setItemHistory] = useState([]);

  useEffect(() => {
    itemHistoryCall(logData._id).then((data) => {
      setItemHistory(data.reverse());
    });
  }, []);

  return checkToken ? (
    <div id='history-container'>
      <h1>Buy/Sell History</h1>
      <div id='table-container'>
        <div>
          <select value='Sort'>
            <option
              onChange={(e) => {
                setItemHistory(sortItems([...itemHistory], 'itemName'));
                console.log(itemHistory);
              }}
            >
              Item
            </option>
            <option>Quantity</option>
            <option>Price</option>
            <option>Overall</option>
            <option>Date</option>
          </select>
        </div>
        <table id='page-table'>
          <thead>
            <tr>
              {/* <th>Item</th> */}
              <th>Item</th>
              <th>Quantity</th>
              <th>Buy/Sell Price</th>
              <th>Overall</th>
              <th>Date(M/D/Y)</th>
            </tr>
          </thead>
          <tbody>
            {itemHistory.map((item) => (
              <tr>
                <td>
                  <a href={`/item/${item.name}/${item.id}`}>{item.name}</a>
                </td>
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
    (window.location.href = '/login')
  );
};

export default HistoryPage;
