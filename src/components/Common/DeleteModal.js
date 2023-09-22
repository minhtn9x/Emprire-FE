import PropTypes from "prop-types"
import React from "react"
import { Col, Modal, ModalBody, Row } from "reactstrap"

const DeleteModal = ({ show, onDeleteClick, onCloseClick }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-alert-circle-outline"
                style={{ fontSize: "9em", color: "orange" }}
              />
              <h3>Bạn có muốn xóa?</h3>
              <h5>Hành động này sẽ không thể hoàn tác nếu "Xác nhận"!</h5>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-success btn-lg ms-2"
                onClick={onDeleteClick}
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="btn btn-danger btn-lg ms-2"
                onClick={onCloseClick}
              >
                Hủy
              </button>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  show: PropTypes.any,
}

export default DeleteModal
