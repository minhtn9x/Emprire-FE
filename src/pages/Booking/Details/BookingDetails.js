import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import moment from "moment" // Import the Moment.js library
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getBookingDetails as onGetBookingDetail,
  checkinBooking as checkInBooking,
} from "store/bookings/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import PreloadDetail from "../../../components/Loader/PreloadDetail"

const BookingDetails = props => {
  //meta title
  useEffect(() => {
    if (bookingDetail) {
      document.title = `#${bookingDetail.code} | Empire Garage`
    } else {
      document.title = "Empire Garage"
    }
  })

  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { bookingDetail, isAssign, isLoading, isShow } = useSelector(state => ({
    bookingDetail: state.bookings.bookingDetail,
    isLoading: state.bookings.isLoading,
    isAssign: state.Layout.isAssign,
    isShow: state.Layout.isShow,
  }))

  /*
  ==================================================
  PRAMS (ID) & useEffect
  ==================================================
  */
  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetBookingDetail(params.id, props.history))
    }
  }, [params, onGetBookingDetail])

  //Reload when get notification
  useEffect(() => {
    if (isShow) {
      dispatch(onGetBookingDetail(params.id, props.history))
    }
  }, [isShow, onGetBookingDetail])

  /*
  ==================================================
  CHECK-IN FUNCTION
  ==================================================
  */

  const today = moment().format("YYYY-MM-DD") + "T00:00:00+00:00"

  /* HANDLE CHECK IN */
  const handleCheckIn = id => {
    if (id) {
      dispatch(checkInBooking(id, isAssign, props.history))
    }
  }

  /*
  ==================================================
  FORMAT PHONE NUMBER
  ==================================================
  */

  function formatPhoneNumber(phone) {
    return `(+${phone.slice(1, 3)}) ${phone.slice(3)}`
  }

  /*
  ==================================================
  FORMAT DATE TIME 
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
      second: "2-digit",
      hour12: false,
    })
    const formatted = `${formattedDate} - ${formattedTime}`
    return formatted
  }

  const formattedDate = date => {
    const createDate = new Date(date)
    const formattedDate = createDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const formatted = `${formattedDate}`
    return formatted
  }

  /* ========================================== RENDER ==============================================*/
  return (
    <React.Fragment>
      {isLoading && <PreloadDetail />}
      <div className="page-content">
        <Container fluid>
          {!isLoading && !isEmpty(bookingDetail) && (
            <>
              <Breadcrumbs
                title="Đặt lịch"
                breadcrumbItem={"#" + bookingDetail.code}
              />
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <CardTitle>THÔNG TIN TỔNG</CardTitle>
                      <CardSubtitle className="mb-3">
                        Chi tiết về đặt lịch và thông tin khách hàng
                      </CardSubtitle>

                      <Row>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tên khách:
                                  </th>
                                  <td>
                                    {bookingDetail.user.fullname !== null
                                      ? bookingDetail.user.fullname
                                      : null}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số điện thoại :
                                  </th>
                                  <td>
                                    {bookingDetail.user.phone === null
                                      ? ""
                                      : formatPhoneNumber(
                                          bookingDetail.user.phone
                                        )}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    E-mail :
                                  </th>
                                  <td>
                                    {" "}
                                    {bookingDetail.user.email !== null
                                      ? bookingDetail.user.email
                                      : null}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Trạng thái :
                                  </th>
                                  <td>
                                    {bookingDetail.isActived
                                      ? bookingDetail.isArrived
                                        ? "Đã đến"
                                        : "Chưa đến"
                                      : "Hủy"}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Ngày đặt lịch :
                                  </th>
                                  <td>{formattedDate(bookingDetail.date)}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thời gian check-in :
                                  </th>
                                  <td>
                                    {bookingDetail.arrivedDateTime != null
                                      ? formattedDateTime(
                                          bookingDetail.arrivedDateTime
                                        )
                                      : "Xe chưa đến ga-ra"}
                                  </td>
                                </tr>
                                {bookingDetail.transaction.total > 0 ? (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize"}
                                    >
                                      Số tiền :
                                    </th>
                                    <td>
                                      {bookingDetail.transaction.total.toLocaleString()}{" "}
                                      ₫ -{" "}
                                      {
                                        bookingDetail.transaction.paymentMethod
                                          .name
                                      }
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Thanh toán lúc :
                                  </th>
                                  <td>
                                    {formattedDateTime(
                                      bookingDetail.transaction.transactionDate
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardBody>
                      <CardTitle>PHƯƠNG TIỆN</CardTitle>
                      <CardSubtitle className="mb-3">
                        Thông về phương tiện và tình trạng
                      </CardSubtitle>
                      <Row>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Biển số xe :
                                  </th>
                                  <td>{bookingDetail.car.carLisenceNo}</td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Dòng xe :
                                  </th>
                                  <td>
                                    {bookingDetail.car.carBrand +
                                      " - " +
                                      bookingDetail.car.carModel}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                        <Col xl="6">
                          <div className="table-responsive">
                            <Table className="table table-borderless  mb-0">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Tình trạng khách mô tả :
                                  </th>
                                  <td>
                                    {bookingDetail.symptoms
                                      .map(symptom => symptom.name)
                                      .join(", ")}
                                  </td>
                                </tr>
                                {bookingDetail.unresolvedProblems.length ===
                                0 ? (
                                  ""
                                ) : (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize"}
                                    >
                                      Vấn đề tái sửa chữa :
                                    </th>
                                    <td>
                                      {bookingDetail.unresolvedProblems
                                        .map(problem => problem.name)
                                        .join(", ")}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                  <Row className="mt-4 mb-5">
                    <Col sm="6">
                      <Link
                        to="#"
                        className="btn text-muted d-none d-sm-inline-block btn-link"
                        onClick={() => props.history.goBack()}
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Trở về trang
                        danh sách{" "}
                      </Link>
                    </Col>
                    {!bookingDetail.isArrived &&
                    bookingDetail.isActived &&
                    bookingDetail.date === today ? (
                      <Col sm="6">
                        <div className="text-sm-end">
                          <Button
                            type="button"
                            color="success"
                            className="btn btn-label w-md"
                            onClick={() => handleCheckIn(bookingDetail.id)}
                          >
                            <i className="mdi mdi-login label-icon"></i>
                            Check-In
                          </Button>
                        </div>
                      </Col>
                    ) : null}
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

BookingDetails.propTypes = {
  match: PropTypes.object,
  isLoading: PropTypes.bool,
  isAssign: PropTypes.bool,
}

export default withRouter(BookingDetails)
