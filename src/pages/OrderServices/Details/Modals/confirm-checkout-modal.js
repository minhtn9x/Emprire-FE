import React, { useState } from "react"
import PropTypes from "prop-types"
import { Form, InputGroup, Label, Modal } from "reactstrap"
import "flatpickr/dist/themes/material_blue.css"
import Flatpickr from "react-flatpickr"
import { Vietnamese } from "flatpickr/dist/l10n/vn.js"

import { useDispatch } from "react-redux"

import { checkOutService as checkOutService } from "store/actions"

const ConfirmCheckOut = props => {
  const { isOpen, toggle, order, history } = props

  const dispatch = useDispatch()

  const [date, setDate] = useState("")
  const [reason, setReason] = useState("")

  const handleChange = e => {
    const value = e.target.value
    setReason(value)
  }

  const handleCheckOut = () => {
    const carId = order.car.id
    const id = order.id
    const car = order.car
    const licence = order.car.carLisenceNo
    if ((carId, order && id && car && licence)) {
      const data = {}
      if (date || reason) {
        data.maintenanceDate = date
        data.cancelReason = reason
      }
      dispatch(checkOutService(carId, data, id, licence, history))
    }
    toggle(false)
  }

  const handleCancel = () => {
    toggle(false)
    setDate("")
    setReason("")
  }

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h4 className="modal-title mt-0" id="myModalLabel">
            Check-out phương tiện ?
          </h4>
          <button
            type="button"
            onClick={toggle}
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {(() => {
            switch (order.status) {
              case 0:
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình phân công kỹ thuật viên
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 1:
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình chẩn đoán
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 2:
                // Code for status 2
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình xác nhận và thanh toán các dịch vụ
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 3:
                // Code for status 3
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đang
                    trong quá trình thực hiện dịch vụ
                    <br />
                    Nếu "Xác nhận" phương tiện sẽ rời khỏi garage
                  </p>
                )
              case 4:
                // Code for status 4
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> đã
                    hoàn tất dịch vụ
                    <br />
                    Vui lòng kiểm tra phương tiện trước khi khách nhận xe
                  </p>
                )
              default:
                return null // Return null or fallback JSX for other status values
            }
          })()}

          {order.status !== 4 && (
            <Form>
              <Label>Ngày bảo trì</Label>
              <InputGroup className="mb-3">
                <Flatpickr
                  className="form-control d-block"
                  placeholder="Chọn ngày bảo trì"
                  options={{
                    altInput: false,
                    dateFormat: "d-m-Y",
                    locale: Vietnamese,
                    minDate: new Date().fp_incr(1), // Set minimum date to tomorrow
                    disable: [
                      function (date) {
                        return date <= new Date()
                      },
                    ], // Disable past and today's dates
                  }}
                  onChange={selectedDates => {
                    const formattedDate = selectedDates[0].toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }
                    )

                    const reversedDate = formattedDate
                      .split("/")
                      .reverse()
                      .join("-")

                    setDate(reversedDate) // Log the reversed formatted value
                  }}
                />
              </InputGroup>
              <Label>Lý do hủy</Label>
              <InputGroup>
                <input
                  className="form-control"
                  type="textarea"
                  placeholder="Nhập lý do hủy"
                  name="reason"
                  onChange={e => handleChange(e)}
                  value={reason}
                />
              </InputGroup>
            </Form>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={handleCheckOut}
            className="btn btn-success "
          >
            Xác nhận
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary "
            data-dismiss="modal"
          >
            Hủy
          </button>
        </div>
      </Modal>
    </>
  )
}

ConfirmCheckOut.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmCheckOut
