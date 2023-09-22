import React, { useEffect, useState, useMemo } from "react"
import { Link, withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import { isEmpty } from "lodash"
import "toastr/build/toastr.min.css"
import TableContainer from "../../../components/Common/TableContainer"
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
  Label,
  FormGroup,
  UncontrolledTooltip,
} from "reactstrap"

import { BookingCode, ModalCar, Name, Phone, Plate } from "./BookingUserListCol"

import img1 from "../../../assets/images/small/no-data.png"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getBookingListsByDate as onGetBookingByDate } from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"

//Get current time
moment.locale("vi")

const currentYear = new Date().getFullYear()
const yearOptions = []
for (let year = currentYear - 1; year <= currentYear + 3; year++) {
  yearOptions.push(
    <option key={year} value={year.toString()}>
      {year}
    </option>
  )
}

const vietnameseMonthLabels = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
]

const translateDate = date => {
  const abbreviatedDays = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ]
  const dayOfWeek = date.day() === 0 ? 6 : date.day() - 1
  const abbreviatedDay = abbreviatedDays[dayOfWeek]
  return `${abbreviatedDay} (${date.format("DD/MM")})`
}

const generateMonthOptions = selectedYear => {
  const year = parseInt(selectedYear)
  const months = []

  for (let month = 0; month < 12; month++) {
    const monthStart = moment().year(year).month(month).startOf("month")
    const monthEnd = moment().year(year).month(month).endOf("month")
    const monthLabel = monthStart.format("MMMM")
    const monthFormat = vietnameseMonthLabels[month]
    months.push({
      start: monthStart,
      end: monthEnd,
      label: monthLabel,
      format: monthFormat,
    })
  }

  return months
}

