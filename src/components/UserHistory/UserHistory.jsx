import HistoryCard from './HistoryCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

function UserHistory() {
    //Code here

    //What displays
    return (
        // This will be replaced with HistoryCard component as a .map 
<Container>

    <br/>
    <br/>
    <Grid  justifyContent="center"
    container spacing={2}>
   <HistoryCard/>
    </Grid>
</Container>
    )
} //End UserHistory()

export default UserHistory;