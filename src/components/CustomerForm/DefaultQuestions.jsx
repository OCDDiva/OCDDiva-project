import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Card } from '@mui/material';

//TODO Add MUI icons to back and next button in the return 
//TODO Add multi-step progress bar to all the form components?

function DefaultQuestions() {
    const dispatch = useDispatch();
    const history = useHistory();


    //TODO is there anything else from the DB that needs to be here? Residence type or is that only for the "service" questions?
    //! State
    let [customer, setCustomer] = useState({
        first_name: '', last_name: '', street1: '', street2: '', city: '', state: '', zip: '',phone_number: '', email: ''
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

    //TODO need to finish setting up the redux and server side to complete this
    //! Submit
    const submit = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_CUSTOMER', payload: customer, setCustomer: setCustomer });
        setCustomer({ title: '', poster: '', description: '', genre_id: '' });
        history.push('/cleaningquestions');
    }

    //! Back to home
    const goBack = () => { history.push('/home') }

    //!What displays
    return (
        <>
            <center>
                <br/> <br/>
                <Typography variant="h4"> New Inquiry Form</Typography>

                <br />

                <Card sx={{
                    width: 700,
                    margin: 2,
                    padding: 5,
                    boxShadow: 5,
                }}>

                    <Typography variant="h7"> Please enter the following information.</Typography>

                    <br /> <br />

                    <form onSubmit={submit}>
                        <TextField placeholder="First Name"
                            onChange={handleFirstNameChange}
                            required
                            sx={{ width: 300, }}
                        />

                        <br /> <br />

                        <TextField required
                            placeholder="Last Name"
                            onChange={handleLastNameChange}
                            sx={{ width: 300, }}

                        />

                        <br /> <br />

                        <TextField placeholder="Street 1"
                            onChange={handleStreet1Change}
                            required
                            sx={{ width: 300, }}
                        />

                        <br /> <br />

                        <TextField placeholder="Street 2"
                            onChange={handleStreet2Change}
                            sx={{ width: 300, }}
                        />

                        <br /> <br />

                        <TextField placeholder="City"
                            onChange={handleCityChange}
                            required
                            sx={{ width: 300, }}

                        />

                        <br /> <br />

                        <TextField placeholder="State"
                            onChange={handleStateChange}
                            required
                            sx={{ width: 300, }}

                        />

                        <br /> <br />

                        <TextField placeholder="Zip Code"
                            onChange={handleZipChange}
                            required
                            sx={{ width: 300, }}

                        />

                        <br /> <br />

                        {/*//! want this to be a phone number format.. come back to this. Mui has a demo using a react-imask library*/}
                        <TextField placeholder="Phone Number"
                            onChange={handlePhoneNumberChange}
                            type='number'
                            sx={{ width: 300, }}

                        />

                        <br /> <br />
                        <TextField placeholder="Email"
                            onChange={handleEmailChange}
                            required
                            sx={{ width: 300, }}

                        />

                        <br /> <br />

                        {/* Back button */}
                        <button className="btn" onClick={goBack}> Back </button>

                        <br /> <br />

                        {/* Next/Submit button */}
                        <button className="btn" onClick={submit}> Next </button>

                        <br /> <br />

                    </form>
                </Card>
            </center>

        </>


    )
} // End DefaultQuestions()


export default DefaultQuestions;

