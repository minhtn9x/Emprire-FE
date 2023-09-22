import {
  ADD_CAR_BRAND_FAIL,
  ADD_CAR_BRAND_SUCCESS,
  DELETE_CAR_BRAND_FAIL,
  DELETE_CAR_BRAND_SUCCESS,
  UPDATE_CAR_BRAND_FAIL,
  UPDATE_CAR_BRAND_SUCCESS,
  GET_CARS_BRAND_FAIL,
  GET_CARS_BRAND_SUCCESS,
  GET_CAR_BRAND_DETAIL_FAIL,
  GET_CAR_BRAND_DETAIL_SUCCESS,
  GET_CARS_BRAND,
  ADD_NEW_CAR_BRAND,
  GET_CAR_BRAND_DETAIL,
  UPDATE_CAR_BRAND,
  DELETE_CAR_BRAND,
} from "./actionTypes"

const INIT_STATE = {
  carsBrand: [],
  carsBrandDetail: {},
  error: {},
  isLoading: false,
}

const brands = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET BRAND */
    case GET_CARS_BRAND:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CARS_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsBrand: action.payload,
      }

    case GET_CARS_BRAND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* ADD NEW BRAND */

    case ADD_NEW_CAR_BRAND:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsBrand: [...state.carsBrand, action.payload],
      }

    case ADD_CAR_BRAND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET DETAIL BRAND */
    case GET_CAR_BRAND_DETAIL:
      return {
        ...state,
        isLoading: true,
        carsBrandDetail: action.payload,
      }

    case GET_CAR_BRAND_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsBrandDetail: action.payload,
      }

    case GET_CAR_BRAND_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* UPDATE BRAND */

    case UPDATE_CAR_BRAND:
      return {
        ...state,
        isLoading: true,
      }

    case UPDATE_CAR_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsBrand: state.carsBrand.map(brand =>
          brand.id === action.payload.id ? { brand, ...action.payload } : brand
        ),
      }

    case UPDATE_CAR_BRAND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* DELETE BRAND */
    case DELETE_CAR_BRAND:
      return {
        ...state,
        isLoading: true,
      }

    case DELETE_CAR_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsBrand: state.carsBrand.filter(
          brand => brand.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_BRAND_FAIL:
      return {
        ...state,
        isLoading: false,

        error: action.payload,
      }
    default:
      return state
  }
}

export default brands
