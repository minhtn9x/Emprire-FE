import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"

import TableContainer from "components/Common/TableContainer"
import { Link, withRouter, useLocation } from "react-router-dom"

import { Name, Img, Warranty, Price, IsCell } from "./CarItemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import { getCarsItemByProblem as onGetCarsItemByProblem } from "store/actions"
import Loader from "components/Loader/Loader"

const CarItemByProblem = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  PARAMS
  ==================================================
  */

  const {
    match: { params },
  } = props

  const location = useLocation()
  const problemName = location.state && location.state.problemName

  //meta title
  useEffect(() => {
    if (location.state) {
      document.title = `Dịch vụ ${problemName} | Empire Garage`
    } else {
      document.title = "Empire Garage"
    }
  })

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsItemByProblem, isLoading } = useSelector(state => ({
    carsItemByProblem: state.items.carsItemByProblem,
    isLoading: state.items.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [items, setItems] = useState({
    id: "",
    name: "",
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    if (params && params.pId) {
      dispatch(onGetCarsItemByProblem(params.pId))
    }
  }, [params, dispatch])

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
        Header: "Hình ảnh",
        accessor: "photo",
        disableFilters: true,
        filterable: true,
        accessor: cellProps => (
          <>
            {!cellProps.photo ? (
              <div className="avatar-sm">
                <span className="avatar-title rounded">
                  {cellProps.name.charAt(0)}
                </span>
              </div>
            ) : (
              <div>
                <img
                  className="rounded avatar-md"
                  src={cellProps.photo}
                  alt=""
                />
              </div>
            )}
          </>
        ),
      },
      {
        Header: "Tên dịch vụ",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Giá tiền",
        accessor: "presentPrice",
        filterable: true,
        Cell: cellProps => {
          return <Price {...cellProps} />
        },
      },
      {
        Header: "Bảo hành",
        accessor: "warranty",
        filterable: true,
        Cell: cellProps => {
          return <Warranty {...cellProps} />
        },
      },
      {
        Header: "Mặc định",
        accessor: "isDefault",
        filterable: true,
        Cell: cellProps => {
          return <IsCell {...cellProps} />
        },
      },

      {
        Header: "",
        accessor: "action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/edit-item/${cellProps.row.original.id}`}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Cập nhật
                </UncontrolledTooltip>
              </Link>
              {/* <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const userData = cellProps.row.original
                  onClickDelete(userData)
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                <UncontrolledTooltip placement="top" target="deletetooltip">
                  Xóa
                </UncontrolledTooltip>
              </Link> */}
            </div>
          )
        },
      },
    ],
    []
  )

  /*
  ==================================================
  SORT ITEM
  ==================================================
  */

  const sortedItems = [...carsItemByProblem].reverse()

  /*
  ==================================================
  ADD NEW
  ==================================================
  */

  const handleAddNew = () => {
    props.history.push("/create-new-item")
  }

  /*
  ==================================================
  ADD NEW EXCEL
  ==================================================
  */

  const handleAddNewExcel = () => {
    props.history.push("/import-data-excel")
  }

  return (
    <React.Fragment>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Quản lý"
              breadcrumbItem={`Dịch vụ vấn đề - ${problemName}`}
            />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={sortedItems}
                      isGlobalFilter={true}
                      isAddNew={true}
                      isAddFileExcel={true}
                      handleAddNewClick={handleAddNew}
                      handleAddFileExcelClick={handleAddNewExcel}
                      customPageSize={10}
                      className="custom-header-css"
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </React.Fragment>
  )
}

CarItemByProblem.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarItemByProblem)
