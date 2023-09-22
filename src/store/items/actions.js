import {
  ADD_NEW_CAR_ITEM,
  ADD_CAR_ITEM_FAIL,
  ADD_CAR_ITEM_SUCCESS,
  DELETE_CAR_ITEM,
  DELETE_CAR_ITEM_FAIL,
  DELETE_CAR_ITEM_SUCCESS,
  UPDATE_CAR_ITEM,
  UPDATE_CAR_ITEM_FAIL,
  UPDATE_CAR_ITEM_SUCCESS,
  GET_CARS_ITEM,
  GET_CARS_ITEM_FAIL,
  GET_CARS_ITEM_SUCCESS,
  GET_CAR_ITEM_DETAIL,
  GET_CAR_ITEM_DETAIL_FAIL,
  GET_CAR_ITEM_DETAIL_SUCCESS,
  GET_CARS_ITEM_BY_PROBLEM,
  GET_CARS_ITEM_BY_PROBLEM_SUCCESS,
  GET_CARS_ITEM_BY_PROBLEM_FAIL,
} from "./actionTypes"

/*
================================================ 
GET Item 
================================================
*/
export const getCarsItem = () => ({
  type: GET_CARS_ITEM,
})

export const getCarsItemSuccess = carsItem => ({
  type: GET_CARS_ITEM_SUCCESS,
  payload: carsItem,
})

export const getCarsItemFail = error => ({
  type: GET_CARS_ITEM_FAIL,
  payload: error,
})

/*
================================================ 
GET Item 
================================================
*/
export const getCarsItemByProblem = id => ({
  type: GET_CARS_ITEM_BY_PROBLEM,
  id,
})

export const getCarsItemByProblemSuccess = carsItem => ({
  type: GET_CARS_ITEM_BY_PROBLEM_SUCCESS,
  payload: carsItem,
})

export const getCarsItemByProblemFail = error => ({
  type: GET_CARS_ITEM_BY_PROBLEM_FAIL,
  payload: error,
})

/*
================================================ 
GET Item Detail
================================================
*/
export const getCarsItemDetail = carItemId => ({
  type: GET_CAR_ITEM_DETAIL,
  carItemId,
})

export const getCarsItemDetailSuccess = carsItemDetail => ({
  type: GET_CAR_ITEM_DETAIL_SUCCESS,
  payload: carsItemDetail,
})

export const getCarsItemDetailFail = error => ({
  type: GET_CAR_ITEM_DETAIL_FAIL,
  payload: error,
})

/*
================================================ 
POST Add New Item
================================================
*/

export const addNewCarsItem = (carsItem, history) => ({
  type: ADD_NEW_CAR_ITEM,
  payload: carsItem,
  history,
})

export const addNewCarsItemSuccess = carsItem => ({
  type: ADD_CAR_ITEM_SUCCESS,
  payload: carsItem,
})

export const addNewCarsItemFail = error => ({
  type: ADD_CAR_ITEM_FAIL,
  payload: error,
})

/*
================================================ 
PUT Item Update
================================================
*/

export const updateCarsItem = (carsItem, id, history) => ({
  type: UPDATE_CAR_ITEM,
  payload: carsItem,
  id,
  history,
})

export const updateCarsItemSuccess = carsItem => ({
  type: UPDATE_CAR_ITEM_SUCCESS,
  payload: carsItem,
})

export const updateCarsItemFail = error => ({
  type: UPDATE_CAR_ITEM_FAIL,
  payload: error,
})

/*
================================================ 
DELETE Item 
================================================
*/

export const deleteCarsItem = carsItem => ({
  type: DELETE_CAR_ITEM,
  payload: carsItem,
})

export const deleteCarsItemSuccess = carsItem => ({
  type: DELETE_CAR_ITEM_SUCCESS,
  payload: carsItem,
})

export const deleteCarsItemFail = error => ({
  type: DELETE_CAR_ITEM_FAIL,
  payload: error,
})
