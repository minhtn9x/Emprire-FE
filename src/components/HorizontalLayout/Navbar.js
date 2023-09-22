import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Row, Col, Collapse } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { withTranslation } from "react-i18next"

import { connect } from "react-redux"

import { toggleLeftmenu } from "../../store/actions"

const ROOT_PATH = "https://empire-api.azurewebsites.net"

const getUserName = () => {
  if (localStorage.getItem("authUser")) {
    const obj = JSON.parse(localStorage.getItem("authUser"))
    return obj
  }
}

const Navbar = props => {
  const [manage, setManage] = useState(false)
  const [history, setHistory] = useState(false)

  const [role, setRole] = useState("")

  function activateParentDropdown(item) {
    item.classList.add("active")
    const parent = item.parentElement
    if (parent) {
      parent.classList.add("active") // li
      const parent2 = parent.parentElement
      parent2.classList.add("active") // li
      const parent3 = parent2.parentElement
      if (parent3) {
        parent3.classList.add("active") // li
        const parent4 = parent3.parentElement
        if (parent4) {
          parent4.classList.add("active") // li
          const parent5 = parent4.parentElement
          if (parent5) {
            parent5.classList.add("active") // li
            const parent6 = parent5.parentElement
            if (parent6) {
              parent6.classList.add("active") // li
            }
          }
        }
      }
    }
    return false
  }

  useEffect(() => {
    var matchingMenuItem = null
    var ul = document.getElementById("navigation")
    var items = ul.getElementsByTagName("a")
    for (var i = 0; i < items.length; ++i) {
      if (props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i]
        break
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem)
    }
  }, [])

  useEffect(() => {
    var userData = getUserName()
    if (userData) {
      setRole(userData.role)
    }
  }, [])

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">
                {(() => {
                  switch (role) {
                    case "RE":
                      return (
                        <React.Fragment>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-home-circle me-2"></i>
                              {props.t("Trang chủ")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/bookings"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bx-calendar me-2"></i>
                              {props.t("Đặt lịch")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/order-services"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-detail me-2"></i>
                              {props.t("Theo dõi tiến trình")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/users"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-user me-2"></i>
                              {props.t("Khách hàng")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/experts"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-user-rectangle me-2"></i>
                              {props.t("Kỹ thuật viên")}
                            </Link>
                          </li>
                          <li className="nav-item dropdown">
                            <Link
                              to="/#"
                              onClick={e => {
                                e.preventDefault()
                                setHistory(!history)
                              }}
                              className="nav-link dropdown-togglez arrow-none"
                            >
                              <i className="bx bx-history me-2"></i>
                              {props.t("Lịch sử")}{" "}
                              <div className="arrow-down"></div>
                            </Link>
                            <div
                              className={classname("dropdown-menu", {
                                show: history,
                              })}
                            >
                              <Link
                                to="/history/bookings"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Đặt lịch")}
                              </Link>
                              <Link
                                to="/history/order-services"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Hóa đơn")}
                              </Link>
                            </div>
                          </li>
                        </React.Fragment>
                      )
                    case "MA":
                      return (
                        <React.Fragment>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-home-circle me-2"></i>
                              {props.t("Trang chủ")}
                            </Link>
                          </li>

                          <li className="nav-item dropdown">
                            <Link
                              to="/#"
                              onClick={e => {
                                e.preventDefault()
                                setManage(!manage)
                              }}
                              className="nav-link dropdown-togglez arrow-none"
                            >
                              <i className="bx bx-customize me-2"></i>
                              {props.t("Quản lý")}{" "}
                              <div className="arrow-down"></div>
                            </Link>
                            <div
                              className={classname("dropdown-menu", {
                                show: manage,
                              })}
                            >
                              <Link
                                to="/symptoms"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Triệu chứng")}
                              </Link>
                              <Link
                                to="/brands"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Hãng xe")}
                              </Link>
                              <Link
                                to="/models"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Dòng xe")}
                              </Link>
                              <Link
                                to="/problems"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Vấn đề")}
                              </Link>
                              <Link
                                to="/items"
                                className="dropdown-item"
                                onClick={() => {
                                  props.toggleLeftmenu(false)
                                }}
                              >
                                {props.t("Dịch vụ")}
                              </Link>
                            </div>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/create-new"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bx-customize me-2"></i>
                              {props.t("Tạo mới")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/users"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-user me-2"></i>
                              {props.t("Khách hàng")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/experts"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bxs-user-rectangle me-2"></i>
                              {props.t("Kỹ thuật viên")}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/config-system"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bx-cog bx-spin me-2"></i>
                              {props.t("Cấu hình")}
                            </Link>
                          </li>
                        </React.Fragment>
                      )
                    case "AD":
                      return (
                        <React.Fragment>
                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to="/run-script"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bx-server me-2"></i>
                              {props.t("Cấu hình dữ liệu")}
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={{ pathname: ROOT_PATH + "/hangfire" }} target="_blank"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bx-task me-2"></i>
                              {props.t("Công việc chạy nền")}
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link
                              className="nav-link"
                              to={{ pathname: ROOT_PATH + "/swagger" }} target="_blank"
                              onClick={() => {
                                props.toggleLeftmenu(false)
                              }}
                            >
                              <i className="bx bx-globe me-2"></i>
                              {props.t("Endpoints")}
                            </Link>
                          </li>

                        </React.Fragment>
                      )
                    default:
                      return null
                  }
                })()}
              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, { toggleLeftmenu })(withTranslation()(Navbar))
)
