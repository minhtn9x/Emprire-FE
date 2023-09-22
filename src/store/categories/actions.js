import {
  GET_CATEGORY_SERVICE,
  GET_CATEGORY_SERVICE_FAIL,
  GET_CATEGORY_SERVICE_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET CATEGORY SERVICE  
================================================
*/
export const getCategoryService = () => ({
  type: GET_CATEGORY_SERVICE,
})

export const getCategoryServiceSuccess = categoryService => ({
  type: GET_CATEGORY_SERVICE_SUCCESS,
  payload: categoryService,
})

export const getCategoryServiceFail = error => ({
  type: GET_CATEGORY_SERVICE_FAIL,
  payload: error,
})