const BookingHistory = props => {
  //meta title
  document.title = "Lịch sử đặt lịch | Empire Garage"

  const { history } = props
  const dispatch = useDispatch()

  /*
  ==================================================
  Filter Year, Month, Week
  ==================================================
  */

  const [selectedYear, setSelectedYear] = useState(currentYear.toString())
  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedWeek, setSelectedWeek] = useState("")
  const [selectedDates, setSelectedDates] = useState([])

  const monthOptions = generateMonthOptions(selectedYear)

  const generateWeekOptions = selectedMonth => {
    const year = parseInt(selectedYear)
    const monthIndex = moment.months().indexOf(selectedMonth)
    const startDate = moment().year(year).month(monthIndex).startOf("month")
    const endDate = moment().year(year).month(monthIndex).endOf("month")
    const weeks = []

    let currentDate = startDate.clone().startOf("isoWeek") // Start from the first day of the ISO week
    while (currentDate.isSameOrBefore(endDate)) {
      const weekStart = currentDate.clone()
      const weekEnd = currentDate.clone().endOf("isoWeek") // End at the last day of the ISO week (Sunday)
      const weekLabel = `${weekStart.format("DD/MM")} to ${weekEnd.format(
        "DD/MM"
      )}`
      weeks.push({ start: weekStart, end: weekEnd, label: weekLabel })
      currentDate.add(1, "week")
    }

    return weeks
  }

  const getSelectedDates = (startDate, endDate) => {
    const dates = []
    let currentDate = startDate.clone()
    while (currentDate.isSameOrBefore(endDate)) {
      const dateFormat = currentDate.format("DD/MM")
      const translatedDate = translateDate(currentDate)
      const date = currentDate.format("YYYY-MM-DD")
      dates.push({
        date: dateFormat,
        translated: translatedDate,
        dateApi: date,
      })
      currentDate.add(1, "day")
    }
    return dates
  }

  const handleChangeYear = event => {
    const selectedYear = event.target.value
    setSelectedYear(selectedYear)
  }

  const handleChangeMonth = event => {
    const selectedMonth = event.target.value
    setSelectedMonth(selectedMonth)
    const weekOptions = generateWeekOptions(selectedMonth)
    if (weekOptions.length > 0) {
      setSelectedWeek(weekOptions[0].label)
      setSelectedDates(
        getSelectedDates(weekOptions[0].start, weekOptions[0].end)
      )
    } else {
      setSelectedWeek("")
      setSelectedDates([])
    }
  }

  const handleChangeWeek = event => {
    const selectedWeek = event.target.value
    setSelectedWeek(selectedWeek)

    // Find the corresponding week object based on the selected week
    const weekObject = generateWeekOptions(selectedMonth).find(
      week => week.label === selectedWeek
    )

    if (weekObject) {
      setSelectedDates(getSelectedDates(weekObject.start, weekObject.end))
    } else {
      setSelectedDates([])
    }
  }

  useEffect(() => {
    const months = generateMonthOptions(selectedYear)
    const currentMoment = moment()

    // Check if the selected year is the current year
    if (selectedYear === currentMoment.year().toString()) {
      const currentMonthObj = months.find(month =>
        currentMoment.isBetween(month.start, month.end, undefined, "[]")
      )

      if (currentMonthObj) {
        setSelectedMonth(currentMonthObj.label)
        const weekOptions = generateWeekOptions(currentMonthObj.label)
        if (weekOptions.length > 0) {
          // Find the week that contains today's date
          const currentWeekObj = weekOptions.find(week =>
            currentMoment.isBetween(week.start, week.end, undefined, "[]")
          )

          if (currentWeekObj) {
            setSelectedWeek(currentWeekObj.label)
            setSelectedDates(
              getSelectedDates(currentWeekObj.start, currentWeekObj.end)
            )
          } else {
            setSelectedWeek("")
            setSelectedDates([])
          }
        } else {
          setSelectedWeek("")
          setSelectedDates([])
        }
      } else {
        setSelectedMonth("")
        setSelectedWeek("")
        setSelectedDates([])
      }
    } else {
      // Set the first month and week for the selected year
      if (months.length > 0) {
        const firstMonth = months[0].label
        setSelectedMonth(firstMonth)

        const weekOptions = generateWeekOptions(firstMonth)
        if (weekOptions.length > 0) {
          const firstWeek = weekOptions[0].label
          setSelectedWeek(firstWeek)
          setSelectedDates(
            getSelectedDates(weekOptions[0].start, weekOptions[0].end)
          )
        } else {
          setSelectedWeek("")
          setSelectedDates([])
        }
      } else {
        setSelectedMonth("")
        setSelectedWeek("")
        setSelectedDates([])
      }
    }
  }, [selectedYear])

  useEffect(() => {
    const todayDate = moment().format("DD/MM")
    const activeTabIndex = selectedDates.findIndex(
      date => date.date === todayDate
    )
    setActiveTab(activeTabIndex >= 0 ? activeTabIndex : 0)
  }, [selectedDates])

  /*
  ==================================================
  useState
  ==================================================
  */
  const [activeTab, setActiveTab] = useState()

  const [subActiveTab, setSubActiveTab] = useState(0)

  const [booking, setBooking] = useState([])

  /*
  ==================================================
  Reducer State
  ==================================================
  */

  const { bookings, isLoading, isShow, isAssign } = useSelector(state => ({
    bookings: state.bookings.bookings,
    isLoading: state.bookings.isLoading,
    isShow: state.Layout.isShow,
    isAssign: state.Layout.isAssign,
  }))

  /*
  ==================================================
  useEffect
  ==================================================
  */

  const activeDate = selectedDates[activeTab]?.dateApi

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
    if (activeTab !== index) {
      setActiveTab(index)
      setSubActiveTab(0)
      const activeDate = selectedDates[activeTab]?.dateApi
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
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Lịch sử" breadcrumbItem="Danh sách đặt lịch" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row className="mb-2">
                    <Col md={2} className="col-xl">
                      <FormGroup className="mb-0">
                        <Label className="form-label">Năm</Label>
                        <select
                          value={selectedYear}
                          className="form-select"
                          onChange={handleChangeYear}
                        >
                          {yearOptions}
                        </select>
                      </FormGroup>
                    </Col>

                    <Col md={2} className="col-xl">
                      <FormGroup className="mb-0">
                        <Label>Tháng</Label>
                        <select
                          className="form-select"
                          value={selectedMonth}
                          onChange={handleChangeMonth}
                        >
                          {monthOptions.map(month => (
                            <option key={month.label} value={month.label}>
                              {month.format}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>

                    <Col md={2} className="col-xl">
                      <FormGroup className="mb-0">
                        <Label>Tuần</Label>
                        <select
                          value={selectedWeek}
                          className="form-select"
                          onChange={handleChangeWeek}
                        >
                          {generateWeekOptions(selectedMonth).map(week => (
                            <option key={week.label} value={week.label}>
                              {week.label}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>

                    <Col sm={4} className="text-sm-end align-self-end">
                      {/* <div className="mb-3">
                        <FormGroup className="mb-0">
                          <Label>Tự động phân công</Label>
                          <div className="square-switch">
                            <input
                              type="checkbox"
                              id="square-switch1"
                              switch="none"
                              checked={isAssign}
                              onChange={handleAutoAssign}
                            />
                            <label
                              htmlFor="square-switch1"
                              data-on-label="Bật"
                              data-off-label="Tắt"
                            />
                          </div>
                        </FormGroup>
                      </div> */}
                    </Col>
                  </Row>

                  <Nav
                    pills
                    className="nav bg-light rounded nav-justified"
                    role="tablist"
                  >
                    {selectedDates.map((date, index) => (
                      <NavItem key={index}>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          className={classnames({
                            active: activeTab === index,
                          })}
                          onClick={() => {
                            toggleTab(index)
                          }}
                        >
                          {date.translated}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Nav>

                  {isLoading && <Loading />}
                  {!isLoading &&
                    (bookings.length ? (
                      <div className="mt-4">
                        {selectedDates.map((day, index) => (
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
                                      <span className="badge bg-warning ms-1">
                                        {countPending.length}
                                      </span>
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
                                      <span className="badge bg-success ms-1">
                                        {countArrived.length}
                                      </span>
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
                                      <span className="badge bg-danger ms-1">
                                        {countCancel.length}
                                      </span>
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

BookingHistory.propTypes = {
  isLoading: PropTypes.bool,
  isAssign: PropTypes.bool,
}

export default withRouter(BookingHistory)
