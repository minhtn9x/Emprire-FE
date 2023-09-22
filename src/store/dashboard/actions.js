import {
  API_SUCCESS,
  API_FAIL,
  GET_CHARTS_DATA,
  SEARCH_ALL,
  SEARCH_ALL_SUCCESS,
  SEARCH_ALL_FAIL,
} from "./actionTypes"

export const apiSuccess = (actionType, data) => ({
  type: API_SUCCESS,
  payload: { actionType, data },
})

export const apiFail = (actionType, error) => ({
  type: API_FAIL,
  payload: { actionType, error },
})

// charts data
export const getChartsData = periodType => ({
  type: GET_CHARTS_DATA,
  payload: periodType,
})

/* SEARCH ALL */
export const onSearchAll = string => ({
  type: SEARCH_ALL,
  string,
})

export const onSearchAllSuccess = searchResult => ({
  type: SEARCH_ALL_SUCCESS,
  payload: searchResult,
})

export const onSearchAllFail = error => ({
  type: SEARCH_ALL_FAIL,
  payload: error,
})
