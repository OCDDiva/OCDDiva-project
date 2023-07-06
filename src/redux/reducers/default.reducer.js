const defaultQuestionsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DEFAULT_QUESTIONS':
        console.log('SET_DEFAULT_Q dispatched')
        return { ...action.payload };
      default:
        return state;
        
    }
  };
  
  export default defaultQuestionsReducer;