import axios from 'axios';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

function historyCard() {
    //Code here

    //What displays
    return (
        <Grid item xs={12} md={4}>
        <Card  sx={{ minWidth: 275} }>
            <CardContent>
                <Typography 
                variant="h5"
                >
                   History example
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="outlined"
                    color="error"
                    // onClick={(e) => saveCard()}
                    >
                         Save
                </Button>
            </CardActions>
        </Card>
    </Grid>
    )
} //End historyCard()

export default historyCard;