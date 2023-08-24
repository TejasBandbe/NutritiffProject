import React from 'react'
import CustomerNavbar2 from './CustomerNavbar2';
import Footer from './Footer';

function Cart() {
  var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    return (
      <>
        <CustomerNavbar2/>
        <h1>Cart {user}</h1>
        <Footer/>
      </>
      )
}

export default Cart