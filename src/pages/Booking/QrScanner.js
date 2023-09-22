import React, { useState } from "react"
import QrReader from "react-qr-reader"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import { useDispatch } from "react-redux"
import uuid from "uuid"

import { checkinBooking as checkInBooking } from "store/actions"
import { ref, set } from "firebase/database"
import { db } from "helpers/firebase"
import { useSelector } from "react-redux"
import { Col, Container, Row } from "reactstrap"

const QrScanner = props => {
  //meta title
  document.title = "Quét mã | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()
  const [qrData, setQRData] = useState("")
  const [showScanner, setShowScanner] = useState(true)
  const [errorStatus, setErrorStatus] = useState(null)
  const obj = JSON.parse(localStorage.getItem("authUser"))

  const { isAssign } = useSelector(state => ({
    isAssign: state.Layout.isAssign,
  }))

  const handleScan = data => {
    if (data) {
      setShowScanner(false)
      setQRData(data)

      fetch(
        `https://empire-api.azurewebsites.net/api/v1/booking-qrcode/close-generation?qrcode=${encodeURIComponent(
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
            setErrorStatus(response.status)
            throw new Error("Network response was not ok")
          }
          return response.json()
        })
        .then(data => {
          goToCheckin(data.id)
        })
        .catch(error => {
          console.error("Error:", error)
        })
    }
  }
  const handleError = err => {
    console.error(err)
  }

  const goToCheckin = id => {
    dispatch(checkInBooking(id, isAssign))
    history.push(`/bookings/${id}`)
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col lg={12}>
            {showScanner && (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "80%", height: "auto", margin: "auto" }}
              />
            )}
            {qrData && <p>{qrData}</p>}
            {errorStatus && <p>{errorStatus}</p>}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default QrScanner
