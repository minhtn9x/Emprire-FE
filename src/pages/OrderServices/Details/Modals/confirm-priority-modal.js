import React from "react"
import PropTypes from "prop-types"
import { Modal } from "reactstrap"

const ConfirmPriority = props => {
  const { isOpen, toggle, order, handlePriority } = props

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h4 className="modal-title mt-0" id="myModalLabel">
            Ưu tiên phương tiện ?
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
              case 1:
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> sẽ
                    được ưu tiên chẩn đoán đầu tiên bởi{" "}
                    <strong>{order.expert.fullname}</strong>
                  </p>
                )
              case 3:
                // Code for status 3
                return (
                  <p className="font-size-15">
                    Phương tiện <strong>{order.car.carLisenceNo}</strong> sẽ
                    được ưu tiên tiến hành thực hiện đầu tiên bởi{" "}
                    <strong>{order.expert.fullname}</strong>
                  </p>
                )
              default:
                return null // Return null or fallback JSX for other status values
            }
          })()}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            onClick={handlePriority}
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

ConfirmPriority.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmPriority
