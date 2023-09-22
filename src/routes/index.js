import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

//Booking
import Booking from "../pages/Booking/index"
import BookingDetails from "../pages/Booking/Details/BookingDetails"
import QrScanner from "pages/Booking/QrScanner"

//Order Service
import OrderService from "../pages/OrderServices/index"
import OrderServiceDetail from "pages/OrderServices/Details/OrderServiceDetail"

//Transaction
import Transaction from "../pages/Transaction/index"

//User
import UserLists from "../pages/User/index"

//Expert
import ExpertLists from "../pages/Expert/index"

//Car brand
import CarBrand from "../pages/CarBrand/index"

//Car model
import CarModels from "../pages/Model/index"
import CarModelByBrand from "../pages/Model/CarModelByBrand"

//Car problem
import CarProblems from "../pages/Problem/index"
import CarProblemByModel from "../pages/Problem/CarProblemByModel"

//Car item
import CarItems from "../pages/Item/index"
import CarItemByProblem from "../pages/Item/CarItemByProblem"

//Symptom
import SymptomLists from "../pages/Symptom/index"

import QrCheckOut from "pages/OrderServices/QrCheckOut"

//Error Page
import Pages404 from "pages/Authentication/pages-404"
import Pages500 from "pages/Authentication/pages-500"
import Pages403 from "pages/Authentication/pages-403"

//Manager
import CreateNew from "pages/Action/Create"

//Script data
import ConfigScriptGarage from "pages/Scripts"

//History
import OrderServiceHistory from "pages/History/OrderServices"
import BookingHistory from "pages/History/Booking"
import Search from "pages/Search"

//CRUD
import AddNewCarModel from "pages/Model/AddNewCarModel"
import AddNewCarProblem from "pages/Problem/AddNewProblem"
import AddNewCarItem from "pages/Item/AddNewItems"
import AddNewCarBrand from "pages/CarBrand/AddNewCarBrand"
import EditCarBrand from "pages/CarBrand/EditCarBrand"
import AddNewSymptom from "pages/Symptom/AddNewSymptom"
import EditSymptom from "pages/Symptom/EditSymptom"
import EditCarModel from "pages/Model/EditCarModel"
import EditCarProblem from "pages/Problem/EditCarProblem"
import EditItem from "pages/Item/EditItem"

//Import
import ImportExcelCreate from "pages/Excel/ImportExcelCreate"
import SystemConfig from "pages/System"
import AddNewGuest from "pages/User/AddNewGuest"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  //search
  { path: "/search/:string", component: Search },

  //booking
  { path: "/bookings", component: Booking },
  { path: "/bookings/:id", component: BookingDetails },

  //order service
  { path: "/order-services", component: OrderService },
  { path: "/order-services/:id", component: OrderServiceDetail },

  //transaction
  { path: "/transactions", component: Transaction },

  //symptom
  { path: "/symptoms", component: SymptomLists },

  //group-service
  //{ path: "/service-list", component: GroupService },

  //user
  { path: "/users", component: UserLists },

  //expert
  { path: "/experts", component: ExpertLists },

  //Vehicle
  { path: "/brands", component: CarBrand },
  { path: "/models", component: CarModels },
  { path: "/problems", component: CarProblems },
  { path: "/items", component: CarItems },

  { path: "/brands/:id/:name", component: CarModelByBrand },
  {
    path: "/brands/:bId/:bName/models/:mId/:mName",
    component: CarProblemByModel,
  },
  {
    path: "/brands/:bId/:bName/models/:mId/:mName/problems/:pId/:pName",
    component: CarItemByProblem,
  },

  // //profile
  { path: "/profile", component: UserProfile },

  //Create
  { path: "/create-new", component: CreateNew },
  { path: "/create-new-brand", component: AddNewCarBrand },
  { path: "/create-new-model", component: AddNewCarModel },
  { path: "/create-new-problem", component: AddNewCarProblem },
  { path: "/create-new-item", component: AddNewCarItem },
  { path: "/create-new-symptom", component: AddNewSymptom },
  { path: "/create-new-guest", component: AddNewGuest },
  { path: "/import-data-excel", component: ImportExcelCreate },

  //Edit
  { path: "/edit-brand/:id", component: EditCarBrand },
  { path: "/edit-model/:id", component: EditCarModel },
  { path: "/edit-problem/:id", component: EditCarProblem },
  { path: "/edit-item/:id", component: EditItem },
  { path: "/edit-symptom/:id", component: EditSymptom },

  //History
  { path: "/history/bookings", component: BookingHistory },
  { path: "/history/order-services", component: OrderServiceHistory },

  //Script
  { path: "/run-script", component: ConfigScriptGarage },

  //Config System
  { path: "/config-system", component: SystemConfig },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
  { path: "*", component: () => <Redirect to="/pages-404" /> },
]

// const recepProtectedRoutes = []

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
  { path: "/pages-404", component: Pages404 },
  { path: "/pages-403", component: Pages403 },
  { path: "/pages-500", component: Pages500 },
]

export { publicRoutes, authProtectedRoutes }
