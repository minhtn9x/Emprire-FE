import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import {
  ADD_NEW_SYMPTOMS,
  DELETE_SYMPTOMS,
  GET_SYMPTOMS_DETAIL,
  GET_SYMPTOMS_LIST,
  UPDATE_SYMPTOMS,
} from "./actionTypes"

import {
  getSymptomsListsFail,
  getSymptomsListsSuccess,
  addNewSymptomsSuccess,
  addNewSymptomsFail,
  getSymptomsDetailsSuccess,
  getSymptomsDetailsFail,
  updateSymptomsSuccess,
  updateSymptomsFail,
  deleteSymptomsSuccess,
  deleteSymptomsFail,
} from "./actions"

import {
  addNewSymptoms,
  deleteSymptoms,
  getSymptoms,
  getSymptomsDetails,
  updateSymptoms,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* fetchSymptomsLists() {
  try {
    const response = yield call(getSymptoms)
    yield put(getSymptomsListsSuccess(response))
  } catch (error) {
    yield put(getSymptomsListsFail(error))
  }
}

function* fetchSymptomsDetails({ symptomId }) {
  try {
    const response = yield call(getSymptomsDetails, symptomId)
    yield put(getSymptomsDetailsSuccess(response))
  } catch (error) {
    yield put(getSymptomsDetailsFail(error))
  }
}

function* onAddSymptoms({ payload: symptoms, history }) {
  try {
    const response = yield call(addNewSymptoms, symptoms)
    yield put(addNewSymptomsSuccess(response))
    toast.success("Tạo mới thành công " + response.name)
    history.push("/symptoms")
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewSymptomsFail(error))
  }
}

function* onUpdateSymptoms({ payload: symptoms, id, history }) {
  try {
    const response = yield call(updateSymptoms, id, symptoms)
    yield put(updateSymptomsSuccess(response))
    toast.success("Cập nhật thành công " + response.name)
    history.goBack()
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(updateSymptomsFail(error))
  }
}

function* onDeleteSymptoms({ symptoms }) {
  try {
    const response = yield call(deleteSymptoms, symptoms.id)
    toast.success("Xóa thành công " + symptoms.name)
    yield put(deleteSymptomsSuccess(response))
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(deleteSymptomsFail(error))
  }
}

function* symptomsSaga() {
  yield takeEvery(GET_SYMPTOMS_LIST, fetchSymptomsLists)
  yield takeEvery(GET_SYMPTOMS_DETAIL, fetchSymptomsDetails)
  yield takeEvery(ADD_NEW_SYMPTOMS, onAddSymptoms)
  yield takeEvery(UPDATE_SYMPTOMS, onUpdateSymptoms)
  yield takeEvery(DELETE_SYMPTOMS, onDeleteSymptoms)
}

export default symptomsSaga
