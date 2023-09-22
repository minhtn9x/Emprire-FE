import {
  GET_BOOKING_LIST,
  GET_BOOKING_LIST_FAIL,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_DETAIL,
  GET_BOOKING_DETAIL_FAIL,
  GET_BOOKING_DETAIL_SUCCESS,
  ADD_NEW_BOOKING,
  ADD_BOOKING_FAIL,
  ADD_BOOKING_SUCCESS,
  DELETE_BOOKING,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  UPDATE_BOOKING,
  UPDATE_BOOKING_FAIL,
  UPDATE_BOOKING_SUCCESS,
  CHECKIN_BOOKING,
  CHECKIN_BOOKING_FAIL,
  CHECKIN_BOOKING_SUCCESS,
  GET_BOOKING_LIST_BY_DATE,
  GET_BOOKING_LIST_BY_DATE_FAIL,
  GET_BOOKING_LIST_BY_DATE_SUCCESS,
  CHECKIN_QRCODE,
  CHECKIN_QRCODE_SUCCESS,
  CHECKIN_QRCODE_FAIL,
} from "./actionTypes"

/*
================================================ 
GET BOOKING LIST 
================================================
*/
export const getBookingLists = () => ({
  type: GET_BOOKING_LIST,
})

export const getBookingListsSuccess = bookings => ({
  type: GET_BOOKING_LIST_SUCCESS,
  payload: bookings,
})

export const getBookingListsFail = error => ({
  type: GET_BOOKING_LIST_FAIL,
  payload: error,
})

/*
================================================ 
GET BOOKING LIST BY DATE
================================================
*/
export const getBookingListsByDate = (date, history) => ({
  type: GET_BOOKING_LIST_BY_DATE,
  date,
  history,
})

export const getBookingListsByDateSuccess = bookings => ({
  type: GET_BOOKING_LIST_BY_DATE_SUCCESS,
  payload: bookings,
})

export const getBookingListsByDateFail = error => ({
  type: GET_BOOKING_LIST_BY_DATE_FAIL,
  payload: error,
})

/*
================================================
GET BOOKING DETAIL 
================================================
*/

export const getBookingDetails = (bookingId, history) => ({
  type: GET_BOOKING_DETAIL,
  bookingId,
  history,
})

export const getBookingDetailsSuccess = bookingDetails => ({
  type: GET_BOOKING_DETAIL_SUCCESS,
  payload: bookingDetails,
})

export const getBookingDetailsFail = error => ({
  type: GET_BOOKING_DETAIL_FAIL,
  payload: error,
})

/*
================================================
CHECK-IN BOOKING
================================================
*/

export const checkinBooking = (bookingId, isAssign, history) => ({
  type: CHECKIN_BOOKING,
  bookingId,
  isAssign,
  history,
})

export const checkinBookingSuccess = bookingDetail => ({
  type: CHECKIN_BOOKING_SUCCESS,
  payload: bookingDetail,
})

export const checkinBookingFail = error => ({
  type: CHECKIN_BOOKING_FAIL,
  error,
})

/*
================================================
CHECK-IN QR CODE
================================================
*/

export const checkinQRCode = (data, history) => ({
  type: CHECKIN_QRCODE,
  payload: data,
  history,
})

export const checkinQRCodeSuccess = bookingDetail => ({
  type: CHECKIN_QRCODE_SUCCESS,
  payload: bookingDetail,
})

export const checkinQRCodeFail = error => ({
  type: CHECKIN_QRCODE_FAIL,
  error,
})

/*
================================================
ADD NEW BOOKING
================================================
*/

export const addNewBooking = booking => ({
  type: ADD_NEW_BOOKING,
  payload: booking,
})

export const addNewBookingSuccess = booking => ({
  type: ADD_BOOKING_SUCCESS,
  payload: booking,
})

export const addNewBookingFail = error => ({
  type: ADD_BOOKING_FAIL,
  payload: error,
})

/*
================================================
DELETE BOOKING DETAIL 
================================================
*/

export const deleteBooking = booking => ({
  type: DELETE_BOOKING,
  payload: booking,
})

export const deleteBookingSuccess = booking => ({
  type: DELETE_BOOKING_SUCCESS,
  payload: booking,
})

export const deleteBookingError = error => ({
  type: DELETE_BOOKING_FAIL,
  payload: error,
})

/*
================================================
UPDATE BOOKING DETAIL 
================================================
*/

export const updateBooking = booking => ({
  type: UPDATE_BOOKING,
  payload: booking,
})

export const updateBookingSuccess = booking => ({
  type: UPDATE_BOOKING_SUCCESS,
  payload: booking,
})

export const updateBookingFail = error => ({
  type: UPDATE_BOOKING_FAIL,
  payload: error,
})
