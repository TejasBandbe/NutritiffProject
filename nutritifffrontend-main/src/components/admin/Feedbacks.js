import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import AdminLogin from './AdminLogin'
import { createUrl, createaUrl, log } from '../../utils/utils';
import axios from 'axios';

function Feedbacks() {
    var admin = sessionStorage.getItem("user");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const [feedbacks, setFeedbacks] = useState([])
    const [feedback, setFeedback] = useState({fcId:0, customerName:"", tiffinName:"", vendorName:"",
                feedbackCategory:"", feedbackDescription:"", timestamp:"", feedbackStatus:""})

    useEffect(()=>{
        console.log("Inside Component Did Mount")
        getAllFeedbacks();
        }, [])
    
        useEffect(()=>
    {
        console.log("Component Did Update is called..")
    }, [feedbacks, feedback]);

    const getAllFeedbacks = async() =>
  {
    debugger
    const url = createUrl('api/admins/showallfeedbacks')
    axios.get(url)
    .then(res =>{
      debugger
      log(res.data)
      setFeedbacks(res.data)
    })
  }

  const resolve = async(id) =>
  {
    debugger
    const comId = {"fc_id":id};

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = ()=>{
        debugger
        if (helper.readyState === 4 && helper.status === 200 )
            {
            debugger;
            var result = JSON.parse(helper.responseText);
            log('compaint resolved')
            log(result)
            window.location.reload();
            }
    };
    const url = createaUrl('admin/resolve')
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(comId));
  }

  const escalate = async(id) =>
  {
    debugger
    const comId = {"fc_id":id};

    var helper = new XMLHttpRequest();
    helper.onreadystatechange = ()=>{
        debugger
        if (helper.readyState === 4 && helper.status === 200 )
            {
            debugger;
            var result = JSON.parse(helper.responseText);
            log('compaint escalated')
            log(result)
            window.location.reload();
            }
    };
    const url = createaUrl('admin/escalate')
    helper.open("PUT", url);
    helper.setRequestHeader("Content-Type", "application/json");
    helper.send(JSON.stringify(comId));
  }


  if(isLoggedIn)
  {
return (
  <>
    <AdminNavbar/>
    <h2 style={{textAlign:'center', marginTop:'15px'}}>Feedbacks / Complaints</h2>
    <div className="row my-3">
    <div className='col-md-1'></div>
    <div className="col-md-10">
      
      <div className="table-responsive my-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Tiffin Name</th>
              <th>Vendor Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Resolve</th>
              <th>Escalate</th>
            </tr>
          </thead>
          <tbody>
            {
              feedbacks.map((feedback) =>
              {
                return (
                <tr>
                  <td>{feedback.customerName}</td>
                  <td>{feedback.tiffinName}</td>
                  <td>{feedback.vendorName}</td>
                  <td>{feedback.feedbackCategory}</td>
                  <td>{feedback.feedbackDescription}</td>
                  <td>{feedback.feedbackStatus}</td>
                  <td>
                    {(feedback.feedbackCategory === 'complaint' &&  feedback.feedbackStatus === 'under review') &&
                    <button type="button" className="btn btn-success"
                    onClick={()=>resolve(feedback.fcId)}>Resolve</button>}
                      
                    </td>
                    <td>
                    {feedback.feedbackCategory === 'complaint' && feedback.feedbackStatus === 'under review' &&
                      <button type="button" className="btn btn-danger"
                      onClick={()=>escalate(feedback.fcId)}>Escalate</button>}
                    </td>
                </tr>)
              })
            }
          
          </tbody>
        </table>
      </div>
      <div className='col-md-1'></div>
    </div>
    </div>
    <Footer/>
    </>
  
)
  }
  else
  {
    return (
      <>
        <AdminLogin/>
        </>
    )
  }
}

export default Feedbacks