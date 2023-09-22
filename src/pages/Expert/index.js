import React, { useEffect, useState, useRef, useMemo } from "react"
import { withRouter, Link } from "react-router-dom"
import TableContainer from "../../components/Common/TableContainer"
import { Card, CardBody, Col, Container, Row } from "reactstrap"

import { Name, Email, Phone, Gender, WorkloadTotal } from "./expertlistCol"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import {
  getExperts as onGetExperts,
  putChangeStatusExpert as onChangeStatusExpert,
} from "store/users/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import Loading from "components/Loader/Loading"
import ConfirmStatusModal from "./ConfirmStatusModal"

const ExpertLists = props => {
  //meta title
  document.title = "Danh sách kỹ thuật viên | Empire Garage"

  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { experts, isShow, isLoading } = useSelector(state => ({
    experts: state.userLists.experts,
    isLoading: state.userLists.isLoading,
    isShow: state.Layout.isShow,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [expertInfo, setExpertInfo] = useState({
    id: "",
    fullname: "",
    phone: "",
    email: "",
    gender: "",
    workloadTotal: "",
    isMaxWorkloadPerDay: "",
    isAvailable: "",
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetExperts())
  }, [dispatch])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetExperts())
    }
  }, [dispatch, isShow])

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const sortedExperts = [...experts].sort((a, b) => {
    if (a.isAvailable === b.isAvailable) {
      return 0
    }
    if (a.isAvailable) {
      return -1
    }
    return 1
  })

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const countAvailableExperts = experts.reduce((count, expert) => {
    if (expert.isAvailable) {
      return count + 1
    }
    return count
  }, 0)

  /*
  ==================================================
  CHANGE STATUS EXPERT
  ==================================================
  */

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const onClickConfirm = values => {
    setExpertInfo({
      id: values.id,
      fullname: values.fullname,
      phone: values.phone,
      email: values.email,
      gender: values.gender,
      workloadTotal: values.workloadTotal,
      isMaxWorkloadPerDay: values.isMaxWorkloadPerDay,
      isAvailable: values.isAvailable,
    })

    toggle()
  }

  const handleChangeStatusExpert = () => {
    dispatch(onChangeStatusExpert(expertInfo))
    toggle(false)
  }

  /*
  ==================================================
  COLUMN
  ==================================================
  */

  const createCheckboxColumn = initialValue => {
    const [isChecked, setIsChecked] = useState(initialValue.isAvailable)

    const handleChange = () => {
      setIsChecked(!isChecked)
      const newValue = {
        id: initialValue.id,
        fullname: initialValue.fullname,
        phone: initialValue.phone,
        email: initialValue.email,
        gender: initialValue.gender,
        workloadTotal: initialValue.workloadTotal,
        isMaxWorkloadPerDay: initialValue.isMaxWorkloadPerDay,
        isAvailable: !isChecked,
      }
      onClickConfirm(newValue)
      toggle(false)
    }

    return (
      <div className="form-check form-switch">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isChecked}
          onChange={handleChange}
        />
      </div>
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: "STT",
        Cell: ({ row }) => {
          return <span className="text-align-center">{row.index + 1}</span>
        },
      },
      {
        Header: "Tên kỹ thuật viên",
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
        Header: "Tổng Workload",
        accessor: "workloadTotal",
        filterable: true,
        Cell: cellProps => {
          return <WorkloadTotal {...cellProps} />
        },
      },
      {
        Header: "Trạng thái",
        Cell: cellProps => {
          return createCheckboxColumn(cellProps.row.original)
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <ConfirmStatusModal
        isOpen={isOpen}
        toggle={toggle}
        expert={expertInfo}
        handleChangeStatusExpert={handleChangeStatusExpert}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Kỹ thuật viên"
            breadcrumbItem="Danh sách các kỹ thuật viên"
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
              {!isLoading && <strong>{experts.length}</strong>}
            </div>
            {countAvailableExperts > 0 && isLoading && (
              <p className="placeholder-glow">
                <span className="placeholder" style={{ width: "250px" }}></span>
              </p>
            )}
            {countAvailableExperts > 0 && !isLoading && (
              <em>
                Đang có {countAvailableExperts} kỹ thuật viên đang làm việc
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
                      data={sortedExperts}
                      isGlobalFilter={true}
                      isAddUserList={false}
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

export default withRouter(ExpertLists)
