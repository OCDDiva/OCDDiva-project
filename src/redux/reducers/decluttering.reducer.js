const declutteringQuestions = (state = {}, action) => {
    switch(action.type) {
        case 'SET_DECLUTT_QUESTIONS':
            console.log('in declutteringQuestions reducer', action.payload);
            return {...action.payload};
        default:
            return state;    
    }
}

export default declutteringQuestions;