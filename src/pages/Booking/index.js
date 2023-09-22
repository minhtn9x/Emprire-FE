import React, { useEffect, useState, useMemo } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import moment from "moment"
import "moment/locale/vi"

import {
  Button,
  Col,
  Card,
  CardBody,
  Row,
  Container,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Nav,
  UncontrolledTooltip,
} from "reactstrap"

import { BookingCode, ModalCar, Name, Phone, Plate } from "./BookingUserListCol"

import img1 from "../../assets/images/small/no-data.png"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getBookingListsByDate as onGetBookingByDate } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"
import QrCheckInModal from "./QrCheckIn/QrCheckInModal"

const BookingList = props => {
  //meta title
  document.title = "Đặt Lịch | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  /*
  ==================================================
  Render Day,Date in Father Tabs
  ==================================================
  */
  const today = moment().locale("vi")

  const weekDays = []
  let currentDate = today.clone()
  for (let i = 0; i < 8; i++) {
    const date = currentDate.clone().format("YYYY-MM-DD")
    const dateFormat = currentDate.clone().format("DD/MM")
    const dayArray = currentDate.format("dddd").split(" ")
    dayArray[0] = dayArray[0].charAt(0).toUpperCase() + dayArray[0].slice(1)
    dayArray[1] = dayArray[1].charAt(0).toUpperCase() + dayArray[1].slice(1)
    const day = dayArray.join(" ")
    weekDays.push({ day, date, dateFormat })
    currentDate.add(1, "day")
  }

  /*
  ==================================================
  useState
  ==================================================
  */
  const [activeTab, setActiveTab] = useState(0)

  const [subActiveTab, setSubActiveTab] = useState(0)

  const [booking, setBooking] = useState([])

  /*
  ==================================================
  Reducer State
  ==================================================
  */

  const { bookings, isLoading, isShow } = useSelector(state => ({
    bookings: state.bookings.bookings,
    isLoading: state.bookings.isLoading,
    isShow: state.Layout.isShow,
  }))

  /*
  ==================================================
  useEffect
  ==================================================
  */

  const activeDate = weekDays[activeTab].date

  useEffect(() => {
    dispatch(onGetBookingByDate(activeDate, props.history))
  }, [dispatch, activeDate])

  useEffect(() => {
    setBooking(bookings)
  }, [bookings])

  useEffect(() => {
    if (!isEmpty(bookings)) {
      setBooking(bookings)
    }
  }, [bookings])

  //Call api when get Notifications
  useEffect(() => {
    if (isShow) {
      dispatch(onGetBookingByDate(activeDate, props.history))
    }
  }, [dispatch, isShow, activeDate])

  /*
  ==================================================
  Changes Tabs
  ==================================================
  */

  //Father Tabs
  const toggleTab = index => {
    const activeDate = weekDays[activeTab].date
    if (activeTab !== index) {
      setActiveTab(index)
      setSubActiveTab(0)
      dispatch(onGetBookingByDate(activeDate, props.history))
    }
  }

  //Nested Tabs
  const toggleSubTab = index => {
    setSubActiveTab(index)
  }

  /*
  ==================================================
  Filter with Status
  ==================================================
  */
  const tableBookings = index => {
    const filteredBookings = booking.filter(b => {
      if (index === 0) {
        return !b.isArrived && b.isActived
      } else if (index === 1) {
        return b.isArrived && b.isActived
      } else if (index === 2) {
        return !b.isArrived && !b.isActived
      }
    })
    return filteredBookings
  }

  const pendingBooking = tableBookings(subActiveTab)
  const arrivedBooking = tableBookings(subActiveTab)
  const cancelBooking = tableBookings(subActiveTab)

  /*
  ==================================================
  Count length
  ==================================================
  */

  const countPending = booking.filter(
    booking => !booking.isArrived && booking.isActived
  )
  const countArrived = booking.filter(
    booking => booking.isArrived && booking.isActived
  )
  const countCancel = booking.filter(
    booking => !booking.isArrived && !booking.isActived
  )

  /*
  ==================================================
  Check-in Qr-Code
  ==================================================
  */

  const [isOpen, setIsOpen] = useState(false)

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  function toggle() {
    setIsOpen(!isOpen)
    removeBodyCss()
  }

  /*
  ==================================================
  Column for each Table with Status
  ==================================================
  */

  const columns = useMemo(
    () => [
      {
        Header: "Mã đặt lịch",
        accessor: "code",
        filterable: true,
        Cell: cellProps => {
          return <BookingCode {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        filterable: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "user.fullname",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "user.phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Hãng xe",
        accessor: "car.carBrand",
        disableFilters: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Dòng xe",
        accessor: "car.carModel",
        disableFilters: true,
        Cell: cellProps => {
          return <ModalCar {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <div>
              <Link
                to={`/bookings/${cellProps.row.original.id}`}
                className="text-primary"
              >
                <i
                  className="mdi mdi-eye-circle font-size-20"
                  id="edittooltip"
                />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Xem chi tiết
                </UncontrolledTooltip>
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  /*====================================================== RENDER ==========================================================*/

  return (
    <React.Fragment>
      <QrCheckInModal isOpen={isOpen} toggle={toggle} history={props.history} />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Đặt Lịch" breadcrumbItem="Danh sách đặt lịch" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div
                    className="bg-light table-scroll"
                    // style={{ overflowX: "auto" }}
                  >
                    <Nav
                      pills
                      className="nav rounded nav-justified"
                      role="tablist"
                      style={{ display: "flex", flexWrap: "nowrap" }}
                    >
                      {weekDays.map((day, index) => (
                        <NavItem key={index}>
                          <NavLink
                            style={{ cursor: "pointer", width: "100px" }}
                            className={classnames({
                              active: activeTab === index,
                            })}
                            onClick={() => {
                              toggleTab(index)
                            }}
                          >
                            {day.day} ({day.dateFormat})
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                  </div>

                  {isLoading && <Loading />}
                  {!isLoading &&
                    (bookings.length ? (
                      <div className="mt-4">
                        {weekDays.map((day, index) => (
                          <div key={index}>
                            {activeTab === index && (
                              <>
                                <ul
                                  className="nav nav-tabs nav-tabs-custom"
                                  role="tablist"
                                >
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: subActiveTab === 0,
                                      })}
                                      onClick={() => {
                                        toggleSubTab(0)
                                      }}
                                    >
                                      Chưa đến
                                      {countPending.length > 0 && (
                                        <span className="badge bg-warning ms-1">
                                          {countPending.length}
                                        </span>
                                      )}
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: subActiveTab === 1,
                                      })}
                                      onClick={() => {
                                        toggleSubTab(1)
                                      }}
                                    >
                                      Đã đến
                                      {countArrived.length > 0 && (
                                        <span className="badge bg-success ms-1">
                                          {countArrived.length}
                                        </span>
                                      )}
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink
                                      className={classnames({
                                        active: subActiveTab === 2,
                                      })}
                                      onClick={() => {
                                        toggleSubTab(2)
                                      }}
                                    >
                                      Hủy
                                      {countCancel.length > 0 && (
                                        <span className="badge bg-danger ms-1">
                                          {countCancel.length}
                                        </span>
                                      )}
                                    </NavLink>
                                  </NavItem>
                                </ul>
                                <TabContent className="p-3 mt-4">
                                  {subActiveTab === 0 && (
                                    <TabPane id="not-yet">
                                      {pendingBooking.length === 0 ? (
                                        <div className="row justify-content-center">
                                          <div className="col-xl-12">
                                            <div>
                                              <div className="text-center">
                                                <h4>
                                                  Không có phương tiện đặt ngày{" "}
                                                  {new Date(
                                                    activeDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                    }
                                                  )}
                                                </h4>
                                              </div>

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
                                          </div>
                                        </div>
                                      ) : (
                                        <TableContainer
                                          columns={columns}
                                          data={pendingBooking}
                                          isGlobalFilter={true}
                                          isAddBookingOptions={false}
                                          //handleUserClick={handleUserClicks}
                                          // isCheckin={true}
                                          // handleCheckInClick={toggle}
                                          customPageSize={10}
                                          className="custom-header-css"
                                        />
                                      )}
                                    </TabPane>
                                  )}
                                  {subActiveTab === 1 && (
                                    <TabPane id="arrived">
                                      {arrivedBooking.length === 0 ? (
                                        <div className="row justify-content-center">
                                          <div className="col-xl-12">
                                            <div>
                                              <div className="text-center">
                                                <h4>
                                                  Không có phương tiện đã đến
                                                  ga-ra ngày{" "}
                                                  {new Date(
                                                    activeDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                    }
                                                  )}
                                                </h4>
                                              </div>

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
                                          </div>
                                        </div>
                                      ) : (
                                        <TableContainer
                                          columns={columns}
                                          data={arrivedBooking}
                                          isGlobalFilter={true}
                                          isAddBookingOptions={false}
                                          //handleUserClick={handleUserClicks}
                                          customPageSize={10}
                                          className="custom-header-css"
                                        />
                                      )}
                                    </TabPane>
                                  )}
                                  {subActiveTab === 2 && (
                                    <TabPane id="cancel">
                                      {cancelBooking.length === 0 ? (
                                        <div className="row justify-content-center">
                                          <div className="col-xl-12">
                                            <div>
                                              <div className="text-center">
                                                <h4>
                                                  Không có đặt lịch hủy ngày{" "}
                                                  {new Date(
                                                    activeDate
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "2-digit",
                                                      month: "2-digit",
                                                    }
                                                  )}
                                                </h4>
                                              </div>

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
                                          </div>
                                        </div>
                                      ) : (
                                        <TableContainer
                                          columns={columns}
                                          data={cancelBooking}
                                          isGlobalFilter={true}
                                          isAddBookingOptions={false}
                                          customPageSize={10}
                                          className="custom-header-css"
                                        />
                                      )}
                                    </TabPane>
                                  )}
                                </TabContent>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="pt-3">
                        <div className="row justify-content-center">
                          <div className="col-xl-12">
                            <div>
                              <div className="my-5">
                                <div className="text-center">
                                  <h4>
                                    Không có đặt lịch cho ngày{" "}
                                    {new Date(activeDate).toLocaleDateString(
                                      "en-GB",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                      }
                                    )}
                                  </h4>
                                </div>

                                <img
                                  src={img1}
                                  alt=""
                                  className="mx-auto d-block"
                                  style={{ maxWidth: "100%", height: 350 }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

BookingList.propTypes = {
  isLoading: PropTypes.bool,
  isAssign: PropTypes.bool,
}

export default withRouter(BookingList)
