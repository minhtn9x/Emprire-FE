//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login"
//export const POST_FAKE_LOGIN = "/authentications/email-method/login"
//export const POST_FAKE_JWT_LOGIN = "/post-jwt-login"
export const POST_FAKE_JWT_LOGIN = "/authentications/email-method/login"

export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd"
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd"
export const SOCIAL_LOGIN = "/social-login"

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile"
export const POST_EDIT_PROFILE = "/post-fake-profile"

/*
================================================ 
SEARCH
================================================
*/

export const SEARCH_ALL = "/search"

/*
================================================ 
BOOKING
================================================
*/
export const GET_BOOKING_LIST = "/bookings"
export const GET_BOOKING_LIST_BY_DATE = "/bookings/bookings-by-date"
export const GET_BOOKING_DETAIL = "/bookings"
export const CHECKIN_BOOKING = "/bookings/checkin"
export const CHECKIN_QRCODE = "/booking-qrcode/check-in"

/*
================================================ 
ORDER SERVICE
================================================
*/
export const GET_ORDER_SERVICE_LIST = "/order-services"
export const GET_ORDER_SERVICE_LIST_BY_STATUS =
  "/order-services/order-services-status"
export const GET_ORDER_SERVICE_DETAIL = "/order-services"
export const PUT_ORDER_SERVICE = "/order-services"

//Assign Expert
export const PUT_ASSIGN_EXPERT = "/order-services"

//Auto Assign Expert
export const PUT_AUTO_ASSIGN_EXPERT = "/order-services"

//Get Expert Intended Time
export const GET_EXPERTS_INTENDED_TIME = "/workloads"

//Get Expert Intended Time By Service
export const GET_EXPERTS_INTENDED_TIME_BY_SERVICE =
  "/workloads/by-order-service"

//Status Log
export const GET_STATUS_LOG = "/order-services"

//Confirm Service
export const PUT_CONFIRM_SERVICES = "/order-services"

//Confirm & Paid
export const PUT_CONFIRM_PAID_SERVICES = "/order-services"

//Priority
export const PUT_PRIORITY_SERVICES = "/workloads/priority"

//CheckOut
//export const CHECKOUT_SERVICES = "/order-services"
export const CHECKOUT_SERVICES = "/cars"

//Count length
export const COUNT_SERVICES = "/order-services/count"

/*
================================================ 
GROUP SERVICE
================================================
*/
export const GET_GROUP_SERVICE = "/group-services"

/*
================================================ 
CATEGORY SERVICE
================================================
*/
export const GET_CATEGORY_SERVICE = "/categories"

/*
================================================ 
USERS
================================================
*/
export const GET_USERS = "/users"
export const GET_USER_PROFILE = "/user"
export const ADD_NEW_USER = "/add/user"
export const UPDATE_USER = "/update/user"
export const DELETE_USER = "/delete/user"

//Guest
export const ADD_NEW_GUEST = "/order-services"

//Experts
export const GET_EXPERTS = "/users/experts"
export const PUT_STATUS_EXPERTS = "/users/experts"

/*
================================================ 
CAR BRAND
================================================
*/

export const GET_CAR_BRAND = "/brands"
export const GET_CAR_BRAND_DETAIL = "/brands"
export const ADD_NEW_CAR_BRAND = "/brands"
export const UPDATE_CAR_BRAND = "/brands"
export const DELETE_CAR_BRAND = "/brands"

/*
================================================ 
CAR MODEL
================================================
*/

export const GET_CAR_MODEL = "/models"
export const GET_CAR_MODEL_BY_BRAND = "/models"
export const GET_CAR_MODEL_DETAIL = "/models"
export const ADD_NEW_CAR_MODEL = "/models"
export const UPDATE_CAR_MODEL = "/models"
export const DELETE_CAR_MODEL = "/models"

/*
================================================ 
CAR PROBLEM
================================================
*/

export const GET_CAR_PROBLEM = "/problems"
export const GET_CAR_PROBLEM_BY_MODEL = "/problems"
export const GET_CAR_PROBLEM_DETAIL = "/problems"
export const ADD_NEW_CAR_PROBLEM = "/problems"
export const UPDATE_CAR_PROBLEM = "/problems"
export const DELETE_CAR_PROBLEM = "/problems"

/*
================================================ 
ITEM 
================================================
*/
export const GET_CAR_ITEM = "/items"
export const GET_CAR_ITEM_BY_PROBLEM = "/items"
export const GET_CAR_ITEM_DETAIL = "/items"
export const ADD_NEW_CAR_ITEM = "/items"
export const UPDATE_CAR_ITEM = "/items"
export const DELETE_CAR_ITEM = "/items"

/*
================================================ 
SYMPTOM
================================================
*/

