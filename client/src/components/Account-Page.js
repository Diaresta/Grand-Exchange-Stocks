import { Link } from 'react-router-dom';
import Footer from './Footer';

const AccountPage = ({ testName, testEmail }) => {
  return (
    <div id='log-sign-page'>
      <div className='log-sign-container'>
        <div className='form-container'>
          <h2>{testName}</h2>
          <form>
            <h2>Update E-Mail</h2>
            <input
              type='text'
              placeholder='Update Email'
              value={testEmail}
              required
            />
            <input type='text' placeholder='Current Password' required />
            <br />
            <button>Save</button>
          </form>

          <form>
            <h2>Update Password</h2>
            <input type='text' placeholder='Current Password' required></input>
            <input type='text' placeholder='New Password' required></input>
            <input
              type='text'
              placeholder='Verify New Password'
              required
            ></input>
            <br />
            <button>Save</button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountPage;
