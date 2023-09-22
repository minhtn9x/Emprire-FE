import {
  ADD_NEW_SYMPTOMS,
  ADD_SYMPTOMS_FAIL,
  ADD_SYMPTOMS_SUCCESS,
  DELETE_SYMPTOMS_FAIL,
  DELETE_SYMPTOMS_SUCCESS,
  GET_SYMPTOMS_DETAIL,
  GET_SYMPTOMS_DETAIL_FAIL,
  GET_SYMPTOMS_DETAIL_SUCCESS,
  GET_SYMPTOMS_LIST,
  GET_SYMPTOMS_LIST_FAIL,
  GET_SYMPTOMS_LIST_SUCCESS,
  UPDATE_SYMPTOMS,
  UPDATE_SYMPTOMS_FAIL,
  UPDATE_SYMPTOMS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  symptoms: [],
  symptomsDetail: {},
  error: {},
  isLoading: false,
}

const symptomsLists = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET SYMPTOM */

    case GET_SYMPTOMS_LIST:
      return {
        ...state,
        isLoading: true,
      }

    case GET_SYMPTOMS_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        symptoms: action.payload,
      }

    case GET_SYMPTOMS_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET SYMPTOM DETAIL*/

    case GET_SYMPTOMS_DETAIL:
      return {
        ...state,
        isLoading: true,
      }

    case GET_SYMPTOMS_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        symptomsDetail: action.payload,
      }

    case GET_SYMPTOMS_DETAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* ADD NEW SYMPTOM */

    case ADD_NEW_SYMPTOMS:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_SYMPTOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        symptoms: [...state.symptoms, action.payload],
      }

    case ADD_SYMPTOMS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* UPDATE SYMPTOM */

    case UPDATE_SYMPTOMS:
      return {
        ...state,
        isLoading: true,
      }

    case UPDATE_SYMPTOMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        symptoms: state.symptoms.map(s =>
          s.id.toString() === action.payload.id.toString()
            ? { s, ...action.payload }
            : s
        ),
      }

    case UPDATE_SYMPTOMS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* DELETE SYMPTOM */

    case DELETE_SYMPTOMS_SUCCESS:
      return {
        ...state,
        // symptoms: state.symptoms.filter(
        //   symptoms => symptoms.id.toString() !== action.payload.id.toString()
        // ),
        symptoms: action.payload,
      }

    case DELETE_SYMPTOMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default symptomsLists
