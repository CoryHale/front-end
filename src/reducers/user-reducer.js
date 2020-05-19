import {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
} from '../actions';

const initialState = {
  fetching: false,
  user: {},
  error: null
}

export const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USER_START:
      return {
        ...state,
        fetching: true
      }
    case FETCH_USER_SUCCESS:
    console.log(action.payload)
      return {
        ...state,
        user: action.payload,
        fetching: false
      }
    case FETCH_USER_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default: return state;
  }
}