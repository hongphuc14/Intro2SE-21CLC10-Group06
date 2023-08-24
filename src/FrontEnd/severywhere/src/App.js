import './App.module.css';

import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import EditProfile from './Pages/Profile/EditProfile';
import ResetPasswordEmail from './Pages/ResetPasswordEmail/ResetPasswordEmail';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ChangePassword from './Pages/ChangePassword/ChangePassword';
import AboutUs_FAQ from './Pages/AboutUs_FAQ/AboutUs_FAQ';
import Search from './Pages/Search/Search';
import TourPage from './Pages/TourPage/TourPage';
import TourGuidePage from './Pages/TourGuidePage/TourGuidePage';

import ProfileFreelancer from "./Pages/Freelancer/ProfileFreelancer";
import CalendarFreelancer from "./Pages/Freelancer/CalendarFreelancer";
import StatisticsFreelancer from "./Pages/Freelancer/StatisticsFreelancer";
import LicenseFreelancer from "./Pages/Freelancer/LicenseFreelancer";
import BookingFreelancer from "./Pages/Freelancer/BookingFreelancer";
import ProfileCompany from './Pages/Company/ProfileCompany';
import LicenseCompany from './Pages/Company/LicenseCompany';
import TourCompany from './Pages/Company/TourCompany';
import StatisticsCompany from './Pages/Company/StatisticCompany';
import BookingCompany from './Pages/Company/BookingCompany';
import ReviewCompany from './Pages/Company/ReviewCompany'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

export const history = createBrowserHistory();

function App() {
  const role = useSelector(state => state.BasicReducer.user_login.id_role) || 0
  // console.log(role)

  return (
    <Router history={history}>
    <div className = "App">
      <Switch>
        
{/*all users*/}        
        <Route path = "/aboutus" exact component = {AboutUs_FAQ} />

{/*guest*/}
        {
          (role !== 1)  && (role !== 2)  && (role !== 3) && (role !== 4) && (
            <>
            <Route path = "/" exact component={HomePage} />
            <Route path = "/signup" exact component={Signup} />
            <Route path = "/login" exact component ={Login} />
            <Route path = "/emailResetpw" exact component = {ResetPasswordEmail} />
            <Route path = "/resetpw" exact component = {ResetPassword} />
            <Route path = "/search" exact component = {Search} />
            <Route path = "/tourpage" exact component = {TourPage} />
            <Route path = "/tourguidepage" exact component = {TourGuidePage} />
            </>
          )
        }
{/*tourist*/}
        {
          role === 1 && (
            <>
            <Route path = "/" exact component={HomePage} />
            <Route path = "/editprofile" exact component = {EditProfile} />
            <Route path = "/changepw" exact component = {ChangePassword} />
            <Route path = "/search" exact component = {Search} />
            <Route path = "/tourpage" exact component = {TourPage} />
            </>
          )
        }
{/*freelancer*/}
        {
          role === 3 && (
            <>
            <Route path = "/profile-freelancer" exact component ={ProfileFreelancer} />
            <Route path = "/license-freelancer" exact component ={LicenseFreelancer} />
            <Route path = "/calendar-freelancer" exact component ={CalendarFreelancer} />
            <Route path = "/booking-freelancer" exact component ={BookingFreelancer} />
            <Route path = "/statistics-freelancer" exact component ={StatisticsFreelancer} />
            </>
          )
        }
{/*company*/}
        {
          role === 2 && (
            <>
            <Route path = "/profile-company" exact component ={ProfileCompany} />
            <Route path = "/license-company" exact component ={LicenseCompany} />
            <Route path = "/tour-company" exact component ={TourCompany} />
            <Route path = "/statistics-company" exact component ={StatisticsCompany} />
            <Route path = "/booking-company" exact component ={BookingCompany} />
            <Route path = "/review-company" exact component ={ReviewCompany} />
            </>
          )
        }
      </Switch>
    </div>
  </Router>
  );
}

export default App;