const organizingQuestions = (state = {}, action) => {
    switch(action.type) {
        case 'SET_ORG_QUESTIONS':
            console.log('in organizingQuestions reducer', action.payload);
            return action.payload;
        default:
            return state;    
    }
}

export default organizingQuestions;