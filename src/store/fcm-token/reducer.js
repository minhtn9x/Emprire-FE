import { POST_FCM_TOKEN_FAIL, POST_FCM_TOKEN_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  token: {},
  error: {},
}

const fcmToken = (state = INIT_STATE, action) => {
  switch (action.type) {
    case POST_FCM_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      }

    case POST_FCM_TOKEN_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default fcmToken
