import { useHistory } from 'react-router-dom'
import { Card, Typography } from '@mui/material';

function Success() {
    const history = useHistory();

    //! Takes user back to dashboard
    const backToHome = () => {
        history.push('/home')
    };

    //What displays
    //TODO need to add breakpoints to everything so that the display will adjust to size of device
    return (
        <>
            <center>
                <Card sx={{
                    width: 700,
                    margin: 2,
                    padding: 5,
                    boxShadow: 5,
                }}>
                    <Typography variant='h2'>
                        Thank you!
                    </Typography>

                    <br /> <br />

                    <Typography variant="h6">
                        Your inquiry has been sent.
                        <br />
                        We will be in touch as soon as we can.
                    </Typography>

                    <br /> <br />

                    <button className="btn" onClick={backToHome}>
                        Home
                    </button>

                    <br /> <br />

                </Card>
            </center>
        </>

    )
} // End Success()

export default Success;