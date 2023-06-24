//Imports go here
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Card } from '@mui/material';


function DefaultQuestions() {
    const dispatch = useDispatch();
    const history = useHistory();


    //TODO is there anything else from the DB that needs to be here? Residence type or is that only for the "service" questions?
    //! State
    let [customer, setCustomer] = useState({
        first_name: '', last_name: '', address: '', phone_number: '', email: ''
    });


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


    //! Submit
    const submit = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_CUSTOMER', payload: customer, setCustomer: setCustomer });
        setCustomer({ title: '', poster: '', description: '', genre_id: '' });
        history.push('/cleaningquestions');
    }


    //! Back to home
    const goBack = () => { history.pushState('/home') }


    //!What displays
    return (
        <>
            <center>
                <Typography variant="h5"> New Inquiry Form</Typography>

                <br /> <br />
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
                            sx={{ width: 300,}}
                        />

                        <br /> <br />

                        <TextField required
                            placeholder="Last Name"
                            onChange={handleLastNameChange}
                            sx={{ width: 300,}}

                        />

                        <br /> <br />

                        {/*//! Will probably want to split this into Street, City, State, Zip, etc. Maybe a library for that too?*/}
                        <TextField placeholder="Address"
                            onChange={handleLastNameChange}
                            multiline rows="3"
                            required
                            sx={{ width: 300,}}

                        />

                        <br /> <br />

                        {/*//! want this to be a phone number format.. come back to this. Mui has a demo using a react-imask library*/}
                        <TextField placeholder="Phone Number"
                            onChange={handlePhoneNumberChange}
                            type='number'
                            sx={{ width: 300,}}

                        />

                        <br /> <br />
                        <TextField placeholder="Email"
                            onChange={handleEmailChange}
                            required
                            sx={{ width: 300,}}

                        />

                        <br /> <br />

                        <button className="btn" onClick={submit}> Next </button>

                        <br /> <br />

                    </form>
                </Card>
            </center>

        </>


    )
} // End DefaultQuestions()


export default DefaultQuestions;

