import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  ADD_NEW_CAR_BRAND,
  DELETE_CAR_BRAND,
  GET_CARS_BRAND,
  UPDATE_CAR_BRAND,
} from "./actionTypes"

import {
  getCarsBrandSuccess,
  getCarsBrandFail,
  addNewCarsBrandSuccess,
  addNewCarsBrandFail,
  getCarsBrandDetailSuccess,
  getCarsBrandDetailFail,
  updateCarsBrandSuccess,
  updateCarsBrandFail,
  deleteCarsBrandSuccess,
  deleteCarsBrandFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  addNewCarsBrand,
  deleteCarsBrand,
  getCarsBrand,
  getCarsBrandDetails,
  updateCarsBrand,
} from "../../helpers/fakebackend_helper"
import { GET_CAR_BRAND_DETAIL } from "./actionTypes"

import { toast } from "react-toastify"

function* fetchCarsBrands() {
  try {
    const response = yield call(getCarsBrand)
    yield put(getCarsBrandSuccess(response))
  } catch (error) {
    yield put(getCarsBrandFail(error))
  }
}

function* fetchCarsBrandDetails({ brandId }) {
  try {
    const response = yield call(getCarsBrandDetails, brandId)
    yield put(getCarsBrandDetailSuccess(response))
  } catch (error) {
    yield put(getCarsBrandDetailFail(error))
  }
}

function* onAddBrands({ payload: carBrand, history }) {
  try {
    const response = yield call(addNewCarsBrand, carBrand)
    yield put(addNewCarsBrandSuccess(response))
    history.push("/brands")
    toast.success("Tạo mới thành công " + response.name)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewCarsBrandFail(error))
  }
}

function* onUpdateCarBrands({ payload: carBrand, brandId, history }) {
  try {
    const response = yield call(updateCarsBrand, brandId, carBrand)
    yield put(updateCarsBrandSuccess(carBrand))
    history.goBack()
    toast.success("Cập nhật thành công " + carBrand.name)
  } catch (error) {
    yield put(updateCarsBrandFail(error))
    toast.error("Đã có lỗi xảy ra")
  }
}

function* onDeleteCarBrands({ payload: carBrand }) {
  try {
    const response = yield call(deleteCarsBrand, carBrand.id)
    yield put(deleteCarsBrandSuccess(carBrand))
    toast.success("Xóa thành công " + carBrand.name)
  } catch (error) {
    yield put(deleteCarsBrandFail(error))
    toast.error("Đã có lỗi xảy ra")
  }
}

function* brandsSaga() {
  yield takeEvery(GET_CARS_BRAND, fetchCarsBrands)
  yield takeEvery(GET_CAR_BRAND_DETAIL, fetchCarsBrandDetails)
  yield takeEvery(ADD_NEW_CAR_BRAND, onAddBrands)
  yield takeEvery(UPDATE_CAR_BRAND, onUpdateCarBrands)
  yield takeEvery(DELETE_CAR_BRAND, onDeleteCarBrands)
}

export default brandsSaga
