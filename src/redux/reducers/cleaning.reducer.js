// const initialState = {
//     numBedrooms: 0,
//     numBathrooms: 0,
//     numAdditionalRooms: 0,
//     numDoorsWindows: 0,
//     hasPets: '',
//     hazardousConditions: '',
//   };
  
  const cleaningQuestionsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_CLEANING_QUESTIONS':
        console.log('SET_CLEANING_Q dispatched')
        return { ...action.payload };
      default:
        return state;
        
    }
  };
  
  export default cleaningQuestionsReducer;