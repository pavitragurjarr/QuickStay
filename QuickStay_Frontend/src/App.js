import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import Logout from "./components/Logout";
import Services from "./components/Services";
import BookingConfirmationPage from './components/BookingConfirmationPage';
import { Component } from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import HotelListPage from "./components/HotelList"; // Your HotelListPage component
import PaymentPage from './components/PaymentPage';
import ProfilePage from './components/ProfilePage';
import AdminPage from './components/AdminPage';


function App() {
  return (
    <Router>
    <div className="App">
      
     {/* <nav>
      <ul>
        <li>
          <Link to ="/">Login</Link>
        </li>
        <Link to="/signup">SignUp</Link>
      </ul>
     </nav> */}

     <Routes>
      <Route exact="true" path="/Login" element={<Login/>}>
      </Route>
       <Route path="/SignUp" element={<SignUp/>}>
      </Route> 
      <Route path="/" element={<HomePage/>} />
      <Route path="/HomePage" element={<HomePage/>} />
      <Route path="/Logout" element={<Logout/>} />
      <Route path="/Services" element={<Services/>} />
      <Route path="/booking-confirmed" element={<BookingConfirmationPage/>} />
      <Route path="/hotel-list" element={<HotelListPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/admin" element={<AdminPage />} />
     </Routes>
    </div>
    </Router>
  );
}

export default App;
