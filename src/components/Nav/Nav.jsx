import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

//TODO Potentially change to hamburger meny
//TODO Add conditional rendering to restrict views for admin & users
//TODO Can edit the nav-title

function Nav() {
  const user = useSelector((store) => store.user);

  //! What displays
  return (
    <>
      <center>
        <div className="nav">
          <Link to="/home">

            <img src="/ocd-diva-header.jpg" width="300px" />

            <br /> 

            <h2 className="nav-title">Inquiry Portal</h2>

          </Link>
        </div>
      </center>


      {/* If no user is logged in, show these links */}
      {/* {!user.id && (
        // If there's no user, show login/registration links
        <Link className="navLink" to="/login">
          Login / Register
        </Link>
      )} */}

      {/* If a user is logged in, show these links */}
     <div className='navBar'>
      {user.id && (
        <>
          <center>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/inquiries">
              Inquiries
            </Link>

            <Link className="navLink" to="/userhistory">
              User History
            </Link>

            <Link className="navLink" to="/defaultquestions">
              Customer Form
            </Link>

            <Link className="navLink" to="/customerhistory">
              Customer History
            </Link>

            <LogOutButton className="navLink" />
          </center>
        </>
      )}
      </div>
    </>

  ); //! End return 
} //! End of Nav()

export default Nav;
