import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import { Card, CardBody, Col, Container, Table, Row } from "reactstrap"

import img1 from "../../assets/images/not-found.png"

//redux
import { useSelector, useDispatch } from "react-redux"

import { onSearchAll } from "store/actions"
import Loader from "components/Loader/Loader"

const Search = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  USE STATE FROM REDUX
  ==================================================
  */

  const { searchResults, isLoadSearch } = useSelector(state => ({
    searchResults: state.Dashboard.searchResults,
    isLoadSearch: state.Dashboard.isLoadSearch,
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
    if (params && params.string) {
      dispatch(onSearchAll(params.string))
    }
  }, [params, onSearchAll])

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    if (params && params.string) {
      document.title = `Tìm kiếm "${params.string}" | Empire Garage`
    }
  })

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

  /*
  ==================================================
  LINK 
  ==================================================
  */

  const handleOrderLink = id => {
    props.history.push(`/order-services/${id}`)
  }

  const handleBookingLink = id => {
    props.history.push(`/bookings/${id}`)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        {isLoadSearch && <Loader />}
        <Container fluid>
          {!isLoadSearch && (
            <>
              {searchResults.every(result => result.results.length === 0) ? (
                <div className="mt-4">
                  <h2 className="text-center mb-4">
                    Không tìm thấy kết quả tìm kiếm "{params.string}"
                  </h2>
                  <img
                    src={img1}
                    alt=""
                    className="mx-auto d-block"
                    style={{
                      maxWidth: "100%",
                      height: 350,
                    }}
                  />
                </div>
              ) : (
                <h3 className="mb-4">Kết quả cho tìm kiếm "{params.string}"</h3>
              )}

              {/* Render the first type (type 0) */}
              {searchResults &&
                searchResults.map(
                  r =>
                    r.type === 0 && (
                      <Row
                        key={r.type}
                        className={r.results.length === 0 ? "d-none" : ""}
                      >
                        {r.results.length > 0 && (
                          <Col>
                            <Card>
                              <CardBody>
                                <h4 className="mb-2">Tiến trình / Hóa đơn</h4>
                                {/* Render the table for type 0 */}
                                <Table className="table table-nowrap align-middle table-hover mb-0">
                                  <tbody>
                                    {r.results.map(result => (
                                      <tr
                                        key={result.id}
                                        onClick={() =>
                                          handleOrderLink(result.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            #{result.code}
                                          </strong>

                                          <p className="text-muted mb-0"></p>
                                        </td>
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            {result.car.carLisenceNo}
                                          </strong>

                                          <p className="text-muted mb-0">
                                            {result.car.carBrand} |{" "}
                                            {result.car.carModel}
                                          </p>
                                        </td>
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            {result.order.user.fullname}
                                          </strong>

                                          <p className="text-muted mb-0">
                                            {formatPhoneNumber(
                                              result.order.user.phone
                                            )}
                                          </p>
                                        </td>
                                        <td>
                                          <strong
                                            className={
                                              result.status.status ===
                                              "CANCELLED"
                                                ? "text-danger font-size-14 mb-0"
                                                : result.status.status ===
                                                  "START"
                                                ? "text-success font-size-14 mb-0"
                                                : result.status.status ===
                                                  "ASSIGNED"
                                                ? "text-warning font-size-14 mb-0"
                                                : result.status.status ===
                                                  "DIAGNOSED"
                                                ? "text-primary font-size-14 mb-0"
                                                : result.status.status ===
                                                  "CONFIRMED_AND_PAID"
                                                ? "text-primary font-size-14 mb-0"
                                                : result.status.status ===
                                                  "DONE"
                                                ? "text-success font-size-14 mb-0"
                                                : result.status.status ===
                                                  "CHECKOUT"
                                                ? "text-success font-size-14 mb-0"
                                                : result.status.status ===
                                                  "MAINTENANCE"
                                                ? "text-muted font-size-14 mb-0"
                                                : ""
                                            }
                                          >
                                            {result.status.status ===
                                            "CANCELLED"
                                              ? "Đã hủy"
                                              : result.status.status === "START"
                                              ? "Phân công"
                                              : result.status.status ===
                                                "ASSIGNED"
                                              ? "Đang chẩn đoán"
                                              : result.status.status ===
                                                "DIAGNOSED"
                                              ? "Xác nhận & Thanh toán"
                                              : result.status.status ===
                                                "CONFIRMED_AND_PAID"
                                              ? "Đang thực hiện"
                                              : result.status.status === "DONE"
                                              ? "Nhận xe"
                                              : result.status.status ===
                                                "CHECKOUT"
                                              ? "Hoàn tất"
                                              : result.status.status ===
                                                "MAINTENANCE"
                                              ? "Bảo trì"
                                              : ""}
                                          </strong>
                                        </td>
                                        <td style={{ width: "90px" }}>
                                          <div>
                                            <ul className="list-inline mb-0 font-size-16">
                                              <li className="list-inline-item">
                                                <Link
                                                  to={`/order-services/${result.id}`}
                                                  className="text-primary p-1"
                                                >
                                                  <i className="mdi mdi-eye" />
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    )
                )}

              {/* Render the second type (type 1) */}
              {searchResults &&
                searchResults.map(
                  r =>
                    r.type === 1 && (
                      <Row
                        key={r.type}
                        className={r.results.length === 0 ? "d-none" : ""}
                      >
                        {r.results.length > 0 && (
                          <Col>
                            <Card>
                              <CardBody>
                                <h4 className="mb-2">Đặt lịch</h4>
                                {/* Render the table for type 1 */}
                                <Table className="table table-nowrap align-middle table-hover mb-0">
                                  {/* <tr>
                                    <th>Mã đặt lịch</th>
                                    <th>Phương tiện</th>
                                    <th>Tên & SĐT</th>
                                    <th>Ngày đặt lịch</th>
                                    <th>Ngày đặt lịch</th>
                                    <th>Xem chi tiet</th>
                                  </tr> */}
                                  <tbody>
                                    {r.results.map(result => (
                                      <tr
                                        key={result.id}
                                        onClick={() =>
                                          handleBookingLink(result.id)
                                        }
                                        style={{ cursor: "pointer" }}
                                      >
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            #{result.code}
                                          </strong>
                                        </td>
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            {result.car.carLisenceNo}
                                          </strong>

                                          <p className="text-muted mb-0">
                                            {result.car.carBrand} |{" "}
                                            {result.car.carModel}
                                          </p>
                                        </td>
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            {result.user.fullname}
                                          </strong>

                                          <p className="text-muted mb-0">
                                            {formatPhoneNumber(
                                              result.user.phone
                                            )}
                                          </p>
                                        </td>
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            {formattedDate(result.date)}
                                          </strong>
                                        </td>
                                        <td>
                                          <strong
                                            className={
                                              result.dateLeft === 0
                                                ? "text-success font-size-14 mb-0"
                                                : result.dateLeft > 0
                                                ? "text-primary font-size-14 mb-0"
                                                : "text-muted font-size-14 mb-0"
                                            }
                                          >
                                            {result.dateLeft === 0
                                              ? "Hôm nay"
                                              : result.dateLeft > 0
                                              ? "Còn " +
                                                result.dateLeft +
                                                " ngày"
                                              : Math.abs(result.dateLeft) +
                                                " ngày trước"}
                                          </strong>
                                        </td>
                                        <td style={{ width: "90px" }}>
                                          <div>
                                            <ul className="list-inline mb-0 font-size-16">
                                              <li className="list-inline-item">
                                                <Link
                                                  to={`/bookings/${result.id}`}
                                                  className="text-primary p-1"
                                                >
                                                  <i className="mdi mdi-eye" />
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    )
                )}

              {/* Render the third type (type 2) */}
              {searchResults &&
                searchResults.map(
                  r =>
                    r.type === 2 && (
                      <Row
                        key={r.type}
                        className={r.results.length === 0 ? "d-none" : ""}
                      >
                        {r.results.length > 0 && (
                          <Col>
                            <Card>
                              <CardBody>
                                <h4 className="mb-2">Tài khoản</h4>
                                {/* Render the table for type 2 */}
                                <Table className="table table-nowrap align-middle table-hover mb-0">
                                  <tbody>
                                    {r.results.map((result, index) => (
                                      <tr key={result.id}>
                                        <td>
                                          <p className="text-dark font-size-14 mb-1">
                                            {index + 1}
                                          </p>
                                        </td>
                                        <td>
                                          <strong className="text-dark font-size-14 mb-1">
                                            {result.fullname}
                                          </strong>
                                        </td>
                                        <td>
                                          <p className="text-dark font-size-14 mb-1">
                                            {formatPhoneNumber(result.phone)}
                                          </p>
                                        </td>
                                        <td>
                                          <p className="text-dark font-size-14 mb-1">
                                            {result.email}
                                          </p>
                                        </td>
                                        <td>
                                          <p className="text-dark font-size-14 mb-1">
                                            {result.gender
                                              ? "Nam"
                                              : result.gender === false
                                              ? "Nữ"
                                              : "Không xác định"}
                                          </p>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </Table>
                              </CardBody>
                            </Card>
                          </Col>
                        )}
                      </Row>
                    )
                )}
            </>
          )}
        </Container>
      </div>
      <Col xl="12"></Col>
    </React.Fragment>
  )
}

export default withRouter(Search)
