import axios from "axios"
import {
  del,
  del2,
  get,
  post,
  post2,
  postFile,
  postWithFile,
  put,
} from "./api_helper"
import * as url from "./url_helper"

/*
================================================
LOGIN & AUTHENTICATION
================================================
*/

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}

// Register Method
const postFakeRegister = data => {
  return axios
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      let message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data)

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data)

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data)

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data)

// Register Method
const postJwtRegister = (url, data) => {
  return axios
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data
      throw response.data
    })
    .catch(err => {
      var message
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found"
            break
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team"
            break
          case 401:
            message = "Invalid credentials"
            break
          default:
            message = err[1]
            break
        }
      }
      throw message
    })
}

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

/*
================================================
SEARCH
================================================
*/

export const onSearchAll = string =>
  get(`${url.SEARCH_ALL}?searchString=${string}`)

/*
================================================
BOOKING
================================================
*/

//Booking List
export const getBookingsLists = () => get(url.GET_BOOKING_LIST)

//Booking List By Date
export const getBookingListsByDate = date =>
  get(`${url.GET_BOOKING_LIST_BY_DATE}?date=${date}`)

//Booking Detail
export const getBookingsDetails = id => get(`${url.GET_BOOKING_DETAIL}/${id}`)

//Check-in Booking
export const checkinBooking = (id, isAssign) =>
  put(`${url.CHECKIN_BOOKING}/${id}?autoAssign=${isAssign}`)

//Check-in QrCode
export const checkinQRCode = data => post(url.CHECKIN_QRCODE, data)

//Add New Booking
//Update  Booking
//Delete Booking

/*
================================================
ORDER SERVICE
================================================
*/

/* GET ORDER SERVICE LIST - NOT USING */
export const getOrderServicesLists = () => get(url.GET_ORDER_SERVICE_LIST)

/* GET ORDER SERVICE BY STATUS*/
export const getOrderServicesListByStatus = status =>
  get(`${url.GET_ORDER_SERVICE_LIST_BY_STATUS}?status=${status}`)

/* GET ORDER SERVICE DETAIL */
export const getOrderServicesDetails = id =>
  get(`${url.GET_ORDER_SERVICE_DETAIL}/${id}`)

/* PUT ASSIGN EXPERT */
export const putAssignExperts = (orderServiceId, exId) =>
  put(`${url.PUT_ASSIGN_EXPERT}/${orderServiceId}/assign-expert/${exId}`)

/* PUT AUTO ASSIGN EXPERT */
export const putAutoAssignExperts = (orderServiceId, exId) =>
  put(
    `${url.PUT_ASSIGN_EXPERT}/${orderServiceId}/auto-assign-expert?oldExpertId=${exId}`
  )

/* GET EXPERT INTENDED TIME*/
export const getExpertIntendedTime = id =>
  get(`${url.GET_EXPERTS_INTENDED_TIME}?expertId=${id}`)

/* GET EXPERT INTENDED TIME BY SERVICE*/
export const getExpertIntendedTimeByService = (id, orId) =>
  get(
    `${url.GET_EXPERTS_INTENDED_TIME_BY_SERVICE}?expertId=${id}&orderServiceId=${orId}`
  )

/* GET STATUS LOG */
export const getStatusLog = id =>
  get(`${url.GET_STATUS_LOG}/${id}/order-service-status-logs`)

/* PRIORITY */
export const priorityService = (exId, orId) =>
  put(`${url.PUT_PRIORITY_SERVICES}?expertId=${exId}&orderServiceId=${orId}`)

/* CHECKOUT */
export const checkOutService = (id, data) =>
  post(`${url.CHECKOUT_SERVICES}/${id}/car-status-logs`, data)

/* COUNT */

export const countService = () => get(url.COUNT_SERVICES)
/*
================================================
GROUP SERVICE
================================================
*/

export const getGroupService = () => get(url.GET_GROUP_SERVICE)

/*
================================================
CATEGORY SERVICE
================================================
*/

export const getCategoryService = () => get(url.GET_CATEGORY_SERVICE)

/*
================================================
USER
================================================
*/

// get contacts
export const getUsers = () => get(url.GET_USERS)

// add user
export const addNewUser = user => post(url.ADD_NEW_USER, user)

// update user
export const updateUser = user => put(url.UPDATE_USER, user)

// delete user
export const deleteUser = user => del(url.DELETE_USER, { headers: { user } })

//get experts
export const getExperts = () => get(url.GET_EXPERTS)

//put experts
export const onChangeStatusExpert = id =>
  put(`${url.PUT_STATUS_EXPERTS}/${id}/status`)

//add guest
export const addNewGuest = guest => post(url.ADD_NEW_GUEST, guest)

/*
================================================
SYMPTOMS
================================================
*/

// get car symptoms
export const getSymptoms = () => get(url.GET_SYMPTOMS_LIST)

// get detail car symptoms

export const getSymptomsDetails = id => get(`${url.GET_SYMPTOMS_DETAIL}/${id}`)

// add car symptoms
export const addNewSymptoms = symptom => post(url.ADD_NEW_SYMPTOMS, symptom)

