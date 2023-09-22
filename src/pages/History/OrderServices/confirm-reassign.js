import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Modal } from "reactstrap"

import { useDispatch, useSelector } from "react-redux"

import {
  putAssignExperts as assignExpert,
  getExpertIntendedTime as getExpertTime,
} from "store/actions"

const ConfirmReassign = props => {
  const { isOpen, toggle, expert, order } = props

  const dispatch = useDispatch()

  const { exDetails } = useSelector(state => ({
    exDetails: state.orderServices.exDetails,
  }))

  useEffect(() => {
    if (expert && expert.value) {
      dispatch(getExpertTime(expert.value))
    }
  }, [expert])

  const handleAssignExpert = () => {
    const exId = expert.value
    const orderId = order.id
    if ((orderId, exId)) {
      dispatch(assignExpert(orderId, exId))
    }
    toggle(false)
  }

  /*
  ==================================================
  FORMAT DATE & TIME
  ==================================================
  */

  const formattedDateTime = date => {
    const createDate = new Date(date)
    const formattedDate = createDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const formattedTime = createDate.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    const formatted = `${formattedTime} - ${formattedDate}`
    return formatted
  }

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h4 className="modal-title mt-0" id="myModalLabel">
            Chỉ định kỹ thuật viên
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
          {expert && expert.isMax === true ? (
            <>
              <h5>
                Chỉ định {expert && expert.name} cho phương tiện{" "}
                {order.car.carLisenceNo} ?
              </h5>
              <p>
                Số xe mà kỹ thuật viên {expert && expert.name} nhận đã đầy. Nếu
                "Xác nhận" chủ xe sẽ phải vào hàng chờ. Vui lòng thông báo cho
                chủ xe để xác nhận !!!
              </p>
              <h6 className="text-muted">
                *Thời gian bắt đầu dự kiến:{" "}
                {formattedDateTime(exDetails.intendedFinishTime)}
              </h6>
            </>
          ) : (
            <>
              <h5>
                Chỉ định {expert && expert.name} cho phương tiện{" "}
                {order.car.carLisenceNo} ?
              </h5>
              <h6 className="text-muted">
                *Thời gian bắt đầu dự kiến:{" "}
                {formattedDateTime(exDetails.intendedFinishTime)}
              </h6>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={handleAssignExpert}
            className="btn btn-success "
          >
            Xác nhận
          </button>
          <button
            type="button"
            onClick={toggle}
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

ConfirmReassign.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmReassign
