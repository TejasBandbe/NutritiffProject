import React from 'react'
import { useEffect, useState } from 'react';
import CustomerNavbar2 from './CustomerNavbar2';
import Navbar from './Navbar';
import Footer from './Footer'
import Login from './Login';
import { createaUrl, log } from '../../utils/utils';
import { useHistory } from 'react-router-dom';
import bgimage4 from '../../../src/images/bg4.jpg'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ChangeProfile() {
    const history = useHistory();
    // var user = sessionStorage.getItem("user");
    var customerId = sessionStorage.getItem("customerId");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    const [cId, setCId] = useState(0)
    const [name, setName] = useState('')
    const [homeAddress, setHomeAddress] = useState('')
    const [workAddress, setWorkAddress] = useState('')
    const [pincode, setPincode] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobNo, setMobNo] = useState('')
    const [activeStatus, setActiveStatus] = useState('')


  useEffect(()=>{
    log("Inside Component Did Mount")
    select();
  }, [])

  useEffect(()=>
  {
      log("Component Did Update is called..")
  }, [cId, name, homeAddress, workAddress, pincode, email, password, mobNo, activeStatus]);

  const select=()=>
  {
    debugger;
    var helper = new XMLHttpRequest();
    var id = {"id":customerId}
    helper.onreadystatechange = ()=>{
        debugger
        if (helper.readyState === 4 && helper.status === 200 )
            {
              debugger;
              var result = JSON.parse(helper.responseText);
              setCId(result[0].customer_id);
              setName(result[0].name);
              setHomeAddress(result[0].home_address);
              setWorkAddress(result[0].work_address);
              setPincode(result[0].pincode);
              setEmail(result[0].email);
              setPassword(result[0].password);
              setMobNo(result[0].mob_no);
              setActiveStatus(result[0].active_status);
              
            }
      };
      const url = createaUrl('customer/getcustomer')
      helper.open("POST", url);
      helper.setRequestHeader("Content-Type", "application/json");
      helper.send(JSON.stringify(id));
  }

  const updateProfile = async() =>
  {
    debugger;
    var helper = new XMLHttpRequest();
    var customer = {"customer_id":cId, "name":name, "home_address":homeAddress, "work_address": workAddress,
"pincode": pincode, "email": email, "mob_no": mobNo, "password": password, "active_status": activeStatus}
    helper.onreadystatechange = ()=>{
        debugger
        if (helper.readyState === 4 && helper.status === 200 )
            {
              debugger;
              var result = JSON.parse(helper.responseText);
              log(result)
              history.push('/profile')
              toast.success("Profile updated");
            }
      };
      const url = createaUrl('customer/updateprofile')
      helper.open("PUT", url);
      helper.setRequestHeader("Content-Type", "application/json");
      helper.send(JSON.stringify(customer));
  }

  if(isLoggedIn)
  {
    return (
        <div style={{backgroundImage:`url(${bgimage4})`, backgroundAttachment:'fixed'}}>
        <CustomerNavbar2/>
        <Navbar/>
        <h5>
            <center>
            <form role="form">
                <div className="form-group" style={{marginTop:'100px'}}>
            <div className="table-responsive col-md-6 my-3">
                <table className="table table-hover table-bordered">
                    <tbody>
                        <tr>
                            <td className='col-md-3'>Name</td>
                            <td><input type="text" className="form-control" value={name} required="required"
                                onChange={(e) => {
                                setName(e.target.value)
                              }}/></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>
                            <input type="email" className="form-control" value={email} required="required"
                                onChange={(e) => {
                                setEmail(e.target.value)
                              }}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Mobile</td>
                            <td><input type="tel" className="form-control" value={mobNo} required="required"
                            onChange={(e) => {
                                setMobNo(e.target.value)
                              }}/></td>
                        </tr>
                        <tr>
                            <td>Home Address</td>
                            <td><input type="text" className="form-control" value={homeAddress} required="required"
                            onChange={(e) => {
                                setHomeAddress(e.target.value)
                              }}/></td>
                        </tr>
                        <tr>
                            <td>Work Address</td>
                            <td><input type="text" className="form-control" value={workAddress} required="required"
                            onChange={(e) => {
                                setWorkAddress(e.target.value)
                              }}/></td>
                        </tr>
                        <tr aria-rowspan={2}>
                            <td>Pincode</td>
                            <td><input type="text" className="form-control" value={pincode} required="required"
                            onChange={(e) => {
                                setPincode(e.target.value)
                              }}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
                    <button type="submit" onClick={updateProfile} className="btn btn-success">Save Profile</button>
        </form>
            </center>
            </h5>
            <Footer/>
        </div>
      )
  }
  else{
    <Login/>
  }
}

export default ChangeProfile