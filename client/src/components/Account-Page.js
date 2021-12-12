import { Link } from 'react-router-dom';
import Footer from './Footer';

const AccountPage = ({ testName, testEmail }) => {
  return (
    <div id='account-page'>
      <h2>Account Info</h2>

      {/* <div className='log-sign-container'> */}
      <table>
        <tbody>
          <tr>
            <th>Account</th>
          </tr>
          <tr>
            <td>Diaresta</td>
          </tr>
          <tr>
            <th>Account ID</th>
          </tr>
          <tr>
            <td>000000</td>
          </tr>
          <tr>
            <th>Sign-up Date</th>
          </tr>
          <tr>
            <td>06/30/2021 - 22:33:23</td>
          </tr>
          <tr>
            <th>Email</th>
          </tr>
          <tr>
            <td>testemail123.@gmail.com</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>Email</th>
          </tr>
          <tr>
            <td>New Email:</td>
            <td>
              <input type='text' required />
            </td>
          </tr>
          <tr>
            <td>Verify Email:</td>
            <td>
              <input type='text' required />
            </td>
          </tr>
        </tbody>
        <button>Save</button>
      </table>

      <table>
        <tbody>
          <thead>
            <tr>
              <th>Password</th>
            </tr>
          </thead>
          <tr>
            <td>Current Password:</td>
            <td>
              <input type='text' required />
            </td>
          </tr>
          <tr>
            <td>New Password:</td>
            <td>
              <input type='text' required />
            </td>
          </tr>
          <tr>
            <td>Verify New Password:</td>
            <td>
              <input type='text' required />
            </td>
          </tr>
        </tbody>
        <button>Save</button>
      </table>
      {/* </div> */}

      <Footer />
    </div>
  );
};

export default AccountPage;
