import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import AdminLogin from './AdminLogin'
import { createUrl, createaUrl, log } from '../../utils/utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SubscriptionPlans() {
    var admin = sessionStorage.getItem("user");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const history = useHistory();

    const [plans, setPlans] = useState([])
    const [plan, setPlan] = useState({planId:0, name:"", description:"", price:0.0,noOfMeals:""})


    useEffect(()=>{
      console.log("Inside Component Did Mount")
      getAllPlans();
    }, [])
  
    useEffect(()=>
  {
      console.log("Component Did Update is called..")
  }, [plans, plan]);

  const getAllPlans = async() =>
  {
    debugger
    const url = createUrl('api/admins/subscriptionplans')
    axios.get(url)
    .then(res =>{
      debugger
      log(res.data)
      setPlans(res.data)
    })
  }

  const remove = (id)=>
  {
    debugger
    const planId = {"plan_id":id};
    // const url = createaUrl('admin/deleteplan')
    // axios.delete(url, 
    //     {
    //         "plan_id": id
    //     })
    // .then(res =>{
    //   debugger
    //   log(res.data)
    //   getAllPlans();
    // })

        var helper = new XMLHttpRequest();
        helper.onreadystatechange = ()=>{
            debugger
            if (helper.readyState === 4 && helper.status === 200 )
                {
                debugger;
                var result = JSON.parse(helper.responseText);
                log('plan deleted')
                log(result)
                window.location.reload();

                }
        };
        const url = createaUrl('admin/deleteplan')
        helper.open("DELETE", url);
        helper.setRequestHeader("Content-Type", "application/json");
        helper.send(JSON.stringify(planId));
  }

  if(isLoggedIn)
  {
return (
  <>
    <AdminNavbar/>
    <h2 style={{textAlign:'center', marginTop:'15px'}}>Subscription Plans</h2>

    <div className='row'>
        <div className='col-md-9'></div>
        <div className='col-md-3'>
        <button type="button" className="btn btn-primary" onClick={()=>history.push('/addplan')}>Add Plan</button>
        </div>
    </div>

    <div className="row my-3">
    <div className="col-md-3"></div>
    <div className="col-md-6">
      
      <div className="table-responsive my-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Description</th>
              <th>Price</th>
              <th>No. of meals</th>
              <th>Update plan</th>
              <th>Remove plan</th>
            </tr>
          </thead>
          <tbody>
            {
              plans.map((plan) =>
              {
                return (
                <tr>
                  <td>{plan.name}</td>
                  <td>{plan.description}</td>
                  <td>{plan.price}</td>
                  <td>{plan.noOfMeals}</td>
                  <td>
                    <button type="button" className="btn btn-info"
                    onClick={()=>history.push(`/updateplan/${plan.planId}`)}>Update</button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger" onClick={()=>remove(plan.planId)}>Remove</button>
                  </td>
                </tr>)
              })
            }
          
          </tbody>
        </table>
      </div>
      
    </div>
    <div className="col-md-3">
    
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

export default SubscriptionPlans