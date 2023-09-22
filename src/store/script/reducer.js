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

const INIT_STATE = {
  scriptCustomer: [],
  errorCustomer: "",

  scriptRemoveCustomer: [],
  errorRemoveCustomer: "",

  scriptBooking: [],
  errorBooking: "",

  scriptRemoveBooking: [],

  scriptCheckIn: [],
  errorCheckIn: "",

  scriptDiagnose: [],
  errorDiagnose: "",

  scriptConfirmPaid: [],
  errorConfirmPaid: "",

  scriptDone: [],
  errorDone: "",

  scriptCheckOut: [],
  errorCheckOut: "",

  isLoadScript: false,
}

const scripts = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* CUSTOMER */
    case RUN_SCRIPT_CUSTOMER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptCustomer: action.payload,
      }

    case RUN_SCRIPT_CUSTOMER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        errorCustomer: action.payload,
      }

    /* REMOVE CUSTOMER */
    case RUN_SCRIPT_REMOVE_CUSTOMER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_REMOVE_CUSTOMER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptRemoveCustomer: action.payload,
      }

    case RUN_SCRIPT_REMOVE_CUSTOMER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        error: action.payload,
      }

    /* BOOKING */
    case RUN_SCRIPT_BOOKING:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_BOOKING_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptBooking: action.payload,
      }

    case RUN_SCRIPT_BOOKING_FAIL:
      return {
        ...state,
        isLoadScript: false,
        errorBooking: action.payload,
      }

    /* REMOVE BOOKING */

    case RUN_REMOVE_SCRIPT_BOOKING:
      return {
        ...state,
        isLoadScriptBooking: true,
      }
    case RUN_REMOVE_SCRIPT_BOOKING_SUCCESS:
      return {
        ...state,
        isLoadScriptBooking: true,
        scriptRemoveBooking: action.payload,
      }

    case RUN_REMOVE_SCRIPT_BOOKING_FAIL:
      return {
        ...state,
        isLoadScriptBooking: true,
        error: action.payload,
      }

    /* CHECK-IN */

    case RUN_SCRIPT_CHECKIN:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_CHECKIN_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptCheckIn: action.payload,
      }

    case RUN_SCRIPT_CHECKIN_FAIL:
      return {
        ...state,
        isLoadScript: false,
        errorCheckIn: action.payload,
      }

    /*================================================*/

    /* DIAGNOSE */

    case RUN_SCRIPT_DIAGNOSE_ORDER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_DIAGNOSE_ORDER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptDiagnose: action.payload,
      }

    case RUN_SCRIPT_DIAGNOSE_ORDER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        errorDiagnose: action.payload,
      }

    /* CONFIRM - PAID */

    case RUN_SCRIPT_CONFIRM_PAID_ORDER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_CONFIRM_PAID_ORDER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptConfirmPaid: action.payload,
      }

    case RUN_SCRIPT_CONFIRM_PAID_ORDER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        errorConfirmPaid: action.payload,
      }

    /* DONE */

    case RUN_SCRIPT_DONE_ORDER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_DONE_ORDER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptDone: action.payload,
      }

    case RUN_SCRIPT_DONE_ORDER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        errorDone: action.payload,
      }

    /* CHECK-OUT */

    case RUN_SCRIPT_CHECKOUT_ORDER:
      return {
        ...state,
        isLoadScript: true,
      }
    case RUN_SCRIPT_CHECKOUT_ORDER_SUCCESS:
      return {
        ...state,
        isLoadScript: false,
        scriptCheckOut: action.payload,
      }

    case RUN_SCRIPT_CHECKOUT_ORDER_FAIL:
      return {
        ...state,
        isLoadScript: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default scripts
