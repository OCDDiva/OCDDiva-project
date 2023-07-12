const requestedDate = (state = {}, action) => {
    switch(action.type) {
        case 'SET_DATE_REQ':
            console.log('In requestedDate reducer', action.payload)
            return {...action.payload};
        default:
            return state;
    }
}

export default requestedDate;