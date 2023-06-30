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