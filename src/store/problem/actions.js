import {
  ADD_NEW_CAR_PROBLEM,
  ADD_CAR_PROBLEM_FAIL,
  ADD_CAR_PROBLEM_SUCCESS,
  DELETE_CAR_PROBLEM,
  DELETE_CAR_PROBLEM_FAIL,
  DELETE_CAR_PROBLEM_SUCCESS,
  UPDATE_CAR_PROBLEM,
  UPDATE_CAR_PROBLEM_FAIL,
  UPDATE_CAR_PROBLEM_SUCCESS,
  GET_CARS_PROBLEM,
  GET_CARS_PROBLEM_FAIL,
  GET_CARS_PROBLEM_SUCCESS,
  GET_CAR_PROBLEM_DETAIL,
  GET_CAR_PROBLEM_DETAIL_FAIL,
  GET_CAR_PROBLEM_DETAIL_SUCCESS,
  GET_CAR_PROBLEM_BY_MODEL_,
  GET_CAR_PROBLEM_BY_MODEL,
  GET_CAR_PROBLEM_BY_MODEL_SUCCESS,
  GET_CAR_PROBLEM_BY_MODEL_FAIL,
  RESET_CARS_MODEL,
  RESET_CARS_PROBLEM,
} from "./actionTypes"

/*
================================================ 
GET Problem 
================================================
*/
export const getCarsProblem = () => ({
  type: GET_CARS_PROBLEM,
})

export const getCarsProblemSuccess = carsProblem => ({
  type: GET_CARS_PROBLEM_SUCCESS,
  payload: carsProblem,
})

export const getCarsProblemFail = error => ({
  type: GET_CARS_PROBLEM_FAIL,
  payload: error,
})

/*
================================================ 
GET Problem By Model
================================================
*/
export const getCarsProblemByModel = id => ({
  type: GET_CAR_PROBLEM_BY_MODEL,
  id,
})

export const getCarsProblemByModelSuccess = carsProblem => ({
  type: GET_CAR_PROBLEM_BY_MODEL_SUCCESS,
  payload: carsProblem,
})

export const getCarsProblemByModelFail = error => ({
  type: GET_CAR_PROBLEM_BY_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
GET Problem Detail
================================================
*/
export const getCarsProblemDetail = problemId => ({
  type: GET_CAR_PROBLEM_DETAIL,
  problemId,
})

export const getCarsProblemDetailSuccess = carsProblemDetail => ({
  type: GET_CAR_PROBLEM_DETAIL_SUCCESS,
  payload: carsProblemDetail,
})

export const getCarsProblemDetailFail = error => ({
  type: GET_CAR_PROBLEM_DETAIL_FAIL,
  payload: error,
})

/*
================================================ 
POST Add New Problem
================================================
*/

export const addNewCarsProblem = (
  carsProblem,
  history,
  brandId,
  brandName,
  modelId,
  modelName
) => ({
  type: ADD_NEW_CAR_PROBLEM,
  payload: carsProblem,
  history,
  brandId,
  brandName,
  modelId,
  modelName,
})

export const addNewCarsProblemSuccess = carsProblem => ({
  type: ADD_CAR_PROBLEM_SUCCESS,
  payload: carsProblem,
})

export const addNewCarsProblemFail = error => ({
  type: ADD_CAR_PROBLEM_FAIL,
  payload: error,
})

/*
================================================ 
PUT PROBLEMs Problem
================================================
*/

export const updateCarsProblem = (carsProblem, id, history) => ({
  type: UPDATE_CAR_PROBLEM,
  payload: carsProblem,
  id,
  history,
})

export const updateCarsProblemSuccess = carsProblem => ({
  type: UPDATE_CAR_PROBLEM_SUCCESS,
  payload: carsProblem,
})

export const updateCarsProblemFail = error => ({
  type: UPDATE_CAR_PROBLEM_FAIL,
  payload: error,
})

/*
================================================ 
DELETE Problem 
================================================
*/

export const deleteCarsProblem = carsProblem => ({
  type: DELETE_CAR_PROBLEM,
  payload: carsProblem,
})

export const deleteCarsProblemSuccess = carsProblem => ({
  type: DELETE_CAR_PROBLEM_SUCCESS,
  payload: carsProblem,
})

export const deleteCarsProblemFail = error => ({
  type: DELETE_CAR_PROBLEM_FAIL,
  payload: error,
})

/*
================================================ 
RESET Problem 
================================================
*/

export const resetCarsProblem = () => ({
  type: RESET_CARS_PROBLEM,
})
