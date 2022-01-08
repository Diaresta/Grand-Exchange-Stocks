import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogIn from './Log-In';
import Footer from './Footer';
import { emailValidate, dateFormat } from '../static/scripts/Utilities';

const testUsername = 'Diaresta';

const logOut = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

const AccountPage = ({ testName, testEmail, loggedIn }) => {
  const [accountData, setAccountData] = useState([{}]);
  const [newEmail, setNewEmail] = useState('');
  const [newEmailVerify, setNewEmailVerify] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerify, setNewPasswordVerify] = useState('');
  const passwordPlaceholder = 'placeholder';

  const [showDiv, setShowDiv] = useState('none');

  const accountInfoCall = async (username) => {
    axios
      .get(`http://localhost:8000/api/account/${username}`)
      .then(({ data }) => {
        setAccountData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateEmail = async (username) => {
    if (emailValidate(newEmail) === false) {
      console.log('Please use a valid email');
    } else {
      axios
        .put(`http://localhost:8000/api/account/${username}`, {
          email: newEmail.toLowerCase(),
        })
        .catch((err) => {
          console.error(err);
        });
      console.log('Woo');
    }
  };

  const showDeleteAccount = () => {
    if (showDiv === 'none') {
      setShowDiv('flex');
    } else {
      setShowDiv('none');
    }
  };

  const deleteAccount = () => {};

  useEffect(() => {
    accountInfoCall(testUsername);
  }, []);

  return loggedIn ? (
    <div id='account-container'>
      <h2>Account Info</h2>

      <div id='account-page'>
        <div id='table-left'>
          <table>
            <tbody>
              <tr>
                <th>Account</th>
              </tr>
              <tr>
                <td>{accountData[0].username}</td>
              </tr>
              <tr>
                <th>Account ID</th>
              </tr>
              <tr>
                <td>{accountData[0]._id}</td>
              </tr>
              <tr>
                <th>Sign-up Date (Y/M/D)</th>
              </tr>
              <tr>
                <td>{dateFormat(accountData[0].signUpDate)}</td>
              </tr>
              <tr>
                <th>Email</th>
              </tr>
              <tr>
                <td>{accountData[0].email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id='table-right'>
          <form>
            <table>
              <tbody>
                <tr>
                  <th colSpan='2'>Email</th>
                </tr>
                <tr>
                  <td>New Email:</td>
                  <td>
                    <input
                      type='email'
                      value={newEmail}
                      onInput={(e) => setNewEmail(e.target.value)}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>Verify Email:</td>
                  <td>
                    <input
                      type='email'
                      value={newEmailVerify}
                      onInput={(e) => setNewEmailVerify(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              </tbody>
              <button
                type='submit'
                onClick={(e) => {
                  // add check for @ and .com
                  if (newEmail !== newEmailVerify) {
                    console.log(`New Emails Don't Match`);
                    e.preventDefault();
                  } else if (newEmail === '' || newEmailVerify === '') {
                    console.log('Email(s) Missing');
                  } else {
                    e.preventDefault();
                    updateEmail(accountData[0].username);
                  }
                }}
              >
                Save
              </button>
            </table>
          </form>

          <table>
            <tbody>
              <tr>
                <th colSpan='2'>Password</th>
              </tr>
              <tr>
                <td>Current Password:</td>
                <td>
                  <input
                    type='password'
                    value={currentPassword}
                    onInput={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>New Password:</td>
                <td>
                  <input
                    type='password'
                    value={newPassword}
                    onInput={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Verify New Password:</td>
                <td>
                  <input
                    type='password'
                    value={newPasswordVerify}
                    onInput={(e) => setNewPasswordVerify(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
            <button
              type='submit'
              onClick={() => {
                if (currentPassword !== passwordPlaceholder) {
                  console.log('Wrong Password');
                } else if (
                  currentPassword === '' ||
                  newPassword === '' ||
                  newPasswordVerify === ''
                ) {
                  console.log('Password(s) Missing');
                } else if (newPassword !== newPasswordVerify) {
                  console.log(`New Passwords Don't Match`);
                } else console.log('Woo');
              }}
            >
              Save
            </button>
          </table>
        </div>
      </div>

      <div id='account-button-div'>
        <div>
          <Link to='/history'>
            <button>Item History</button>
          </Link>
          <button onClick={logOut}>Log Out</button>
          <button id='account-delete-btn' onClick={showDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>

      <div
        id='account-delete-window'
        style={{
          display: `${showDiv}`,
        }}
      >
        <div>
          <h2>Are you sure you want to delete your account?</h2>
          <small>(It'll be like you were never here)</small>
        </div>
        <div>
          <button id='account-delete-btn'>Yes, delete</button>
          <button onClick={showDeleteAccount}>No, I'll stay</button>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    (window.location.href = '/login')
  );
};

export default AccountPage;
