import {
  ADD_NEW_CAR_MODEL,
  ADD_CAR_MODEL_FAIL,
  ADD_CAR_MODEL_SUCCESS,
  DELETE_CAR_MODEL,
  DELETE_CAR_MODEL_FAIL,
  DELETE_CAR_MODEL_SUCCESS,
  UPDATE_CAR_MODEL,
  UPDATE_CAR_MODEL_FAIL,
  UPDATE_CAR_MODEL_SUCCESS,
  GET_CARS_MODEL,
  GET_CARS_MODEL_FAIL,
  GET_CARS_MODEL_SUCCESS,
  GET_CAR_MODEL_DETAIL,
  GET_CAR_MODEL_DETAIL_FAIL,
  GET_CAR_MODEL_DETAIL_SUCCESS,
  GET_CARS_MODEL_BY_BRAND,
  GET_CARS_MODEL_BY_BRAND_SUCCESS,
  GET_CARS_MODEL_BY_BRAND_FAIL,
  RESET_CARS_MODEL,
} from "./actionTypes"

/*
================================================ 
GET MODELs 
================================================
*/
export const getCarsModel = () => ({
  type: GET_CARS_MODEL,
})

export const getCarsModelSuccess = carsModel => ({
  type: GET_CARS_MODEL_SUCCESS,
  payload: carsModel,
})

export const getCarsModelFail = error => ({
  type: GET_CARS_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
GET Model By Brand 
================================================
*/
export const getCarsModelByBrand = id => ({
  type: GET_CARS_MODEL_BY_BRAND,
  id,
})

export const getCarsModelByBrandSuccess = carsModel => ({
  type: GET_CARS_MODEL_BY_BRAND_SUCCESS,
  payload: carsModel,
})

export const getCarsModelByBrandFail = error => ({
  type: GET_CARS_MODEL_BY_BRAND_FAIL,
  payload: error,
})

/*
================================================ 
GET Model Detail
================================================
*/
export const getCarsModelDetail = carModelId => ({
  type: GET_CAR_MODEL_DETAIL,
  carModelId,
})

export const getCarsModelDetailSuccess = carsModelDetail => ({
  type: GET_CAR_MODEL_DETAIL_SUCCESS,
  payload: carsModelDetail,
})

export const getCarsModelDetailFail = error => ({
  type: GET_CAR_MODEL_DETAIL_FAIL,
  payload: error,
})

/*
================================================ 
POST Add New Model
================================================
*/

export const addNewCarsModel = (carsModel, history, brandName) => ({
  type: ADD_NEW_CAR_MODEL,
  payload: carsModel,
  history,
  brandName,
})

export const addNewCarsModelSuccess = carsModel => ({
  type: ADD_CAR_MODEL_SUCCESS,
  payload: carsModel,
})

export const addNewCarsModelFail = error => ({
  type: ADD_CAR_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
PUT Model Update
================================================
*/

export const updateCarsModel = (carsModel, id, history, modelName) => ({
  type: UPDATE_CAR_MODEL,
  payload: carsModel,
  id,
  history,
  modelName,
})

export const updateCarsModelSuccess = carsModel => ({
  type: UPDATE_CAR_MODEL_SUCCESS,
  payload: carsModel,
})

export const updateCarsModelFail = error => ({
  type: UPDATE_CAR_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
DELETE Model 
================================================
*/

export const deleteCarsModel = carsModel => ({
  type: DELETE_CAR_MODEL,
  payload: carsModel,
})

export const deleteCarsModelSuccess = carsModel => ({
  type: DELETE_CAR_MODEL_SUCCESS,
  payload: carsModel,
})

export const deleteCarsModelFail = error => ({
  type: DELETE_CAR_MODEL_FAIL,
  payload: error,
})

/*
================================================ 
Reset car model
================================================
*/
export const resetCarsModel = () => ({
  type: RESET_CARS_MODEL,
})
