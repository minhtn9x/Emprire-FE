import { call, put, takeEvery, takeLatest } from "redux-saga/effects"

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes"
import { apiError, loginSuccess, logoutUserSuccess } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

// function* loginUser({ payload: { user, history } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const response = yield call(
//         fireBaseBackend.loginUser,
//         user.email,
//         user.password
//       )
//       yield put(loginSuccess(response))
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//       const response = yield call(postJwtLogin, {
//         email: user.email,
//         password: user.password,
//       })
//       localStorage.setItem("authUser", JSON.stringify(response))
//       yield put(loginSuccess(response))
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//       const response = yield call(postFakeLogin, {
//         email: user.email,
//         password: user.password,
//       })
//       localStorage.setItem("authUser", JSON.stringify(response))
//       yield put(loginSuccess(response))
//     }
//     history.push("/dashboard")
//   } catch (error) {
//     yield put(apiError(error))
//   }
// }

function* loginUser({ payload: { user, history } }) {
  try {
    let response
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      response = yield call(
        fireBaseBackend.loginUser,
        user.email,
        user.password
      )
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      })
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = yield call(postFakeLogin, {
        email: user.email,
        password: user.password,
      })
    }
    localStorage.setItem("authUser", JSON.stringify(response))

    yield put(loginSuccess(response))
    if (response.role === "MA") {
      history.push("/")
    } else if (response.role === "RE") {
      history.push("/")
    } else if (response.role === "AD") {
      history.push("/run-script")
    } else {
      localStorage.removeItem("authUser")
      history.push("/pages-403")
    }
  } catch (error) {
    const message = error.response.data.error.message
    switch (message) {
      case "EMAIL_NOT_FOUND":
        yield put(apiError("Email không tồn tại"))
        break
      case "INVALID_PASSWORD":
        yield put(apiError("Mật khẩu không chính xác"))
        break
      default:
        yield put(apiError("Đã có lỗi xảy ra"))
        break
    }
    console.clear()
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")

    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout)
      yield put(logoutUserSuccess(response))
    }
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend()
      const response = yield call(fireBaseBackend.socialLoginUser, data, type)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    } else {
      const response = yield call(postSocialLogin, data)
      localStorage.setItem("authUser", JSON.stringify(response))
      yield put(loginSuccess(response))
    }
    history.push("/dashboard")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeLatest(SOCIAL_LOGIN, socialLogin)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
