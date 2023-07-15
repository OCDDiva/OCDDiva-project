import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, TextField, Box, Card, CardContent, CardActions } from '@mui/material';
const luxon = require('luxon');
const dateTime = luxon.DateTime;


function CustomerDetails() {
    const { customerId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const customerDetails = useSelector(store => store.customerReducer);


    const handleEdit = () => {
        history.goBack(); // Redirects to the previous page
    };

    

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            dispatch({ type: 'DELETE_CUSTOMERS', payload:id});
            history.push('/customerhistory')
        }
    };

    console.log(customerId)


    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS_DETAILS', payload: customerId });
    }, [customerId]);


    // Function to transform the date format
    function transformDate(date) {
        let time = dateTime.fromISO(date);
        let year = `${time.year}`;
        let slice = year.slice(2);
        return `${time.month}/${time.day}/${slice}`;
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
                                <Typography variant="h5" style={{ textAlign: "center" }}>Date of Service: {transformDate(customer.service_on)}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Completion status: {customer.completion_status}</Typography>
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
                                    <h3>Cleaning Questions:</h3>
                                    <h4>Cleaning Service</h4>
                                    <p>{customer.ServiceType}</p>
                                    <p>Bedrooms: {customer.Bedrooms}</p>
                                    <p>Bathrooms: {customer.Bathrooms}</p>
                                    <p>Additional Rooms: {customer.AdditionalRooms}</p>
                                    <p>Doors & Windows: {customer.DoorsWindows}</p>
                                    <p>Pets: {customer.HasPets}</p>
                                    <h3>Moving Questions</h3>
                                    <h3>Organizing Questions</h3>
                                    <h3>Decluttering Questions</h3>
                                    <h3>Customer Photos</h3>
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
