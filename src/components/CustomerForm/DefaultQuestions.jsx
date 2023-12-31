import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';

function DefaultQuestions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);

    //! State
    let [customer, setCustomer] = useState({
        first_name: '', 
        last_name: '', 
        street1: '', 
        street2: '', 
        city: '', 
        state: '', 
        zip: '', 
        phone_number: '', 
        email: '', 
        user_id: user.id, 
        // priority: 3, 
        // completion: 1,
    });

    //TODO edit this when we get to styling
    //! Use effect to make the page load at the postion I want
    useEffect(() => {
        window.scrollTo(0, 180)
    }, [])


    //! Handle changes
    const handleFirstNameChange = (event) => {
        setCustomer({ ...customer, first_name: event.target.value });
    }

    const handleLastNameChange = (event) => {
        setCustomer({ ...customer, last_name: event.target.value });
    }

    const handleStreet1Change = (event) => {
        setCustomer({ ...customer, street1: event.target.value });
    }

    const handleStreet2Change = (event) => {
        setCustomer({ ...customer, street2: event.target.value });
    }

    const handleCityChange = (event) => {
        setCustomer({ ...customer, city: event.target.value });
    }

    const handleStateChange = (event) => {
        setCustomer({ ...customer, state: event.target.value });
    }

    const handleZipChange = (event) => {
        setCustomer({ ...customer, zip: event.target.value });
    }

    const handlePhoneNumberChange = (event) => {
        setCustomer({ ...customer, phone_number: event.target.value });
    }

    const handleEmailChange = (event) => {
        setCustomer({ ...customer, email: event.target.value });
    }

    //! Submit
    const submit = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_DEFAULT_QUESTIONS', payload: customer, setCustomer: setCustomer });
        setCustomer({
            first_name: '',
            last_name: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            phone_number: '',
            email: '',
            user_id: user.id,
        });
        history.push('/cleaningquestions');
    }

    //! Back to home
    const goBack = () => { history.push('/home') }

    //!What displays
    return (
        <>
            <center>
                <Typography variant="h4"> New Inquiry Form</Typography>

                <br />

                <ProgressBar currentStep={0} />

                <br />
                
                <Card sx={{
                    width: 'auto',
                    minWidth: 250,
                    margin: 1,
                    padding: 5,
                    boxShadow: 5,
                }}>

                    <Typography variant="h6" sx={{ width: '100%', }}>
                        Please enter the following information.
                    </Typography>
                    
                    <br /> <br />

                    <center>
                        <form onSubmit={submit}>
                            <TextField placeholder="First Name"
                                onChange={handleFirstNameChange}
                                required
                                sx={{ width: 280, }}
                            />

                            <br /> <br />

                            <TextField required
                                placeholder="Last Name"
                                onChange={handleLastNameChange}
                                sx={{ width: 280, }}

                            />

                            <br /> <br />

                            <TextField placeholder="Street 1"
                                onChange={handleStreet1Change}
                                required
                                sx={{ width: 280, }}
                            />

                            <br /> <br />

                            <TextField placeholder="Street 2"
                                onChange={handleStreet2Change}
                                sx={{ width: 280, }}
                            />

                            <br /> <br />

                            <TextField placeholder="City"
                                onChange={handleCityChange}
                                required
                                sx={{ width: 280, }}

                            />

                            <br /> <br />

                            <TextField placeholder="State"
                                onChange={handleStateChange}
                                required
                                sx={{ width: 280, }}

                            />

                            <br /> <br />

                            <TextField placeholder="Zip Code"
                                onChange={handleZipChange}
                                required
                                sx={{ width: 280, }}

                            />

                            <br /> <br />

                            {/*//! want this to be a phone number format.. come back to this. Mui has a demo using a react-imask library*/}
                            <TextField placeholder="Phone Number"
                                onChange={handlePhoneNumberChange}
                                type='number'
                                sx={{ width: 280, }}

                            />

                            <br /> <br />
                            <TextField placeholder="Email"
                                onChange={handleEmailChange}
                                required
                                sx={{ width: 280, }}

                            />

                            <br /> <br />

                            {/* Back button */}
                            <button className="btn" onClick={goBack}> Back </button>


                            {/* Next/Submit button */}
                            <button className="btn" onClick={submit}> Next </button>

                            <br /> <br />

                        </form>
                    </center>
                </Card>
            </center>

        </>


    )
} // End DefaultQuestions()


export default DefaultQuestions;

