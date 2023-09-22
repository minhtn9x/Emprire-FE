import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_EXPERTS,
  PUT_STATUS_EXPERTS,
  ADD_NEW_GUEST,
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  getExpertsFail,
  getExpertsSuccess,
  putChangeStatusExpertSuccess,
  putChangeStatusExpertFail,
  addNewGuestFail,
  addNewGuestSuccess,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getUsers,
  getUserProfile,
  addNewUser,
  updateUser,
  deleteUser,
  getExperts,
  onChangeStatusExpert,
  addNewGuest,
} from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* fetchExperts() {
  try {
    const response = yield call(getExperts)
    yield put(getExpertsSuccess(response))
  } catch (error) {
    yield put(getExpertsFail(error))
  }
}

function* onChangeStatusExperts({ payload: expert }) {
  try {
    const response = yield call(onChangeStatusExpert, expert.id)
    yield put(putChangeStatusExpertSuccess(expert))

    expert.isAvailable &&
      toast.success("Đã bật trạng thái hoạt động của " + expert.fullname)
    !expert.isAvailable &&
      toast.success("Đã tắt trạng thái hoạt động của " + expert.fullname)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(putChangeStatusExpertFail(error))
  }
}

function* onAddNewGuest({ payload: guest, history }) {
  try {
    const response = yield call(addNewGuest, guest)
    yield put(addNewGuestSuccess(response))
    history.push("/users")
    toast.success("Tạo mới thành công khách hàng " + guest.userName)
  } catch (error) {
    toast.error("Đã có lỗi xảy ra")
    yield put(addNewGuestFail(error))
  }
}

// function* fetchUserProfile() {
//   try {
//     const response = yield call(getUserProfile)
//     yield put(getUserProfileSuccess(response))
//   } catch (error) {
//     yield put(getUserProfileFail(error))
//   }
// }

// function* onUpdateUser({ payload: user }) {
//   try {
//     const response = yield call(updateUser, user)
//     yield put(updateUserSuccess(response))
//   } catch (error) {
//     yield put(updateUserFail(error))
//   }
// }

// function* onDeleteUser({ payload: user }) {
//   try {
//     const response = yield call(deleteUser, user)
//     yield put(deleteUserSuccess(response))
//   } catch (error) {
//     yield put(deleteUserFail(error))
//   }
// }

function* usersSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_EXPERTS, fetchExperts)
  yield takeEvery(PUT_STATUS_EXPERTS, onChangeStatusExperts)

  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_GUEST, onAddNewGuest)
  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
