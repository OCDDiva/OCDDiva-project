const photosToUpload = (state = [], action) => {
    switch(action.type) {
        case 'SET_PHOTOS':
            console.log('in photosToUpload', action.payload);
            return {...action.payload};
        default:
            return state;
    }
}

export default photosToUpload;