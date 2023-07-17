//Imports go here
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './Inquiries.css';

import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { InputLabel, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Card } from '@mui/material';

function Inquiries() {

    const dispatch = useDispatch();
    const history = useHistory();
    const inquiries = useSelector(store => store.fetchInquiries);

    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRIES' });
    }, []);

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const completionConversion = (inquiries) => {
        if (inquiries.completion_status === 5) {
            return 'Complete'
        } else if (inquiries.completion_status === 4) {
            return 'In Progress'
        } else if (inquiries.completion_status === 3) {
            return 'Bid Rejected'
        } else if (inquiries.completion_status === 2) {
            return 'Bid Offered'
        } else if (inquiries.completion_status === 1) {
            return 'Pending'
        }
    }


    const phoneNumberFormatter = (inquiry) => {
        if (typeof (inquiry) !== 'string') inquiry = inquiry.toString()
        if (inquiry.length === 10) {
            return inquiry.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        } else {
            return 'Not a valid phone number'
        }
    }



    const addressFormat = (address) => {
        if (address.street2 !== null) {
            return <div>
                <p>Street: {address.street1} {address.street2}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>ZIP: {address.zip}</p>
            </div>
        } else {
            return <div>
                <h3>Address</h3>
                <p>Street: {address.street1}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>ZIP: {address.zip}</p>
            </div>
        }
    }

    const priorityConversion = (inquiry) => {
        if (inquiry.priority === 1) {
            return 'High'
        } else if (inquiry.priority === 2) {
            return 'Medium'
        } else if (inquiry.priority === 3) {
            return 'Low'
        } else {
            return 'No Priority Set'
        }
    }

    console.log('Inquiries List:', inquiries);

    // ! THIS IS CHANGED FOR TESTING -- ERASE AFTER TESTING
    const navToInquiryDetails = (inquiries) => {
        history.push(`/inquirydetails/${inquiries.id}`);
    }

    //!What displays
    // TODO DISPLAY ONLY THE CUSTOMER NAME, THE SERVICES REQUESTED, DATE RECEIVED, COMPLETEION STATUS, NOTES, DETAILS BUTTON
    return (

        <center>
            {inquiries.length === 0 ? (
                <div>
                    <p>No new requests!</p>
                </div>
            ) : (
                <div key={inquiries.id}>
                    {inquiries.map(inquiry => {
                        return (
                            <Card sx={{
                                width: 'auto',
                                minWidth: 250,
                                margin: 1,
                                padding: 5,
                                boxShadow: 5,
                            }}>
                                <div>
                                    <Typography variant="h7" sx={{ fontStyle: 'italic' }}> Customer name:</Typography>

                                    <Typography variant="h4">{inquiry.firstName} {inquiry.lastName}</Typography>

                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />

                                    <Typography> Priority: {priorityConversion(inquiry)}</Typography>
                                    <br />

                                    <Typography>Phone Number: {phoneNumberFormatter(inquiry.phone_number)}</Typography>
                                    <br />
                                    
                                    <Typography>Email: {inquiry.email}</Typography>

                                    <Typography>{addressFormat(inquiry)}</Typography>

                                    <Typography>Date Submitted: {dateConversion(inquiry)}</Typography>
                                    <br />

                                    <Typography>Service Status: {completionConversion(inquiry)}</Typography>
                                    <br />

                                    <button className="btn" onClick={() => navToInquiryDetails(inquiry)}>Details</button>
                                </div>
                            </Card>

                        )
                    })}
                </div>
            )}
        </center>


    )
} // End Inquiries()

export default Inquiries;