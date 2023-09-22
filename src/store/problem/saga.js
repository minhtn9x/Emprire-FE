import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States

import {
  getCarsProblemSuccess,
  getCarsProblemFail,
  addNewCarsProblemSuccess,
  addNewCarsProblemFail,
  getCarsProblemByModelSuccess,
  getCarsProblemByModelFail,
  getCarsProblemDetailSuccess,
  getCarsProblemDetailFail,
  deleteCarsProblemSuccess,
  deleteCarsProblemFail,
  updateCarsProblemSuccess,
  updateCarsProblemFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  addNewCarsProblem,
  deleteCarsProblem,
  getCarsProblem,
  getCarsProblemByModel,
  getCarsProblemDetails,
  updateCarsProblem,
} from "../../helpers/fakebackend_helper"
import {
  ADD_NEW_CAR_PROBLEM,
  DELETE_CAR_PROBLEM,
  GET_CARS_PROBLEM,
  GET_CAR_PROBLEM_BY_MODEL,
  GET_CAR_PROBLEM_DETAIL,
  UPDATE_CAR_PROBLEM,
} from "./actionTypes"

import { toast } from "react-toastify"

function* fetchCarsProblem() {
  try {
    const response = yield call(getCarsProblem)
    yield put(getCarsProblemSuccess(response))
  } catch (error) {
    yield put(getCarsProblemFail(error))
  }
}

function* fetchCarsProblemByModel({ id }) {
  try {
    const response = yield call(getCarsProblemByModel, id)
    yield put(getCarsProblemByModelSuccess(response))
  } catch (error) {
    yield put(getCarsProblemByModelFail(error))
  }
}

function* onAddProblem({
  payload: carsProblem,
  history,
  brandId,
  brandName,
  modelId,
  modelName,
}) {
  try {
    const response = yield call(addNewCarsProblem, carsProblem)
    yield put(addNewCarsProblemSuccess(response))
    toast.success("Tạo mới thành công " + response.name)
    history.push(
      `brands/${brandId}/${brandName}/models/${modelId}/${modelName}`
    )
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewCarsProblemFail(error))
  }
}

function* fetchCarsProblemDetails({ problemId }) {
  try {
    const response = yield call(getCarsProblemDetails, problemId)
    yield put(getCarsProblemDetailSuccess(response))
  } catch (error) {
    yield put(getCarsProblemDetailFail(error))
  }
}

function* onUpdateProblems({ payload: carsProblem, id, history }) {
  try {
    const response = yield call(updateCarsProblem, id, carsProblem)
    yield put(updateCarsProblemSuccess(carsProblem))
    toast.success("Cập nhật thành công " + carsProblem.name)
    history.goBack()
  } catch (error) {
    toast.success("Đã có lỗi xảy ra")
    yield put(updateCarsProblemFail(error))
  }
}

function* onDeleteProblems({ payload: carsProblem }) {
  try {
    const response = yield call(deleteCarsProblem, carsProblem.id)
    yield put(deleteCarsProblemSuccess(carsProblem))
    toast.success("Xóa thành công " + carsProblem.name)
  } catch (error) {
    toast.success("Đã có lỗi xảy ra")
    yield put(deleteCarsProblemFail(error))
  }
}

function* problemsSaga() {
  yield takeEvery(GET_CARS_PROBLEM, fetchCarsProblem)
  yield takeEvery(GET_CAR_PROBLEM_BY_MODEL, fetchCarsProblemByModel)
  yield takeEvery(ADD_NEW_CAR_PROBLEM, onAddProblem)
  yield takeEvery(GET_CAR_PROBLEM_DETAIL, fetchCarsProblemDetails)
  yield takeEvery(UPDATE_CAR_PROBLEM, onUpdateProblems)
  yield takeEvery(DELETE_CAR_PROBLEM, onDeleteProblems)
}

export default problemsSaga
