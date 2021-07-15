const LogIn = () => {
  return (
    <div id='log-sign-page'>
      <div class='log-sign-container'>
        <div class='form-container'>
          <h1>Log In</h1>
          <form>
            {/* <input type='text' placeholder='First Name...'></input>
        <input type='text' placeholder='Last Name...'></input> */}
            <input type='text' placeholder='Username'></input>
            <input type='text' placeholder='Password'></input>
            <br />
            <button class=''>Log In</button>
          </form>
        </div>
      </div>
      <div class='log-sign-footer'>
        <a href=''>Forgot Password?</a>
        <a href=''>Sign Up!</a>
        <a href=''>Privacy Policy</a>
      </div>
      {/* 
      <div class='log-sign-container'>
        <h1>Create Account</h1>
        <form>
          <div>
            <input type='text' placeholder='First Name'></input>
            <input type='text' placeholder='Last Name'></input>
          </div>
          <input type='text' placeholder='Username'></input>
          <input type='text' placeholder='Password'></input>
          <input type='text' placeholder='E-Mail'></input>
          <input type='' placeholder='Month'></input>
          <input type='' placeholder='Date'></input>
          <input type='date' placeholder='birthday'></input>
          <button class=''>Sign Up</button>
        </form>
      </div>
      <div class='log-sign-footer'>
        <a href=''>Forgot Password?</a>
        <a href=''>Sign Up!</a>
        <a href=''>Privacy Policy</a>
      </div> */}
    </div>
  );
};

export default LogIn;
