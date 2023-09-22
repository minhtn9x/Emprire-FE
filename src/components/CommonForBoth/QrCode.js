import QrCheckInModal from "pages/Booking/QrCheckIn/QrCheckInModal"
import React, { useState } from "react"
import { withRouter } from "react-router-dom"

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap"

import { useSelector, useDispatch } from "react-redux"
import { changeAutoAssign } from "store/actions"
import QrCheckOutModal from "pages/OrderServices/QrCheckOut/QrCheckOutModal"
import Loader from "components/Loader/Loader"

const QrCode = props => {
  const dispatch = useDispatch()

  const [menu, setMenu] = useState(false)

  const [isCheckIn, setIsCheckIn] = useState(false)

  const [isCheckOut, setIsCheckOut] = useState(false)

  const toggleCheckIn = () => {
    setIsCheckIn(!isCheckIn)
  }

  const toggleCheckOut = () => {
    setIsCheckOut(!isCheckOut)
  }

  const { isAssign, isLoading, isLoad } = useSelector(state => ({
    isAssign: state.Layout.isAssign,
    isLoading: state.bookings.isLoad,
    isLoad: state.orderServices.isLoad,
  }))

  const handleAutoAssign = () => {
    dispatch(changeAutoAssign(!isAssign))
    setMenu(true)
  }

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {isLoad && <Loader />}
      <QrCheckInModal
        isOpen={isCheckIn}
        toggle={toggleCheckIn}
        history={props.history}
      />
      <QrCheckOutModal
        isOpen={isCheckOut}
        toggle={toggleCheckOut}
        history={props.history}
      />

      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          id="qr-code"
          tag="button"
        >
          <i className="mdi mdi-qrcode-scan bx-burst-hover"></i>
          <UncontrolledTooltip placement="auto" target="qr-code">
            Quét mã Qr Code
          </UncontrolledTooltip>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="button">
            Phân công tự động
            <div className="form-check form-switch">
              <input
                type="checkbox"
                className="form-check-input checkbox"
                checked={isAssign}
                onChange={handleAutoAssign}
              />

              <label className="form-check-label" htmlFor="checkbox_1">
                Tắt/Bật
              </label>
            </div>
          </DropdownItem>

          <DropdownItem tag="button" onClick={toggleCheckIn}>
            <i className="mdi mdi-login font-size-16 align-middle me-1 text-success" />
            Check-in
          </DropdownItem>
          <div className="dropdown-divider" />
          <DropdownItem className="dropdown-item" onClick={toggleCheckOut}>
            <i className="mdi mdi-logout font-size-16 align-middle me-1 text-danger" />
            Check-out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withRouter(QrCode)
