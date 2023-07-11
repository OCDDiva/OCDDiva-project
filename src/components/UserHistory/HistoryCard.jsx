import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function historyCard({ history }) {
    const dispatch = useDispatch();
   

    useEffect(() => {
        const action  = { type: 'GET_HISTORY' }
        dispatch(action);
    }, []);

    return (
        <Grid item xs={{ minWidth: 700 }}>
        <Card sx={{ minWidth: 700 }}>
            <CardContent>
                <br/>
                <Typography 
                variant="h5"
                >
                 Date of Service: {history.date_received}
                </Typography>
                <Typography 
                variant="h5"
                >
                 Type of service:{history.service}
                </Typography>
                <Typography 
                variant="h5"
                >
                 Completion status: {history.status}
                </Typography>
                <Typography 
                variant="h5"
                >
                Notes: {history.comments}
                </Typography>
                <br/>
            </CardContent>
        </Card>
    </Grid>
    )
} //End historyCard()

export default historyCard;