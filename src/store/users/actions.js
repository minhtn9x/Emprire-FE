import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_EXPERTS_FAIL,
  GET_EXPERTS_SUCCESS,
  GET_EXPERTS,
  PUT_STATUS_EXPERTS_FAIL,
  PUT_STATUS_EXPERTS_SUCCESS,
  PUT_STATUS_EXPERTS,
  ADD_NEW_GUEST,
  ADD_NEW_GUEST_SUCCESS,
  ADD_NEW_GUEST_FAIL,
} from "./actionTypes"

/*
================================================
GET USERS
================================================
*/

export const getUsers = () => ({
  type: GET_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})

/*
================================================
EXPERTS
================================================
*/
export const getExperts = () => ({
  type: GET_EXPERTS,
})

export const getExpertsSuccess = users => ({
  type: GET_EXPERTS_SUCCESS,
  payload: users,
})

export const getExpertsFail = error => ({
  type: GET_EXPERTS_FAIL,
  payload: error,
})

/*
================================================
CHANGE STATUS EXPERT
================================================
*/
export const putChangeStatusExpert = expert => ({
  type: PUT_STATUS_EXPERTS,
  payload: expert,
})

export const putChangeStatusExpertSuccess = expert => ({
  type: PUT_STATUS_EXPERTS_SUCCESS,
  payload: expert,
})

export const putChangeStatusExpertFail = error => ({
  type: PUT_STATUS_EXPERTS_FAIL,
  payload: error,
})

/*
================================================
ADD NEW GUEST
================================================
*/

export const addNewGuest = (guest, history) => ({
  type: ADD_NEW_GUEST,
  payload: guest,
  history,
})

export const addNewGuestSuccess = guest => ({
  type: ADD_NEW_GUEST_SUCCESS,
  payload: guest,
})

export const addNewGuestFail = error => ({
  type: ADD_NEW_GUEST_FAIL,
  payload: error,
})
