//Imports go here
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
import { Card, TextField, Typography } from '@mui/material';

// import { readAndCompressImage } from 'browser-image-resizer';

function Review() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allUserInfo = useSelector(store => store.allUserInfo);

    //! States f
    const [comments, setComments] = useState('');
    const [dateRequested, setDateRequested] = useState('');
    const [photosToUpload, setPhotosToUpload] = useState();
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');

    //! Go back
    const goBack = () => { history.goBack() };

    //! Submit Inquiry
    const submitInquiry = () => {
        dispatch({ type: 'UPDATE_COMMENTS', payload: { comments: comments, inquiry_id: allUserInfo?.contact?.id, } })
        dispatch({ type: 'UPDATE_DATES', payload: { date_requested: dateRequested, inquiry_id: allUserInfo?.contact?.id } })
        history.push('/success');
    }

    const sendPhotoToServer = (event) => {
        event.preventDefault();
        const formData = new FormData();
        console.log('Checking Photos', photosToUpload);
        formData.append('image', photosToUpload);
        dispatch({
            type: 'UPLOAD_PHOTOS',
            payload: {
                photoUpload: formData,
                fileName,
                fileType,
                inquiry_id: allUserInfo?.contact?.id
            }
        })
    }

    const onFileChange = async (event) => {
        // const selectedFile = event.target.files[0];
        const fileToUpload = event.target.files[0];
        console.log("checking fileToUpload", fileToUpload)
        // Resize and compress the image. Remove this if using something other
        // than an image upload.
        const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
        // const resizedFile = await readAndCompressImage(copyFile, {
        // quality: 1.0,    // 100% quality
        // maxHeight: 1000, // max height of the image
        // });

        // Limit to specific file types

        const acceptedImageTypes = ['image/jpeg', 'image/png', 'impage/jpg'];
        if (acceptedImageTypes.includes(fileToUpload.type)) {
            setFileName(encodeURIComponent(fileToUpload.name));
            setFileType(encodeURIComponent(fileToUpload.type));
            setPhotosToUpload(fileToUpload);
        } else {
            alert('Please select an image');
        }
    }

    //! Use Effect
    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_INFO' });
    }, []);

    //! Cleaning 
    const cleaningDisplay = (allUserInfo) => {
        if (allUserInfo?.cleaning?.Cleaning === true) {
            return <div>
                <Typography className="reviewCategories" variant="h5"> Cleaning Questions: </Typography>
                <p>Requested Service: {allUserInfo?.cleaning?.ServiceType}</p>

                <p>Number of Bedrooms: {allUserInfo?.cleaning?.Bedrooms}</p>

                <p>Number of Bathrooms: {allUserInfo?.cleaning?.Bathrooms}</p>

                <p>Number of Additional Rooms: {allUserInfo?.cleaning?.AdditionalRooms}</p>

                <p>Number of Doors: {allUserInfo?.cleaning?.Doors}</p>

                <p>Number of Windows: {allUserInfo?.cleaning?.Windows}</p>

                <p>Has Pets? {allUserInfo?.cleaning?.HasPets}</p>

                <p>Hazardous Conditions? {allUserInfo?.cleaning?.HazardousConditions}</p>
                <br />
            </div>
        } else {
            return ''
        }
    }
    //! Moving
    const movingDisplay = (allUserInfo) => {
        if (allUserInfo?.moving?.moving === true) {
            return <div>
                <Typography className="reviewCategories" variant="h5"> Moving Questions: </Typography>
                <p>New Address: {allUserInfo?.moving?.moving_to}</p>
                <p>Old Address: {allUserInfo?.moving?.moving_from}</p>
                <p>Any Large Items? {allUserInfo?.moving?.large_items}</p>
                <br />
            </div>
        } else {
            return ''
        }
    }
    //! Organize
    const organizeDisplay = (allUserInfo) => {
        if (allUserInfo?.organize?.Organizing === true) {
            return <div>
                <Typography className="reviewCategories" variant="h5"> Organizing Questions: </Typography>
                <p>Number of Bedrooms: {allUserInfo?.organize?.Bedrooms}</p>
                <p>Number of Bathrooms: {allUserInfo?.organize?.Bathrooms}</p>
                <p>Number of Additional Rooms: {allUserInfo?.organize?.AdditionalRooms}</p>
                <p>Wanting to Donate? {donationConversion(allUserInfo)}</p>
            </div>
        } else {
            return ''
        }
    }

    //! Declutter
    const declutterDisplay = (allUserInfo) => {
        if (allUserInfo?.declutt?.Declutter === true) {
            return <div>
                <Typography className="reviewCategories" variant="h5"> Decluttering Questions: </Typography>
                <p>Number of Bedrooms: {allUserInfo?.declutt?.Bedrooms}</p>
                <p>Number of Bathrooms: {allUserInfo?.declutt?.Bathrooms}</p>
                <p>Number of Additional Rooms: {allUserInfo?.declutt?.AdditionalRooms}</p>
                <p>Wanting to Donate? {donationConversion(allUserInfo)}</p>
            </div>
        } else {
            return ''
        }
    }

    const donationConversion = (allUserInfo) => {
        if (allUserInfo?.declutt?.Donation === true) {
            return 'Yes'
        } else if (allUserInfo?.declutt?.Donation === false) {
            return 'No'
        }
    }

    //!What displays
    return (

        <div className="reviewPage" >

            <ProgressBar currentStep={5} />

            <Card sx={{
                width: 'auto',
                minWidth: 250,
                margin: 1,
                padding: 5,
                boxShadow: 5,
            }}>
                <center>

                    <Typography variant="h4" className="h2Headers"> Please review your information.</Typography>

                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />

                    <div className="customerReview" >
                        <br />

                        {/* //! Date request */}

                        <Typography variant="h5"> Customer Information: </Typography>

                        Name: {allUserInfo?.contact?.firstName}{'    '}
                        {allUserInfo?.contact?.lastName}
                        <br />

                        Address: {allUserInfo?.contact?.street1}{'    '}{allUserInfo?.contact?.street2}
                        <br />

                        City: {allUserInfo?.contact?.city}
                        <br />

                        State: {allUserInfo?.contact?.state}
                        <br />

                        Zip: {allUserInfo?.contact?.zip}
                        <br />

                        Phone Number: {allUserInfo?.contact?.phone_number}
                        <br />

                        Email: {allUserInfo?.contact?.email}

                        <br />
                        <br />
                    
                        <div>{cleaningDisplay(allUserInfo)}</div>

                        <div>{movingDisplay(allUserInfo)}</div>

                        <div>{organizeDisplay(allUserInfo)}</div>

                        <div>{declutterDisplay(allUserInfo)}</div>

                    </div>

                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />

                    {/* //! Date request */}
                    <div className="dateRequest">
                        <Typography variant="h5">Please request a date for your service(s): </Typography>

                        <br />

                        <input type="date" value={dateRequested} onChange={(event) => { setDateRequested(event.target.value) }} />
                    </div>

                    <br />
                    <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />

                    {/* //! Photo upload */}
                    <div className="picsAndComments">

                        <Typography variant="h5"> Attach a photo of your space:</Typography>

                        <form onSubmit={sendPhotoToServer}>
                            <input
                                type="file"
                                accept="image/*"
                                className="imageUpload"
                                onChange={onFileChange}
                            />
                            <br />
                            <button className="btn" type="submit">Submit</button>
                        </form>

                        <br />
                        <hr style={{ height: '5px', borderWidth: '0', color: 'blue' }} />

                        {/* //! Additional Comments */}
                        <Typography variant="h5">Additional comments: </Typography>
                        <br />
                        <TextField type="text" value={comments} rows="3" multiline
                            onChange={(event) => { setComments(event.target.value) }} />
                    </div>

                    <br />
                    <br />

                    {/* //! Buttons */}

                    <button className="btn" onClick={goBack}> Back </button>
                    <button className="btn" onClick={submitInquiry}>Submit</button>

                </center>
            </Card>

        </div>
    )
} // End Review()

export default Review;