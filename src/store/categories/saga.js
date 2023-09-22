import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import { GET_CATEGORY_SERVICE } from "./actionTypes"

import { getCategoryService } from "../../helpers/fakebackend_helper"
import { getCategoryServiceFail, getCategoryServiceSuccess } from "./actions"

function* fetchCategoryService() {
  try {
    const response = yield call(getCategoryService)
    yield put(getCategoryServiceSuccess(response))
  } catch (error) {
    yield put(getCategoryServiceFail(error))
  }
}

function* categoryServicesSaga() {
  yield takeEvery(GET_CATEGORY_SERVICE, fetchCategoryService)
}

export default categoryServicesSaga