// update car symptoms
export const updateSymptoms = (id, symptom) =>
  put(`${url.UPDATE_SYMPTOMS}/${id}`, symptom)

// delete car symptoms
export const deleteSymptoms = id =>
  del(`${url.DELETE_SYMPTOMS}/${id}`, { headers: { id } })

/*
================================================
CAR BRAND
================================================
*/

// get car brand
export const getCarsBrand = () => get(url.GET_CAR_BRAND)

// get detail car brand

export const getCarsBrandDetails = id =>
  get(`${url.GET_CAR_BRAND_DETAIL}/${id}`)

// add car brand
export const addNewCarsBrand = carBrand => post(url.ADD_NEW_CAR_BRAND, carBrand)

// update car brand
export const updateCarsBrand = (id, carBrand) =>
  put(`${url.UPDATE_CAR_BRAND}/${id}`, carBrand)

// delete car brand
export const deleteCarsBrand = id =>
  del(`${url.DELETE_CAR_BRAND}/${id}`, { headers: { id } })

/*
================================================
CAR MODEL
================================================
*/

// get car model
export const getCarsModel = () => get(url.GET_CAR_MODEL)

// get car model by brand
export const getCarsModelByBrand = id =>
  get(`${url.GET_CAR_MODEL_BY_BRAND}/model-by-brand/${id}`)

// get detail car model
export const getCarsModelDetails = id =>
  get(`${url.GET_CAR_MODEL_DETAIL}/${id}`)

// add car model
export const addNewCarsModel = carsModel =>
  post(url.ADD_NEW_CAR_MODEL, carsModel)

// update car model
export const updateCarsModel = (id, carsModel) =>
  put(`${url.UPDATE_CAR_MODEL}/${id}`, carsModel)

// delete car model
export const deleteCarsModel = id =>
  del(`${url.DELETE_CAR_MODEL}/${id}`, { headers: { id } })

/*
================================================
CAR PROBLEM
================================================
*/

// get car problem
export const getCarsProblem = () => get(url.GET_CAR_PROBLEM)

// get car problem by model
export const getCarsProblemByModel = id =>
  get(`${url.GET_CAR_PROBLEM_BY_MODEL}/problems-by-model/${id}`)

// get detail car problem
export const getCarsProblemDetails = id =>
  get(`${url.GET_CAR_PROBLEM_DETAIL}/${id}`)

// add car problem
export const addNewCarsProblem = carsProblem =>
  post(url.ADD_NEW_CAR_PROBLEM, carsProblem)

// update car problem
export const updateCarsProblem = (id, carsProblem) =>
  put(`${url.UPDATE_CAR_PROBLEM}/${id}`, carsProblem)

// delete car problem
export const deleteCarsProblem = id =>
  del(`${url.DELETE_CAR_PROBLEM}/${id}`, { headers: { id } })

/*
================================================
CAR ITEM
================================================
*/

// get car item
export const getCarsItem = () => get(url.GET_CAR_ITEM)

// get car item
export const getCarsItemByProblem = id =>
  get(`${url.GET_CAR_ITEM_BY_PROBLEM}/items-by-problem/${id}`)

// get detail car item
export const getCarsItemDetails = id => get(`${url.GET_CAR_ITEM_DETAIL}/${id}`)

// add car item
export const addNewCarsItem = carsItem => post(url.ADD_NEW_CAR_ITEM, carsItem)

// update car item
export const updateCarsItem = (id, carsItem) =>
  put(`${url.UPDATE_CAR_ITEM}/${id}`, carsItem)

// delete car item
export const deleteCarsItem = id =>
  del(`${url.DELETE_CAR_ITEM}/${id}`, { headers: { id } })

/*
================================================
CAR ITEM
================================================
*/

export const importDataExcel = data => postFile(url.IMPORT_DATA_EXCEL, data)

/*
================================================
FCM TOKEN
================================================
*/

export const addNewFcmToken = (uuid, fcmToken) =>
  post(`${url.POST_FCM_TOKEN}?userId=${uuid}&fcmToken=${fcmToken}`)

/*
================================================
SYSTEM
================================================
*/

export const getConfigSystem = () => get(url.GET_SYSTEM_CONFIGURATIONS)

export const getBookingSlot = () => get(url.GET_BOOKING_SLOT)

export const getCarInGarage = () => get(url.GET_CAR_IN_GARAGE)

export const onConfigSystem = config =>
  put(url.PUT_SYSTEM_CONFIGURATIONS, config)

/*
================================================
RUN SCRIPT
================================================
*/

//Customer
export const runScriptCustomers = number =>
  post(`${url.RUN_SCRIPT_CUSTOMER}?numberOfCustomer=${number}`)

//Remove Customer
export const runRemoveScriptCustomers = data =>
  del2(url.RUN_REMOVE_SCRIPT_CUSTOMER, data)

//Booking
export const runScriptBookings = (number1, number2, isNewCustomer) =>
  post(
    `${url.RUN_SCRIPT_BOOKING}?numberOfBooking=${number1}&numberOfBookingToday=${number2}&onlyNewCustomer=${isNewCustomer}`
  )

