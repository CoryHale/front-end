import { combineReducers } from 'redux';
import { registerReducer } from './register-reducer';
import { loginReducer } from './login-reducer';
import { tripReducer } from './trip-reducer';
import { userReducer } from './user-reducer';

export default combineReducers({
  registerReducer,
  loginReducer,
  tripReducer,
  userReducer
})