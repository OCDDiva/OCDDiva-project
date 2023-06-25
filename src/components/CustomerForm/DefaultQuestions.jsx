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
        first_name: '', last_name: '', address: '', phone_number: '', email: ''
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

    const handleAddressChange = (event) => {
        setCustomer({ ...customer, address: event.target.value });
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

                        {/*//! Will probably want to split this into Street, City, State, Zip, etc. Maybe a library for that too?*/}
                        <TextField placeholder="Address"
                            onChange={handleAddressChange}
                            multiline rows="3"
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
