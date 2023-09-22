import React, { useEffect, useState, useRef } from "react"
import PropTypes from "prop-types"

import { connect } from "react-redux"

import { Link } from "react-router-dom"

// Redux Store
import { showRightSidebarAction, toggleLeftmenu } from "../../store/actions"
// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap"

// Import menuDropdown
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown"
import NotificationDropdown from "../CommonForBoth/TopbarDropdown/NotificationDropdown"
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu"

import megamenuImg from "../../assets/images/megamenu-img.png"
import logo from "../../assets/images/Empire-Logo-None-Text.png"
import logoFull from "../../assets/images/Empire-Logo.png"

// import logo from "../../assets/images/logo.svg"
// import logoLight from "../../assets/images/logo-light.png"
// import logoLightSvg from "../../assets/images/logo-light.svg"
// import logoDark from "../../assets/images/logo-dark.png"

// import images
import github from "../../assets/images/brands/github.png"
import bitbucket from "../../assets/images/brands/bitbucket.png"
import dribbble from "../../assets/images/brands/dribbble.png"
import dropbox from "../../assets/images/brands/dropbox.png"
import mail_chimp from "../../assets/images/brands/mail_chimp.png"
import slack from "../../assets/images/brands/slack.png"

import { withRouter } from "react-router-dom"

//i18n
import { withTranslation } from "react-i18next"

import QrCode from "components/CommonForBoth/QrCode"
import LiveClock from "components/CommonForBoth/LiveClock"
import ConfigSystem from "components/CommonForBoth/ConfigSystem"

const Header = props => {
  const [menu, setMenu] = useState(false)
  const [isSearch, setSearch] = useState(false)
  const [socialDrp, setsocialDrp] = useState(false)

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        )
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      }
    }
  }

  const [role, setRole] = useState("")

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setRole(obj.role)
    }
  })

  const searchInput = useRef(null)
  const searchInputMobile = useRef(null)

  const handleSearch = e => {
    e.preventDefault() // Prevent form submission from refreshing the page
    const searchString = searchInput.current.value.trim() // Get the search input value

    if (searchString) {
      props.history.push(`/search/${searchString}`) // Redirect to the search URL with the value
    }
  }

  const handleSearchMobile = e => {
    e.preventDefault() // Prevent form submission from refreshing the page
    const searchString = searchInputMobile.current.value.trim() // Get the search input value

    if (searchString) {
      props.history.push(`/search/${searchString}`) // Redirect to the search URL with the value
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logoFull} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={logoFull} alt="" height="50" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoFull} alt="" height="40" />
                </span>
                <span className="logo-lg">
                  <img src={logoFull} alt="" height="50" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-16 d-lg-none header-item"
              data-toggle="collapse"
              onClick={() => {
                props.toggleLeftmenu(!props.leftMenu)
              }}
              data-target="#topnav-menu-content"
            >
              <i className="fa fa-fw fa-bars" />
            </button>

            <form
              className="app-search d-none d-lg-block"
              onSubmit={handleSearch}
            >
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                  ref={searchInput}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>

            {/* <SearchAll /> */}
          </div>

          <div className="d-flex">
            {role !== "AD" && <LiveClock />}

            {/* {role === "MA" && <ConfigSystem />} */}

            <div className="dropdown d-inline-block d-lg-none">
              <button
                type="button"
                className="btn header-item noti-icon font-size-10"
                id="page-header-search-dropdown"
                onClick={() => setSearch(!isSearch)}
              >
                <i className="bx bx-search-alt" />
              </button>
              <div
                className={
                  isSearch
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3" onSubmit={handleSearchMobile}>
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={props.t("Tìm kiếm") + "..."}
                        ref={searchInputMobile}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {role === "RE" && <QrCode />}

            {role !== "AD" && <NotificationDropdown />}

            <ProfileMenu />

            {/* <div className="dropdown d-inline-block">
              <button
                onClick={() => {
                  props.showRightSidebarAction(!props.showRightSidebar)
                }}
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div> */}
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

Header.propTypes = {
  leftMenu: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
  history: PropTypes.any,
}

const mapStatetoProps = state => {
  const { layoutType, showRightSidebar, leftMenu } = state.Layout
  return { layoutType, showRightSidebar, leftMenu }
}

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
})(withTranslation()(withRouter(Header)))
