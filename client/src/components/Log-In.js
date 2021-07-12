const LogIn = () => {
  return (
    <div>
      <div class='log-sign-container'>
        <h1>Log In</h1>
        <form>
          {/* <input type='text' placeholder='First Name...'></input>
        <input type='text' placeholder='Last Name...'></input> */}
          <input type='text' placeholder='Username'></input>
          <input type='text' placeholder='Password'></input>
          <button class=''>Log In</button>
        </form>
      </div>
      <div>
        <a href=''>Forgot Password?</a>
        <a href=''>Sign Up!</a>
        <a href=''>Privact Policy</a>
      </div>

      <div class='log-sign-container'>
        <h1>Create Account</h1>
        <form>
          <input type='text' placeholder='First Name'></input>
          <input type='text' placeholder='Last Name'></input>
          <input type='text' placeholder='E-Mail'></input>
          <input type='text' placeholder='Username'></input>
          <input type='text' placeholder='Password'></input>
          <input type='' placeholder='Month'></input>
          <input type='' placeholder='Date'></input>
          <input type='' placeholder='Year'></input>
          <button class=''>Sign Up</button>
        </form>
      </div>
      <div>
        <a href=''>Forgot Password?</a>
        <a href=''>Sign Up!</a>
        <a href=''>Privact Policy</a>
      </div>
    </div>
  );
};

export default LogIn;
