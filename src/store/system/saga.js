import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  GET_BOOKING_SLOT,
  GET_CAR_IN_GARAGE,
  GET_SYSTEM_CONFIGURATIONS,
  PUT_CONFIG_SYSTEM,
} from "./actionTypes"

import {
  getBookingSlotFail,
  getBookingSlotSuccess,
  getCarInGarageFail,
  getCarInGarageSuccess,
  getConfigSystemFail,
  getConfigSystemSuccess,
  putConfigSystemFail,
  putConfigSystemSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getBookingSlot,
  getCarInGarage,
  onConfigSystem,
  getConfigSystem,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

/* SYSTEM CONFIGURATION */

function* onGetSystemConfigs() {
  try {
    const response = yield call(getConfigSystem)
    yield put(getConfigSystemSuccess(response))
  } catch (error) {
    yield put(getConfigSystemFail(error))
  }
}

/* BOOKING SLOT */

function* onGetBookingSlots() {
  try {
    const response = yield call(getBookingSlot)
    yield put(getBookingSlotSuccess(response))
  } catch (error) {
    yield put(getBookingSlotFail(error))
  }
}

/* CAR IN GARAGE */

function* onCarInGarages() {
  try {
    const response = yield call(getCarInGarage)
    yield put(getCarInGarageSuccess(response))
  } catch (error) {
    yield put(getCarInGarageFail(error))
  }
}

/* CONFIG SYSTEM */

function* onConfigSystems({ payload: config }) {
  try {
    const response = yield call(onConfigSystem, config)
    yield put(putConfigSystemSuccess(response))
    toast.success("Cấu hình hệ thống thành công")
  } catch (error) {
    yield put(putConfigSystemFail(error))
    toast.error("Cấu hình hệ thống thất bại")
  }
}

function* systemSaga() {
  yield takeEvery(GET_SYSTEM_CONFIGURATIONS, onGetSystemConfigs)
  yield takeEvery(GET_BOOKING_SLOT, onGetBookingSlots)
  yield takeEvery(GET_CAR_IN_GARAGE, onCarInGarages)
  yield takeEvery(PUT_CONFIG_SYSTEM, onConfigSystems)
}

export default systemSaga
