import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, TextField, Box, Card, CardContent, CardActions } from '@mui/material';





function CustomerDetails() {
    const { customerId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const customerDetails = useSelector(store => store.customerReducer);
    const inquiryDetails = useSelector(store => store.inquiryDetails);

    console.log('Inquiry Details', inquiryDetails);

    const cleaningDisplay = (inquiryDetails) => {
        if (inquiryDetails?.cleaning?.Cleaning === true) {
            return (
                <div>
                    <h3>Cleaning Questions:</h3>
                    <p>Number of Bedrooms: {inquiryDetails?.cleaning?.Bedrooms}</p>
                    <p>Number of Bathrooms: {inquiryDetails?.cleaning?.Bathrooms}</p>
                    <p>Number of Additional Rooms: {inquiryDetails?.cleaning?.AdditionalRooms}</p>
                    <p>Number of Doors: {inquiryDetails?.cleaning?.Doors}</p>
                    <p>Number of Windows: {inquiryDetails?.cleaning?.Windows}</p>
                    <p>Pets? {inquiryDetails?.cleaning?.HasPets}</p>
                    <p>Hazardous Conditions? {inquiryDetails?.cleaning?.HazardousConditions}</p>
                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                </div>
            );
        } else {
            return null;
        }
    };

    const movingDisplay = (inquiryDetails) => {
        if (inquiryDetails?.moving?.moving === true) {
            return (
                <div>
                    <h3>Moving Questions:</h3>
                    <p>New Address: {inquiryDetails?.moving?.moving_to}</p>
                    <p>Old Address: {inquiryDetails?.moving?.moving_from}</p>
                    <p>Large Items to Move: {inquiryDetails?.moving?.large_items}</p>
                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                </div>
            );
        } else {
            return null;
        }
    };

    const organizeDisplay = (inquiryDetails) => {
        if (inquiryDetails?.organize?.Organizing === true) {
            return (
                <div>
                    <h3>Organizing Questions:</h3>
                    <p>Number of Bedrooms: {inquiryDetails?.organize?.Bedrooms}</p>
                    <p>Number of Bathrooms: {inquiryDetails?.organize?.Bathrooms}</p>
                    <p>Number of Additional Rooms: {inquiryDetails?.organize?.AdditionalRooms}</p>
                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                </div>
            );
        } else {
            return null;
        }
    };

    const declutterDisplay = (inquiryDetails) => {
        if (inquiryDetails?.declutt?.Declutter === true) {
            return (
                <div>
                    <h3>Decluttering Questions:</h3>
                    <p>Number of Bedrooms: {inquiryDetails?.declutt?.Bedrooms}</p>
                    <p>Number of Bathrooms: {inquiryDetails?.declutt?.Bathrooms}</p>
                    <p>Number of Additional Rooms: {inquiryDetails?.declutt?.AdditionalRooms}</p>
                    <p>Wanting to Donate? {donationConversion(inquiryDetails)}</p>
                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                </div>
            );
        } else {
            return null;
        }
    };


    const handleEdit = () => {
        history.push(`/inquirydetails/${customerId}`); // Navigate to the page for editing notes
    };



    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            dispatch({ type: 'DELETE_CUSTOMERS', payload: id });
            history.push('/customerhistory')
        }
    };


    useEffect(() => {
        dispatch({ type: 'FETCH_INQUIRY_DETAILS', payload: customerId });
    }, [customerId]);


    const dateConversion = (oldDate) => {
        const date = new Date(oldDate?.contact?.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const donationConversion = (inquiryDetails) => {
        console.log('There inquiryDetails', inquiryDetails)
        if (inquiryDetails?.declutt?.Donation === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }

    console.log('Checking image', inquiryDetails?.media?.url)

    console.log('Checking customer reducer', customerDetails);
    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: "center" }}>Customer Details</Typography>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button className="btn" onClick={() => history.goBack()}>
                    Back
                </button>
            </div>
            <br />
            <Box border={1} p={2} maxWidth={600} style={{ maxWidth: 'fit-content', margin: '0 auto' }}>
                <Container>
                        <div sx={{ minWidth: 555, minHeight: 300 }}>
                            <CardContent>
                                <Typography variant="h4" style={{ textAlign: "center" }}>
                                {inquiryDetails?.contact?.firstName} {inquiryDetails?.contact?.lastName}
                                </Typography>
                                <br />
                                <Typography variant="h5" style={{ textAlign: "center" }}>Date of Service: {dateConversion(inquiryDetails)}</Typography>
                                <Typography variant="h5" align="center"> Completion status: {inquiryDetails?.contact?.completion_status === 5 ? 'Completed' : inquiryDetails?.contact?.completion_status}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Notes: {inquiryDetails?.customer?.notes}</Typography>
                            </CardContent>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <button className="btn" onClick={handleEdit}>
                                    Edit Note
                                </button>
                            </div>
                            <br />
                            <Typography variant="h4" style={{ textAlign: "center" }}>Customer's Form(s):</Typography>
                            <div className="customerHistoryForm">
                                <center>
                                    <h3>Contact Information:</h3>
                                    <p>Address: {inquiryDetails?.contact?.street1}  {inquiryDetails?.contact?.street2}</p>
                                    <p>{inquiryDetails?.contact?.city}</p>
                                    <p>{inquiryDetails?.contact?.state}</p>
                                    <p>{inquiryDetails?.contact?.zip}</p>
                                    <p>{inquiryDetails?.contact?.phone_number}</p>
                                    <p>{inquiryDetails?.contact?.email}</p>
                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                                    <div>{cleaningDisplay(inquiryDetails)}</div>
                                    <div>{movingDisplay(inquiryDetails)}</div>
                                    <div>{organizeDisplay(inquiryDetails)}</div>
                                    <div>{declutterDisplay(inquiryDetails)}</div>
                                    <h3>Customer Photos</h3>
                                    <img src={inquiryDetails?.media?.url} />
                                </center>

                            </div>
                        </div>
                    <br />

                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <button className="btn" onClick={(event) => handleDelete(customerId)}>
                            Delete Customer
                        </button>
                    </div>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default CustomerDetails;