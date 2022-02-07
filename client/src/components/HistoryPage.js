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

// Sort array by its object key/values
const sortItems = (arrayToSort, sortBy) => {
  if (sortBy === 'itemName') {
    return arrayToSort.sort((a, b) => a.name > b.name);
  } else if (sortBy === 'itemQuantity') {
    return arrayToSort.sort((a, b) => a.quantity < b.quantity);
  } else if (sortBy === 'itemPrice') {
    return arrayToSort.sort((a, b) => a.price < b.price);
  } else if (sortBy === 'itemOverall') {
    return arrayToSort.sort((a, b) => a.overall < b.overall);
  } else if (sortBy === 'itemDate') {
    return arrayToSort.sort((a, b) => a.date > b.date);
  } else if (sortBy === 'default') {
    return arrayToSort.sort((a, b) => a.date < b.date);
  }
  return arrayToSort;
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
        <div id='sort-menu'>
          <button className='drop-btn'>Sort</button>
          <div id='sort-content'>
            <button
              className='sort-btn'
              onClick={(e) => {
                setItemHistory(sortItems([...itemHistory], 'itemName'));
              }}
            >
              Item &nbsp;
              <i class='fas fa-sort-amount-up' />
            </button>
            <button
              className='sort-btn'
              onClick={(e) => {
                setItemHistory(sortItems([...itemHistory], 'itemQuantity'));
              }}
            >
              Quantity&nbsp;
              <i class='fas fa-sort-amount-up' />
            </button>
            <button
              className='sort-btn'
              onClick={(e) => {
                setItemHistory(sortItems([...itemHistory], 'itemPrice'));
              }}
            >
              Price&nbsp;
              <i class='fas fa-sort-amount-up' />
            </button>
            <button
              className='sort-btn'
              onClick={(e) => {
                setItemHistory(sortItems([...itemHistory], 'itemOverall'));
              }}
            >
              Overall&nbsp;
              <i class='fas fa-sort-amount-up' />
            </button>
            <button
              className='sort-btn'
              onClick={(e) => {
                setItemHistory(sortItems([...itemHistory], 'itemDate'));
              }}
            >
              Date&nbsp;
              <i class='fas fa-sort-amount-down-alt' />
            </button>
            <button
              className='sort-btn'
              onClick={(e) => {
                setItemHistory(sortItems([...itemHistory], 'default'));
              }}
            >
              Default
            </button>
          </div>
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
                <i class='fas fa-times' />
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
