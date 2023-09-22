import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

//Booking Redux States
import {
  GET_BOOKING_DETAIL,
  CHECKIN_BOOKING,
  GET_BOOKING_LIST_BY_DATE,
  CHECKIN_QRCODE,
} from "./actionTypes"

import {
  getBookingListsFail,
  getBookingListsSuccess,
  getBookingListsByDateFail,
  getBookingListsByDateSuccess,
  getBookingDetailsFail,
  getBookingDetailsSuccess,
  checkinBookingFail,
  checkinBookingSuccess,
  checkinQRCodeFail,
  checkinQRCodeSuccess,
} from "./actions"

import {
  getBookingsLists,
  getBookingListsByDate,
  getBookingsDetails,
  checkinBooking,
  checkinQRCode,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

// function* fetchBookingsLists() {
//   try {
//     const response = yield call(getBookingsLists)
//     yield put(getBookingListsSuccess(response))
//   } catch (error) {
//     yield put(getBookingListsFail(error))
//   }
// }

function* fetchBookingsListByDate({ date, history }) {
  try {
    const response = yield call(getBookingListsByDate, date)
    yield put(getBookingListsByDateSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getBookingListsByDateFail(error))
  }
}

function* fetchBookingsDetails({ bookingId, history }) {
  try {
    const response = yield call(getBookingsDetails, bookingId)
    yield put(getBookingDetailsSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getBookingDetailsFail(error))
  }
}

function* checkInBookings({ bookingId, isAssign, history }) {
  try {
    const response = yield call(checkinBooking, bookingId, isAssign)
    history.push(`/order-services/${response.orderServiceId}`)
    yield put(checkinBookingSuccess(response))
    toast.success(
      "Check-in thành công phương tiện\n" + response.car.carLisenceNo
    )
  } catch (error) {
    toast.error("Check-in thất bại")
    yield put(checkinBookingFail(error))
  }
}

function* checkInQRCodes({ payload: data, history }) {
  try {
    const response = yield call(checkinQRCode, data)
    history.push(`/order-services/${response.orderServiceId}`)
    yield put(checkinQRCodeSuccess(response))
    toast.success(
      "Check-in thành công phương tiện\n" + response.car.carLisenceNo
    )
  } catch (error) {
    toast.error("Check-in thất bại")
    yield put(checkinQRCodeFail(error))
  }
}

function* bookingsSaga() {
  // yield takeEvery(GET_BOOKING_LIST, fetchBookingsLists)
  yield takeEvery(GET_BOOKING_LIST_BY_DATE, fetchBookingsListByDate)
  yield takeEvery(GET_BOOKING_DETAIL, fetchBookingsDetails)
  yield takeEvery(CHECKIN_BOOKING, checkInBookings)
  yield takeEvery(CHECKIN_QRCODE, checkInQRCodes)
}

export default bookingsSaga
