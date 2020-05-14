import axiosWithAuth from '../components/Login/withAuth';
import { dbUrl } from './index'; 

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

export const fetchUser = id => dispatch => {
  dispatch({ type: FETCH_USER_START });
  axiosWithAuth()
    .get(`${dbUrl}/api/users/${id}/`)
    .then(res => {
      dispatch({ 
        type: FETCH_USER_SUCCESS, 
        payload: res.data 
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_USER_FAILED,
        payload: err.response
      })
    })
};

// export const FETCH_TRIP_START = 'FETCH_TRIP_START';
// export const FETCH_TRIP_SUCCESS = 'FETCH_TRIP_SUCCESS';
// export const FETCH_TRIP_FAILED = 'FETCH_TRIP_FAILED';

// export const fetchTrip = id => dispatch => {
//   dispatch({ type: FETCH_TRIP_START });
//   axiosWithAuth()
//     .get(`http://localhost:5000/api/users/${id}/trips/${trip_id}`)
//     .then(res => {
//       dispatch({ 
//         type: FETCH_TRIP_SUCCESS, 
//         payload: res.data 
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: FETCH_TRIP_FAILED,
//         payload: err.response
//       })
//     })
// };