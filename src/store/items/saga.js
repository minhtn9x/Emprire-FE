import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States

import {
  getCarsItemSuccess,
  getCarsItemFail,
  addNewCarsItemSuccess,
  addNewCarsItemFail,
  getCarsItemByProblemSuccess,
  getCarsItemByProblemFail,
  updateCarsItemSuccess,
  updateCarsItemFail,
  deleteCarsItemSuccess,
  deleteCarsItemFail,
  getCarsItemDetailSuccess,
  getCarsItemDetailFail,
} from "./actions"
import {
  addNewCarsItem,
  deleteCarsItem,
  getCarsItem,
  getCarsItemByProblem,
  getCarsItemDetails,
  updateCarsItem,
} from "helpers/fakebackend_helper"
import {
  ADD_NEW_CAR_ITEM,
  DELETE_CAR_ITEM,
  GET_CARS_ITEM,
  GET_CARS_ITEM_BY_PROBLEM,
  GET_CAR_ITEM_DETAIL,
  UPDATE_CAR_ITEM,
} from "./actionTypes"

import { toast } from "react-toastify"

//Include Both Helper File with needed methods

function* fetchCarsItem() {
  try {
    const response = yield call(getCarsItem)
    yield put(getCarsItemSuccess(response))
  } catch (error) {
    yield put(getCarsItemFail(error))
  }
}

function* fetchCarsItemByProblem({ id }) {
  try {
    const response = yield call(getCarsItemByProblem, id)
    yield put(getCarsItemByProblemSuccess(response))
  } catch (error) {
    yield put(getCarsItemByProblemFail(error))
  }
}

function* fetchCarsItemsDetails({ carItemId }) {
  try {
    const response = yield call(getCarsItemDetails, carItemId)
    yield put(getCarsItemDetailSuccess(response))
  } catch (error) {
    yield put(getCarsItemDetailFail(error))
  }
}

function* onAddItem({ payload: carsItem, payload: paramss, history }) {
  try {
    const response = yield call(addNewCarsItem, carsItem)
    yield put(addNewCarsItemSuccess(response))
    history.push(
      `/brands/${paramss.brandId}/${paramss.brandName}/models/${paramss.modelId}/${paramss.modelName}/problems/${paramss.problemId}/${paramss.problemName}/items`
    )
    toast.success("Tạo mới thành công " + carsItem.name)
  } catch (error) {
    yield put(addNewCarsItemFail(error))
    toast.error("Đã có lỗi xảy ra")
  }
}

function* onUpdateItems({ payload: carsItem, id, history }) {
  try {
    const response = yield call(updateCarsItem, id, carsItem)
    yield put(updateCarsItemSuccess(carsItem))
    history.goBack()
    toast.success("Cập nhật thành công dịch vụ " + carsItem.name)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(updateCarsItemFail(error))
  }
}

function* onDeleteItems({ payload: carsItem }) {
  try {
    const response = yield call(deleteCarsItem, carsItem.id)
    yield put(deleteCarsItemSuccess(carsItem))
    toast.success("Xóa thành công dòng xe " + carsItem.name)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(deleteCarsItemFail(error))
  }
}

function* itemsSaga() {
  yield takeEvery(GET_CARS_ITEM, fetchCarsItem)
  yield takeEvery(GET_CARS_ITEM_BY_PROBLEM, fetchCarsItemByProblem)
  yield takeEvery(GET_CAR_ITEM_DETAIL, fetchCarsItemsDetails)
  yield takeEvery(ADD_NEW_CAR_ITEM, onAddItem)
  yield takeEvery(UPDATE_CAR_ITEM, onUpdateItems)
  yield takeEvery(DELETE_CAR_ITEM, onDeleteItems)
}

export default itemsSaga
