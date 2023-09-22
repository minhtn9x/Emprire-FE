import {
  ADD_CAR_PROBLEM_FAIL,
  ADD_CAR_PROBLEM_SUCCESS,
  DELETE_CAR_PROBLEM_FAIL,
  DELETE_CAR_PROBLEM_SUCCESS,
  UPDATE_CAR_PROBLEM_FAIL,
  UPDATE_CAR_PROBLEM_SUCCESS,
  GET_CARS_PROBLEM_FAIL,
  GET_CARS_PROBLEM_SUCCESS,
  GET_CAR_PROBLEM_DETAIL_FAIL,
  GET_CAR_PROBLEM_DETAIL_SUCCESS,
  GET_CAR_PROBLEM_BY_MODEL_SUCCESS,
  GET_CAR_PROBLEM_BY_MODEL_FAIL,
  GET_CARS_PROBLEM,
  ADD_NEW_CAR_PROBLEM,
  GET_CAR_PROBLEM_BY_MODEL,
  GET_CAR_PROBLEM_DETAIL,
  UPDATE_CAR_PROBLEM,
  DELETE_CAR_PROBLEM,
  RESET_CARS_PROBLEM,
} from "./actionTypes"

const INIT_STATE = {
  carsProblem: [],
  carsProblemByModel: [],
  carsProblemDetail: {},
  error: {},
  isLoading: false,
}

const problems = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET PROBLEM */
    case GET_CARS_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CARS_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblem: action.payload,
      }

    case GET_CARS_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET PROBLEM BY MODEL */

    case GET_CAR_PROBLEM_BY_MODEL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CAR_PROBLEM_BY_MODEL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblemByModel: action.payload,
      }

    case GET_CAR_PROBLEM_BY_MODEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* ADD NEW PROBLEM */

    case ADD_NEW_CAR_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblem: [...state.carsProblem, action.payload],
      }

    case ADD_CAR_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET PROBLEM DETAIL */

    case GET_CAR_PROBLEM_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_CAR_PROBLEM_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblemDetail: action.payload,
      }

    case GET_CAR_PROBLEM_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* UPDATE PROBLEM  */

    case UPDATE_CAR_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case UPDATE_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblem: state.carsProblem.map(p =>
          p.id === action.payload.id ? { p, ...action.payload } : p
        ),
      }

    case UPDATE_CAR_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* DELETE PROBLEM  */
    case DELETE_CAR_PROBLEM:
      return {
        ...state,
        isLoading: true,
      }

    case DELETE_CAR_PROBLEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        carsProblem: state.carsProblem.filter(
          problem => problem.id.toString() !== action.payload.id.toString()
        ),
        carsProblemByModel: state.carsProblemByModel.filter(
          problem => problem.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_PROBLEM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* DELETE PROBLEM  */
    case RESET_CARS_PROBLEM:
      return {
        ...state,
        carsProblemByModel: [],
      }

    default:
      return state
  }
}

export default problems
