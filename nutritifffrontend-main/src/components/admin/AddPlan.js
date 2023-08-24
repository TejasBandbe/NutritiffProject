import React, { useState, useEffect } from 'react'
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';
import AdminLogin from './AdminLogin'
import { createUrl, createaUrl, log } from '../../utils/utils';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function AddPlan() {
    var admin = sessionStorage.getItem("user");
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");

    const [plan, setPlan] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.0)
    const [noOfMeals, setNoOfMeals] = useState(0)
    const history = useHistory();

    useEffect(()=>{
        console.log("Inside Component Did Mount")
      }, [])
    
      useEffect(()=>
    {
        console.log("Component Did Update is called..")
    }, [plan, description, price, noOfMeals]);

    const addPlan = () =>
    {
        var planToAdd = {"name":plan, "description":description, "price":price, "no_of_meals":noOfMeals}
        debugger
        const url = createaUrl('admin/addplan')
        axios.post(url,planToAdd)
        .then(res =>{
        debugger
        log(res.data)
        history.push('/subplans')
    })
    }

    if(isLoggedIn)
    {
  return (
    <>
      <AdminNavbar/>
      <div>
      <h1 style={{ textAlign: 'center', margin: 10 }}>Add a new plan</h1>

      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='form'>
            <div className='mb-3'>
              <label htmlFor=''>Plan</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setPlan(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Description</label>
              <input
                type='text'
                className='form-control'
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>Price</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor=''>No. of meals</label>
              <input
                type='number'
                className='form-control'
                onChange={(e) => {
                  setNoOfMeals(e.target.value)
                }}
              />
            </div>

            <div className='mb-3'>
              <button onClick={addPlan} className='btn btn-success'>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className='col'></div>
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

export default AddPlan