import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import {
  Row,
  Col,
  Form,
  InputGroup,
  CardTitle,
  CardBody,
  FormFeedback,
  Label,
  Input,
  Table,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { runRemoveScriptBooking as onRemoveScriptBooking } from "store/actions"
import { toast } from "react-toastify"
import axios from "axios"

const BookingRemoveScript = () => {
  const dispatch = useDispatch()

  const [bookings, setBookings] = useState([])
  const [removes, setRemoves] = useState([])
  const [isLoad, setIsload] = useState(false)

  const obj = JSON.parse(localStorage.getItem("authUser"))

  useEffect(() => {
    if (localStorage.getItem("scriptBooking")) {
      const obj = JSON.parse(localStorage.getItem("scriptBooking"))
      setBookings(obj)
    }
  }, [localStorage.getItem("scriptBooking")])

  const numberId = bookings.map(booking => booking.result.id)

  const filteredNumberId = numberId.filter(id => id !== undefined)

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + obj.accessToken,
    },
    data: filteredNumberId,
  }

  const handleRemove = () => {
    setIsload(true)
    // dispatch(onRemoveScriptBooking(numberId))
    // console.log(dispatch(onRemoveScriptBooking(numberId)))
    axios
      .delete(
        "https://empire-api.azurewebsites.net/api/v1/script/bookings",
        config
      )
      .then(response => {
        // Handle success
        setRemoves(response.data)
        setIsload(false)
        toast.success("Hủy thành công " + response.data.length + " đặt lịch")
      })
      .catch(error => {
        // Handle error
        setIsload(false)
        toast.success("Hủy thành công thất bại")
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">HỦY ĐẶT LỊCH</CardTitle>
        <button
          onClick={handleRemove}
          type="button"
          className="btn btn-danger btn-label"
        >
          <i className="mdi mdi-calendar-remove label-icon "></i> Hủy
        </button>
        <hr className="my-4" />
        {isLoad && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-danger">
                  <i className="bx bx-loader bx-spin me-2" />
                  Đang hủy {bookings.length} đặt lịch
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoad && (
          <div className="table-responsive">
            <Table className="table-nowrap table-borderless">
              {/* <thead>
              <tr>
                <th style={{ width: "70px" }}>Số</th>
                <th>Nội dung</th>
                <th className="text-end">Trạng thái</th>
              </tr>
            </thead> */}
              <tbody>
                {removes.map((booking, index) => (
                  <tr key={index}>
                    <td className="font-size-14 text-center">{index + 1}</td>
                    {booking.statusCode === 200 ? (
                      <td className="font-size-14">{booking.result}</td>
                    ) : (
                      <td className="font-size-14">Hủy đặt lịch thất bại</td>
                    )}
                    <td className="text-end">
                      {booking.statusCode === 200 ? (
                        <span className="badge badge-soft-success rounded-pill font-size-13">
                          Thành công
                        </span>
                      ) : (
                        <span className="badge badge-soft-danger rounded-pill font-size-13">
                          Thất bại
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </CardBody>
    </React.Fragment>
  )
}

export default BookingRemoveScript
