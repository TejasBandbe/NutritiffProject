import React from 'react'
import Footer from './Footer'
import CustomerNavbar from './CustomerNavbar';
import CustomerNavbar2 from './CustomerNavbar2';
import { useEffect, useState } from 'react';


function Home() {
  var user = sessionStorage.getItem("user");
  var customerId = sessionStorage.getItem("customerId");
  var isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const [tiffins, setTiffins] = useState([]);
  const [tiffin, setTiffin] = useState({tiffin_id: "", tiffin_name: "", description: "",
                                      tiffin_category: "", tiffin_price: "", image_link: ""});

  useEffect(()=>{
    console.log("Inside Component Did Mount")
    select();
  }, [])

  useEffect(()=>
  {
      console.log("Component Did Update is called..")
  }, [tiffins, tiffin]);

  const select=()=>
  {
    debugger;
    var helper = new XMLHttpRequest();
    helper.onreadystatechange = ()=>{
        if (helper.readyState === 4 && helper.status === 200 )
            {
              debugger;
              var result = JSON.parse(helper.responseText);
              setTiffins(result);
            }
      };
      helper.open("GET", "http://127.0.0.1:9999/customer/tiffins");
      helper.send();
  }
if(!isLoggedIn)
{
  return (
    <>
      <CustomerNavbar/>
      <>
        <div className="container">
            <div className="row gy-3">
              {
                tiffins.map((tiffin) =>
                {
                  return <div className="col-md-3">
                  <div className="card">
                      <img src={tiffin.image_link} className="card-img-top" alt="..."/>
                      <div className="card-body">
                        <h5 className="card-title">{tiffin.tiffin_name}</h5>
                        <p className="card-text">{tiffin.description}</p>
                        <a href="#" className="btn btn-primary">Add to cart</a>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
        </div>
        <Footer/>
    </>
    </>
  )
}
else
{
  return(
    <>
      <CustomerNavbar2/>
      <>
        <div className="container">
            <div className="row gy-3">
              {
                tiffins.map((tiffin) =>
                {
                  return <div className="col-md-3">
                  <div className="card">
                      <img src={tiffin.image_link} className="card-img-top" alt="..."/>
                      <div className="card-body">
                        <h5 className="card-title">{tiffin.tiffin_name}</h5>
                        <p className="card-text">{tiffin.description}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
                  </div>
                })
              }
              
            </div>
            
        </div>
        <Footer/>
    </>
    </>
  )
}
}

export default Home