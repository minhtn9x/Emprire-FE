import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../../components/Common/TableContainer"
import {
  ButtonDropdown,
  Card,
  CardBody,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"

import { Name, Email, Phone, Gender } from "./userlistCol"

import { getUsers as onGetUsers } from "store/users/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"
import { Label } from "recharts"

const UserLists = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { users, isShow, isLoading } = useSelector(state => ({
    users: state.userLists.users,
    isLoading: state.userLists.isLoading,
    isShow: state.Layout.isShow,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [toggle, setToggle] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetUsers())
  }, [dispatch])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetUsers())
    }
  }, [dispatch, isShow])

  /*
  ==================================================
  FILTER CUSTOMER
  ==================================================
  */

  const customers = users.filter(c => c.roleId === "US")

  /*
  ==================================================
  COLUMN
  ==================================================
  */

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row }) => {
          return <span className="text-align-center">{row.index + 1}</span>
        },
      },
      {
        Header: "Tên khách hàng",
        accessor: "fullname",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: true,
        Cell: cellProps => {
          return <Email {...cellProps} />
        },
      },
      {
        Header: "Số điện thoại",
        accessor: "phone",
        filterable: true,
        Cell: cellProps => {
          return <Phone {...cellProps} />
        },
      },
      {
        Header: "Giới tính",
        accessor: "gender",
        filterable: true,
        Cell: cellProps => {
          return <Gender {...cellProps} />
        },
      },
      {
        Header: "Tiến trình hiện tại",
        filterable: true,
        Cell: cellProps => {
          const { activities } = cellProps.row.original

          let content

          switch (activities.length) {
            case 2:
              content = (
                // <ButtonDropdown
                //   isOpen={toggle}
                //   toggle={() => setToggle(!toggle)}
                // >
                //   <DropdownToggle
                //     caret
                //     color="primary"
                //     className="btn btn-info btn-sm"
                //   >
                //     {activities[0].car.carLisenceNo}
                //   </DropdownToggle>
                //   <DropdownMenu>
                //     <DropdownItem>
                //       {activities[0].car.carLisenceNo}
                //     </DropdownItem>
                //     <DropdownItem divider />
                //     {activities.slice(1).map(activity => (
                //       <DropdownItem key={activity.id}>
                //         {activity.car.carLisenceNo}
                //       </DropdownItem>
                //     ))}
                //   </DropdownMenu>
                // </ButtonDropdown>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="text-primary dropend"
                    color="white"
                    // type="button"
                    direction="right"
                  >
                    {activities[0].car.carLisenceNo}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <Link
                      className="dropdown-item"
                      to={`/order-services/${activities[0].id}`}
                    >
                      {activities[0].car.carLisenceNo}
                    </Link>
                    <div className="dropdown-divider"></div>
                    {activities.slice(1).map(activity => (
                      <Link
                        key={activity.id}
                        className="dropdown-item"
                        to={`/order-services/${activity.id}`}
                      >
                        {activity.car.carLisenceNo}
                      </Link>
                    ))}

                    {/* <Link className="dropdown-item" to="#">
                      Something else
                    </Link>
                    <Link className="dropdown-item" to="#">
                      Separated link
                    </Link> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )
              break
            case 1:
              content = (
                <Link
                  to={`/order-services/${activities[0].id}`}
                  className="text-primary"
                >
                  {activities[0].car.carLisenceNo}
                </Link>
              )
              break
            default:
              content = ""
          }

          return <>{content}</>
        },
      },
    ],
    []
  )

  /*
  ==================================================
  COUNT CUSTOMER CREATED TODAY
  ==================================================
  */

  // Count customers created today
  const today = new Date().toISOString().split("T")[0]
  const customersCreatedToday = customers.filter(
    c => c.createdAt.split("T")[0] === today
  )

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <h3 className="mb-4 card-title">DANH SÁCH KHÁCH HÀNG</h3>
                {/* {customersCreatedToday.length > 0 && !isLoading && (
                  <em>
                    Hôm nay có thêm {customersCreatedToday.length} khách hàng
                    mới
                  </em>
                )} */}
              </div>
              {isLoading && <Loading />}
              {!isLoading && (
                <TableContainer
                  columns={columns}
                  data={customers}
                  isGlobalFilter={true}
                  isCountCusToday={true}
                  countCusTody={customersCreatedToday.length}
                  customPageSize={10}
                  className="custom-header-css"
                />
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default withRouter(UserLists)
