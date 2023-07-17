import { useHistory } from 'react-router-dom'
import { Card, Typography } from '@mui/material';
import { useEffect } from 'react';

function Success() {
    const history = useHistory();

   //! Use effect to make the page load at the postion I want
   useEffect(() => {
    window.scrollTo(0, 50)
}, [])

    //! Takes user back to dashboard
    const backToHome = () => {
        history.push('/home')
    };

    //!What displays
    return (
        <>
            <center>
                <Card sx={{
                    maxWidth:'fit-content',
                    margin: 2,
                    padding: 5,
                    boxShadow: 5,
                }}>
                    <Typography variant='h3'>
                        Thank you!
                    </Typography>

                    <br /> <br />

                    <Typography variant="h6">
                        Your inquiry has been sent.
                        <br /> <br/>
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