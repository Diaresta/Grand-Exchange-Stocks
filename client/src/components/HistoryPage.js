import { useState, useEffect } from 'react';
import axios from 'axios';
import { accountInfoCall } from '../static/scripts/Utilities';

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

// Deletes selected item from user's db
const itemDelete = async (accountID, itemID) => {
  axios
    .delete('http://localhost:8000/api/transaction/delete', {
      data: {
        userID: accountID,
        _id: itemID,
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.err(err);
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

const HistoryPage = ({ checkToken }) => {
  const [itemHistory, setItemHistory] = useState([]);
  const [id, setID] = useState();
  const [showDiv, setShowDiv] = useState('none');
  const [alertStyle, setAlertStyle] = useState({});
  const [deleteAlertText, setDeleteAlertText] = useState('');
  const [deleteItem, setDeleteItem] = useState({
    transID: '',
    itemID: '',
    itemName: '',
  });

  // Calls api and pulls item transaction history
  const accountHistoryCall = () => {
    accountInfoCall().then((data) => {
      setID(data._id);

      itemHistoryCall(data._id).then((data) => {
        if (!data) {
          return;
        } else {
          setItemHistory(data.reverse());
        }
      });
    });
  };

  // Shows delete item div
  const showDeleteItem = () => {
    if (showDiv === 'none') {
      setShowDiv('flex');
    } else {
      setShowDiv('none');
    }
  };

  // Pop up alert for forms/input elements
  const fadeOutAlert = (background, border) => {
    setAlertStyle({
      display: 'flex',
      opacity: '1',
      backgroundColor: background,
      borderColor: border,
    });

    setTimeout(() => {
      setAlertStyle({
        display: 'flex',
        opacity: '0',
        backgroundColor: background,
        borderColor: border,
        transition: 'opacity .75s linear',
      });
    }, 750);

    setTimeout(() => {
      setAlertStyle({
        display: 'none',
      });
    }, 1500);
  };

  useEffect(() => {
    document.title = 'ge.teller - History';

    accountHistoryCall();
  }, []);

  return checkToken ? (
    <div id='history-container'>
      <h1>Buy/Sell History</h1>
      <div id='table-container'>
        <div
          id='account-delete-window'
          style={{
            display: `${showDiv}`,
          }}
        >
          <div>
            <span id='calc-alert' style={alertStyle}>
              {deleteAlertText}
            </span>
            <h2>
              Are you sure you want to delete your {deleteItem.itemName}{' '}
              transaction?
            </h2>
          </div>
          <div>
            <button
              id='account-delete-btn'
              onClick={() => {
                itemDelete(deleteItem.transID, deleteItem.itemID);
                setDeleteAlertText('Deleted!');
                fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');
                showDeleteItem();
                accountHistoryCall();
              }}
            >
              Yes, delete
            </button>
            <button onClick={showDeleteItem}>No, keep</button>
          </div>
        </div>
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
              <th>Item</th>
              <th>Quantity</th>
              <th>Buy/Sell Price</th>
              <th>Overall</th>
              <th className='table-date'>Date(M/D/Y)</th>
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
                <td className='table-date'>{item.date}</td>
                <i
                  onClick={(e) => {
                    if (showDiv === 'flex') {
                      return;
                    } else {
                      setDeleteItem({
                        transID: id,
                        itemID: item._id,
                        itemName: item.name,
                      });

                      showDeleteItem();
                    }
                  }}
                  class='fas fa-times'
                />
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
