import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


function UserPage() {
  let history = useHistory();
  const user = useSelector((store) => store.user);

  //! Leads to new inquiry form
  const toNewInquiry = () => { history.push('/defaultquestions') }

  //! Leads to history page
  const toHistory = () => { history.push('/userhistory') }

  //! What displays
  return (
    <center>
      <div className="container">

        <h2>Welcome, {user.username}!</h2>

        <p>Your ID is: {user.id}</p>

        <button className='btn' onClick={toNewInquiry}> New Inquiry</button>

        <br /> <br />

        <button className='btn' onClick={toHistory}> History</button>

        <br /> <br />

        <LogOutButton className="btn" />

      </div>
    </center>
  );
} //! End UserPage()

export default UserPage;
