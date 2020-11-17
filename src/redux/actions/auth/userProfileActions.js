import { performRequest } from '../../../services/index';

export const userDetailsFetch = () => {
  const user= JSON.parse(localStorage.getItem('alumniuser'))
  var user_id = ""
  if(user !== null){
    user_id = user.id
  }
  else {
    user_id = 1
  }
  const headers = {
    // 'Accept': 'application/json',
    // 'Authorization': `Bearer ${token_value}`
  };
    return dispatch => {
      dispatch({
        type: 'USER_DETAILS_REQUEST'
      })
      return performRequest('get', `/users/${user_id}`)
          .then((response) => {
            if(response.status === 200 && response.data ){
              sessionStorage.setItem("userName", response.data[0].fullname);
              dispatch({
                type: 'USER_DETAILS_SUCCESS',
                payload: response
            })
              
            }
          })
          .catch((error) => {
              dispatch({
                  type: 'USER_DETAILS_ERROR',
                  payload: error
              })
          })
    }
  }
