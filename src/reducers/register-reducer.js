import {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../actions';

const initialState = {
  signingUp: false,
  id: null,
  error: null
}

export const registerReducer = (state = initialState, action) => {
  switch(action.type) {
    case REGISTER_START:
      return {
        ...state,
        singingUp: true
      }
    case REGISTER_SUCCESS:
      const [id] = action.payload;
      return {
        ...state,
        id: id,
        singingUp: false
      }
    case REGISTER_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default: return state;
  }
}