import React, { useState } from "react";
import "./styles.css";

function RegPage()
{
  return (
    <div className="app">
      <div className="login-form">
            <div className="title"> <center><strong>Registered Successfully!!!</strong></center></div>
            <div className="title"> <center>Your credentials are sent on registered email</center></div>
            <p className="forgot-password text-right my-3">
                <a href="/login"><center>Back to Login</center></a>
            </p>
      </div>
    </div>
  );
}

export default RegPage;