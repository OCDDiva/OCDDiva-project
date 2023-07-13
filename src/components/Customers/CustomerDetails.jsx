import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Button, TextField, Box, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
const luxon = require('luxon');
const dateTime = luxon.DateTime;

function CustomerDetails() {
    const { customerId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const customerDetails = useSelector(store => store.customerReducer);
    


    const handleAdd = () => {
        history.goBack(); // Redirects to the previous page
    };

    const handleEdit = () => {
        history.goBack(); // Redirects to the previous page
    };

    const handleSave = () => {
        history.goBack(); // Redirects to the previous page
    };

    // const handleDelete = () => {
    //     history.goBack(); // Redirects to the previous page
    // };


    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS_DETAILS', payload: customerId});
    }, [customerId]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this dog?')) {
            axios
                .delete(`/api/forms/customers/${id}`)
                .then((result) => {
                    dispatch({ type: 'FETCH_CUSTOMERS_DETAILS' });
                })
                .catch((error) => {
                    console.log(`Error in DELETE: ${error}`);
                    alert(`Failed to delete dog!`);
                });
        }
    };

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
                                <Typography variant="h5" style={{ textAlign: "center" }}>Type of service: {customer.services_id}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Completion status: {customer.completion_status}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Notes: {customer.notes}</Typography>
                            </CardContent>
                        </div>
                    ))}
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className="btn" onClick={handleAdd}>
                            Add Note
                        </button>
                        <button className="btn" onClick={handleEdit}>
                            Edit Note
                        </button>
                        <button className="btn" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                    <br />
                    <Typography variant="h4" style={{ textAlign: "center" }}>Customer's Form(s):</Typography>
                    <form>
                        
                        {/* Add more form fields based on your form structure */}
                    </form>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                        <button className="btn" onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="btn" onClick={handleSave}>
                            Save
                        </button>
                        <button className="btn" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </Container>
            </Box>
        </React.Fragment>
    );
}

export default CustomerDetails;
