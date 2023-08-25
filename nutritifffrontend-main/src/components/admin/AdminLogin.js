import React, { useState } from "react";  
import { useHistory, Link } from "react-router-dom";
import "./styles.css";
import {createUrl} from '../../utils/utils'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});

  const errors =
  {
    pass: "Invalid Password"
  };

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const adminlogin = (event) =>
  {
    event.preventDefault();
    debugger;
        var {pass } = document.forms[0];
        var creds = pass.value
        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>
        {
          debugger;
            if (helper.readyState === 4 && helper.status === 200 )
                {
                  debugger;
                    var result = JSON.parse(helper.responseText);
                    var admin_id = result.adminId;
                    var password = result.password;

                    if (password===pass.value)
                    {
                        console.log("Logged in");
                        sessionStorage.setItem("user", admin_id);
                        sessionStorage.setItem("isLoggedIn",true);
                        toast.success("Logged in successfully")
                        history.push('/adminhome');
                    } else
                    {
                      console.log("Invalid creds...");
                    }
                }
        };
        const url = createUrl('api/admins/login')
        helper.open("POST", url);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(creds));
  };

debugger;
  return (
    
    <div className="app">
      <div className="login-form"> 
        <div className="title"> <center>Admin Sign In</center> </div>
          <div className="form">
              <form onSubmit={adminlogin}>
                <div className="input-container">
                  <label>Password </label>
                  <input type="password" name="pass" required />
                  {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                  <input type="submit" value="Login"/>
                </div>
              </form>
      </div>
      </div>
    </div>
  );
}

export default AdminLogin;