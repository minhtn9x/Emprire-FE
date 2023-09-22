import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_EXPERTS_FAIL,
  GET_EXPERTS_SUCCESS,
  GET_USERS,
  GET_EXPERTS,
  PUT_STATUS_EXPERTS,
  PUT_STATUS_EXPERTS_SUCCESS,
  PUT_STATUS_EXPERTS_FAIL,
  ADD_NEW_GUEST_SUCCESS,
  ADD_NEW_GUEST_FAIL,
  ADD_NEW_GUEST,
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  experts: [],
  userProfile: {},
  error: {},
  isLoading: false,
}

const userLists = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* GET USERS */
    case GET_USERS:
      return {
        ...state,
        isLoading: true,
      }

    case GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* GET EXPERT */
    case GET_EXPERTS:
      return {
        ...state,
        isLoading: true,
      }

    case GET_EXPERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experts: action.payload,
      }

    case GET_EXPERTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* CHANGE STATUS EXPERT */
    case PUT_STATUS_EXPERTS:
      return {
        ...state,
        isLoading: true,
      }

    case PUT_STATUS_EXPERTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        experts: state.experts.map(expert =>
          expert.id === action.payload.id
            ? { ...expert, ...action.payload }
            : expert
        ),
      }

    case PUT_STATUS_EXPERTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    /* ADD USER */

    case ADD_NEW_GUEST:
      return {
        ...state,
        isLoading: true,
      }

    case ADD_NEW_GUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload],
      }

    case ADD_NEW_GUEST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    // case GET_USER_PROFILE_SUCCESS:
    //   return {
    //     ...state,
    //     userProfile: action.payload,
    //   }

    // case UPDATE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     users: state.users.map(user =>
    //       user.id.toString() === action.payload.id.toString()
    //         ? { user, ...action.payload }
    //         : user
    //     ),
    //   }

    // case UPDATE_USER_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    // case DELETE_USER_SUCCESS:
    //   return {
    //     ...state,
    //     users: state.users.filter(
    //       user => user.id.toString() !== action.payload.id.toString()
    //     ),
    //   }

    // case DELETE_USER_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    // case GET_USER_PROFILE_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   }

    default:
      return state
  }
}

export default userLists
