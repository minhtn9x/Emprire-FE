import React, { useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"
import { isEmpty, map } from "lodash"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter, useLocation } from "react-router-dom"

import { Name, Img, Warranty, Price, IsCell, Category } from "./CarItemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  getCarsItem as onGetCarsItem,
  deleteCarsItem as onDeleteCarItem,
} from "store/actions"
import DeleteModal from "components/Common/DeleteModal"
import Loader from "components/Loader/Loader"

const CarItems = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  PARAMS
  ==================================================
  */

  const location = useLocation()
  const problemName = location.state && location.state.problemName

  //meta title

  document.title = `Tất cả dịch vụ xe | Empire Garage`

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsItem, isLoading } = useSelector(state => ({
    carsItem: state.items.carsItem,
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

  //delete
  const [deleteModal, setDeleteModal] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarsItem())
  }, [dispatch])

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
        Header: "Nhóm",
        accessor: "category.name",
        filterable: true,
        Cell: cellProps => {
          return <Category {...cellProps} />
        },
      },
      {
        Header: "Giá tiền",
        accessor: carsItem => {
          const latestPrice = carsItem.prices.reduce((latest, price) => {
            if (!latest || price.priceFrom > latest.priceFrom) {
              return price
            }
            return latest
          }, null)

          return latestPrice ? latestPrice.price : "" // Return the latest price value
        },
        filterable: true,
        Cell: cellProps => {
          return <Price {...cellProps} />
        }, // Use the Price component for rendering
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
        Header: "Đang hoạt động",
        accessor: "isActived",
        filterable: true,
        Cell: cellProps => {
          return <IsCell {...cellProps} />
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
                  const id = cellProps.row.original.id
                  const name = cellProps.row.original.name
                  onClickDelete(id, name)
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

  const sortedItems = [...carsItem].reverse()

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

  /*
  ==================================================
  DELETE
  ==================================================
  */

  const onClickDelete = (id, name) => {
    setItems({
      ...items,
      id: id,
      name: name,
    })
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(onDeleteCarItem(items))
    onPaginationPageChange(1)
    setDeleteModal(false)
  }

  var node = useRef()
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page)
    }
  }

  const handleAddNewExcel = () => {
    props.history.push("/import-data-excel")
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Quản lý" breadcrumbItem="Tất cả dịch vụ xe" />
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

CarItems.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarItems)
