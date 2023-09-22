import React from "react"
import PropTypes from "prop-types"
import { Modal } from "reactstrap"

const ConfirmStatusModal = props => {
  const { isOpen, toggle, expert, handleChangeStatusExpert } = props

  return (
    <>
      {" "}
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h4 className="modal-title mt-0" id="myModalLabel">
            {expert && expert.isAvailable
              ? `Bật trạng thái hoạt động kỹ thuật viện ${
                  expert && expert.fullname
                }`
              : `Tắt trạng thái hoạt động kỹ thuật viện ${
                  expert && expert.fullname
                }`}
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
          {expert && !expert.isAvailable ? (
            <p className="font-size-14">
              Nếu "Xác nhận" trạng thái hoạt động của kỹ thuật viên{" "}
              <strong>{expert.fullname}</strong> sẽ được tắt. Sẽ không thể phân
              công/chỉ định công việc cho <strong>{expert.fullname}</strong> đến
              khi trạng thái được bật lại.
            </p>
          ) : (
            <p className="font-size-14">
              Nếu "Xác nhận" trạng thái hoạt động của kỹ thuật viên{" "}
              <strong>{expert.fullname}</strong> sẽ được bật. Có thể phân
              công/chỉ định công việc cho <strong>{expert.fullname}</strong>
            </p>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            onClick={handleChangeStatusExpert}
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

ConfirmStatusModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  expert: PropTypes.object,
  order: PropTypes.object,
}

export default ConfirmStatusModal
