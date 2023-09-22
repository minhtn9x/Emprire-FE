import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
  GET_ORDER_SERVICE_DETAIL,
  GET_ORDER_SERVICE_DETAIL_FAIL,
  GET_ORDER_SERVICE_DETAIL_SUCCESS,
  PUT_ORDER_SERVICE,
  PUT_ORDER_SERVICE_FAIL,
  PUT_ORDER_SERVICE_SUCCESS,
  PUT_ASSIGN_EXPERT,
  PUT_ASSIGN_EXPERT_FAIL,
  PUT_ASSIGN_EXPERT_SUCCESS,
  GET_STATUS_LOG,
  GET_STATUS_LOG_SUCCESS,
  GET_STATUS_LOG_FAIL,
  PUT_CONFIRM_SERVICES,
  PUT_CONFIRM_SERVICES_SUCCESS,
  PUT_CONFIRM_SERVICES_FAIL,
  PUT_CONFIRM_PAID_SERVICES,
  PUT_CONFIRM_PAID_SERVICES_SUCCESS,
  PUT_CONFIRM_PAID_SERVICES_FAIL,
  CHECKOUT_SERVICES,
  CHECKOUT_SERVICES_SUCCESS,
  CHECKOUT_SERVICES_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS,
  GET_EXPERTS_INTENDED_TIME,
  GET_EXPERTS_INTENDED_TIME_SUCCESS,
  GET_EXPERTS_INTENDED_TIME_FAIL,
  PUT_PRIORITY_SERVICES_SUCCESS,
  PUT_PRIORITY_SERVICES_FAIL,
  PUT_PRIORITY_SERVICES,
  GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_SUCCESS,
  GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_FAIL,
  GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME,
  PUT_AUTO_ASSIGN_EXPERT,
  PUT_AUTO_ASSIGN_EXPERT_SUCCESS,
  PUT_AUTO_ASSIGN_EXPERT_FAIL,
  COUNT_SERVICES,
  COUNT_SERVICES_SUCCESS,
  COUNT_SERVICES_FAIL,
} from "./actionTypes"

/*
================================================ 
GET OrderServices LIST 
================================================
*/
export const getOrderServicesLists = () => ({
  type: GET_ORDER_SERVICE_LIST,
})

export const getOrderServicesListsSuccess = orderServicess => ({
  type: GET_ORDER_SERVICE_LIST_SUCCESS,
  payload: orderServicess,
})

export const getOrderServicesListsFail = error => ({
  type: GET_ORDER_SERVICE_LIST_FAIL,
  payload: error,
})

/*
================================================ 
GET OrderServices List By Status
================================================
*/
export const getOrderServicesListByStatus = (status, history) => ({
  type: GET_ORDER_SERVICE_LIST_BY_STATUS,
  status,
  history,
})

export const getOrderServicesListByStatusSuccess = orderServicess => ({
  type: GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS,
  payload: orderServicess,
})

export const getOrderServicesListByStatusFail = error => ({
  type: GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL,
  payload: error,
})

/*
================================================ 
GET OrderServices Detail 
================================================
*/
export const getOrderServicesDetails = (orderServiceId, history) => ({
  type: GET_ORDER_SERVICE_DETAIL,
  orderServiceId,
  history,
})

export const getOrderServicesDetailsSuccess = orderServicesDetails => ({
  type: GET_ORDER_SERVICE_DETAIL_SUCCESS,
  payload: orderServicesDetails,
})

export const getOrderServicesDetailsFail = error => ({
  type: GET_ORDER_SERVICE_DETAIL_FAIL,
  payload: error,
})

/*
================================================ 
PUT OrderServices  
================================================
*/
export const putOrderServices = (orderServiceId, services) => ({
  type: PUT_ORDER_SERVICE,
  payload: { orderServiceId, services },
})

export const putOrderServicesSuccess = orderServicesDetails => ({
  type: PUT_ORDER_SERVICE_SUCCESS,
  payload: orderServicesDetails,
})

export const putOrderServicesFail = error => ({
  type: PUT_ORDER_SERVICE_FAIL,
  payload: error,
})

