import { IMPORT_DATA_EXCEL } from "helpers/url_helper"
import {
  IMPORT_DATA_EXCEL_FAIL,
  IMPORT_DATA_EXCEL_SUCCESS,
  RESET_DATA_EXCEL,
  RESET_ERROR_DATA_EXCEL,
} from "./actionTypes"

const INIT_STATE = {
  data: {},
  error: "",
  isLoading: false,
}

const imports = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IMPORT_DATA_EXCEL:
      return {
        ...state,
        isLoading: true,
      }

    case IMPORT_DATA_EXCEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }

    case IMPORT_DATA_EXCEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case RESET_ERROR_DATA_EXCEL:
      return {
        ...state,
        error: "",
      }

    default:
      return state
  }
}

export default imports
