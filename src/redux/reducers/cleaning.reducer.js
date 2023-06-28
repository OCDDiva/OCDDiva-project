const initialState = {
    numBedrooms: 0,
    numBathrooms: 0,
    numAdditionalRooms: 0,
    numDoorsWindows: 0,
    hasPets: '',
    hazardousConditions: '',
  };
  
  const cleaningQuestionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CLEANING_QUESTIONS':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  };
  
  export default cleaningQuestionsReducer;