/*
================================================ 
PUT Assign Expert 
================================================
*/
export const putAssignExperts = (orderServiceId, exId) => ({
  type: PUT_ASSIGN_EXPERT,
  payload: { orderServiceId, exId },
})

export const putAssignExpertsSuccess = orderServicesDetails => ({
  type: PUT_ASSIGN_EXPERT_SUCCESS,
  payload: orderServicesDetails,
})

export const putAssignExpertsFail = error => ({
  type: PUT_ASSIGN_EXPERT_FAIL,
  payload: error,
})

/*
================================================ 
PUT Auto Assign Expert 
================================================
*/
export const putAutoAssignExpert = (orderServiceId, exId) => ({
  type: PUT_AUTO_ASSIGN_EXPERT,
  payload: { orderServiceId, exId },
})

export const putAutoAssignExpertsSuccess = orderServicesDetails => ({
  type: PUT_AUTO_ASSIGN_EXPERT_SUCCESS,
  payload: orderServicesDetails,
})

export const putAutoAssignExpertsFail = error => ({
  type: PUT_AUTO_ASSIGN_EXPERT_FAIL,
  payload: error,
})

/*
================================================ 
GET Expert Intende Time 
================================================
*/
export const getExpertIntendedTime = exId => ({
  type: GET_EXPERTS_INTENDED_TIME,
  exId,
})

export const getExpertIntendedTimeSuccess = exDetail => ({
  type: GET_EXPERTS_INTENDED_TIME_SUCCESS,
  payload: exDetail,
})

export const getExpertIntendedTimeFail = error => ({
  type: GET_EXPERTS_INTENDED_TIME_FAIL,
  payload: error,
})

/*
================================================ 
GET Expert Intended Time By Service
================================================
*/
export const getExpertIntendedTimeByService = (exId, orId) => ({
  type: GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME,
  payload: { exId, orId },
})

export const getExpertIntendedTimeByServiceSuccess = exDetailService => ({
  type: GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_SUCCESS,
  payload: exDetailService,
})

export const getExpertIntendedTimeByServiceFail = error => ({
  type: GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME_FAIL,
  payload: error,
})

/*
================================================ 
GET Status Log
================================================
*/
export const getStatusLog = orderServiceId => ({
  type: GET_STATUS_LOG,
  orderServiceId,
})

export const getStatusLogSuccess = orderServiceLog => ({
  type: GET_STATUS_LOG_SUCCESS,
  payload: orderServiceLog,
})

export const getStatusLogFail = error => ({
  type: GET_STATUS_LOG_FAIL,
  payload: error,
})

/*
================================================ 
PUT Priority Service
================================================
*/
export const putPriorityService = (exId, orderServiceId, car) => ({
  type: PUT_PRIORITY_SERVICES,
  payload: { exId, orderServiceId, car },
})

export const putPriorityServiceSuccess = orderServicesDetails => ({
  type: PUT_PRIORITY_SERVICES_SUCCESS,
  payload: orderServicesDetails,
})

export const putPriorityServiceFail = error => ({
  type: PUT_PRIORITY_SERVICES_FAIL,
  payload: error,
})

/*
================================================ 
PUT Check out
================================================
*/
export const checkOutService = (carId, data, id, car, history) => ({
  type: CHECKOUT_SERVICES,
  payload: { carId, data, id, car, history },
})

export const checkOutServiceSuccess = orderServicesCheckOut => ({
  type: CHECKOUT_SERVICES_SUCCESS,
  payload: orderServicesCheckOut,
})

export const checkOutServiceFail = error => ({
  type: CHECKOUT_SERVICES_FAIL,
  payload: error,
})

/*
================================================ 
GET Count Services
================================================
*/
export const countService = () => ({
  type: COUNT_SERVICES,
})

export const countServiceSuccess = countServices => ({
  type: COUNT_SERVICES_SUCCESS,
  payload: countServices,
})

export const countServiceFail = error => ({
  type: COUNT_SERVICES_FAIL,
  payload: error,
})
