import { call, put, takeEvery } from "redux-saga/effects"

import { IMPORT_DATA_EXCEL } from "./actionTypes"
import { importDataExcelFail, importDataExcelSuccess } from "./actions"

//Include Both Helper File with needed methods
import { importDataExcel } from "helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* importDataExcels({ payload: data, history }) {
  try {
    const response = yield call(importDataExcel, data)
    yield put(importDataExcelSuccess(response))
    history.push("/items")
    toast.success("Tạo mới file Excel thành công ")
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(importDataExcelFail(error.response.data.message))
  }
}

function* importsSaga() {
  yield takeEvery(IMPORT_DATA_EXCEL, importDataExcels)
}

export default importsSaga
