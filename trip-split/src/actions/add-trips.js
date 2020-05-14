import axiosWithAuth from '../components/Login/withAuth';
import { dbUrl } from './index';

export const ADD_TRIP_START = 'ADD_TRIP_START';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_FAILED = 'ADD_TRIP_FAILED';

export const addTrip = trip => dispatch => {
  console.log('start')
  dispatch({ type: ADD_TRIP_START });
  axiosWithAuth()
    .post(`${dbUrl}/api/${trip.primary_member_id}/trips`, trip)
    .then(res => {
      console.log(res.data)
      dispatch({ 
        type: ADD_TRIP_SUCCESS, 
        payload: res.data 
      });
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: ADD_TRIP_FAILED,
        payload: err.response
      })
    })
};