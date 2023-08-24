import React from 'react'
import { useEffect, useState } from 'react';
import CustomerNavbar2 from './CustomerNavbar2';
import Navbar from './Navbar';
import Footer from './Footer'

function Profile() {
    var user = sessionStorage.getItem("user");
    var customerId = sessionStorage.getItem("customerId");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    const [customer, setCustomer] = useState({customer_id: "", name: "", home_address: "",
                                      work_address: "", pincode: "", email: "", password: "",
                                      mob_no: "", active_status: ""});

  useEffect(()=>{
    console.log("Inside Component Did Mount")
    select();
  }, [])

  useEffect(()=>
  {
      console.log("Component Did Update is called..")
  }, [customer]);

  const select=()=>
  {
    debugger;
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = ()=>{
        if (helper.readyState === 4 && helper.status === 200 )
            {
              debugger;
              var result = JSON.parse(helper.responseText);
              setCustomer(result[0]);
            }
      };
      helper.open("GET", "http://127.0.0.1:9999/customer/7");
      helper.send();
  }

  return (
    <>
    <CustomerNavbar2/>
    <Navbar/>
    <h5>
        <center>
        <div className="table-responsive col-md-6 my-3">
            <table className="table table-hover table-bordered">
                <tbody>
                    <tr>
                        <td className='col-md-2'>Name</td>
                        <td>{customer.name}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>{customer.email}</td>
                    </tr>
                    <tr>
                        <td>mobile</td>
                        <td>{customer.mob_no}</td>
                    </tr>
                    <tr>
                        <td>address</td>
                        <td>{customer.home_address}</td>
                    </tr>
                    <tr>
                        <td>Pincode</td>
                        <td>{customer.pincode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </center>
        </h5>
        <Footer/>
    </>
  )
}

export default Profile