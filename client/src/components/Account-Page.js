import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogIn from './Log-In';
import Footer from './Footer';
import {
  emailValidate,
  dateFormat,
  updatePassword,
} from '../static/scripts/Utilities';

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
  const [formatDate, setFormatDate] = useState('');
  const [emailAlertText, setEmailAlertText] = useState('');
  const [passAlertText, setPassAlertText] = useState('');
  const [deleteAlertText, setDeleteAlertText] = useState('');
  const [alertStyle, setAlertStyle] = useState({
    email: {},
    pass: {},
    delete: {},
  });

  const [showDiv, setShowDiv] = useState('none');

  // Swap to pulling account id from login token
  const accountInfoCall = async (username) => {
    axios
      .get(`http://localhost:8000/api/account/search/${username}`)
      .then(({ data }) => {
        setAccountData(data);
        setFormatDate(dateFormat(data[0].signUpDate));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // maybe remove async and go back to if return true/false
  const updateEmail = async (accountID, emailToCheck, dbEmail) => {
    axios
      .get(`http://localhost:8000/api/account/email/search/${emailToCheck}`)
      .then((emailData) => {
        if (emailData.data !== '') {
          setEmailAlertText('Email is currently in use');
          fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'email');
        } else {
          axios
            .put(`http://localhost:8000/api/account/search/${accountID}`, {
              email: newEmail.toLowerCase(),
            })
            .catch((err) => {
              console.error(err);
            });
          setEmailAlertText('Email Successfully emd');
          fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green', 'email');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const fadeOutAlert = (background, border, element) => {
    if (element === 'email') {
      setAlertStyle({
        email: {
          display: 'flex',
          opacity: '1',
          backgroundColor: background,
          borderColor: border,
        },
        pass: {
          display: 'none',
        },
      });

      setTimeout(() => {
        setAlertStyle({
          email: {
            display: 'flex',
            opacity: '0',
            backgroundColor: background,
            borderColor: border,
            transition: 'opacity .75s linear',
          },
        });
      }, 750);

      setTimeout(() => {
        setAlertStyle({
          email: {
            display: 'none',
          },
        });
      }, 1500);
    } else if (element === 'pass') {
      setAlertStyle({
        pass: {
          display: 'flex',
          opacity: '1',
          backgroundColor: background,
          borderColor: border,
        },
        email: {
          display: 'none',
        },
      });

      setTimeout(() => {
        setAlertStyle({
          pass: {
            display: 'flex',
            opacity: '0',
            backgroundColor: background,
            borderColor: border,
            transition: 'opacity .75s linear',
          },
        });
      }, 750);

      setTimeout(() => {
        setAlertStyle({
          pass: {
            display: 'none',
          },
        });
      }, 1500);
    } else if (element === 'delete') {
      setAlertStyle({
        delete: {
          display: 'flex',
          opacity: '1',
          backgroundColor: background,
          borderColor: border,
        },
      });

      setTimeout(() => {
        setAlertStyle({
          delete: {
            display: 'flex',
            opacity: '0',
            backgroundColor: background,
            borderColor: border,
            transition: 'opacity .75s linear',
          },
        });
      }, 750);

      setTimeout(() => {
        setAlertStyle({
          delete: {
            display: 'none',
          },
        });
      }, 1500);
    }
  };

  const showDeleteAccount = () => {
    if (showDiv === 'none') {
      setShowDiv('flex');
    } else {
      setShowDiv('none');
    }
  };

  const deleteAccount = (ID) => {
    axios
      .delete(`http://localhost:8000/api/account/delete/${ID}`, {
        accountID: ID,
      })
      .then((data) => {
        setDeleteAlertText(data.data.status);
        fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green', 'delete');
        setTimeout(() => {
          logOut();
        }, 1500);
      })
      .catch((err) => {
        setDeleteAlertText("Account couldn't be deleted");
        fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'delete');
      });
  };

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
                <td>{formatDate}</td>
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
                    e.preventDefault();
                    setEmailAlertText(`New Emails Don't Match`);
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'email');
                  } else if (newEmail === '' || newEmailVerify === '') {
                    setEmailAlertText('Email(s) Missing');
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'email');
                  } else if (
                    newEmailVerify.length < 12 ||
                    newEmailVerify.length > 40
                  ) {
                    e.preventDefault();
                    setEmailAlertText('Email must be 12- 40 characters');
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'email');
                  } else if (emailValidate(newEmail) === false) {
                    e.preventDefault();
                    setEmailAlertText('Please use a valid email');
                    fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'email');
                  } else {
                    e.preventDefault();
                    updateEmail(
                      accountData[0]._id,
                      newEmailVerify,
                      accountData[0].email
                    );
                  }
                }}
              >
                Save
              </button>
              <span id='calc-alert' style={alertStyle.email}>
                {emailAlertText}
              </span>
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
              onClick={(e) => {
                updatePassword(accountData[0].password, newPasswordVerify);
                // if (
                //   currentPassword === '' ||
                //   newPassword === '' ||
                //   newPasswordVerify === ''
                // ) {
                //   setPassAlertText('Password(s) Missing');
                //   fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                // } else if (
                //   currentPassword.length < 5 ||
                //   newPassword.length < 5 ||
                //   newPasswordVerify.length < 5
                // ) {
                //   e.preventDefault();
                //   setPassAlertText('Password must be >5 characters');
                //   fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                // } else if (currentPassword !== accountData[0].password) {
                //   setPassAlertText('Current Password Incorrect');
                //   fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                // } else if (newPassword !== newPasswordVerify) {
                //   setPassAlertText(`New Passwords Don't Match`);
                //   fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                // } else if (
                //   updatePassword(accountData[0].password, newPasswordVerify) ===
                //   false
                // ) {
                //   setPassAlertText('Please Use a New Password');
                //   fadeOutAlert('rgba(245, 0, 0, 0.8)', 'red', 'pass');
                // } else if (
                //   updatePassword(accountData[0].password, newPasswordVerify) ===
                //   true
                // ) {
                //   setPassAlertText('Password Successfully Changed');
                //   fadeOutAlert('rgba(51, 185, 78, 0.8)', 'green', 'pass');
                //   // Update account pass in db
                // }
              }}
            >
              Save
            </button>
            <span id='calc-alert' style={alertStyle.pass}>
              {passAlertText}
            </span>
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
          <span id='calc-alert' style={alertStyle.delete}>
            {deleteAlertText}
          </span>
          <h2>Are you sure you want to delete your account?</h2>
          <small>(It'll be like you were never here)</small>
        </div>
        <div>
          <button
            id='account-delete-btn'
            onClick={() => {
              deleteAccount(accountData[0]._id);
            }}
          >
            Yes, delete
          </button>
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
