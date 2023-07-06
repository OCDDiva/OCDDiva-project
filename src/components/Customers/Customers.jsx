import { CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container, Grid, Card, Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';
const luxon = require('luxon');
const dateTime = luxon.DateTime;


function Customers() {
    const dispatch = useDispatch();
    const customers = useSelector(store => store.customerReducer)
    const history = useHistory();


    // const viewCustomerDetails = (customerId) => {
    //     history.push(`/forms/${customerId}`);
    // };

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' });
    }, []);


    // Function to transform the date format
    function transformDate(date) {
        let time = dateTime.fromISO(date);
        let year = `${time.year}`;
        let slice = year.slice(2);
        return `${time.month}/${time.day}/${slice}`;
    }


    //What displays
    return (
        <Container>
            <h1 style={{ textAlign: "center" }} >Customers</h1>
            <form>
                Search:<input type="text" />
                <input type="submit" />
            </form>
            <br />
            <br />
            <Grid container spacing={2}>
                {customers.map((customer) => (
                    <Card key={customer.id} sx={{ minWidth: 555, minHeight: 300 }}>
                        <CardContent>
                            <Typography variant="h4"> Name: {customer.firstName} {customer.lastName}
                            </Typography>
                            <br />
                            <Typography variant="h5">Date of Service: {transformDate(customer.service_on)}</Typography>
                            <Typography variant="h5">Type of service: {customer.services_id}</Typography>
                            <Typography variant="h5">Completion status: {customer.completion_status}</Typography>
                            <Typography variant="h5">Notes: </Typography>
                            <br />
                        </CardContent>
                        <CardActions>
                            <Button component={Link} to={`/customer-details/${customer.id}`} variant="outlined" color="error">
                                Details
                            </Button>
                            <Button component={Link} to={`/inquiry-details/${customer.inquiryId}`} variant="outlined" color="error">
                                Back
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Grid>
        </Container>
    );
} // End Customers()

export default Customers;