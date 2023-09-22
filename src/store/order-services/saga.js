import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

//OrderService Redux States
import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ASSIGN_EXPERT,
  GET_STATUS_LOG,
  CHECKOUT_SERVICES,
  GET_EXPERTS_INTENDED_TIME,
  PUT_PRIORITY_SERVICES,
  GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME,
  PUT_AUTO_ASSIGN_EXPERT,
  COUNT_SERVICES,
} from "./actionTypes"

import {
  getOrderServicesDetailsFail,
  getOrderServicesDetailsSuccess,
  getOrderServicesListByStatusSuccess,
  getOrderServicesListByStatusFail,
  getStatusLogSuccess,
  putAssignExpertsSuccess,
  putAssignExpertsFail,
  checkOutServiceSuccess,
  checkOutServiceFail,
  getExpertIntendedTimeSuccess,
  putPriorityServiceSuccess,
  putPriorityServiceFail,
  getExpertIntendedTimeByServiceSuccess,
  getExpertIntendedTimeFail,
  getExpertIntendedTimeByServiceFail,
  putAutoAssignExpertsSuccess,
  putAutoAssignExpertsFail,
  countServiceSuccess,
  countServiceFail,
  getStatusLogFail,
} from "./actions"

import {
  getOrderServicesListByStatus,
  getOrderServicesDetails,
  putAssignExperts,
  getStatusLog,
  checkOutService,
  getExpertIntendedTime,
  priorityService,
  getExpertIntendedTimeByService,
  putAutoAssignExperts,
  countService,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

// function* fetchOrderServicessLists() {
//   try {
//     const response = yield call(getOrderServicesLists)
//     yield put(getOrderServicesListsSuccess(response))
//   } catch (error) {
//     yield put(getOrderServicesListsFail(error))
//   }
// }

function* fetchOrderServiceListByStatus({ status, history }) {
  try {
    const response = yield call(getOrderServicesListByStatus, status)
    yield put(getOrderServicesListByStatusSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getOrderServicesListByStatusFail(error))
  }
}

function* fetchOrderServicesDetails({ orderServiceId, history }) {
  try {
    const response = yield call(getOrderServicesDetails, orderServiceId)
    yield put(getOrderServicesDetailsSuccess(response))
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/pages-404")
    }
    if (error.response.status === 500) {
      history.push("/pages-500")
    }
    yield put(getOrderServicesDetailsFail(error))
  }
}

function* onAssignExpert({ payload: { orderServiceId, exId } }) {
  try {
    const response = yield call(putAssignExperts, orderServiceId, exId)
    yield put(putAssignExpertsSuccess(response))
    toast.success("Đã chỉ định cho " + response.expert.fullname)
  } catch (error) {
    toast.error("Chỉ định thất bại")
    yield put(putAssignExpertsFail(error))
  }
}

function* onAutoAssignExpert({ payload: { orderServiceId, exId } }) {
  try {
    const response = yield call(putAutoAssignExperts, orderServiceId, exId)
    yield put(putAutoAssignExpertsSuccess(response))
    toast.success("Đã chỉ định cho " + response.expert.fullname)
  } catch (error) {
    toast.error("Chỉ định thất bại")
    yield put(putAutoAssignExpertsFail(error))
  }
}

function* onGetExpertIntendedTime({ exId }) {
  try {
    const response = yield call(getExpertIntendedTime, exId)
    yield put(getExpertIntendedTimeSuccess(response))
  } catch (error) {
    yield put(getExpertIntendedTimeFail(error))
  }
}

function* onGetExpertIntendedTimeByServices({ payload: { exId, orId } }) {
  try {
    const response = yield call(getExpertIntendedTimeByService, exId, orId)
    yield put(getExpertIntendedTimeByServiceSuccess(response))
  } catch (error) {
    yield put(getExpertIntendedTimeByServiceFail(error))
  }
}

function* priorityServices({ payload: { exId, orderServiceId, car } }) {
  try {
    const response = yield call(priorityService, exId, orderServiceId)
    toast.success("Phương tiện " + car + " đã được ưu tiên")
    yield put(putPriorityServiceSuccess(response))
  } catch (error) {
    toast.error("Ưu tiên phương tiện " + car + " thất bại")
    yield put(putPriorityServiceFail(error))
  }
}

function* checkOutServices({ payload: { carId, data, id, car, history } }) {
  try {
    const response = yield call(checkOutService, carId, data)
    yield put(checkOutServiceSuccess(response))
    history.push(`/order-services/${id}`)
    toast.success("Check-out thành công phương tiện " + car)
  } catch (error) {
    toast.error("Check-out thất bại")
    yield put(checkOutServiceFail(error))
  }
}

function* fetchStatusLog({ orderServiceId }) {
  try {
    const response = yield call(getStatusLog, orderServiceId)
    yield put(getStatusLogSuccess(response))
  } catch (error) {
    yield put(getStatusLogFail(error))
  }
}

function* onCountServices() {
  try {
    const response = yield call(countService)
    yield put(countServiceSuccess(response))
  } catch (error) {
    yield put(countServiceFail(error))
  }
}

function* orderServicesSaga() {
  //yield takeEvery(GET_ORDER_SERVICE_LIST, fetchOrderServicessLists)
  yield takeEvery(
    GET_ORDER_SERVICE_LIST_BY_STATUS,
    fetchOrderServiceListByStatus
  )

  yield takeEvery(GET_ORDER_SERVICE_DETAIL, fetchOrderServicesDetails)
  yield takeEvery(PUT_ASSIGN_EXPERT, onAssignExpert)
  yield takeEvery(PUT_AUTO_ASSIGN_EXPERT, onAutoAssignExpert)
  yield takeEvery(GET_EXPERTS_INTENDED_TIME, onGetExpertIntendedTime)
  yield takeEvery(
    GET_EXPERTS_INTENDED_TIME_BY_SERVICE_TIME,
    onGetExpertIntendedTimeByServices
  )
  yield takeEvery(PUT_PRIORITY_SERVICES, priorityServices)
  yield takeEvery(CHECKOUT_SERVICES, checkOutServices)
  yield takeEvery(GET_STATUS_LOG, fetchStatusLog)
  yield takeEvery(COUNT_SERVICES, onCountServices)
}

export default orderServicesSaga
