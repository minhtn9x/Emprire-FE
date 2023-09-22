import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import {
  Button,
  Card,
  Col,
  Container,
  Input,
  Label,
  Row,
  TabContent,
  TabPane,
  Nav,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  NavItem,
  NavLink,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import classnames from "classnames"

import BookingScript from "./RunScript/booking-script"
import BookingRemoveScript from "./RunScript/booking-remove-script"
import CustomerScript from "./RunScript/customer-script"
import BookingCheckInScript from "./RunScript/booking-checkin"
import OrderDiagnose from "./RunScript/order-diagnose"
import OrderConfirmPaid from "./RunScript/order-confirmpaid"
import OrderDone from "./RunScript/order-done"
import OrderCheckOut from "./RunScript/order-checkout"
import CustomerRemoveScript from "./RunScript/customer-remove-script"

const ConfigScriptGarage = props => {
  //meta title
  document.title = "Cấu hình | Empire Garage"

  const [activeTab, setactiveTab] = useState("1")

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Cấu hình" breadcrumbItem="Cấu hình dữ liệu" />

          <Row>
            <Col xl="3">
              <Card style={{ padding: "20px", borderRadius: "5px" }}>
                <h6>Chạy script</h6>
                <div className="mail-list">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "1",
                        })}
                        onClick={() => {
                          setactiveTab("1")
                        }}
                      >
                        <i className="mdi font-size-16 mdi-account-circle me-2"></i>{" "}
                        Tạo khách hàng{" "}
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={
                          (`font-size-15`,
                          classnames({
                            active: activeTab === "2",
                          }))
                        }
                        onClick={() => {
                          setactiveTab("2")
                        }}
                      >
                        <i className="mdi font-size-15 mdi-calendar-month me-2"></i>
                        Tạo đặt lịch
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "3",
                        })}
                        onClick={() => {
                          setactiveTab("3")
                        }}
                      >
                        <i className="bx font-size-15 bx-log-in-circle me-2"></i>
                        Check-in
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                <div className="mail-list">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "4",
                        })}
                        onClick={() => {
                          setactiveTab("4")
                        }}
                      >
                        <i className="bx font-size-15 bx bx-pencil me-2"></i>{" "}
                        Chẩn đoán{" "}
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={
                          (`font-size-15`,
                          classnames({
                            active: activeTab === "5",
                          }))
                        }
                        onClick={() => {
                          setactiveTab("5")
                        }}
                      >
                        <i className="fas font-size-14 fa-money-bill-wave me-2"></i>
                        Xác nhận & Thanh toán
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "6",
                        })}
                        onClick={() => {
                          setactiveTab("6")
                        }}
                      >
                        <i className="bx font-size-18 bx-badge-check me-2"></i>
                        Hoàn tất dịch vụ
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "7",
                        })}
                        onClick={() => {
                          setactiveTab("7")
                        }}
                      >
                        <i className="font-size-15 bx bx-log-out-circle me-2"></i>
                        Check-out
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>

                <div className="mail-list">
                  <Nav tabs className="nav-tabs-custom" vertical role="tablist">
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "8",
                        })}
                        onClick={() => {
                          setactiveTab("8")
                        }}
                      >
                        <i className="font-size-15 bx bx-user-x me-2"></i> Xóa
                        khách hàng{" "}
                      </NavLink>
                    </NavItem>

                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === "9",
                        })}
                        onClick={() => {
                          setactiveTab("9")
                        }}
                      >
                        <i className="mdi font-size-15 mdi-calendar-remove me-2"></i>
                        Hủy đặt lịch
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </div>
              </Card>
            </Col>
            <Col xl="9">
              <div className="mb-3">
                <Card>
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <CustomerScript />
                    </TabPane>
                    <TabPane tabId="2">
                      <BookingScript />
                    </TabPane>
                    <TabPane tabId="3">
                      <BookingCheckInScript />
                    </TabPane>
                    <TabPane tabId="4">
                      <OrderDiagnose />
                    </TabPane>
                    <TabPane tabId="5">
                      <OrderConfirmPaid />
                    </TabPane>
                    <TabPane tabId="6">
                      <OrderDone />
                    </TabPane>
                    <TabPane tabId="7">
                      <OrderCheckOut />
                    </TabPane>
                    <TabPane tabId="8">
                      <CustomerRemoveScript />
                    </TabPane>
                    <TabPane tabId="9">
                      <BookingRemoveScript />
                    </TabPane>
                  </TabContent>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ConfigScriptGarage.propTypes = {
  inboxmails: PropTypes.array,
  starredmails: PropTypes.array,
  onGetInboxMails: PropTypes.func,
  onGetStarredMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
  importantmails: PropTypes.array,
  onGetImportantMails: PropTypes.func,
}

export default withRouter(ConfigScriptGarage)
