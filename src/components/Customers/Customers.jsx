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
    const [searchByDate, setSearchByDate] = useState('');


console.log('Hello', customers)

    useEffect(() => {
        dispatch({ type: 'FETCH_CUSTOMERS' });
        
    }, []);


    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_requested).toLocaleDateString('en-EN')
        return `${date}`
    }

    const handleSearch = () => {
        // Perform any additional logic here (e.g., dispatch a search action)
        console.log('Search query:', searchQuery);
        console.log('Date search query:', searchByDate);

    };


    //What displays
    return (
        <Container>
            <h1 style={{ textAlign: "center" }} >Customers</h1>
            <form>
                Search:
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <input
                    type="text"
                    value={searchByDate}
                    onChange={(e) => setSearchByDate(e.target.value)}
                    placeholder="Search by date"
                />
                <button type="submit" onClick={() => handleSearch()}>Search</button>
            </form>
            <br />
            <br />
            <Grid container spacing={2} justifyContent="center">
                {customers
                    .filter((customer) => {
                        const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
                        const formattedDate = new Date(customer.date_received).toLocaleDateString('en-EN');
                        return (
                          fullName.includes(searchQuery.toLowerCase()) &&
                          formattedDate.includes(searchByDate)
                        );
                      })
                    .map((customer) => (
                        <Card key={customer.id} sx={{ minWidth: 555, minHeight: 300 }}>
                            <CardContent>
                                <Typography variant="h4" style={{ textAlign: "center" }}> Name: {customer.firstName} {customer.lastName}
                                </Typography>
                                <br />
                                <Typography variant="h5" style={{ textAlign: "center" }}>Date of Service: {dateConversion(customer)}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Completion status: {customer.completion_status}</Typography>
                                <Typography variant="h5" style={{ textAlign: "center" }}>Notes: {customer.notes}</Typography>
                                <br />
                            </CardContent>
                            <CardActions>
                                <button onClick={() => history.push(`/customer-details/${customer.id}`)} className="btn" style={{ display: "block", margin: "0 auto" }}>
                                    Details
                                </button>
                            </CardActions>
                        </Card>
                    ))}
            </Grid>
        </Container>
    );
}

export default Customers;