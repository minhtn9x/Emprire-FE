import React, { useEffect, useState } from "react"
import { Modal } from "reactstrap"
import PropTypes from "prop-types"
import QrReader from "react-qr-reader"
import { toast } from "react-toastify"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import { checkinQRCode as checkInQrCode } from "store/actions"

const QrCheckInModal = props => {
  const { isOpen, toggle, history } = props

  const [disabled, setDisabled] = useState(false)

  const dispatch = useDispatch()

  const { isAssign } = useSelector(state => ({
    isAssign: state.Layout.isAssign,
  }))

  const handleError = err => {
    console.error(err)
  }

  const handleScan = qrCode => {
    if (qrCode && !disabled) {
      toggle(false)
      setDisabled(true)
      const data = {
        qrCode: qrCode,
        autoAssign: isAssign,
      }
      dispatch(checkInQrCode(data, history))
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setDisabled(false)
    }
  }, [isOpen])

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <div className="modal-header">
          <h5 className="modal-title mt-0">Quét mã Check-in</h5>
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
          {toggle && (
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

QrCheckInModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  history: PropTypes.any,
}

export default QrCheckInModal
