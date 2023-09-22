import {
  ADD_CAR_ITEM_FAIL,
  ADD_CAR_ITEM_SUCCESS,
  DELETE_CAR_ITEM_FAIL,
  DELETE_CAR_ITEM_SUCCESS,
  UPDATE_CAR_ITEM_FAIL,
  UPDATE_CAR_ITEM_SUCCESS,
  GET_CARS_ITEM_FAIL,
  GET_CARS_ITEM_SUCCESS,
  GET_CAR_ITEM_DETAIL_FAIL,
  GET_CAR_ITEM_DETAIL_SUCCESS,
  GET_CARS_ITEM_BY_PROBLEM,
  GET_CARS_ITEM_BY_PROBLEM_SUCCESS,
  GET_CARS_ITEM_BY_PROBLEM_FAIL,
  ADD_NEW_CAR_ITEM,
  GET_CARS_ITEM,
  GET_CAR_ITEM_DETAIL,
  UPDATE_CAR_ITEM,
  DELETE_CAR_ITEM,
} from "./actionTypes"

const INIT_STATE = {
  carsItem: [],
  carsItemByProblem: [],
  carsItemDetail: {},
  error: {},
  isLoading: false,
}

const items = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET ITEM */

    case GET_CARS_ITEM:
      return {
        ...state,
        isLoading: true,
      }
    case GET_CARS_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItem: action.payload,
      }

    case GET_CARS_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET ITEM BY PROBLEM */

    case GET_CARS_ITEM_BY_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CARS_ITEM_BY_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItemByProblem: action.payload,
      }

    case GET_CARS_ITEM_BY_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* ADD PROBLEM */

    case ADD_NEW_CAR_ITEM:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItem: [...state.carsItem, action.payload],
      }

    case ADD_CAR_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET ITEM DETAIL*/

    case GET_CAR_ITEM_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CAR_ITEM_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItemDetail: action.payload,
      }

    case GET_CAR_ITEM_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    /* UPDATE ITEM*/
    case UPDATE_CAR_ITEM:
      return {
        ...state,
        isLoading: true,
      }

    case UPDATE_CAR_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItem: state.carsItem.map(item =>
          item.id === action.payload.id ? { item, ...action.payload } : item
        ),
      }

    case UPDATE_CAR_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* DELETE ITEM*/
    case DELETE_CAR_ITEM:
      return {
        ...state,
        isLoading: true,
      }

    case DELETE_CAR_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsItem: state.carsItem.filter(
          items => items.id !== action.payload.id
        ),
        carsItemByProblem: state.carsItem.filter(
          items => items.id !== action.payload.id
        ),
      }

    case DELETE_CAR_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default items
