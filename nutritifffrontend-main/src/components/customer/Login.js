import React, { useState } from "react";  
import { useHistory, Link } from "react-router-dom";
import "./styles.css";

function Login() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});

  const errors =
  {
    uemail: "Invalid EmailId",
    pass: "Invalid Password"
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const customerlogin = (event) =>
  {
    event.preventDefault();
    debugger;
        var { uname, pass } = document.forms[0];
        var creds = {"email": uname.value, "password":pass.value};
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>
        {
          debugger;
            if (helper.readyState === 4 && helper.status === 200 )
                {
                  debugger;
                    var result = JSON.parse(helper.responseText);
                    var username = result[0].name;
                    var email = result[0].email;
                    var customerId = result[0].customer_id;

                    if (email===uname.value)
                    {
                        console.log("Logged in");
                        sessionStorage.setItem("user", username);
                        sessionStorage.setItem("isLoggedIn",true);
                        sessionStorage.setItem("customerId", customerId);
                        history.push('/');
                    } else
                    {
                      console.log("Invalid creds...");
                    }
                }
        };
        helper.open("POST", "http://localhost:9999/customer/login");
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(creds));
  };

debugger;
  return (
    
    <div className="app">
      <div className="login-form"> 
        <div className="title"> <center>Customer Sign In</center> </div>
          <div className="form">
              <form onSubmit={customerlogin}>
                <div className="input-container">
                  <label>Email </label>
                  <input type="email" name="uname" required />
                  {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" name="pass" required />
                  {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                  <input type="submit" value="Login"/>
                  {/* <a href="Home_copy.html">
                  <button type="button" class="btn btn-default">Login</button>
                  </a> */}
                </div>
                <center>
                <p className="forgot-password text-right my-3">
                  <Link to="/vendorlogin">Login as Vendor</Link>
                </p>
                <p className="forgot-password text-right my-3">
                  Don't have account? <a href="/register">Register here</a>
                </p>
                </center>
              </form>
      </div>
      </div>
    </div>
  );
}

export default Login;