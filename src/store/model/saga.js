import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  DELETE_CAR_MODEL,
  GET_CARS_MODEL_BY_BRAND,
  GET_CAR_MODEL_DETAIL,
  UPDATE_CAR_MODEL,
} from "./actionTypes"

import {
  getCarsModelSuccess,
  getCarsModelFail,
  addNewCarsModelSuccess,
  addNewCarsModelFail,
  getCarsModelByBrandSuccess,
  getCarsModelByBrandFail,
  getCarsModelDetailSuccess,
  getCarsModelDetailFail,
  updateCarsModelSuccess,
  updateCarsModelFail,
  deleteCarsModelSuccess,
  deleteCarsModelFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  addNewCarsModel,
  deleteCarsModel,
  getCarsModel,
  getCarsModelByBrand,
  getCarsModelDetails,
  updateCarsModel,
} from "../../helpers/fakebackend_helper"
import { GET_CARS_MODEL, ADD_NEW_CAR_MODEL } from "./actionTypes"

import { toast } from "react-toastify"

function* fetchCarsModel() {
  try {
    const response = yield call(getCarsModel)
    yield put(getCarsModelSuccess(response))
  } catch (error) {
    yield put(getCarsModelFail(error))
  }
}

function* fetchCarsModelByBrand({ id }) {
  try {
    const response = yield call(getCarsModelByBrand, id)
    yield put(getCarsModelByBrandSuccess(response))
  } catch (error) {
    yield put(getCarsModelByBrandFail(error))
  }
}

function* fetchCarsModelDetails({ carModelId }) {
  try {
    const response = yield call(getCarsModelDetails, carModelId)
    yield put(getCarsModelDetailSuccess(response))
  } catch (error) {
    yield put(getCarsModelDetailFail(error))
  }
}

function* onAddModel({ payload: carsModel, history, brandName }) {
  try {
    const response = yield call(addNewCarsModel, carsModel)
    yield put(addNewCarsModelSuccess(response))
    history.push(`/brands/${carsModel.brandId}/${brandName}`)
    toast.success("Tạo mới thành công " + response.name)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewCarsModelFail(error))
  }
}

function* onUpdateModels({ payload: carsModel, id, history, modelName }) {
  try {
    const response = yield call(updateCarsModel, id, carsModel)
    yield put(updateCarsModelSuccess(response))
    history.goBack()
    toast.success("Cập nhật thành công dòng xe " + modelName)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(updateCarsModelFail(error))
  }
}

function* onDeleteModels({ payload: carsModel }) {
  try {
    const response = yield call(deleteCarsModel, carsModel.id)
    yield put(deleteCarsModelSuccess(carsModel))
    toast.success("Xóa thành công dòng xe " + carsModel.name)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(deleteCarsModelFail(error))
  }
}

function* modelsSaga() {
  yield takeEvery(GET_CARS_MODEL, fetchCarsModel)
  yield takeEvery(GET_CARS_MODEL_BY_BRAND, fetchCarsModelByBrand)
  yield takeEvery(ADD_NEW_CAR_MODEL, onAddModel)
  yield takeEvery(GET_CAR_MODEL_DETAIL, fetchCarsModelDetails)
  yield takeEvery(UPDATE_CAR_MODEL, onUpdateModels)
  yield takeEvery(DELETE_CAR_MODEL, onDeleteModels)

  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)

  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default modelsSaga
