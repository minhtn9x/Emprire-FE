import {
  ADD_CAR_MODEL_FAIL,
  ADD_CAR_MODEL_SUCCESS,
  DELETE_CAR_MODEL_FAIL,
  DELETE_CAR_MODEL_SUCCESS,
  UPDATE_CAR_MODEL_FAIL,
  UPDATE_CAR_MODEL_SUCCESS,
  GET_CARS_MODEL_FAIL,
  GET_CARS_MODEL_SUCCESS,
  GET_CAR_MODEL_DETAIL_FAIL,
  GET_CAR_MODEL_DETAIL_SUCCESS,
  GET_CARS_MODEL_BY_BRAND_SUCCESS,
  GET_CARS_MODEL_BY_BRAND_FAIL,
  ADD_NEW_CAR_MODEL,
  RESET_CARS_MODEL,
  GET_CAR_MODEL_DETAIL,
  DELETE_CAR_MODEL,
  GET_CARS_MODEL,
} from "./actionTypes"

const INIT_STATE = {
  carsModel: [],
  carsModelByBrand: [],
  carsModelDetail: {},
  error: {},
  isLoading: false,
}

const models = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET MODEL */
    case GET_CARS_MODEL:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CARS_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsModel: action.payload,
      }

    case GET_CARS_MODEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET MODEL BY BRAND */
    case GET_CARS_MODEL_BY_BRAND_SUCCESS:
      return {
        ...state,
        carsModelByBrand: action.payload,
      }

    case GET_CARS_MODEL_BY_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* ADD NEW MODEL */
    case ADD_NEW_CAR_MODEL:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsModel: [...state.carsModel, action.payload],
      }

    case ADD_CAR_MODEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET CAR MODEL */
    case GET_CAR_MODEL_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CAR_MODEL_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsModelDetail: action.payload,
      }

    case GET_CAR_MODEL_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* UPDATE MODEL */
    case UPDATE_CAR_MODEL_SUCCESS:
      return {
        ...state,
        carsModel: state.carsModel.map(model =>
          model.id === action.payload.id ? { model, ...action.payload } : model
        ),
      }

    case UPDATE_CAR_MODEL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* DELETE MODEL */
    case DELETE_CAR_MODEL:
      return {
        ...state,
        isLoading: true,
      }

    case DELETE_CAR_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsModel: state.carsModel.filter(
          model => model.id !== action.payload.id
        ),
        carsModelByBrand: state.carsModelByBrand.filter(
          model => model.id !== action.payload.id
        ),
      }

    case DELETE_CAR_MODEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* RESET MODEL */
    case RESET_CARS_MODEL:
      return {
        ...state,
        carsModelByBrand: [],
      }

    default:
      return state
  }
}

export default models
