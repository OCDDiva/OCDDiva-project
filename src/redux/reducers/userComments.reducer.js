const userComments = (state = {}, action) => {
    switch(action.type) {
        case 'SET_USER_COMMENTS':
            console.log('in userComments', action.payload);
            return {...action.payload};
        default:
            return state;
    }
}

export default userComments;