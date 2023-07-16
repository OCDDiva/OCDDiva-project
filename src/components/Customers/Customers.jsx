import { CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Container, Grid, Card, Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';



function Customers() {
    const dispatch = useDispatch();
    const customers = useSelector(store => store.customerReducer)
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' });

    }, []);


    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const handleSearch = () => {
    };


    //What displays
    return (
        <Container>
            <center>
                <h1 style={{ textAlign: "center" }} >Customers</h1>
                <br />
                <form>
                    <div style={{ textAlign: "center" }}>
                        Search:
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" onClick={() => handleSearch()}>Search</button>
                    </div>
                </form>
                <br />
                <br />
                <Grid container spacing={2} justifyContent="center">
                    {customers
                        .filter((customer) => {
                            const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
                            return fullName.includes(searchQuery.toLowerCase());
                        })
                        .map((customer) => (
                            <Grid item key={customer.id} xs={12} sx={{ maxWidth: 'fit-content', }}>
                                <Card sx={{ maxWidth: 500, minWidth: 555, minHeight: 300, marginBottom: '20px' }}>
                                    <CardContent>
                                        <Typography variant="h4" align="center"> Name: {customer.firstName} {customer.lastName}
                                        </Typography>
                                        <br />
                                        <Typography variant="h5" align="center">Date of Service: {dateConversion(customer)}</Typography>
                                        <Typography variant="h5" align="center">Completion status: {customer.completion_status === 5 ? 'Completed' : customer.completion_status}</Typography>
                                        <br />
                                    </CardContent>
                                    <CardActions style={{ justifyContent: 'center' }}>
                                        <button onClick={() => history.push(`/customer-details/${customer.id}`)} className="btn" style={{ display: "block", margin: "0 auto" }}>
                                            Details
                                        </button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </center>   
        </Container>
    );
}

export default Customers;