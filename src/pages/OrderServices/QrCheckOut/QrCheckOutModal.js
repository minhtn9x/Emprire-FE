import React, { useEffect, useState } from "react"
import { Modal } from "reactstrap"
import PropTypes from "prop-types"
import QrReader from "react-qr-reader"
import { toast } from "react-toastify"

import { useDispatch } from "react-redux"

import { checkOutService as onCheckOut } from "store/actions"

const QrCheckOutModal = props => {
  const { isOpen, toggle, history } = props

  const obj = JSON.parse(localStorage.getItem("authUser"))

  const [disabled, setDisabled] = useState(false)

  const dispatch = useDispatch()

  const handleError = err => {
    console.error(err)
  }

  const handleScan = data => {
    if (data && !disabled) {
      toggle(false)
      setDisabled(true)

      fetch(
        `https://empire-api.azurewebsites.net/api/v1/order-services/close-checkout-qrcode-generation?qrCode=${encodeURIComponent(
          data
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obj.accessToken,
          },
        }
      )
        .then(response => {
          if (!response.ok) {
            toggle(false)
            toast.error("Không tìm thấy phương tiện !!")
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(response => {
          const data = {}
          dispatch(
            onCheckOut(
              response.car.id,
              data,
              response.id,
              response.car.carLisenceNo,
              history
            )
          )
        })
        .catch(error => {
          toggle(false)
          console.log("Error: " + error)
        })
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
          <h5 className="modal-title mt-0">Quét mã Check-out</h5>
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

QrCheckOutModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  history: PropTypes.any,
}

export default QrCheckOutModal
