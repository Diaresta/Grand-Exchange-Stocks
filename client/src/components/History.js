const History = () => {
  return (
    <div id='history-container'>
      <h4>History</h4>
      <div id='table-container'>
        <table>
          <thead>
            <tr>
              {/* <th>Item</th> */}
              <th>Quantity</th>
              <th>Buy/Sell Price</th>
              <th>Overall</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>Abyssal Whip</td> */}
              <td>4</td>
              <td>1,372,382</td>
              <td>5,489,528</td>
              <td>06/30/2021 - 22:30:54</td>
            </tr>
            <tr>
              {/* <td>Bandos Chestplate</td> */}
              <td>1</td>
              <td>14,571,116</td>
              <td>14,571,116</td>
              <td>06/30/2021 - 22:33:23</td>
            </tr>
            <tr>
              {/* <td>Bandos Chestplate</td> */}
              <td>1</td>
              <td>14,571,116</td>
              <td>14,571,116</td>
              <td>06/30/2021 - 22:33:23</td>
            </tr>
            <tr>
              {/* <td>Abyssal Whip</td> */}
              <td>4</td>
              <td>1,372,382</td>
              <td>5,489,528</td>
              <td>06/30/2021 - 22:30:54</td>
            </tr>
          </tbody>
          <div id='history-btn-div'>
            <button>Next</button>
            <button>Previous</button>
            <p id='page-text'>Page 1 of 4</p>
          </div>
        </table>
      </div>
    </div>
  );
};

export default History;
