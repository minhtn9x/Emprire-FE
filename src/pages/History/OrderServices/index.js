import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../../components/Common/TableContainer"
import classnames from "classnames"
import img1 from "../../../assets/images/small/no-data.png"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from "reactstrap"

import {
  OrderCode,
  Name,
  DateCell,
  ModalCar,
  Plate,
  Expert,
  DateTimeCell,
} from "./OrderServiceCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getOrderServicesListByStatus as onGetOrderServicesListByStatus,
  countService as onCountServices,
} from "store/order-services/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"

const OrderServicesHistory = props => {
  //meta title
  document.title = "Lịch sử hóa đơn | Empire Garage"

  const { history } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("5")
  const [orderService, setOrderService] = useState([])

  const { countService, isLoading, isShow, orderServicess } = useSelector(
    state => ({
      orderServicess: state.orderServices.orderServicess,
      countService: state.orderServices.countService,
      isLoading: state.orderServices.isLoading,
      isShow: state.Layout.isShow,
    })
  )

  //Change Tabs
  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
      dispatch(onGetOrderServicesListByStatus(tab, props.history))
      dispatch(onCountServices())
    }
  }

  const columns = useMemo(
    () => [
      {
        Header: "Mã đơn hàng",
        accessor: "code",
        width: "150px",
        style: {
          textAlign: "center",
          width: "10%",
          background: "#0000",
        },
        filterable: true,
        Cell: cellProps => {
          return <OrderCode {...cellProps} />
        },
      },
      {
        Header: "Biển số xe",
        accessor: "car.carLisenceNo",
        disableFilters: true,
        Cell: cellProps => {
          return <Plate {...cellProps} />
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "order.user.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Ngày bảo trì",
        accessor: "maintenanceSchedule.maintenanceDate",
        disableFilters: true,
        Cell: cellProps => {
          return <DateCell {...cellProps} />
        },
      },
      {
        Header: "Thời gian nhận xe",
        accessor: "status.logDateTime",
        disableFilters: true,
        Cell: cellProps => {
          return <DateTimeCell {...cellProps} />
        },
      },
      // {
      //   Header: "Hãng xe",
      //   accessor: "car.carBrand",
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <ModalCar {...cellProps} />
      //   },
      // },
      // {
      //   Header: "Dòng xe",
      //   accessor: "car.carModel",
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <ModalCar {...cellProps} />
      //   },
      // },
      {
        Header: "SDT",
        accessor: "order.user.phone",
        disableFilters: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Kỹ thuật viên",
        accessor: "expert.fullname",
        disableFilters: true,
        Cell: cellProps => {
          return <Expert {...cellProps} />
        },
      },
      {
        Header: "Chi tiết",
        accessor: "action",
        disableFilters: true,
        Cell: cellProps => {
          return (
            <Link
              to={`/order-services/${cellProps.row.original.id}`}
              className={
                cellProps.row.original.expert !== null
                  ? "text-primary"
                  : "text-warning"
              }
            >
              <i className="mdi mdi-eye-circle font-size-20" id="edittooltip" />
              <UncontrolledTooltip placement="top" target="edittooltip">
                {cellProps.row.original.expert !== null
                  ? "Xem chi tiết"
                  : "Phân công"}
              </UncontrolledTooltip>
            </Link>
          )
        },
      },
    ],
    []
  )

  /* Get Order List */
  useEffect(() => {
    dispatch(onGetOrderServicesListByStatus(activeTab, props.history))
    dispatch(onCountServices())
  }, [dispatch, activeTab])

  /* Count Service */
  useEffect(() => {
    dispatch(onCountServices())
  }, [dispatch])

  /* Reload when Notification */
  useEffect(() => {
    if (isShow) {
      dispatch(onGetOrderServicesListByStatus(activeTab, props.history))
    }
  }, [dispatch, isShow, activeTab])

  useEffect(() => {
    if (isShow) {
      dispatch(onCountServices())
    }
  }, [dispatch, isShow])

  const statusServices = [
    {
      id: "5",
      title: "Hoàn tất",
      count: countService.CHECKOUT,
      color: "bg-success",
    },
    {
      id: "6",
      title: "Bảo trì",
      count: countService.MAINTENANCE,
      color: "bg-warning",
    },
    {
      id: "-1",
      title: "Đã Hủy",
      count: countService.CANCELLED,
      color: "bg-danger",
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Lịch sử" breadcrumbItem="Danh sách hóa đơn" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                    {statusServices.map(tab => (
                      <NavItem key={tab.id}>
                        <NavLink
                          className={classnames("count-order", {
                            active: activeTab === tab.id,
                          })}
                          onClick={() => {
                            toggleTab(tab.id)
                          }}
                        >
                          {tab.title}
                          {tab.count > 0 && (
                            <span className={`badge ms-1 ${tab.color}`}>
                              {tab.count}
                            </span>
                          )}
                        </NavLink>
                      </NavItem>
                    ))}
                  </ul>
                  {isLoading && <Loading />}
                  {!isLoading &&
                    (orderServicess.length ? (
                      <TabContent activeTab={activeTab} className="p-3">
                        <TabPane tabId="5" id="checkout">
                          <TableContainer
                            columns={columns}
                            data={orderServicess}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="6" id="maintenance">
                          <TableContainer
                            columns={columns}
                            data={orderServicess}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="-1" id="cancel">
                          <TableContainer
                            columns={columns}
                            data={orderServicess}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                      </TabContent>
                    ) : (
                      <div className="pt-3">
                        <div className="row justify-content-center">
                          <div className="col-xl-12">
                            <div>
                              <div className="my-5">
                                <div className="text-center">
                                  <h4>Không có dữ liệu</h4>
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

OrderServicesHistory.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(OrderServicesHistory)
