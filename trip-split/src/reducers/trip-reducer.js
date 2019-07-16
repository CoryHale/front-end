import {
  FETCH_TRIPS_START,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILED,
  ADD_TRIP_START,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAILED,
} from '../actions';

const initialState = {
  fetching: false,
  trips: [],
  error: null
}

export const tripReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TRIPS_START:
      return {
        ...state,
        fetching: true
      }
    case FETCH_TRIPS_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        trips: action.payload,
        fetching: false
      }
    case FETCH_TRIPS_FAILED:
      return {
        ...state,
        error: action.payload
      }
    case ADD_TRIP_START:
      return {
        ...state,
        fetching: true
      }
    case ADD_TRIP_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        fetching: false
      }
    case ADD_TRIP_FAILED:
      return {
        ...state,
        error: action.payload
      }
    
    default: return state;
  }
}