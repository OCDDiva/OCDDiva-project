//Imports go here
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';
// import { readAndCompressImage } from 'browser-image-resizer';

function Review() {
    //Code goes here
    const history = useHistory();
    const dispatch = useDispatch();
    const allUserInfo = useSelector(store => store.allUserInfo);

    //! States 
    const [comments, setComments] = useState('');
    const [dateRequested, setDateRequested] = useState('');
    const [photosToUpload, setPhotosToUpload] = useState();
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');

    const goBack = () => { history.goBack() };

    const submitInquiry = () => {
        dispatch({ type: 'UPDATE_COMMENTS', payload: { comments: comments, inquiry_id: allUserInfo?.contact?.id, } })
        dispatch({ type: 'UPDATE_DATES', payload: { date_requested: dateRequested, inquiry_id: allUserInfo?.contact?.id }})
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
        }})
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

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_INFO' });
    }, []);

    const cleaningDisplay = (allUserInfo) => {
        if (allUserInfo?.cleaning?.Cleaning === true) {
            return <div>
                <h3>Cleaning Questions:</h3>
                <p>Requested Service: {allUserInfo?.cleaning?.ServiceType}</p>
                <p>Number of Bedrooms: {allUserInfo?.cleaning?.Bedrooms}</p>
                <p>Number of Bathrooms: {allUserInfo?.cleaning?.Bathrooms}</p>
                <p>Number of Additional Rooms: {allUserInfo?.cleaning?.AdditionalRooms}</p>
                <p>Number of Doors: {allUserInfo?.cleaning?.Doors}</p>
                <p>Number of Windows: {allUserInfo?.cleaning?.Windows}</p>
                <p>Has Pets? {allUserInfo?.cleaning?.HasPets}</p>
                <p>Hazardous Conditions? {allUserInfo?.cleaning?.HazardousConditions}</p>
            </div>
        } else {
            return ''
        }
    }

    const movingDisplay = (allUserInfo) => {
        if (allUserInfo?.moving?.moving === true) {
            return <div>
                <h3>Moving Questions:</h3>
                <p>New Address: {allUserInfo?.moving?.moving_to}</p>
                <p>Old Address: {allUserInfo?.moving?.moving_from}</p>
                <p>Any Large Items? {allUserInfo?.moving?.large_items}</p>
            </div>
        } else {
            return ''
        }
    }

    const organizeDisplay = (allUserInfo) => {
        if (allUserInfo?.organize?.Organizing === true) {
            return <div>
                <h3>Organizing Questions:</h3>
                <p>Number of Bedrooms: {allUserInfo?.organize?.Bedrooms}</p>
                <p>Number of Bathrooms: {allUserInfo?.organize?.Bathrooms}</p>
                <p>Number of Additional Rooms: {allUserInfo?.organize?.AdditionalRooms}</p>
                <p>Wanting to Donate? {donationConversion(allUserInfo)}</p>
            </div>
        } else {
            return ''
        }
    }

    const declutterDisplay = (allUserInfo) => {
        if (allUserInfo?.declutt?.Declutter === true) {
            return <div>
                <h3>Decluttering Questions:</h3>
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

    //What displays
    return (
        <div className="reviewPage" >
            <ProgressBar currentStep={5} />
            <center>
                <h2 className="h2Headers">Review Your Information:</h2>
                <br />
                <div className="customerReview" >
                    <h3>Customer Information</h3>
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
                    <div>{cleaningDisplay(allUserInfo)}</div>
                    <br />
                    <div>{movingDisplay(allUserInfo)}</div>
                    <br />
                    <div>{organizeDisplay(allUserInfo)}</div>
                    <br />
                    <div>{declutterDisplay(allUserInfo)}</div>
                </div>
                <br />
                <br />
                <div className="dateRequest">
                    <h4>Please Request a Date for services:</h4>
                    <input type="date" value={dateRequested} onChange={(event) => { setDateRequested(event.target.value) }} />
                </div>
                <div className="picsAndComments">
                    <h3>Upload some photos of your space!</h3>
                    <form onSubmit={sendPhotoToServer}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                        />
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                    <br />
                    <br />
                    <h4>Leave us any additional comments!</h4>
                    <input type="text" value={comments} onChange={(event) => { setComments(event.target.value) }} />
                </div>
                <br />
                <br />
                <button className="btn" onClick={goBack}> Back </button>
                <button className="btn" onClick={submitInquiry}>Submit</button>
            </center>

        </div>
    )
} // End Review()

export default Review;