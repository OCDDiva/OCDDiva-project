import historyCard from './HistoryCard';
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
    <form>
        Search:<input type="text"
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
        />
        <input type="submit" />
    </form>
    <br/>
    <br/>
    <Grid container spacing={2}>
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
            <CardActions>
                <Button
                    variant="outlined"
                    color="error"
                    // onClick={(e) => saveCard()}
                    >
                         Details
                </Button>
            </CardActions>
        </Card>
    </Grid>
</Container>
    )
} //End UserHistory()

export default UserHistory;