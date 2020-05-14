import axiosWithAuth from '../components/Login/withAuth';
import { dbUrl } from './index';

export const DELETE_TRIP_START = 'DELETE_TRIP_START';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_FAILED = 'DELETE_TRIP_FAILED';

export const deleteTrip = trip_id => dispatch => {
  console.log('start')
  dispatch({ type: DELETE_TRIP_START });
  axiosWithAuth()
    .delete(`${dbUrl}/api/trips/${trip_id}`)
    .then(res => {
      console.log(res.data)
      dispatch({ 
        type: DELETE_TRIP_SUCCESS, 
        payload: res.data 
      });
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: DELETE_TRIP_FAILED,
        payload: err.response
      })
    })
};