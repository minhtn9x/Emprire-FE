import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { isEmpty } from "lodash"

import "toastr/build/toastr.min.css"

import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
} from "reactstrap"
import Select, { components } from "react-select"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

import {
  getOrderServicesDetails as onGetOrderServiceDetail,
  getExperts as onGetExpert,
  putAutoAssignExpert as onAutoAssignExpert,
  checkOutService as checkOutService,
  getStatusLog as onGetStatusLog,
  putPriorityService as priorityService,
  getExpertIntendedTimeByService as getExpertIntendedTimeByService,
} from "store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

import Cart from "./cart"
import CarRecord from "./health-car-record"
import PreloadDetail from "components/Loader/PreloadDetail"
import Stepper from "./stepper"

//Modals
import ConfirmReAssign from "./Modals/confirm-reassign-modal"
import ConfirmAutoAssign from "./Modals/confirm-autoassign-modal"
import ConfirmCheckOut from "./Modals/confirm-checkout-modal"
import ConfirmPriority from "./Modals/confirm-priority-modal"

const OrderServiceDetail = props => {
  //meta title
  useEffect(() => {
    if (orderServicesDetail) {
      document.title = `#${
        orderServicesDetail && orderServicesDetail.code
      } | Empire Garage`
    } else {
      document.title = `Empire Garage`
    }
  })

  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const {
    orderServicesDetail,
    experts,
    isLoading,
    orderServiceLogs,
    isShow,
    isLoadPriority,
    exDetailsService,
  } = useSelector(state => ({
    orderServicesDetail: state.orderServices.orderServicesDetail,
    experts: state.userLists.experts,
    isLoading: state.orderServices.isLoading,
    orderServiceLogs: state.orderServices.orderServiceLogs,
    isShow: state.Layout.isShow,
    isLoadPriority: state.orderServices.isLoadPriority,
    exDetailsService: state.orderServices.exDetailsService,
  }))

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  const {
    match: { params },
  } = props

  /* Get OrderService Detail */

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetOrderServiceDetail(params.id, props.history))
    }
  }, [params, dispatch])

  /* Get Status Log */

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetStatusLog(params.id))
    }
  }, [params, dispatch])

  /* Get Expert */

  useEffect(() => {
    dispatch(onGetExpert())
  }, [dispatch])

  /* RELOAD */

  useEffect(() => {
    if (isShow) {
      dispatch(onGetOrderServiceDetail(params.id, props.history))
      dispatch(onGetStatusLog(params.id, props.history))
      dispatch(onGetExpert())
    }
  }, [isShow])

  useEffect(() => {
    if (isLoadPriority) {
      dispatch(onGetOrderServiceDetail(params.id, props.history))
    }
  }, [isLoadPriority])

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
  FORMAT DATE & TIME
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
      hour12: false,
    })
    const formatted = `${formattedTime} - ${formattedDate}`
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

  /*
  ==================================================
  RE-ASSIGN TO EXPERTS
  ==================================================
  */

  const [selectedGroup, setSelectedGroup] = useState(null)

  const [isAssign, setIsAssign] = useState(false)

  const [isOpenEx, setIsOpenEx] = useState(false)

  const toggleEx = () => {
    setIsOpenEx(!isOpenEx)
    setIsAssign(false)
  }

  const handleReAssign = () => {
    setIsAssign(!isAssign)
    setSelectedGroup(null)
  }

  function handleSelectGroup(selected) {
    setSelectedGroup(selected)
  }

  const availableExpert = experts.filter(ex => ex.isAvailable)

  const optionGroup = [
    {
      label: "Còn trống",
      options: [],
      isFirstGroup: true,
    },
    {
      label: "Đã đầy",
      options: [],
      isFirstGroup: true,
    },
  ]

  optionGroup[0].options = availableExpert
    .filter(ex => !ex.isMaxWorkloadPerDay)
    .sort((a, b) => a.workloadTotal - b.workloadTotal)
    .map(ex => ({
      label: ex.fullname,
      value: ex.id,
      name: ex.fullname,
      workLoad: ex.workloadTotal,
      isMax: ex.isMaxWorkloadPerDay,
    }))

  optionGroup[1].options = availableExpert
    .filter(ex => ex.isMaxWorkloadPerDay)
    .map(ex => ({
      label: ex.fullname,
      value: ex.id,
      name: ex.fullname,
      workLoad: ex.workloadTotal,
      isMax: ex.isMaxWorkloadPerDay,
    }))

  const optionGroup1 = [
    {
      label: "Còn trống",
      options: [],
      isFirstGroup: true,
    },
    {
      label: "Đã đầy",
      options: [],
      isFirstGroup: false,
    },
  ]

  optionGroup1[0].options = experts
    .filter(ex => !ex.isMaxWorkloadPerDay)
    .sort((a, b) => a.workloadTotal - b.workloadTotal)
    .map(ex => ({
      label: ex.fullname,
      value: ex.id,
      name: ex.fullname,
      workLoad: ex.workloadTotal,
      isMax: ex.isMaxWorkloadPerDay,
    }))

  optionGroup1[1].options = experts
    .filter(ex => ex.isMaxWorkloadPerDay)
    .map(ex => ({
      label: ex.fullname,
      value: ex.id,
      name: ex.fullname,
      workLoad: ex.workloadTotal,
      isMax: ex.isMaxWorkloadPerDay,
    }))

  // Check if orderServicesDetail.expert.fullname exists in optionGroup
  const expertFullName = orderServicesDetail.expert
    ? orderServicesDetail.expert.fullname
    : ""
  const isExpertInOptions = optionGroup.some(group => {
    return group.options.some(option => option.label.includes(expertFullName))
  })

  // Remove expertFullName from optionGroup if it exists
  if (isExpertInOptions) {
    optionGroup.forEach(group => {
      group.options = group.options.filter(
        option => !option.label.includes(expertFullName)
      )
    })
  }

  // const SingleValue = props => {
  //   const { name, workLoad, isMax } = props.getValue()[0]

  //   return (
  //     <components.SingleValue {...props}>
  //       <span>{name}</span>{" "}
  //       {isMax == true ? (
  //         <span style={{ color: "darkgray" }}>MAX</span>
  //       ) : (
  //         <span style={{ color: "darkgray" }}>{workLoad}</span>
  //       )}
  //     </components.SingleValue>
  //   )
  // }

  const Option = props => {
    const { name, workLoad, isMax } = props.data
    return (
      <components.Option {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{name}</span>{" "}
          {isMax == true ? (
            <div className="font-size-12 text-muted">MAX</div>
          ) : (
            <span className="font-size-12 text-muted">{workLoad}</span>
          )}
        </div>
      </components.Option>
    )
  }

  const GroupHeading = props => {
    const { label, title = "WLD", isFirstGroup } = props.data

    if (!isFirstGroup) {
      // Return a simple div instead of the GroupHeading component
      return (
        <components.GroupHeading {...props}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>{label}</span>
          </div>
        </components.GroupHeading>
      )
    }

    return (
      <components.GroupHeading {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>{label}</div>
          <div className="font-size-10">{title}</div>
        </div>
      </components.GroupHeading>
    )
  }

  /*
  ==================================================
  PUT AUTO ASSIGN EXPERT
  ==================================================
  */

  const [isOpenExAuto, setIsOpenExAuto] = useState(false)

  const toggleExAuto = () => {
    setIsOpenExAuto(!isOpenExAuto)
  }

  const handleAutoAssignExpert = () => {
    const id = params.id
    const exId = orderServicesDetail.expert.id
    if ((id, exId)) {
      dispatch(onAutoAssignExpert(id, exId))
      setIsOpenExAuto(!isOpenExAuto)
    }
  }

  /*
  ==================================================
  GET INTENDED TIME EXPERT
  ==================================================
  */

  useEffect(() => {
    if (
      orderServicesDetail &&
      orderServicesDetail.expert &&
      orderServicesDetail.expert.id
    ) {
      const exId = orderServicesDetail.expert.id
      const orId = orderServicesDetail.id
      dispatch(getExpertIntendedTimeByService(exId, orId))
    }
  }, [dispatch, orderServicesDetail])

  /*
  ==================================================
  PRIORITY
  ==================================================
  */

  const [options, setOptions] = useState(false)

  const [isOpenPriority, setIsOpenPriority] = useState(false)

  const togglePriority = () => {
    setIsOpenPriority(!isOpenPriority)
  }

  const handlePriority = () => {
    if (
      orderServicesDetail &&
      orderServicesDetail.expert &&
      orderServicesDetail.expert.id &&
      orderServicesDetail.car &&
      orderServicesDetail.car.carLisenceNo
    ) {
      const id = orderServicesDetail.id
      const exId = orderServicesDetail.expert.id
      const car = orderServicesDetail.car.carLisenceNo
      dispatch(priorityService(exId, id, car))
      setIsOpenPriority(!isOpenPriority)
    }
  }

  /*
  ==================================================
  CHECK-OUT
  ==================================================
  */

  const [isOpenCheckOut, setIsOpenCheckOut] = useState(false)

  const toggleCheckOut = () => {
    setIsOpenCheckOut(!isOpenCheckOut)
  }

  const handleCheckOut = () => {
    const id = params.id
    if (
      (id,
      orderServicesDetail &&
        orderServicesDetail.car &&
        orderServicesDetail.car.carLisenceNo)
    ) {
      dispatch(
        checkOutService(id, orderServicesDetail.car.carLisenceNo, props.history)
      )
    }
    setIsOpenCheckOut(!isOpenCheckOut)
  }

  /* ========================================== RENDER ==============================================*/
  return (
    <>
      {isLoading && <PreloadDetail />}
      <div className="page-content">
        <Container fluid={true}>
          {!isLoading && !isEmpty(orderServicesDetail) && (
            <React.Fragment>
              <ConfirmReAssign
                isOpen={isOpenEx}
                toggle={toggleEx}
                expert={selectedGroup}
                order={orderServicesDetail}
              />
              <ConfirmAutoAssign
                isOpen={isOpenExAuto}
                toggle={toggleExAuto}
                order={orderServicesDetail}
                handleAutoAssignExpert={handleAutoAssignExpert}
              />
              <ConfirmPriority
                isOpen={isOpenPriority}
                toggle={togglePriority}
                order={orderServicesDetail}
                handlePriority={handlePriority}
              />
              <ConfirmCheckOut
                isOpen={isOpenCheckOut}
                toggle={toggleCheckOut}
                order={orderServicesDetail}
                history={props.history}
                //handleCheckOut={handleCheckOut}
              />
              <Breadcrumbs
                title="Theo dõi tiến trình"
                breadcrumbItem={"#" + orderServicesDetail.code}
              />
              <Row>
                <Col>
                  <Card>
                    <CardBody>
                      <Stepper logs={orderServiceLogs} />

                      <div className="mt-5 d-flex justify-content-between">
                        <div>
                          <CardTitle>THÔNG TIN TỔNG</CardTitle>
                          <CardSubtitle className="mb-3">
                            Chi tiết về tiến trình, đơn hàng và thông tin khách
                            hàng
                          </CardSubtitle>
                        </div>

                        {orderServicesDetail.status === 1 ||
                        orderServicesDetail.status === 3 ? (
                          <div className="ml-auto">
                            <Dropdown
                              isOpen={options}
                              toggle={() => {
                                setOptions(!options)
                              }}
                            >
                              <DropdownToggle
                                tag="i"
                                className="btn nav-btn"
                                type="button"
                              >
                                <i className="fa fa-fw fa-bars" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem onClick={togglePriority}>
                                  Ưu tiên
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </div>
                        ) : orderServicesDetail.status === 6 ||
                          orderServicesDetail.maintenanceSchedule !== null ? (
                          <>
                            <p className="fw-semibold">
                              <strong>Bảo trì: </strong>
                              {formattedDate(
                                orderServicesDetail.maintenanceSchedule
                                  .maintenanceDate
                              )}
                            </p>
                          </>
                        ) : (
                          " "
                        )}
                      </div>
                      <Row>
                        <Col xl="6">
                          <Table className="table table-borderless mb-0">
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
                                  {orderServicesDetail.order.user.fullname}
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
                                  {orderServicesDetail.order.user.phone === null
                                    ? ""
                                    : formatPhoneNumber(
                                        orderServicesDetail.order.user.phone
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
                                <td>{orderServicesDetail.order.user.email}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Biển số xe:
                                </th>
                                <td>{orderServicesDetail.car.carLisenceNo}</td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Thương hiệu xe:
                                </th>
                                <td>
                                  {orderServicesDetail.car.carBrand} |{" "}
                                  {orderServicesDetail.car.carModel}
                                </td>
                              </tr>
                              <tr>
                                <th
                                  scope="row"
                                  style={{ width: "300px" }}
                                  className={"text-capitalize"}
                                >
                                  Tình trạng khách mô tả :
                                </th>
                                <td>{orderServicesDetail.receivingStatus}</td>
                              </tr>
                              {orderServicesDetail.considerProblems.length ===
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
                                    {orderServicesDetail.considerProblems
                                      .map(consider => consider.name)
                                      .join(", ")}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </Table>
                        </Col>
                        <Col xl="6">
                          <div>
                            <Table className="table table-borderless mb-5">
                              <tbody>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Hóa đơn tạo lúc :
                                  </th>
                                  <td>
                                    {formattedDateTime(
                                      orderServicesDetail.order.createdAt
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th
                                    scope="row"
                                    style={{ width: "300px" }}
                                    className={"text-capitalize"}
                                  >
                                    Số tiền từ đặt lịch :
                                  </th>
                                  <td>
                                    {orderServicesDetail.prepaidFromBooking.toLocaleString()}
                                    ₫
                                  </td>
                                </tr>

                                <tr>
                                  <th
                                    scope="row"
                                    style={{
                                      width: "300px",
                                      verticalAlign: "middle",
                                    }}
                                    className={"text-capitalize"}
                                  >
                                    Người phụ trách :
                                  </th>
                                  <td>
                                    {orderServicesDetail.expert !== null ? (
                                      orderServicesDetail.status === 1 &&
                                      orderServicesDetail.startTime === null ? (
                                        isAssign ? (
                                          <>
                                            <Select
                                              value={selectedGroup}
                                              onChange={handleSelectGroup}
                                              options={optionGroup}
                                              classNamePrefix="select2-selection"
                                              placeholder="Chọn kỹ thuật viên"
                                              required={true}
                                              onClick={e => e.preventDefault()}
                                              components={{
                                                GroupHeading,
                                                Option,
                                              }}
                                              // menuPlacement="top"
                                            />
                                            <Button
                                              onClick={toggleEx}
                                              type="button"
                                              color="primary"
                                              className="w-md mt-2 me-2"
                                              disabled={!selectedGroup}
                                            >
                                              Chỉ định
                                            </Button>
                                            <Button
                                              onClick={handleReAssign}
                                              type="button"
                                              color="light"
                                              className="w-md mt-2"
                                            >
                                              Hủy
                                            </Button>
                                          </>
                                        ) : (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "baseline",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {isOpenEx
                                              ? selectedGroup &&
                                                selectedGroup.name
                                              : orderServicesDetail.expert
                                                  .fullname}

                                            <div>
                                              <div
                                                className="btn-group"
                                                role="group"
                                              >
                                                <button
                                                  type="button"
                                                  className="btn btn-light"
                                                  onClick={toggleExAuto}
                                                >
                                                  Phân công
                                                </button>
                                                <button
                                                  type="button"
                                                  className="btn btn-light"
                                                  onClick={handleReAssign}
                                                >
                                                  Chỉ định
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      ) : (
                                        <>
                                          {orderServicesDetail.expert.fullname}
                                        </>
                                      )
                                    ) : isAssign ? (
                                      <>
                                        <Select
                                          value={selectedGroup}
                                          onChange={handleSelectGroup}
                                          options={optionGroup1}
                                          classNamePrefix="select2-selection"
                                          placeholder="Chọn kỹ thuật viên"
                                          required={true}
                                          onClick={e => e.preventDefault()}
                                          components={{
                                            // SingleValue,
                                            Option,
                                          }}
                                          // menuPlacement="top"
                                        />
                                        <Button
                                          onClick={toggleEx}
                                          type="button"
                                          color="primary"
                                          className="w-md mt-2 me-2"
                                          disabled={!selectedGroup}
                                        >
                                          Chỉ định
                                        </Button>
                                        <Button
                                          onClick={handleReAssign}
                                          type="button"
                                          color="light"
                                          className="w-md mt-2"
                                        >
                                          Hủy
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "baseline",
                                            verticalAlign: "middle",
                                          }}
                                        >
                                          <mark>Trống</mark>
                                          <div>
                                            <div
                                              className="btn-group"
                                              role="group"
                                            >
                                              <button
                                                onClick={toggleExAuto}
                                                type="button"
                                                className="btn btn-light"
                                              >
                                                Phân công
                                              </button>
                                              <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={handleReAssign}
                                              >
                                                Chỉ định
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </td>
                                </tr>
                                {(orderServicesDetail.startTime !== null &&
                                  orderServicesDetail.status === 1) ||
                                (orderServicesDetail.startTime !== null &&
                                  orderServicesDetail.status === 3) ? (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize"}
                                    >
                                      Bắt đầu:
                                    </th>
                                    <td>
                                      {formattedDateTime(
                                        orderServicesDetail.startTime
                                      )}
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                {(orderServicesDetail.status === 1 &&
                                  orderServicesDetail.startTime !== null &&
                                  exDetailsService.intendedFinishTime !==
                                    null) ||
                                (orderServicesDetail.status === 3 &&
                                  orderServicesDetail.startTime !== null &&
                                  exDetailsService.intendedFinishTime !==
                                    null) ? (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize"}
                                    >
                                      Dự kiến hoàn thành:
                                    </th>
                                    <td>
                                      {formattedDateTime(
                                        exDetailsService.intendedFinishTime
                                      )}
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                {orderServicesDetail.cancelReason && (
                                  <tr>
                                    <th
                                      scope="row"
                                      style={{ width: "300px" }}
                                      className={"text-capitalize text-danger"}
                                    >
                                      Lý do hủy:
                                    </th>
                                    <td>{orderServicesDetail.cancelReason}</td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              {orderServicesDetail.orderServiceDetails.length > 0 ? (
                <Cart
                  services={orderServicesDetail.orderServiceDetails}
                  details={orderServicesDetail}
                />
              ) : (
                ""
              )}

              {orderServicesDetail.status === 2 ||
              (orderServicesDetail.status === 5 &&
                orderServicesDetail.healthCarRecord != null) ? (
                <CarRecord record={orderServicesDetail.healthCarRecord} />
              ) : null}

              <Row className="mt-2 mb-5">
                <Col sm="6">
                  <Link
                    to="#"
                    className="btn text-muted d-none d-sm-inline-block btn-link"
                    onClick={() => props.history.goBack()}
                  >
                    <i className="mdi mdi-arrow-left me-1" /> Trở về trang danh
                    sách{" "}
                  </Link>
                </Col>

                {orderServicesDetail.status >= 0 &&
                orderServicesDetail.status < 5 ? (
                  <Col sm="6">
                    <div className="text-sm-end">
                      <Button
                        type="button"
                        color="success"
                        className="btn btn-label w-md"
                        onClick={toggleCheckOut}
                      >
                        <i className="mdi mdi-logout label-icon"></i>
                        Check-Out
                      </Button>
                    </div>
                  </Col>
                ) : null}
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
    </>
  )
}

OrderServiceDetail.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(OrderServiceDetail)
