import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function historyCard() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const action  = { type: 'GET_HISTORY' }
        dispatch(action);
    }, []);

    return (
        <Grid item xs={12} md={4}>
        <Card  sx={{ minWidth: 555, minHeight:300} }>
            <CardContent>
                <Typography 
                variant="h4"
                >
                 Name: Example Customer 
                </Typography>
                <br/>
                <Typography 
                variant="h5"
                >
                 Date of Service: 
                </Typography>
                <Typography 
                variant="h5"
                >
                 Type of service:
                </Typography>
                <Typography 
                variant="h5"
                >
                 Completion status: 
                </Typography>
                <Typography 
                variant="h5"
                >
                Notes: 
                </Typography>
                <br/>
            </CardContent>
        </Card>
    </Grid>
    )
} //End historyCard()

export default historyCard;