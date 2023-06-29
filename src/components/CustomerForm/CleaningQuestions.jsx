import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';


function CleaningQuestions() {
    const history = useHistory();
    const dispatch = useDispatch();

  const [cleaningOption, setCleaningOption] = useState('no');
  const [serviceType, setServiceType] = useState('');
  const [numberOfBedrooms, setNumberOfBedrooms] = useState('');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
  const [numberOfAdditionalRooms, setNumberOfAdditionalRooms] = useState('');
  const [numberOfDoorsWindows, setNumberOfDoorsWindows] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [hazardousConditions, setHazardousConditions] = useState('');

  const handleCleaningOptionChange = (event) => {
    setCleaningOption(event.target.value);
    setServiceType('');
    resetForm();
  };

  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
    resetForm();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform additional actions here, like submitting the form data to a server
    console.log('Cleaning Option:', cleaningOption);
    console.log('Service Type:', serviceType);
    console.log('Number of Bedrooms:', numberOfBedrooms);
    console.log('Number of Bathrooms:', numberOfBathrooms);
    console.log('Number of Additional Rooms:', numberOfAdditionalRooms);
    console.log('Number of Doors/Windows to be cleaned:', numberOfDoorsWindows);
    console.log('Has Pets:', hasPets);
    console.log('Hazardous Conditions:', hazardousConditions);
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setNumberOfBedrooms('');
    setNumberOfBathrooms('');
    setNumberOfAdditionalRooms('');
    setNumberOfDoorsWindows('');
    setHasPets(false);
    setHazardousConditions('');
  };

  const handleNext = (event) => {
    console.log('Moving to the next page...');
    event.preventDefault();
    history.push('/movingquestions');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Do you want a cleaning service?</p>
          <div>
            <input
              type="radio"
              id="cleaningOptionYes"
              name="cleaningOption"
              value="yes"
              checked={cleaningOption === 'yes'}
              onChange={handleCleaningOptionChange}
            />
            <label htmlFor="cleaningOptionYes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              id="cleaningOptionNo"
              name="cleaningOption"
              value="no"
              checked={cleaningOption === 'no'}
              onChange={handleCleaningOptionChange}
            />
            <label htmlFor="cleaningOptionNo">No</label>
          </div>
        </div>
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
            {serviceType === 'essential' && (
              <div>
                <ul>
                  <li>
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
                    <div>
                      <input
                        type="radio"
                        id="hasPetsYes"
                        name="hasPets"
                        value="yes"
                        checked={hasPets === true}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsYes">Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="hasPetsNo"
                        name="hasPets"
                        value="no"
                        checked={hasPets === false}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsNo">No</label>
                    </div>
                  </li>
                  <li>
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
                <button className="btn" type="submit">Submit</button>
              </div>
            )}
            {serviceType === 'ultimate' && (
              <div>
                <ul>
                  <li>
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
                    <div>
                      <input
                        type="radio"
                        id="hasPetsYes"
                        name="hasPets"
                        value="yes"
                        checked={hasPets === true}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsYes">Yes</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="hasPetsNo"
                        name="hasPets"
                        value="no"
                        checked={hasPets === false}
                        onChange={handleHasPetsChange}
                      />
                      <label htmlFor="hasPetsNo">No</label>
                    </div>
                  </li>
                  <li>
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
                <button type="submit">Submit</button>
              </div>
            )}
          </div>
        )}
        {cleaningOption === 'no' && (
          <button className="btn" type="button" onClick={handleNext}>
            Next
          </button>
        )}
      </form>
    </div>
  );
};

export default CleaningQuestions;