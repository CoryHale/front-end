export {
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  register
} from './register';

export {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  login
} from './login';

export {
  ADD_TRIP_START,
  ADD_TRIP_SUCCESS,
  ADD_TRIP_FAILED,
  addTrip
} from './add-trips'

export {
  DELETE_TRIP_START,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILED,
  deleteTrip
} from './delete-trip'

export {
  FETCH_TRIPS_START,
  FETCH_TRIPS_SUCCESS,
  FETCH_TRIPS_FAILED,
  fetchTrips
} from './fetch-trips'

export {
  UPDATE_TRIP_START,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILED,
  updateTrip
} from './update-trip'

export {
  FETCH_USER_START,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  fetchUser
} from './fetch-user'

const dbUrl = 'https://trip-split-backend.herokuapp.com';

export { dbUrl };