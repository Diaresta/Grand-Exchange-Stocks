import { useEffect, useState } from 'react';
import axios from 'axios';

const Calculator = ({ checkToken, itemArray }) => {
  const [itemName, setItemName] = useState();
  const [itemID, setItemID] = useState();
  const [priceValue, setPriceValue] = useState('');
  const [quantityValue, setQuantityValue] = useState('');
  const [btnDisable, setBtnDisable] = useState();
  const [alertText, setAlertText] = useState('');
  const [alertStyle, setAlertStyle] = useState();

  const [userID, setUserID] = useState('');
  const accountInfoCall = async () => {
    if (checkToken === false) {
    } else {
      axios
        .post(`http://localhost:8000/api/account/search/`, {
          token: localStorage.getItem('token'),
        })
        .then(({ data }) => {
          setUserID(data._id);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  // Item API call - (Name and ID)
  const itemNameCall = async () => {
    if (checkToken === false) {
    } else {
      const defaultWindow = window.location.pathname.split('/')[1];
      const itemLinkID = window.location.pathname.split('/')[3];

      if (defaultWindow === '' || defaultWindow === 'home') {
        var url = await `http://localhost:8000/item/${itemArray}`;
        setItemID(itemArray);
      } else {
        url = await `http://localhost:8000/item/${itemLinkID}`;
        setItemID(itemLinkID);
      }

      const res = await fetch(url);
      const data = await res.json();

      setItemName(data.name);
    }
  };

  // Purchase/Error alert animation
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

  // Buy/Sell button disable timer (stops spam purchase of items)
  const disableButton = () => {
    setBtnDisable(true);
    setTimeout(() => {
      setBtnDisable(false);
    }, 1750);
  };

  // Returns product of item Price and Quantity
  const calcCheck = (priceValue, quantityValue) => {
    if (isNaN(priceValue) === true || isNaN(quantityValue) === true) {
      return '???';
    } else {
      return priceValue * quantityValue;
    }
  };

  // Database API call - posts data of purchased item
  const itemPurchase = async (userID) => {
    if (checkToken === false) {
      window.location.href = '/login';
    } else if (
      priceValue + quantityValue === '' ||
      priceValue === '' ||
      quantityValue === ''
    ) {
      setAlertText('Price and Quantity required');
      fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
    } else if (isNaN(parseInt(priceValue + quantityValue)) === true) {
      setAlertText('Price and Quantity must be a number');
      fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
    } else {
      axios
        .post('http://localhost:8000/api/transaction', {
          accountID: userID,
          transactions: [
            {
              name: itemName,
              id: itemID,
              price: priceValue,
              quantity: quantityValue,
              overall: priceValue * quantityValue,
              date: new Date().toLocaleString(),
            },
          ],
        })
        .then((res) => {
          setAlertText('Purchased!');
          fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green');
          disableButton();
        })
        .catch((err) => {
          console.error(err);
          setAlertText('Error, try again');
          fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red');
        });
    }
  };

  useEffect(() => {
    itemNameCall();
    accountInfoCall();
  }, []);

  return (
    <div id='calculator-container'>
      <h4>Buy/Sell</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div id='input-container'>
          <div
            id='calc-form'
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor='buy-sell-input'>Buy/Sell Price:</label>
            <input
              type=''
              id='buy-sell-input'
              name='buy-sell'
              placeholder='Enter price here...'
              onChange={(e) => {
                setPriceValue(e.target.value);
              }}
              autocomplete='off'
              required
            ></input>
          </div>

          <div
            id='calc-form'
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor='quantity-input'>Quantity:</label>
            <input
              type=''
              id='quantity-input'
              name='quantity'
              placeholder='Enter quantity here...'
              onChange={(e) => {
                setQuantityValue(e.target.value);
              }}
              autocomplete='off'
              required
            ></input>
          </div>
        </div>

        <div id='input-container'>
          <div id='price-container'>
            <p id='form-overall'>Overall:</p>
            <p id='price-overall'>{calcCheck(priceValue, quantityValue)}g</p>
          </div>
          <div id='submit-container'>
            <button
              id='input-btn'
              onClick={(e) => {
                itemPurchase(userID);
              }}
              disabled={btnDisable}
            >
              Buy/Sell
            </button>
            <span id='calc-alert' style={alertStyle}>
              {alertText}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Calculator;
