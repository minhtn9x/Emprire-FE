import React, { useEffect, useState, useRef, useMemo } from "react"
import { Link, withRouter } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import classnames from "classnames"
import img1 from "../../assets/images/small/no-data.png"
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

const OrderServicesList = props => {
  //meta title
  document.title = "Theo dõi tiến trình | Empire Garage"

  const { history } = props

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("0")
  const [orderService, setOrderService] = useState([])

  const { orderServicess, isLoading, isShow, countService } = useSelector(
    state => ({
      orderServicess: state.orderServices.orderServicess,
      isLoading: state.orderServices.isLoading,
      isShow: state.Layout.isShow,
      countService: state.orderServices.countService,
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
      // {
      //   Header: "Ngày bảo trì",
      //   accessor: "order.createdAt",
      //   disableFilters: true,
      //   Cell: cellProps => {
      //     return <DateCell {...cellProps} />
      //   },
      // },
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

  useEffect(() => {
    setOrderService(orderServicess)
  }, [orderServicess])

  useEffect(() => {
    if (!isEmpty(orderServicess)) {
      setOrderService(orderServicess)
    }
  }, [orderServicess])

  /*
  ==================================================
  Sort
  ==================================================
  */

  const sortedOrderService = orderService.sort((a, b) => a.id - b.id)

  /*
  ==================================================
  Count length
  ==================================================
  */

  const statusServices = [
    { id: "0", title: "Phân công", count: countService.START },
    { id: "1", title: "Chẩn đoán", count: countService.ASSIGNED },
    { id: "2", title: "Thanh toán", count: countService.DIAGNOSED },
    { id: "3", title: "Thực hiện", count: countService.CONFIRMED_AND_PAID },
    { id: "4", title: "Nhận xe", count: countService.DONE },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Theo dõi tiến trình" breadcrumbItem="Danh sách" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div style={{ overflowX: "auto" }}>
                    <ul
                      className="nav nav-tabs nav-tabs-custom nav-justified"
                      role="tablist"
                      style={{ display: "flex", flexWrap: "nowrap" }}
                    >
                      {statusServices.map(tab => (
                        <NavItem key={tab.id}>
                          <NavLink
                            className={classnames({
                              active: activeTab === tab.id,
                            })}
                            onClick={() => {
                              toggleTab(tab.id)
                            }}
                          >
                            {tab.title}
                            {tab.count > 0 && (
                              <span className="badge bg-primary ms-1">
                                {tab.count}
                              </span>
                            )}
                          </NavLink>
                        </NavItem>
                      ))}
                    </ul>
                  </div>
                  {isLoading && <Loading />}
                  {!isLoading &&
                    (orderService.length ? (
                      <TabContent activeTab={activeTab} className="p-3">
                        <TabPane tabId="0" id="assign">
                          <TableContainer
                            columns={columns}
                            data={sortedOrderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="1" id="diagnosing">
                          <TableContainer
                            columns={columns}
                            data={sortedOrderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="2" id="confirmPaid">
                          <TableContainer
                            columns={columns}
                            data={sortedOrderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="3" id="done">
                          <TableContainer
                            columns={columns}
                            data={sortedOrderService}
                            isGlobalFilter={true}
                            customPageSize={10}
                            className="custom-header-css"
                          />
                        </TabPane>
                        <TabPane tabId="4" id="checkout">
                          <TableContainer
                            columns={columns}
                            data={sortedOrderService}
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
                                  style={{ maxWidth: "100%", height: 400 }}
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

OrderServicesList.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(OrderServicesList)
