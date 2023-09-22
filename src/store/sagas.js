import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import bookingsSaga from "./bookings/saga"
import orderServicesSaga from "./order-services/saga"
import groupServicesSaga from "./group-services/saga"
import categoryServicesSaga from "./categories/saga"
import itemsSaga from "./items/saga"
import symptomsSaga from "./symptoms/saga"
import brandsSaga from "./brand/saga"
import problemsSaga from "./problem/saga"
import modelsSaga from "./model/saga"
import fcmTokenSaga from "./fcm-token/saga"
import systemSaga from "./system/saga"
import scriptSaga from "./script/saga"
import importsSaga from "./imports/saga"

/*=========================================================================*/

import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import ecommerceSaga from "./e-commerce/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import cryptoSaga from "./crypto/saga"
import invoiceSaga from "./invoices/saga"
import projectsSaga from "./projects/saga"
import tasksSaga from "./tasks/saga"
import mailsSaga from "./mails/saga"
import usersSaga from "./users/saga"
import dashboardSaga from "./dashboard/saga"
import dashboardSaasSaga from "./dashboard-saas/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(ecommerceSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(mailsSaga),
    fork(cryptoSaga),
    fork(invoiceSaga),
    fork(projectsSaga),
    fork(tasksSaga),
    fork(usersSaga),
    fork(dashboardSaga),
    fork(dashboardSaasSaga),
    fork(bookingsSaga),
    fork(symptomsSaga),
    fork(brandsSaga),
    fork(modelsSaga),
    fork(problemsSaga),
    fork(itemsSaga),
    fork(groupServicesSaga),
    fork(orderServicesSaga),
    fork(fcmTokenSaga),
    fork(scriptSaga),
    fork(systemSaga),
    fork(categoryServicesSaga),
    fork(importsSaga),
  ])
}