//Remove booking
export const runRemoveScriptBookings = numberId =>
  del(url.RUN_REMOVE_SCRIPT_BOOKING, { headers: { numberId } })

//Check-in
export const runScriptCheckIn = (number1, number2) =>
  post(
    `${url.RUN_SCRIPT_CHECKIN_BOOKING}?numberOfCheckin=${number1}&numberOfCancel=${number2}`
  )

//Diagnose
export const runScriptDiagnose = (number1, number2) =>
  post(
    `${url.RUN_SCRIPT_DIAGNOSE_ORDER}?numberOfDiagnose=${number1}&numberOfCheckout=${number2}`
  )

//Confirm & Paid
export const runScriptConfirmPaid = (number1, number2, number3) =>
  post(
    `${url.RUN_SCRIPT_CONFIRM_PAID_SCRIPT_ORDER}?numberOfConfirmAll=${number1}&numberOfConfirmApart=${number2}&numberOfNoConfirmAtAll=${number3}`
  )

//Done
export const runScriptDone = (number1, number2, number3, number4) =>
  post(
    `${url.RUN_SCRIPT_DONE_SCRIPT_ORDER}?numberOfDoneAllNoMaintenance=${number1}&numberOfDoneAllHaveMaintenance=${number2}&numberOfDoneApartHaveMaintenance=${number3}&numberOfNothingDoneHaveMaintenance=${number4}`
  )

//Check-out
export const runScriptCheckOut = data =>
  post2(url.RUN_SCRIPT_CHECKOUT_SCRIPT_ORDER, data)

/*
================================================
===================================================================================
O R T H E R
===================================================================================
================================================
*/

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data)

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN)

// get Products
export const getProducts = () => get(url.GET_PRODUCTS)

// get Product detail
export const getProductDetail = id =>
  get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } })

// get Events
export const getEvents = () => get(url.GET_EVENTS)

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event)

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event)

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } })

// get Categories
export const getCategories = () => get(url.GET_CATEGORIES)

// get chats
export const getChats = () => get(url.GET_CHATS)

// get groups
export const getGroups = () => get(url.GET_GROUPS)

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS)

// get messages
export const getMessages = (roomId = "") =>
  get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } })

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message)

// get orders
export const getOrders = () => get(url.GET_ORDERS)

// add order
export const addNewOrder = order => post(url.ADD_NEW_ORDER, order)

// update order
export const updateOrder = order => put(url.UPDATE_ORDER, order)

// delete order
export const deleteOrder = order =>
  del(url.DELETE_ORDER, { headers: { order } })

// get cart data
export const getCartData = () => get(url.GET_CART_DATA)

// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS)

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer)

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer)

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } })

// get shops
export const getShops = () => get(url.GET_SHOPS)

// get wallet
export const getWallet = () => get(url.GET_WALLET)

// get crypto order
export const getCryptoOrder = () => get(url.GET_CRYPTO_ORDERS)

// get invoices
export const getInvoices = () => get(url.GET_INVOICES)

// get invoice details
export const getInvoiceDetail = id =>
  get(`${url.GET_INVOICE_DETAIL}/${id}`, { params: { id } })

// get project
export const getProjects = () => get(url.GET_PROJECTS)

// get project details
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })

// get tasks
export const getTasks = () => get(url.GET_TASKS)

/** PROJECT */
// add user
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)

// update user
export const updateProject = project => put(url.UPDATE_PROJECT, project)

// delete user
export const deleteProject = project =>
  del(url.DELETE_PROJECT, { headers: { project } })

export const getUserProfile = () => get(url.GET_USER_PROFILE)

// get inboxmail
export const getInboxMails = () => get(url.GET_INBOX_MAILS)

// add inboxmail
export const addNewInboxMail = inboxmail =>
  post(url.ADD_NEW_INBOX_MAIL, inboxmail)

// delete inboxmail
export const deleteInboxMail = inboxmail =>
  del(url.DELETE_INBOX_MAIL, { headers: { inboxmail } })

// get starredmail
export const getStarredMails = () => get(url.GET_STARRED_MAILS)

// get importantmail
export const getImportantMails = () => get(url.GET_IMPORTANT_MAILS)

// get sent mail
export const getSentMails = () => get(url.GET_SENT_MAILS)

// get trash mail
export const getTrashMails = () => get(url.GET_TRASH_MAILS)

// get starredmail
export const getDraftMails = () => get(url.GET_DRAFT_MAILS)

// get dashboard charts data
export const getWeeklyData = () => get(url.GET_WEEKLY_DATA)
export const getYearlyData = () => get(url.GET_YEARLY_DATA)
export const getMonthlyData = () => get(url.GET_MONTHLY_DATA)

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } })

export const getEarningChartsData = month =>
  get(`${url.GET_EARNING_DATA}/${month}`, { params: { month } })

const getProductComents = () => get(url.GET_PRODUCT_COMMENTS)

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  })
}
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  })
}

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  })
}

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  })
}

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  getProductComents,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
}
