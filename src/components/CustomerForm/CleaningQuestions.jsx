import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';


const CleaningForm = () => {
  const [cleaningOption, setCleaningOption] = useState('no');
  const [serviceType, setServiceType] = useState('');
  const [numberOfBedrooms, setNumberOfBedrooms] = useState('');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
  const [numberOfAdditionalRooms, setNumberOfAdditionalRooms] = useState('');
  const [numberOfDoorsWindows, setNumberOfDoorsWindows] = useState('');
  const [hasPets, setHasPets] = useState(false);
  const [hasHazardousConditions, setHasHazardousConditions] = useState(false);

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

  const handleHasHazardousConditionsChange = (event) => {
    setHasHazardousConditions(event.target.value === 'yes');
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
    console.log('Has Hazardous Conditions:', hasHazardousConditions);
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setNumberOfBedrooms('');
    setNumberOfBathrooms('');
    setNumberOfAdditionalRooms('');
    setNumberOfDoorsWindows('');
    setHasPets(false);
    setHasHazardousConditions(false);
  };

  return (
    <div>
      <h1>Welcome to our Cleaning Form Service</h1>
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
                <label htmlFor="numberOfBedrooms">Number of Bedrooms:</label>
                <input
                  type="number"
                  id="numberOfBedrooms"
                  name="numberOfBedrooms"
                  value={numberOfBedrooms}
                  onChange={handleNumberOfBedroomsChange}
                />
                <label htmlFor="numberOfBathrooms">Number of Bathrooms:</label>
                <input
                  type="number"
                  id="numberOfBathrooms"
                  name="numberOfBathrooms"
                  value={numberOfBathrooms}
                  onChange={handleNumberOfBathroomsChange}
                />
                <label htmlFor="numberOfAdditionalRooms">Number of Additional Rooms:</label>
                <input
                  type="number"
                  id="numberOfAdditionalRooms"
                  name="numberOfAdditionalRooms"
                  value={numberOfAdditionalRooms}
                  onChange={handleNumberOfAdditionalRoomsChange}
                />
                <label htmlFor="numberOfDoorsWindows">Number of Doors/Windows to be cleaned:</label>
                <input
                  type="number"
                  id="numberOfDoorsWindows"
                  name="numberOfDoorsWindows"
                  value={numberOfDoorsWindows}
                  onChange={handleNumberOfDoorsWindowsChange}
                />
                <div>
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
                </div>
                <div>
                  <p>Do you have hazardous conditions? (e.g., mold, mildew, bugs, rats)</p>
                  <div>
                    <input
                      type="radio"
                      id="hasHazardousConditionsYes"
                      name="hasHazardousConditions"
                      value="yes"
                      checked={hasHazardousConditions === true}
                      onChange={handleHasHazardousConditionsChange}
                    />
                    <label htmlFor="hasHazardousConditionsYes">Yes</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="hasHazardousConditionsNo"
                      name="hasHazardousConditions"
                      value="no"
                      checked={hasHazardousConditions === false}
                      onChange={handleHasHazardousConditionsChange}
                    />
                    <label htmlFor="hasHazardousConditionsNo">No</label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CleaningForm;





// THIS IS MADE AS A BACKUP FORM FOR TESTING PURPOSES OR TO BE USED LATER 
{/* <h2>Cleaning Services</h2> 
                <p>Please Select a cleaning service:</p>

                <div class="essential">
                    <h3>Essential</h3>
                    <p>Description of Essential</p>
                    <button>Select Essential</button>
                </div>

                <div class="ultimate">
                    <h3>Ultimate</h3>
                    <p>Description of Ultimate</p>
                    <button>Select Ultimate</button>
                </div> */}