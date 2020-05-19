import { LOGIN_START, FETCH_TRIPS_START, FETCH_TRIPS_SUCCESS, ADD_TRIP_START, ADD_TRIP_SUCCESS } from '../actions';

const initialState = {
    user: {},
    isLoading: false,
    loggingIn: false,
    editMode: false,
    error: null,
    trips: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
        console.log('test')
            return {
                ...state,
                loggingIn: true
            };
        case FETCH_TRIPS_START:
            return {
                ...state,
                isLoading: true,
                loggingIn: false
            };
        case FETCH_TRIPS_SUCCESS:
            return {
                ...state,
                trips: action.payload
            };
        default:
            return state;
    }
};

export default reducer;