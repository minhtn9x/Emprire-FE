import {
  IMPORT_DATA_EXCEL,
  IMPORT_DATA_EXCEL_FAIL,
  IMPORT_DATA_EXCEL_SUCCESS,
  RESET_ERROR_DATA_EXCEL,
} from "./actionTypes"

export const importDataExcel = (data, history) => ({
  type: IMPORT_DATA_EXCEL,
  payload: data,
  history,
})

export const importDataExcelSuccess = data => ({
  type: IMPORT_DATA_EXCEL_SUCCESS,
  payload: data,
})

export const importDataExcelFail = error => ({
  type: IMPORT_DATA_EXCEL_FAIL,
  payload: error,
})

export const resetErrorDataExcel = () => ({
  type: RESET_ERROR_DATA_EXCEL,
})
