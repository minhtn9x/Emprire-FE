import { call, put, takeEvery } from "redux-saga/effects"

import { POST_FCM_TOKEN } from "./actionTypes"
import { postFcmTokenFail, postFcmTokenSuccess } from "./actions"

//Include Both Helper File with needed methods
import { addNewFcmToken } from "helpers/fakebackend_helper"

function* addFcmToken({ uuid, fcmToken }) {
  try {
    const response = yield call(addNewFcmToken, uuid, fcmToken)
    yield put(postFcmTokenSuccess(response))
  } catch (error) {
    yield put(postFcmTokenFail(error))
  }
}

function* fcmTokenSaga() {
  yield takeEvery(POST_FCM_TOKEN, addFcmToken)
}

export default fcmTokenSaga
