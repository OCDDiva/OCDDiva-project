const inquiriesList = (state = [], action) => {
    switch(action.type) {
        case 'SET_INQURIRIES_LIST':
            return action.payload;
        default:
            return state;
    }
};

export default inquiriesList;