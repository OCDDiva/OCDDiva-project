import HistoryCard from './HistoryCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import './UserHistory.css';

function UserHistory() {
    const history = useSelector((store => store.history));
    const dispatch = useDispatch();

    useEffect(() => {
        const action = { type: 'GET_HISTORY' };
        dispatch(action);
    }, []);

    console.log('Checking history in UserHistory', history)

    //!What displays
    return (

        <Container>
            <center>
                <Typography variant='h4' className='historyTitle'> Inquiry History </Typography>

                <br />

                <Grid justifyContent="center">
                    {
                        history.map((history) => (
                            <HistoryCard
                                key={history.id}
                                history={history}
                            />
                        ))
                    }
                </Grid>
            </center>

        </Container>
    )
} //End UserHistory()

export default UserHistory;