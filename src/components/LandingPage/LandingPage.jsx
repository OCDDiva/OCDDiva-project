import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { Typography } from '@mui/material';


// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div>
      <center>
        <br/>
      <Typography variant="h5"> Please register or log in to continue.</Typography>
         <br/>

          <div>

            <RegisterForm />

              <h4>Already a Member?</h4>

              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
          </div>
      </center>
    </div>
  );
}

export default LandingPage;
