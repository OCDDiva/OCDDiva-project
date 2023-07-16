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

    console.log('Check history', history)

    const dateConversion = (oldDate) => {
        const date = new Date(oldDate.date_received).toLocaleDateString('en-EN')
        return `${date}`
    }

    const serviceConversion = (history) => {
        if (history.cleaning.ServiceType === 'essential') {
            return 'Essential Clean'
        } else if (history.cleaning.ServiceType === 'ultimate') {
            return 'Ultimate Clean'
        } else if (history.moving.moving === true) {
            return 'Moving'
        } else if (history.organize.Organizing === true) {
            return 'Organizing'
        } else if (history.declutt.Declutter === true) {
            return 'Declutter'
        }
    }

    return (
        <Grid item xs={{ minWidth: 700 }}>
        <Card sx={{  maxWidth: 'fit-content' }}>
            <CardContent>
                <br/>
                <Typography 
                variant="h5"
                >
                 Date of Inquiry: {dateConversion(history)}
                </Typography>
                <br />
                <Typography 
                variant="h5"
                >
                 Date Requested: {dateConversion(history)}
                </Typography>
                <br />
                <Typography 
                variant="h5"
                >
                 {/* Type of service: {serviceConversion(history)} */}
                </Typography>
                <br />
                <Typography 
                variant="h5"
                >
                 Completion status:
                 <br />
                 <Typography variant="h6">{history.status}</Typography>
                 <br />
                </Typography>
                <Typography variant="h5">Comments: </Typography>
                <p>{history.comments}</p>
                <br/>
            </CardContent>
        </Card>
        <br />
    </Grid>
    )
} //End historyCard()

export default historyCard;