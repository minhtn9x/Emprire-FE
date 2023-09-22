import {
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
  GET_ORDER_SERVICE_DETAIL_FAIL,
  GET_ORDER_SERVICE_DETAIL_SUCCESS,
  GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS,
  PUT_ASSIGN_EXPERT_FAIL,
  PUT_ASSIGN_EXPERT_SUCCESS,
  GET_STATUS_LOG_SUCCESS,
  GET_STATUS_LOG_FAIL,
  CHECKOUT_SERVICES_SUCCESS,
  CHECKOUT_SERVICES_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ASSIGN_EXPERT,
  CHECKOUT_SERVICES,
  GET_EXPERTS_INTENDED_TIME_SUCCESS,
  GET_EXPERTS_INTENDED_TIME_FAIL,
  PUT_PRIORITY_SERVICES,
  PUT_PRIORITY_SERVICES_SUCCESS,
  PUT_PRIORITY_SERVICES_FAIL,
  GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_SUCCESS,
  GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_FAIL,
  PUT_AUTO_ASSIGN_EXPERT,
  PUT_AUTO_ASSIGN_EXPERT_SUCCESS,
  PUT_AUTO_ASSIGN_EXPERT_FAIL,
  COUNT_SERVICES,
  COUNT_SERVICES_SUCCESS,
  COUNT_SERVICES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  orderServicess: [],
  orderServicesDetail: {},
  error: {},
  orderServiceLogs: [],
  orderServicesCheckOut: [],
  exDetails: {},
  exDetailsService: {},
  countService: {},
  isLoading: false,
  isLoad: false,
  isLoadPriority: false,
}

const orderServices = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* LIST ALL */
    case GET_ORDER_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        orderServicess: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* LIST BY STATUS */

    case GET_ORDER_SERVICE_LIST_BY_STATUS:
      return {
        ...state,
        isLoading: true,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicess: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* LIST DETAIL */

    case GET_ORDER_SERVICE_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_ORDER_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicesDetail: action.payload,
      }

    case GET_ORDER_SERVICE_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* STATUS LOG */

    case GET_STATUS_LOG_SUCCESS:
      return {
        ...state,
        orderServiceLogs: action.payload,
      }

    case GET_STATUS_LOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* ASSIGN EXPERT */

    case PUT_ASSIGN_EXPERT:
      return {
        ...state,
        isLoading: true,
      }

    case PUT_ASSIGN_EXPERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicesDetail: action.payload,
      }

    case PUT_ASSIGN_EXPERT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* AUTO ASSIGN EXPERT */

    case PUT_AUTO_ASSIGN_EXPERT:
      return {
        ...state,
        isLoading: true,
      }

    case PUT_AUTO_ASSIGN_EXPERT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orderServicesDetail: action.payload,
      }

    case PUT_AUTO_ASSIGN_EXPERT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* INTENDED TIME EXPERT */

    case GET_EXPERTS_INTENDED_TIME_SUCCESS:
      return {
        ...state,
        exDetails: action.payload,
      }

    case GET_EXPERTS_INTENDED_TIME_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* INTENDED TIME EXPERT BY SERVICE */

    case GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_SUCCESS:
      return {
        ...state,
        exDetailsService: action.payload,
      }

    case GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* PRIORITY */

    case PUT_PRIORITY_SERVICES:
      return {
        ...state,
        isLoadPriority: true,
      }

    case PUT_PRIORITY_SERVICES_SUCCESS:
      return {
        ...state,
        isLoadPriority: false,
      }

    case PUT_PRIORITY_SERVICES_FAIL:
      return {
        ...state,
        isLoadPriority: false,
      }

    /* CHECK OUT */

    case CHECKOUT_SERVICES:
      return {
        ...state,
        isLoad: true,
      }

    case CHECKOUT_SERVICES_SUCCESS:
      return {
        ...state,
        isLoad: false,
        orderServicesCheckOut: action.payload,
      }

    case CHECKOUT_SERVICES_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    /* COUNT SERVICE */

    case COUNT_SERVICES_SUCCESS:
      return {
        ...state,
        countService: action.payload,
      }

    case COUNT_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default orderServices
