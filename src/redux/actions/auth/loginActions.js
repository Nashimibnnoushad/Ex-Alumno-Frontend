
import { performRequest } from '../../../services/index';



export const loginWithJWT = user => {
  console.log(user)
  let postReqObj = {};
  postReqObj.email = user.email;
  postReqObj.password = user.password;
  postReqObj.user_role = user.user_role;
  const headers = {}
  return dispatch => {
    // dispatch({
    //   type: 'LOGIN_WITH_JWT_CLEAR'
    // })
    dispatch({
      type: 'LOGIN_WITH_JWT_REQUEST'
    })
    return performRequest('post', '/login', headers, postReqObj)
      .then((response) => {
        if (response.data.status === 200) {
          var loggedInUser = { name: "" }
          dispatch({
            type: 'LOGIN_WITH_JWT_SUCCESS',
            payload: { loggedInUser, response, loggedInWith: "jwt" }
          })
        }
        if (response.data.status === 400) {
          dispatch({
            type: 'LOGIN_WITH_INCORRECT_CREDENTIALS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_WITH_JWT_ERROR',
          payload: error
        })
      })
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}
