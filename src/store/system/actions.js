import {
  GET_BOOKING_SLOT,
  GET_BOOKING_SLOT_FAIL,
  GET_BOOKING_SLOT_SUCCESS,
  GET_CAR_IN_GARAGE,
  GET_CAR_IN_GARAGE_FAIL,
  GET_CAR_IN_GARAGE_SUCCESS,
  GET_SYSTEM_CONFIGURATIONS,
  GET_SYSTEM_CONFIGURATIONS_FAIL,
  GET_SYSTEM_CONFIGURATIONS_SUCCESS,
  PUT_CONFIG_SYSTEM,
  PUT_CONFIG_SYSTEM_FAIL,
  PUT_CONFIG_SYSTEM_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET System Configuration
================================================
*/
export const getConfigSystem = () => ({
  type: GET_SYSTEM_CONFIGURATIONS,
})

export const getConfigSystemSuccess = configSystem => ({
  type: GET_SYSTEM_CONFIGURATIONS_SUCCESS,
  payload: configSystem,
})

export const getConfigSystemFail = error => ({
  type: GET_SYSTEM_CONFIGURATIONS_FAIL,
  payload: error,
})

/*
================================================ 
GET Booking Slot
================================================
*/
export const getBookingSlot = () => ({
  type: GET_BOOKING_SLOT,
})

export const getBookingSlotSuccess = bookingSlot => ({
  type: GET_BOOKING_SLOT_SUCCESS,
  payload: bookingSlot,
})

export const getBookingSlotFail = error => ({
  type: GET_BOOKING_SLOT_FAIL,
  payload: error,
})

/*
================================================ 
GET Car In Garage
================================================
*/
export const getCarInGarage = () => ({
  type: GET_CAR_IN_GARAGE,
})

export const getCarInGarageSuccess = carInGarage => ({
  type: GET_CAR_IN_GARAGE_SUCCESS,
  payload: carInGarage,
})

export const getCarInGarageFail = error => ({
  type: GET_CAR_IN_GARAGE_FAIL,
  payload: error,
})

/*
================================================ 
PUT Car In Garage
================================================
*/
export const putConfigSystem = config => ({
  type: PUT_CONFIG_SYSTEM,
  payload: config,
})

export const putConfigSystemSuccess = configSystem => ({
  type: PUT_CONFIG_SYSTEM_SUCCESS,
  payload: configSystem,
})

export const putConfigSystemFail = error => ({
  type: PUT_CONFIG_SYSTEM_FAIL,
  payload: error,
})
