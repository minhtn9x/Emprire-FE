import {
  GET_BOOKING_LIST_FAIL,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_DETAIL_FAIL,
  GET_BOOKING_DETAIL_SUCCESS,
  ADD_BOOKING_FAIL,
  ADD_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAIL,
  UPDATE_BOOKING_SUCCESS,
  CHECKIN_BOOKING_FAIL,
  CHECKIN_BOOKING_SUCCESS,
  GET_BOOKING_LIST_BY_DATE_SUCCESS,
  GET_BOOKING_LIST_BY_DATE_FAIL,
  CHECKIN_QRCODE_SUCCESS,
  CHECKIN_QRCODE_FAIL,
  GET_BOOKING_DETAIL,
  GET_BOOKING_LIST_BY_DATE,
  CHECKIN_BOOKING,
  CHECKIN_QRCODE,
} from "./actionTypes"

const INIT_STATE = {
  bookings: [],
  bookingDetail: {},
  error: {},
  isLoading: false,
  isLoad: false,
}

const bookings = (state = INIT_STATE, action) => {
  switch (action.type) {
    // case GET_BOOKING_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     bookings: action.payload,
    //   }

    // case GET_BOOKING_LIST_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    case GET_BOOKING_LIST_BY_DATE:
      return {
        ...state,
        isLoading: true,
      }

    case GET_BOOKING_LIST_BY_DATE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookings: action.payload,
      }

    case GET_BOOKING_LIST_BY_DATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case GET_BOOKING_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_BOOKING_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingDetail: action.payload,
      }

    case GET_BOOKING_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case CHECKIN_BOOKING:
      return {
        ...state,
        isLoad: true,
      }

    case CHECKIN_BOOKING_SUCCESS:
      return {
        ...state,
        isLoad: false,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { booking, ...action.payload }
            : booking
        ),
      }

    case CHECKIN_BOOKING_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    case CHECKIN_QRCODE:
      return {
        ...state,
        isLoad: true,
      }

    case CHECKIN_QRCODE_SUCCESS:
      return {
        ...state,
        isLoad: false,
        bookingDetail: action.payload,
      }

    case CHECKIN_QRCODE_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default bookings
