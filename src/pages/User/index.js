import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Li } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

import { Name, Email, Phone, Gender } from "./userlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getUsers as onGetUsers } from "store/users/actions"
import { isEmpty } from "lodash"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"

const UserLists = props => {
  //meta title
  document.title = "Danh sách khách hàng | Empire Garage"

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
          return (
            <>
              {" "}
              <Gender {...cellProps} />{" "}
            </>
          )
        },
      },
      // {
      //   Header: "Action",
      //   Cell: cellProps => {
      //     return (
      //       <div className="d-flex gap-3">
      //         <Link
      //           to="#"
      //           className="text-success"
      //           // onClick={() => {
      //           //   const userData = cellProps.row.original
      //           //   handleUserClick(userData)
      //           // }}
      //         >
      //           <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
      //           <UncontrolledTooltip placement="top" target="edittooltip">
      //             Edit
      //           </UncontrolledTooltip>
      //         </Link>
      //         <Link
      //           to="#"
      //           className="text-danger"
      //           // onClick={() => {
      //           //   const userData = cellProps.row.original
      //           //   onClickDelete(userData)
      //           // }}
      //         >
      //           <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
      //           <UncontrolledTooltip placement="top" target="deletetooltip">
      //             Delete
      //           </UncontrolledTooltip>
      //         </Link>
      //       </div>
      //     )
      //   },
      // },
    ],
    []
  )

  /*
  ==================================================
  FILTER CUSTOMER
  ==================================================
  */

  const customers = users.filter(c => c.roleId === "US")

  // Count customers created today
  const today = new Date().toISOString().split("T")[0]
  const customersCreatedToday = customers.filter(
    c => c.createdAt.split("T")[0] === today
  )

  // sortedCustomers will contain the filtered customers array with entries where c.id >= 100 moved to the top.
  const sortedCustomers = [
    ...customers.filter(c => c.id >= 100),
    ...customers.filter(c => c.id < 100),
  ]

  /*
  ==================================================
  ADD NEW
  ==================================================
  */

  const handleAddNew = () => {
    props.history.push("/create-new-guest")
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Khách hàng"
            breadcrumbItem="Danh sách các khách hàng"
          />

          <div className="mb-3 mt-2 d-flex justify-content-between">
            <div className="me-5 d-flex">
              <div>
                <i className="fas fa-user-friends me-2" />
              </div>
              {isLoading && (
                <p className="placeholder-glow">
                  <span
                    className="placeholder"
                    style={{ width: "15px" }}
                  ></span>
                </p>
              )}
              {!isLoading && <strong>{customers.length}</strong>}
            </div>
            {customersCreatedToday.length > 0 && isLoading && (
              <p className="placeholder-glow">
                <span className="placeholder" style={{ width: "250px" }}></span>
              </p>
            )}
            {customersCreatedToday.length > 0 && !isLoading && (
              <em>
                Hôm nay có thêm {customersCreatedToday.length} khách hàng mới
              </em>
            )}
          </div>

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  {isLoading && <Loading />}
                  {!isLoading && (
                    <TableContainer
                      columns={columns}
                      data={sortedCustomers}
                      isGlobalFilter={true}
                      isAddNew={true}
                      handleAddNewClick={handleAddNew}
                      customPageSize={10}
                      className="custom-header-css"
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(UserLists)
