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


    const handleEdit = () => {
        history.push(`/inquirydetails/${customerId}`); // Navigate to the page for editing notes
    };

    

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            dispatch({ type: 'DELETE_CUSTOMERS', payload:id});
            history.push('/customerhistory')
        }
    };


    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS_DETAILS', payload: customerId });
    }, [customerId]);


    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const donationConversion = (inquiryDetails) => {
        console.log('There', inquiryDetails)
        if (inquiryDetails?.declutt?.Donation === true) {
            return 'Yes'
        } else {
            return 'No'
        }
    }
     


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
            <Box border={1} p={2} maxWidth={600} style={{ margin: '0 auto' }}>
                <Container>
                    {customerDetails.map((customer) => (
                        <div key={customer.id} sx={{ minWidth: 555, minHeight: 300 }}>
                            <CardContent>
                                <Typography variant="h5" style={{ textAlign: "center" }}>
                                    Customer Name: {customer.firstName} {customer.lastName}
                                </Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Date of Service: {dateConversion(customer)}</Typography>
                                <Typography variant="h5" align="center"> Completion status: {customer.completion_status === 5 ? 'Completed' : customer.completion_status}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Notes: {customer.notes}</Typography>
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
                                    <p>Address: {customer.street1}  {customer.street2}</p>
                                    <p>{customer.city}</p>
                                    <p>{customer.state}</p>
                                    <p>{customer.zip}</p>
                                    <p>{customer.phone_number}</p>
                                    <p>{customer.email}</p>
                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                                    <h3>Cleaning Questions:</h3>
                                    <h4>Cleaning Service</h4>
                                    <p>{customer.ServiceType}</p>
                                    <p>Bedrooms: {customer.Bedrooms}</p>
                                    <p>Bathrooms: {customer.Bathrooms}</p>
                                    <p>Additional Rooms: {customer.AdditionalRooms}</p>
                                    <p>Doors: {customer.Doors}</p>
                                    <p>Windows: {customer.Windows}</p>
                                    <p>Pets: {customer.HasPets}</p>
                                    <p>Hazardous Conditions: {customer.HazardousConditions} </p>
                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                                    <h3>Moving Questions</h3>
                                    <p>Moving To: {customer.moving_to}</p>
                                    <p>Moving From: {customer.moving_from}</p>
                                    <p>Large_items: {customer.large_items}</p>
                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                                    <h3>Organizing Questions</h3>
                                    <p>Bedrooms: {customer.Bedrooms}</p>
                                    <p>Bathrooms: {customer.Bathrooms}</p>
                                    <p>Additionals Rooms: {customer.AdditionalRooms}</p>
                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                                    <h3>Decluttering Questions</h3>
                                    <p>Bedrooms: {customer.Bedrooms}</p>
                                    <p>Bathrooms: {customer.Bathrooms}</p>
                                    <p>Donations: {donationConversion(inquiryDetails)}</p>
                                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />
                                    <h3>Customer Photos</h3>
                                    <img src={inquiryDetails?.media?.url} />
                                    <p></p>
                                </center>

                            </div>
                        </div>
                    ))}
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
