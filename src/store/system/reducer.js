import {
  GET_BOOKING_SLOT,
  GET_BOOKING_SLOT_FAIL,
  GET_BOOKING_SLOT_SUCCESS,
  GET_CAR_IN_GARAGE,
  GET_CAR_IN_GARAGE_FAIL,
  GET_CAR_IN_GARAGE_SUCCESS,
  GET_SYSTEM_CONFIGURATIONS,
  GET_SYSTEM_CONFIGURATIONS_FAIL,
  GET_SYSTEM_CONFIGURATIONS_SUCCESS,
  PUT_CONFIG_SYSTEM,
  PUT_CONFIG_SYSTEM_FAIL,
  PUT_CONFIG_SYSTEM_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  configSystems: [],
  bookingSlot: {},
  carInGarage: {},
  isLoad: false,
}

const systems = (state = INIT_STATE, action) => {
  switch (action.type) {
    /* System Configuration */
    case GET_SYSTEM_CONFIGURATIONS:
      return {
        ...state,
        isLoad: true,
      }
    case GET_SYSTEM_CONFIGURATIONS_SUCCESS:
      return {
        ...state,
        isLoad: false,
        configSystems: action.payload,
      }

    case GET_SYSTEM_CONFIGURATIONS_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }
    /* BOOKING SLOT */
    case GET_BOOKING_SLOT:
      return {
        ...state,
        isLoad: true,
      }
    case GET_BOOKING_SLOT_SUCCESS:
      return {
        ...state,
        isLoad: false,
        bookingSlot: action.payload,
      }

    case GET_BOOKING_SLOT_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    /* CAR IN GARAGE  */
    case GET_CAR_IN_GARAGE:
      return {
        ...state,
        isLoad: true,
      }
    case GET_CAR_IN_GARAGE_SUCCESS:
      return {
        ...state,
        isLoad: false,
        carInGarage: action.payload,
      }

    case GET_CAR_IN_GARAGE_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    /* CONFIG SYSTEM  */
    case PUT_CONFIG_SYSTEM:
      return {
        ...state,
        isLoad: true,
      }
    case PUT_CONFIG_SYSTEM_SUCCESS:
      const { key, value } = action.payload
      const updatedConfigSystems = state.configSystems.map(config =>
        config.key === key ? { ...config, value } : config
      )
      return {
        ...state,
        isLoad: false,
        configSystems: updatedConfigSystems,
      }

    case PUT_CONFIG_SYSTEM_FAIL:
      return {
        ...state,
        isLoad: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default systems
