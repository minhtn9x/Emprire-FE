import {
  RUN_REMOVE_SCRIPT_BOOKING,
  RUN_REMOVE_SCRIPT_BOOKING_FAIL,
  RUN_REMOVE_SCRIPT_BOOKING_SUCCESS,
  RUN_SCRIPT_BOOKING,
  RUN_SCRIPT_BOOKING_FAIL,
  RUN_SCRIPT_BOOKING_SUCCESS,
  RUN_SCRIPT_CHECKIN,
  RUN_SCRIPT_CHECKIN_FAIL,
  RUN_SCRIPT_CHECKIN_SUCCESS,
  RUN_SCRIPT_CHECKOUT_ORDER,
  RUN_SCRIPT_CHECKOUT_ORDER_FAIL,
  RUN_SCRIPT_CHECKOUT_ORDER_SUCCESS,
  RUN_SCRIPT_CONFIRM_PAID_ORDER,
  RUN_SCRIPT_CONFIRM_PAID_ORDER_FAIL,
  RUN_SCRIPT_CONFIRM_PAID_ORDER_SUCCESS,
  RUN_SCRIPT_CUSTOMER,
  RUN_SCRIPT_CUSTOMER_FAIL,
  RUN_SCRIPT_CUSTOMER_SUCCESS,
  RUN_SCRIPT_DIAGNOSE_ORDER,
  RUN_SCRIPT_DIAGNOSE_ORDER_FAIL,
  RUN_SCRIPT_DIAGNOSE_ORDER_SUCCESS,
  RUN_SCRIPT_DONE_ORDER,
  RUN_SCRIPT_DONE_ORDER_FAIL,
  RUN_SCRIPT_DONE_ORDER_SUCCESS,
  RUN_SCRIPT_REMOVE_CUSTOMER,
  RUN_SCRIPT_REMOVE_CUSTOMER_FAIL,
  RUN_SCRIPT_REMOVE_CUSTOMER_SUCCESS,
} from "./actionTypes"

/*
================================================ 
POST Script Customer 
================================================
*/
export const runScriptCustomer = number => ({
  type: RUN_SCRIPT_CUSTOMER,
  number,
})

export const runScriptCustomerSuccess = scriptCustomer => ({
  type: RUN_SCRIPT_CUSTOMER_SUCCESS,
  payload: scriptCustomer,
})

export const runScriptCustomerFail = error => ({
  type: RUN_SCRIPT_CUSTOMER_FAIL,
  payload: error,
})

/*
================================================ 
DELETE Script Customer 
================================================
*/
export const runScriptRemoveCustomer = data => ({
  type: RUN_SCRIPT_REMOVE_CUSTOMER,
  data,
})

export const runScriptRemoveCustomerSuccess = scriptCustomer => ({
  type: RUN_SCRIPT_REMOVE_CUSTOMER_SUCCESS,
  payload: scriptCustomer,
})

export const runScriptRemoveCustomerFail = error => ({
  type: RUN_SCRIPT_REMOVE_CUSTOMER_FAIL,
  payload: error,
})

/*
================================================ 
POST Script Booking 
================================================
*/
export const runScriptBooking = (number1, number2, isNewCustomer) => ({
  type: RUN_SCRIPT_BOOKING,
  number1,
  number2,
  isNewCustomer,
})

export const runScriptBookingSuccess = scriptBooking => ({
  type: RUN_SCRIPT_BOOKING_SUCCESS,
  payload: scriptBooking,
})

export const runScriptBookingFail = error => ({
  type: RUN_SCRIPT_BOOKING_FAIL,
  payload: error,
})

/*
================================================ 
DELETE Script Booking 
================================================
*/
export const runRemoveScriptBooking = numberId => ({
  type: RUN_REMOVE_SCRIPT_BOOKING,
  payload: numberId,
})

export const runRemoveScriptBookingSuccess = scriptRemoveBooking => ({
  type: RUN_REMOVE_SCRIPT_BOOKING_SUCCESS,
  payload: scriptRemoveBooking,
})

export const runRemoveScriptBookingFail = error => ({
  type: RUN_REMOVE_SCRIPT_BOOKING_FAIL,
  payload: error,
})

/*
================================================ 
POST Script CheckIn 
================================================
*/
export const runScriptCheckIn = (number1, number2) => ({
  type: RUN_SCRIPT_CHECKIN,
  number1,
  number2,
})

export const runScriptCheckInSuccess = scriptCheckIn => ({
  type: RUN_SCRIPT_CHECKIN_SUCCESS,
  payload: scriptCheckIn,
})

export const runScriptCheckInFail = error => ({
  type: RUN_SCRIPT_CHECKIN_FAIL,
  payload: error,
})

/*
================================================ 
POST Script Diagnose 
================================================
*/
export const runScriptDiagnose = (number1, number2) => ({
  type: RUN_SCRIPT_DIAGNOSE_ORDER,
  number1,
  number2,
})

export const runScriptDiagnoseSuccess = scriptDiagnose => ({
  type: RUN_SCRIPT_DIAGNOSE_ORDER_SUCCESS,
  payload: scriptDiagnose,
})

export const runScriptDiagnoseFail = error => ({
  type: RUN_SCRIPT_DIAGNOSE_ORDER_FAIL,
  payload: error,
})

/*
================================================ 
POST Script Confirm Paid 
================================================
*/
export const runScriptConfirmPaid = (number1, number2, number3) => ({
  type: RUN_SCRIPT_CONFIRM_PAID_ORDER,
  number1,
  number2,
  number3,
})

export const runScriptConfirmPaidSuccess = scriptConfirmPaid => ({
  type: RUN_SCRIPT_CONFIRM_PAID_ORDER_SUCCESS,
  payload: scriptConfirmPaid,
})

export const runScriptConfirmPaidFail = error => ({
  type: RUN_SCRIPT_CONFIRM_PAID_ORDER_FAIL,
  payload: error,
})

/*
================================================ 
POST Script Done 
================================================
*/
export const runScriptDone = (number1, number2, number3, number4) => ({
  type: RUN_SCRIPT_DONE_ORDER,
  number1,
  number2,
  number3,
  number4,
})

export const runScriptDoneSuccess = scriptDone => ({
  type: RUN_SCRIPT_DONE_ORDER_SUCCESS,
  payload: scriptDone,
})

export const runScriptDoneFail = error => ({
  type: RUN_SCRIPT_DONE_ORDER_FAIL,
  payload: error,
})

/*
================================================ 
POST Script CheckOut 
================================================
*/
export const runScriptCheckOut = data => ({
  type: RUN_SCRIPT_CHECKOUT_ORDER,
  payload: data,
})

export const runScriptCheckOutSuccess = scriptDone => ({
  type: RUN_SCRIPT_CHECKOUT_ORDER_SUCCESS,
  payload: scriptDone,
})

export const runScriptCheckOutFail = error => ({
  type: RUN_SCRIPT_CHECKOUT_ORDER_FAIL,
  payload: error,
})
