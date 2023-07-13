import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ProgressBar from '../ProgressBar/ProgressBar.jsx';

function CleaningQuestions() {

  const history = useHistory();
  const dispatch = useDispatch();
  

  //! States
  const [cleaningOption, setCleaningOption] = useState();
  const [serviceType, setServiceType] = useState(null);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState(0);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(0);
  const [numberOfAdditionalRooms, setNumberOfAdditionalRooms] = useState(0);
  const [numberOfDoorsWindows, setNumberOfDoorsWindows] = useState(0);
  const [hasPets, setHasPets] = useState('None');
  const [hazardousConditions, setHazardousConditions] = useState('None');

  //! Handle Changes
  const handleCleaningOptionChange = (event) => {
    setCleaningOption(event.target.value);
    setServiceType('');
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  const handleNumberOfBedroomsChange = (event) => {
    setNumberOfBedrooms(event.target.value);
  };

  const handleNumberOfBathroomsChange = (event) => {
    setNumberOfBathrooms(event.target.value);
  };

  const handleNumberOfAdditionalRoomsChange = (event) => {
    setNumberOfAdditionalRooms(event.target.value);
  };

  const handleNumberOfDoorsWindowsChange = (event) => {
    setNumberOfDoorsWindows(event.target.value);
  };

  const handleHasPetsChange = (event) => {
    setHasPets(event.target.value);
  };

  const handleHazardousConditionsChange = (event) => {
    setHazardousConditions(event.target.value);
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_INFO' });
    
  }, []);

  const allUserInfo = useSelector(store => store.allUserInfo);

  //! Submit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_CLEANING_QUESTIONS',
      payload: {
        cleaningOption,
        serviceType,
        numberOfBedrooms,
        numberOfBathrooms,
        numberOfAdditionalRooms,
        numberOfDoorsWindows,
        hasPets,
        hazardousConditions,
        inquiry_id: allUserInfo.contact[0].id,
      },
    });
    history.push('/movingquestions');
  };

  //! Back
  const goBack = () => { history.push('/DefaultQuestions') }

  //! What Displays
  return (
    <center>
      <ProgressBar currentStep={1} />

      <Card sx={{
        width: 'auto',
        minWidth: 250,
        margin: 2,
        padding: 1,
        boxShadow: 5,
      }}>

        <form onSubmit={handleSubmit}>

          <br />

          <FormControl>

            <Typography variant="h5"> Do you need a cleaning service? </Typography>

            <RadioGroup sx={{ display: 'block' }}
              row
              className='rowCleaningQuestion'
              name="radio-btn-row-cleaning-question" >

              <FormControlLabel value="yes" control={<Radio />} label="Yes" onChange={handleCleaningOptionChange} labelPlacement="bottom" />
              <FormControlLabel value="no" control={<Radio />} label="No" onChange={handleCleaningOptionChange} labelPlacement="bottom" />

            </RadioGroup>
          </FormControl>

          <br />

          {cleaningOption === 'yes' && (
            <div>
              <br />

              <FormControl variant="standard">
                <FormLabel> Please select a service: </FormLabel>
                <Select
                  id="serviceType"
                  label="Service Type"
                  value={serviceType}
                  onChange={handleServiceTypeChange} >

                  <br /><br />

                  <MenuItem value="essential">Essential Cleaning</MenuItem>
                  <MenuItem value="ultimate">Ultimate Cleaning</MenuItem>

                </Select>
                <br />

                {/* ESSENTIAL Clean */}
                {serviceType === 'essential' && (
                  <div>
                    <ul>

                      <li>

                        {/* Bedrooms */}
                        <Typography> How many bedrooms do you have? </Typography>

                        <TextField
                          required
                          type='number'
                          id='numberOfBedrooms'
                          name='numberOfBedrooms'
                          value={numberOfBedrooms}
                          onChange={handleNumberOfBedroomsChange}
                        />
                      </li>

                      <br />

                      <li>
                        {/* Bathrooms */}
                        <Typography> How many bathrooms do you have? </Typography>

                        <TextField
                          required
                          type='number'
                          id='numberOfBathrooms'
                          name='numberOfBathrooms'
                          value={numberOfBathrooms}
                          onChange={handleNumberOfBathroomsChange}
                        />
                      </li>

                      <br />

                      <li>
                        {/* Additional rooms */}
                        <Typography> How many additional rooms do you have? </Typography>

                        <TextField
                          type='number'
                          id='numberOfAdditionalRooms'
                          name='numberOfAdditionalRooms'
                          value={numberOfAdditionalRooms}
                          onChange={handleNumberOfAdditionalRoomsChange}
                        />

                      </li>

                      <br />

                      <li>
                        {/* Pets Question*/}

                        <FormControl>
                          <Typography>Do you have pets?</Typography>
                          <TextField
                            id="hasPets"
                            value={hasPets}
                            onChange={handleHasPetsChange}
                            variant="outlined"
                          />
                        </FormControl>

                      </li>

                      <br />

                      <li>
                        {/* Hazards */}
                        <Typography> Are there any hazardous conditions we should know about? </Typography>

                        <TextField
                          type='text'
                          id='hazardousConditions'
                          name='hazardousConditions'
                          helperText="Ex. Mold, infestations, etc."
                          value={hazardousConditions}
                          onChange={handleHazardousConditionsChange}
                        />
                      </li>
                    </ul>

                    {/* Submit Button */}
                    <button className="btn" type="submit"> Next </button>

                  </div>
                )}

                {/* ULTIMATE Clean */}
                {serviceType === 'ultimate' && (
                  <div>
                    <ul>

                      {/* Bedrooms */}
                      <li>
                        <Typography> How many bedrooms do you have? </Typography>

                        <TextField
                          required
                          type='number'
                          id='numberOfBedrooms'
                          name='numberOfBedrooms'
                          value={numberOfBedrooms}
                          onChange={handleNumberOfBedroomsChange}
                        />
                      </li>

                      <br />

                      {/* Bathrooms */}
                      <li>
                        <Typography> How many bathrooms do you have? </Typography>

                        <TextField
                          required
                          type='number'
                          id='numberOfBathrooms'
                          name='numberOfBathrooms'
                          value={numberOfBathrooms}
                          onChange={handleNumberOfBathroomsChange}
                        />
                      </li>

                      <br />

                      {/* Additional rooms */}
                      <li>
                        <Typography> How many additional rooms do you have? </Typography>

                        <TextField
                          type='number'
                          id='numberOfAdditionalRooms'
                          name='numberOfAdditionalRooms'
                          value={numberOfAdditionalRooms}
                          onChange={handleNumberOfAdditionalRoomsChange}
                        />
                      </li>

                      <br />

                      <li>
                        {/* Doors and Windows */}
                        {/*//! This should be split into separate inputs.. */}

                        <Typography> How many doors and windows need to be cleaned? </Typography>

                        <TextField
                          type='number'
                          id='numberOfDoorsWindows'
                          name='numberOfDoorsWindows'
                          value={numberOfDoorsWindows}
                          onChange={handleNumberOfDoorsWindowsChange}
                        />
                      </li>

                      <br />

                      {/* Pets Question*/}
                      <li>
                      <FormControl>
                          <Typography>Do you have pets?</Typography>
                          <TextField
                            id="hasPets"
                            value={hasPets}
                            onChange={handleHasPetsChange}
                            variant="outlined"
                          />
                        </FormControl>
                      </li>

                      <br />


                      <li>
                        {/* Hazards */}
                        <Typography> Are there any hazardous conditions we should know about? </Typography>

                        <TextField
                          type='text'
                          id='hazardousConditions'
                          name='hazardousConditions'
                          helperText="Ex. Mold, infestations, etc."
                          value={hazardousConditions}
                          onChange={handleHazardousConditionsChange}
                        />
                      </li>
                    </ul>

                    {/* Submit Button */}
                    <button type="submit" className='btn'> Next </button>

                    <br />

                  </div>
                )}
              </FormControl>
            </div>
          )}

          <br />
          {/* Submit/Next Button */}
          {cleaningOption === 'no' && (
            <button className="btn" type="button" onClick={handleSubmit}>
              Next
            </button>
          )}

          {/* Back Button */}
          <button className="btn" type="button" onClick={goBack}>
            Back
          </button>

        </form>
      </Card >
    </center >

  );
};

export default CleaningQuestions;
