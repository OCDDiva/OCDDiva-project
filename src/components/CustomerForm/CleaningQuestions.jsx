import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '@mui/material';
import TextField from '@mui/material/TextField';


function CleaningQuestions() {

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  //! States
  const [cleaningOption, setCleaningOption] = useState('no');
  const [serviceType, setServiceType] = useState(null);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState(0);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState(0);
  const [numberOfAdditionalRooms, setNumberOfAdditionalRooms] = useState(0);
  const [numberOfDoorsWindows, setNumberOfDoorsWindows] = useState(0);
  const [hasPets, setHasPets] = useState(false);
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
    setHasPets(event.target.value === 'yes');
  };

  const handleHazardousConditionsChange = (event) => {
    setHazardousConditions(event.target.value);
  };

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
        userId: user.id,
      },
    });
    history.push('/movingquestions');
  };

  //TODO Steve what is this? It isn't being used
  const handleNext = (event) => {
    console.log('Moving to the next page...');
    event.preventDefault();
    history.push('/movingquestions');
  };

  //! Back
  const goBack = () => { history.push('/DefaultQuestions') }

  //! What Displays
  //TODO Want to change all of these inputs to Textfields
  return (
    <center>
      <Card sx={{
        width: 'auto',
        minWidth: 250,
        margin: 2,
        padding: 5,
        boxShadow: 5,
      }}>

        <form onSubmit={handleSubmit}>


          <p>Do you want a cleaning service?</p>

          <input
            type="radio"
            id="cleaningOptionYes"
            name="cleaningOption"
            value="yes"
            checked={cleaningOption === 'yes'}
            onChange={handleCleaningOptionChange}
          />

          <label htmlFor="cleaningOptionYes">Yes</label>

          <input
            type="radio"
            id="cleaningOptionNo"
            name="cleaningOption"
            value="no"
            checked={cleaningOption === 'no'}
            onChange={handleCleaningOptionChange}
          />
          <label htmlFor="cleaningOptionNo">No</label>

          {cleaningOption === 'yes' && (
            <div>
              <label htmlFor="serviceType">Select a cleaning service:</label>
              <select
                id="serviceType"
                name="serviceType"
                value={serviceType}
                onChange={handleServiceTypeChange}
              >
                <option value="">Select service type</option>
                <option value="essential">Essential Cleaning</option>
                <option value="ultimate">Ultimate Cleaning</option>
              </select>

              {/* ESSENTIAL Clean */}
              {serviceType === 'essential' && (
                <div>
                  <ul>

                    <li>
                      {/* Bedrooms */}
                      <label htmlFor="numberOfBedrooms">Number of Bedrooms:</label>
                      <input
                        type="number"
                        id="numberOfBedrooms"
                        name="numberOfBedrooms"
                        value={numberOfBedrooms}
                        onChange={handleNumberOfBedroomsChange}
                      />
                    </li>

                    <li>
                      {/* Bathrooms */}
                      <label htmlFor="numberOfBathrooms">Number of Bathrooms:</label>
                      <input
                        type="number"
                        id="numberOfBathrooms"
                        name="numberOfBathrooms"
                        value={numberOfBathrooms}
                        onChange={handleNumberOfBathroomsChange}
                      />
                    </li>

                    <li>
                      {/* Additional rooms */}
                      <label htmlFor="numberOfAdditionalRooms">Number of Additional Rooms:</label>
                      <input
                        type="number"
                        id="numberOfAdditionalRooms"
                        name="numberOfAdditionalRooms"
                        value={numberOfAdditionalRooms}
                        onChange={handleNumberOfAdditionalRoomsChange}
                      />
                    </li>

                    <li>
                      {/* Doors and Windows */}
                      <label htmlFor="numberOfDoorsWindows">Number of Doors/Windows to be cleaned:</label>
                      <input
                        type="number"
                        id="numberOfDoorsWindows"
                        name="numberOfDoorsWindows"
                        value={numberOfDoorsWindows}
                        onChange={handleNumberOfDoorsWindowsChange}
                      />
                    </li>

                    <li>

                      <p>Do you have pets?</p>

                      {/* Pets Yes*/}
                      <input
                        type="radio"
                        id="hasPetsYes"
                        name="hasPets"
                        value="yes"
                        checked={hasPets === true}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsYes">Yes</label>

                      {/* Pets No*/}
                      <input
                        type="radio"
                        id="hasPetsNo"
                        name="hasPets"
                        value="no"
                        checked={hasPets === false}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsNo">No</label>
                    </li>

                    <li>
                      {/* Hazards */}
                      <label htmlFor="hazardousConditions">Hazardous Conditions:</label>
                      <input
                        type="text"
                        id="hazardousConditions"
                        name="hazardousConditions"
                        value={hazardousConditions}
                        onChange={handleHazardousConditionsChange}
                      />
                    </li>
                  </ul>

                  {/* Submit Button */}
                  <button className="btn" type="submit">Submit</button>

                </div>
              )}

              {/* ULTIMATE Clean */}
              {serviceType === 'ultimate' && (
                <div>
                  <ul>

                    <li>
                      {/* Bedrooms */}
                      <label htmlFor="numberOfBedrooms">Number of Bedrooms:</label>
                      <input
                        type="number"
                        id="numberOfBedrooms"
                        name="numberOfBedrooms"
                        value={numberOfBedrooms}
                        onChange={handleNumberOfBedroomsChange}
                      />
                    </li>

                    <li>
                      {/* Bathrooms */}
                      <label htmlFor="numberOfBathrooms">Number of Bathrooms:</label>
                      <input
                        type="number"
                        id="numberOfBathrooms"
                        name="numberOfBathrooms"
                        value={numberOfBathrooms}
                        onChange={handleNumberOfBathroomsChange}
                      />
                    </li>

                    <li>
                      {/* Additional rooms */}
                      <label htmlFor="numberOfAdditionalRooms">Number of Additional Rooms:</label>
                      <input
                        type="number"
                        id="numberOfAdditionalRooms"
                        name="numberOfAdditionalRooms"
                        value={numberOfAdditionalRooms}
                        onChange={handleNumberOfAdditionalRoomsChange}
                      />
                    </li>

                    <li>
                      {/* Doors and Windows */}
                      <label htmlFor="numberOfDoorsWindows">Number of Doors/Windows to be cleaned:</label>
                      <input
                        type="number"
                        id="numberOfDoorsWindows"
                        name="numberOfDoorsWindows"
                        value={numberOfDoorsWindows}
                        onChange={handleNumberOfDoorsWindowsChange}
                      />
                    </li>

                    <li>
                      <p>Do you have pets?</p>

                      {/* Pets Yes Button */}
                      <input
                        type="radio"
                        id="hasPetsYes"
                        name="hasPets"
                        value="yes"
                        checked={hasPets === true}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsYes">Yes</label>

                      {/* Pets No Button */}
                      <input
                        type="radio"
                        id="hasPetsNo"
                        name="hasPets"
                        value="no"
                        checked={hasPets === false}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsNo">No</label>
                    </li>

                    <li>
                      {/* Hazards */}
                      <label htmlFor="hazardousConditions">Hazardous Conditions:</label>
                      <input
                        type="text"
                        id="hazardousConditions"
                        name="hazardousConditions"
                        value={hazardousConditions}
                        onChange={handleHazardousConditionsChange}
                      />
                    </li>
                  </ul>

                  {/* Submit Button */}
                  <button type="submit" className='btn'>Submit</button>

                  <br />

                </div>
              )}
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
    </center>

  );
};

export default CleaningQuestions;