export const GET_SYMPTOMS_LIST = "/symptoms"
export const GET_SYMPTOMS_DETAIL = "/symptoms"
export const ADD_NEW_SYMPTOMS = "/symptoms"
export const UPDATE_SYMPTOMS = "/symptoms"
export const DELETE_SYMPTOMS = "/symptoms"

/*
================================================ 
FCM TOKEN
================================================
*/
export const POST_FCM_TOKEN = "/notifications/fcmtoken/add"

/*
================================================ 
IMPORT EXCEL
================================================
*/
export const IMPORT_DATA_EXCEL = "/data/import-excel"

/*
================================================ 
SYSTEM
================================================
*/

export const GET_SYSTEM_CONFIGURATIONS = "/system-configurations"

export const GET_BOOKING_SLOT = "/system-configurations/booking-slot"

export const GET_CAR_IN_GARAGE = "/system-configurations/car-count"

export const PUT_SYSTEM_CONFIGURATIONS = "/system-configurations"

/*
================================================ 
RUN SCRIPT
================================================
*/

export const RUN_SCRIPT_CUSTOMER = "/script/customers"

export const RUN_REMOVE_SCRIPT_CUSTOMER = "/script/customers"

export const RUN_SCRIPT_BOOKING = "/script/bookings"

export const RUN_REMOVE_SCRIPT_BOOKING = "/script/bookings"

export const RUN_SCRIPT_CHECKIN_BOOKING = "/script/check-in-and-cancel"

export const RUN_SCRIPT_DIAGNOSE_ORDER = "/script/diagnose"

export const RUN_SCRIPT_CONFIRM_PAID_SCRIPT_ORDER =
  "/script/confirm-and-pay-new"

export const RUN_SCRIPT_DONE_SCRIPT_ORDER = "/script/done-repair-new"

export const RUN_SCRIPT_CHECKOUT_SCRIPT_ORDER = "/script/checkout-new"

/*
==========================================================================
========================================================================== 
*/
//PRODUCTS
export const GET_PRODUCTS = "/products"
export const GET_PRODUCTS_DETAIL = "/product"

//Mails
export const GET_INBOX_MAILS = "/inboxmails"
export const ADD_NEW_INBOX_MAIL = "/add/inboxmail"
export const DELETE_INBOX_MAIL = "/delete/inboxmail"

//starred mail
export const GET_STARRED_MAILS = "/starredmails"

//important mails
export const GET_IMPORTANT_MAILS = "/importantmails"

//Draft mail
export const GET_DRAFT_MAILS = "/draftmails"

//Send mail
export const GET_SENT_MAILS = "/sentmails"

//Trash mail
export const GET_TRASH_MAILS = "/trashmails"

//CALENDER
export const GET_EVENTS = "/events"
export const ADD_NEW_EVENT = "/add/event"
export const UPDATE_EVENT = "/update/event"
export const DELETE_EVENT = "/delete/event"
export const GET_CATEGORIES = "/categories"

//CHATS
export const GET_CHATS = "/chats"
export const GET_GROUPS = "/groups"
export const GET_CONTACTS = "/contacts"
export const GET_MESSAGES = "/messages"
export const ADD_MESSAGE = "/add/messages"

//ORDERS
export const GET_ORDERS = "/orders"
export const ADD_NEW_ORDER = "/add/order"
export const UPDATE_ORDER = "/update/order"
export const DELETE_ORDER = "/delete/order"

//CART DATA
export const GET_CART_DATA = "/cart"

//CUSTOMERS
export const GET_CUSTOMERS = "/customers"
export const ADD_NEW_CUSTOMER = "/add/customer"
export const UPDATE_CUSTOMER = "/update/customer"
export const DELETE_CUSTOMER = "/delete/customer"

//SHOPS
export const GET_SHOPS = "/shops"

//CRYPTO
export const GET_WALLET = "/wallet"
export const GET_CRYPTO_ORDERS = "/crypto/orders"

//INVOICES
export const GET_INVOICES = "/invoices"
export const GET_INVOICE_DETAIL = "/invoice"

//PROJECTS
export const GET_PROJECTS = "/projects"
export const GET_PROJECT_DETAIL = "/project"
export const ADD_NEW_PROJECT = "/add/project"
export const UPDATE_PROJECT = "/update/project"
export const DELETE_PROJECT = "/delete/project"

//TASKS
export const GET_TASKS = "/tasks"

//dashboard charts data
export const GET_WEEKLY_DATA = "/weekly-data"
export const GET_YEARLY_DATA = "/yearly-data"
export const GET_MONTHLY_DATA = "/monthly-data"

export const TOP_SELLING_DATA = "/top-selling-data"

export const GET_EARNING_DATA = "/earning-charts-data"

export const GET_PRODUCT_COMMENTS = "/comments-product"

export const ON_LIKNE_COMMENT = "/comments-product-action"

export const ON_ADD_REPLY = "/comments-product-add-reply"

export const ON_ADD_COMMENT = "/comments-product-add-comment"
