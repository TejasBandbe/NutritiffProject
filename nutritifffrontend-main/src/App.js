import './App.css';
import Home from './components/customer/Home';
import Cart from './components/customer/Cart';
import Login from './components/customer/Login';
import Register from './components/customer/Register';
import RegPage from './components/customer/RegPage';
import Profile from './components/customer/Profile';
import ChangeProfile from './components/customer/ChangeProfile';
import ChangePassword from './components/customer/ChangePassword';
import Favorites from './components/customer/Favorites';
import MyOrders from './components/customer/MyOrders';
import MyOrderHistory from './components/customer/MyOrderHistory';
import Subscription from './components/customer/Subscription';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router,Route } from "react-router-dom";

// import VendorLogin from './components/vendor/VendorLogin';
// import VendorRegister from './components/vendor/VendorRegister';
// import VendorRegPage from './components/vendor/VendorRegPage';
// import VendorHome from './components/vendor/VendorHome';

// ====================================================================

import AdminLogin from './components/admin/AdminLogin';
import AdminHome from './components/admin/AdminHome';

// ====================================================================

import AboutUs from './components/customer/AboutUs';
import ContactUs from './components/customer/ContactUs';
import { ToastContainer, toast } from 'react-toastify';
import RequestHistory from './components/admin/RequestHistory';
import Feedbacks from './components/admin/Feedbacks';
import SubscriptionPlans from './components/admin/SubscriptionPlans';
import AddPlan from './components/admin/AddPlan';
import UpdatePlan from './components/admin/UpdatePlan';
import OrderHistory from './components/admin/OrderHistory';
import SubPurchaseHistory from './components/admin/SubPurchaseHistory';
import AdminAboutUs from './components/admin/AdminAboutUs';
import AdminContactUs from './components/admin/AdminContactUs';

function App() {
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Router>
        <Route exact path="/about" component={AboutUs}/>
        <Route exact path="/contact" component={ContactUs}/>
      {/* ========================================================================== */}

          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/regpage" component={RegPage}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/changeprofile" component={ChangeProfile}/>
          <Route exact path="/changepassword" component={ChangePassword}/>
          <Route exact path="/favorites" component={Favorites}/>
          <Route exact path="/cart" component={Cart}/>
          <Route exact path="/myorders" component={MyOrders}/>
          <Route exact path="/myorderhistory" component={MyOrderHistory}/>
          <Route exact path="/subscription" component={Subscription}/>

  {/* ======================================================================== */}

          {/* <Route exact path="/vendorlogin" component={VendorLogin}/>
          <Route exact path="/vendorregister" component={VendorRegister}/>
          <Route exact path="/vendorregpage" component={VendorRegPage}/>
          <Route exact path="/vendorhome" component={VendorHome}/> */}

  {/* ======================================================================== */}

          <Route exact path="/adminlogin" component={AdminLogin}/>
          <Route exact path="/adminhome" component={AdminHome}/>
          <Route exact path="/reqhistory" component={RequestHistory}/>
          <Route exact path="/feedbacks" component={Feedbacks}/>
          <Route exact path="/subplans" component={SubscriptionPlans}/>
          <Route exact path="/addplan" component={AddPlan}/>
          <Route exact path="/updateplan/:id" component={UpdatePlan}/>
          <Route exact path="/orderhistory" component={OrderHistory}/>
          <Route exact path="/subpurchasehistory" component={SubPurchaseHistory}/>
          <Route exact path="/adminabout" component={AdminAboutUs}/>
          <Route exact path="/admincontact" component={AdminContactUs}/>
        </Router>
        
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;
