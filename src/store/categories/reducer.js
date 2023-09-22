import {
  GET_CATEGORY_SERVICE_FAIL,
  GET_CATEGORY_SERVICE_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  categoryServices: [],
  error: {},
}

const categoryServicess = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CATEGORY_SERVICE_SUCCESS:
      return {
        ...state,
        categoryServices: action.payload,
      }

    case GET_CATEGORY_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default categoryServicess
