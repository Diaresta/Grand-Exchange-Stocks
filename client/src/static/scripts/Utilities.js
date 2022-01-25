export const itemNameCall = async (itemArray) => {
  const defaultWindow = window.location.pathname.split('/')[1];
  const itemLinkID = window.location.pathname.split('/')[3];

  if (defaultWindow === '' || defaultWindow === 'home') {
    var url = await `http://localhost:8000/item/${itemArray}`;
  } else {
    var url = await `http://localhost:8000/item/${itemLinkID}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  const item = { name: data.name, id: itemLinkID };

  console.log(item);
  return item;
};

// Regex to check if input is a valid email
export const emailValidate = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(email.toLowerCase());
};

// Check for login token
export const checkToken = () => {
  if (localStorage.getItem('token') != null) {
    return true;
  } else {
    return false;
  }
};

// Logout of account
export const logOut = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

// ---------- Potential check if provided email is in database ----------
// export const emailInUseCheck = (emailToCheck) => {
//   axios
//     .get(`http://localhost:8000/api/account/email/${emailToCheck}`)
//     .then((emailData) => {
//       if (emailData.data !== '') {
//         return true;
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// export const updatePassword = (checkPass, currPass, newPass) => {
//   axios
//     .post(`http://localhost:8000/api/account/password/change`, {
//       passwordToCheck: checkPass,
//       currentPassword: currPass,
//       newPassword: newPass,
//       token: localStorage.getItem('token'),
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// Formats date to Y/M/D
export const dateFormat = (date) => {
  return date.split('T')[0];
};
