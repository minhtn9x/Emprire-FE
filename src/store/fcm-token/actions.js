import {
  POST_FCM_TOKEN,
  POST_FCM_TOKEN_FAIL,
  POST_FCM_TOKEN_SUCCESS,
} from "./actionTypes"

export const postFcmToken = (uuid, fcmToken) => ({
  type: POST_FCM_TOKEN,
  uuid,
  fcmToken,
})

export const postFcmTokenSuccess = token => ({
  type: POST_FCM_TOKEN_SUCCESS,
  payload: token,
})

export const postFcmTokenFail = error => ({
  type: POST_FCM_TOKEN_FAIL,
  payload: error,
})
