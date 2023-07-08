import React, { useEffect } from 'react';

//yo waddup it's yer boi
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CustomerForm from '../CustomerForm/CustomerForm';
import CleaningQuestions from '../CustomerForm/CleaningQuestions';
import DeclutterQuestions from '../CustomerForm/DeclutterQuestions';
import DefaultQuestions from '../CustomerForm/DefaultQuestions';
import MovingQuestions from '../CustomerForm/MovingQuestions';
import OrgQuestions from '../CustomerForm/OrgQuestions';
import Review from '../CustomerForm/Review';
import Success from '../CustomerForm/Success';
import UserHistory from '../UserHistory/UserHistory';
import Inquiries from '../Inquiries/Inquiries';
import InquiryDetails from '../Inquiries/InquiryDetails';
import Customers from '../Customers/Customers';
import CustomerDetails from '../Customers/CustomerDetails';
import HistoryCard from '../UserHistory/HistoryCard';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <br />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/inquiries" >
            <Inquiries />
          </ProtectedRoute>
          <ProtectedRoute exact path="/inquiries/:inquiriesId" >
            <InquiryDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path="/userhistory" >
            <UserHistory />
          </ProtectedRoute>
          <ProtectedRoute exact path="/HistoryCard" >
            <UserHistory />
          </ProtectedRoute>
          <ProtectedRoute exact path="/form">
            <CustomerForm />
          </ProtectedRoute>
          <ProtectedRoute exact path="/defaultquestions">
            <DefaultQuestions />
          </ProtectedRoute>
          <ProtectedRoute exact path="/cleaningquestions">
            <CleaningQuestions />
          </ProtectedRoute>
          <ProtectedRoute exact path="/movingquestions">
            <MovingQuestions />
          </ProtectedRoute>
          <ProtectedRoute exact path="/organizequestions">
            <OrgQuestions />
          </ProtectedRoute>
          <ProtectedRoute exact path="/declutterquestions">
            <DeclutterQuestions />
          </ProtectedRoute>
          <ProtectedRoute exact path="/review">
            <Review />
          </ProtectedRoute>
          <ProtectedRoute exact path="/success">
            <Success />
          </ProtectedRoute>
          <ProtectedRoute exact path="/customerhistory">
            <Customers />
          </ProtectedRoute>
          <ProtectedRoute exact path="/customer-details/:customerId" component={CustomerDetails}>
            {/* <CustomerDetails /> */}
          </ProtectedRoute>


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
