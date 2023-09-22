import { SEARCH_ALL, SEARCH_ALL_SUCCESS, SEARCH_ALL_FAIL } from "./actionTypes"

const INIT_STATE = {
  searchResults: [],
  isLoadSearch: false,
  error: {},
}

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_ALL:
      return {
        ...state,
        isLoadSearch: true,
      }

    case SEARCH_ALL_SUCCESS:
      return {
        ...state,
        isLoadSearch: false,
        searchResults: action.payload,
      }

    case SEARCH_ALL_FAIL:
      return {
        ...state,
        isLoadSearch: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default Dashboard
