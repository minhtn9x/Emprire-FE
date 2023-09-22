import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"

//booking
import bookings from "./bookings/reducer"

//order services
import orderServices from "./order-services/reducer"

//group services
import groupServices from "./group-services/reducer"

//category services
import categoryServicess from "./categories/reducer"

//item
import items from "./items/reducer"

//symptom
import symptomsLists from "./symptoms/reducer"

//brand
import brands from "./brand/reducer"

//model
import models from "./model/reducer"

//problem
import problems from "./problem/reducer"

//fcm token
import fcmToken from "./fcm-token/reducer"

//import
import imports from "./imports/reducer"

//system
import systems from "./system/reducer"

//script
import scripts from "./script/reducer"

/*=========================================================================*/

//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//projects
import projects from "./projects/reducer"

//tasks
import tasks from "./tasks/reducer"

//users
import userLists from "./users/reducer"

//mails
import mails from "./mails/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  tasks,
  userLists,
  Dashboard,
  DashboardSaas,
  bookings,
  symptomsLists,
  orderServices,
  groupServices,
  categoryServicess,
  items,
  brands,
  models,
  problems,
  fcmToken,
  scripts,
  systems,
  imports,
})

export default rootReducer
