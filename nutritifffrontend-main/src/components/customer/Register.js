import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

function Register() {

    const history = useHistory();
    const [message, setMessage] = useState("");
    const customerregister = (event) =>
    {
        event.preventDefault();
        debugger;
        var { uname, haddress, waddress, pincode, email, mobile, pass, cnfpass } = document.forms[0];
      if(pass.value !== cnfpass.value)
      {
        setMessage("Password is not matching");
      }
      else
      {
        var record = {"name": uname.value,
                        "home_address": haddress.value,
                        "work_address": waddress.value,
                        "pincode": pincode.value,
                        "email": email.value,
                        "password": pass.value,
                        "mob_no": mobile.value,
                    };
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>
        {
          debugger;
          if (helper.readyState === 4 && helper.status === 200 )
              {
                debugger;
                  var responseReceived = JSON.parse(helper.responseText);
                  if(responseReceived.affectedRows!== undefined 
                  && responseReceived.affectedRows>0)
                    {
                      console.log("Registered!!!");
                      history.push('/regpage');
                    }
                    else
                    {
                      setMessage("Something went wrong!");
                    }
              }
        };
        helper.open("POST", "http://localhost:9999/customer/register");
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(record));
      }
    };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title"> <center>Register</center></div>
          <div className="form">
              {/* <form onSubmit={handleSubmit}> */}
              <form onSubmit={customerregister}>
              <div className="input-container">
                  <label>Name</label>
                  <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                  <label>Home Address</label>
                  <input type="text" name="haddress" required />
                </div>
                <div className="input-container">
                  <label>Work Address</label>
                  <input type="text" name="waddress" required />
                </div>
                <div className="input-container">
                  <label>Pincode</label>
                  <input type="text" name="pincode" required />
                </div>
                <div className="input-container">
                  <label>Email Id</label>
                  <input type="email" name="email" required />
                </div>
                <div className="input-container">
                  <label>Mobile Number</label>
                  <input type="text" name="mobile" required />
                </div>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" name="pass" required />
                </div>
                <div className="input-container">
                  <label>Confirm Password </label>
                  <input type="password" name="cnfpass" required />
                </div>
                <div className="button-container">
                  <input type="submit" value="Register"/>
                </div>
                <center>
                <p className="forgot-password text-right my-3">
                   Already have account?<a href="/login">Login here</a>
                </p>
                </center>
              </form>
      </div>
      </div>
    </div>
  );
}

export default Register;