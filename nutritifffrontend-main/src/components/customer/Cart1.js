import React from 'react'
import CustomerNavbar2 from './CustomerNavbar2';
import Footer from './Footer';
import Login from './Login';

function Cart() {
  var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if(isLoggedIn)
  {
      <>
        <CustomerNavbar2/>
        <h1>Cart {user}</h1>
        <Footer/>
      </>
  }
  else
  {
    return(
      <Login/>
    )
  }
}

export default Cart