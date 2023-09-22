import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"

//import action
import {
  getConfigSystem as onGetConfigSystem,
  getUsers as onGetUsers,
  getExperts as onGetExperts,
} from "../../store/actions"

// Pages Components
import WelcomeComp from "./WelcomeComp"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
import UserListDashBoard from "./UserList/UserListDashBoard"

const Dashboard = props => {
  //meta title
  document.title = "Trang chủ | Empire Garage"

  const dispatch = useDispatch()

  /*
  ==================================================
  STATE REDUX
  ==================================================
  */

  const { isLoad, isShow, configSystems, users, experts, isLoading } =
    useSelector(state => ({
      isLoad: state.systems.isLoad,
      isShow: state.Layout.isShow,
      configSystems: state.systems.configSystems,
      users: state.userLists.users,
      experts: state.userLists.experts,
      isLoading: state.userLists.isLoading,
    }))

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetConfigSystem())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetExperts())
  }, [dispatch])

  /* Call api when get Notifications & Update config */

  useEffect(() => {
    if (isShow) {
      dispatch(onGetConfigSystem())
      return
    }
  }, [dispatch, isShow])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetUsers())
    }
  }, [dispatch, isShow])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetExperts())
    }
  }, [dispatch, isShow])

  /*
  ==================================================
  GET VALUE OR "N/A"
  ==================================================
  */

  const getConfigValue = (configSystems, key) => {
    const config = configSystems.find(config => config.key === key)
    return config ? config.value : "N/A"
  }

  /*
  ==================================================
  FILTER CUSTOMER
  ==================================================
  */

  const customers = users.filter(c => c.roleId === "US").length

  /*
  ==================================================
  FILTER EXPERTS
  ==================================================
  */

  const totalExperts = experts.length
  const activeExperts = experts.filter(e => e.isAvailable).length

  /*
  ==================================================
  RENDER
  ==================================================
  */

  const reports = [
    {
      id: 1,
      title: "Đặt lịch trong tuần",
      iconClass: "bx bx-calendar",
      description:
        getConfigValue(configSystems, "BOOKING_COUNT_IN_CURRENT_WEEK") +
        "/" +
        getConfigValue(configSystems, "BOOKING_SLOT_PER_WEEK"),
    },
    {
      id: 2,
      title: "Đặt lịch trong ngày",
      iconClass: "bx bx-calendar-event",
      description:
        getConfigValue(configSystems, "BOOKING_COUNT_IN_CURRENT_DAY") +
        "/" +
        getConfigValue(configSystems, "BOOKING_SLOT_PER_DAY"),
    },
    {
      id: 3,
      title: "Xe tại garage",
      iconClass: "bx bx-car",
      description:
        getConfigValue(configSystems, "CURRENT_CAR_COUNT_IN_GARAGE") +
        "/" +
        getConfigValue(configSystems, "GARAGE_SLOT"),
    },
    {
      id: 4,
      title: "Bãi đậu xe",
      iconClass: "mdi mdi-car-brake-parking",
      description: getConfigValue(configSystems, "GARAGE_SLOT"),
    },
    {
      id: 5,
      title: "Khách hàng",
      iconClass: "mdi mdi-account-box-outline",
      description: customers,
    },
    {
      id: 6,
      title: "Kỹ thuật viên",
      iconClass: "mdi mdi-account-hard-hat",
      description: activeExperts + "/" + totalExperts,
    },
  ]

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Trang chủ")}
            breadcrumbItem={props.t("Trang chủ")}
          />

          <Row>
            <Col xl="4">
              <WelcomeComp />
            </Col>
            <Col xl="8">
              <Row>
                {reports &&
                  reports.map(report => (
                    <Col md="4" key={"_col_" + report.id}>
                      <Card className="mini-stats-wid">
                        <CardBody>
                          <div className="d-flex">
                            <div className="flex-grow-1">
                              <p className="text-muted fw-medium">
                                {report.title}
                              </p>
                              {isLoad || isLoading ? (
                                <p className="placeholder-glow">
                                  <span
                                    className="placeholder"
                                    style={{ width: "40px" }}
                                  ></span>
                                </p>
                              ) : (
                                <h4 className="mb-0">{report.description}</h4>
                              )}
                            </div>
                            <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                              <span className="avatar-title rounded-circle bg-primary">
                                <i
                                  className={report.iconClass + " font-size-24"}
                                ></i>
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>

          <UserListDashBoard />
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
