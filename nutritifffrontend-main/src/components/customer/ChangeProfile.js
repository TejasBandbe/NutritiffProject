import React from 'react'
import { useEffect, useState } from 'react';
import CustomerNavbar2 from './CustomerNavbar2';
import Navbar from './Navbar';
import Footer from './Footer'

function ChangeProfile() {
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

  const onTextChange = (args) =>
  {
    var copyCustomer = {...customer};
    copyCustomer[args.target.name] = args.target.value;
    setCustomer(copyCustomer);
  }

  return (
    <>
    <CustomerNavbar2/>
    <Navbar/>
    <h5>
        <center>
        <form action="" method="POST" role="form">
            <div className="form-group">
        <div className="table-responsive col-md-6 my-3">
            <table className="table table-hover table-bordered">
                <tbody>
                    <tr>
                        <td className='col-md-2'>Name</td>
                        <td><input type="text" onChange={onTextChange} className="form-control" value={customer.name} required="required"/></td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>
                        <input type="email" className="form-control" value={customer.email} required="required"/>
                        </td>
                    </tr>
                    <tr>
                        <td>mobile</td>
                        <td><input type="text" className="form-control" value={customer.mob_no} required="required"/></td>
                    </tr>
                    <tr>
                        <td>address</td>
                        <td><input type="text" className="form-control" value={customer.home_address} required="required"/></td>
                    </tr>
                    <tr aria-rowspan={2}>
                        <td>Pincode</td>
                        <td><input type="text" className="form-control" value={customer.pincode} required="required"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
                <button type="submit" className="btn btn-success">Save Profile</button>
    </form>
        </center>
        </h5>
        <Footer/>
    </>
  )
}

export default ChangeProfile