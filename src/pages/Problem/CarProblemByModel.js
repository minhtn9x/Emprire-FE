import React, { useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap"
import TableContainer from "components/Common/TableContainer"
import { Link, withRouter } from "react-router-dom"

import { Name, Symptoms, IntendedMinutes } from "./CarProblemlistCol"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  getCarsProblemByModel as onGetCarsProblemByModel,
  deleteCarsProblem as onDeleteProblem,
} from "store/actions"
import DeleteModal from "components/Common/DeleteModal"
import Loader from "components/Loader/Loader"

const CarProblemByModel = props => {
  //meta title
  useEffect(() => {
    if (params) {
      document.title = `Vấn đề xe ${
        params.mName.charAt(0).toUpperCase() + params.mName.slice(1)
      } | Empire Garage`
    } else {
      document.title = "Empire Garage"
    }
  })

  const {
    match: { params },
  } = props

  const { history } = props
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsProblemByModel, isLoading } = useSelector(state => ({
    carsProblemByModel: state.problems.carsProblemByModel,
    isLoading: state.problems.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [problem, setProblem] = useState({
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
    if (params && params.mId) {
      dispatch(onGetCarsProblemByModel(params.mId))
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
        Header: "Tên vấn đề",
        accessor: "name",
        filterable: true,
        Cell: cellProps => {
          return <Name {...cellProps} />
        },
      },
      {
        Header: "Triệu chứng",
        accessor: "symptom.name",
        filterable: true,
        Cell: cellProps => {
          return <Symptoms {...cellProps} />
        },
      },
      {
        Header: "Thời gian dự kiến (phút)",
        accessor: "intendedMinutes",
        filterable: true,
        Cell: cellProps => {
          return <IntendedMinutes {...cellProps} />
        },
      },
      {
        Header: "Các dịch vụ đi kèm",
        accessor: "view",
        disableFilters: true,
        Cell: cellProps => {
          const { id, name } = cellProps.row.original
          const slugName = slugify(name, {
            replacement: "-",
            remove: undefined,
            lower: true,
            strict: false,
            locale: "vi",
            trim: false,
          })

          const problemName = name

          return (
            <Button
              type="button"
              color="primary"
              className="btn-sm btn-rounded"
              onClick={() =>
                history.push(
                  `/brands/${params.bId}/${params.bName}/models/${params.mId}/${params.mName}/problems/${id}/${slugName}`,
                  { problemName } // Pass the object as a second parameter for query parameters
                )
              }
            >
              Xem các dịch vụ
            </Button>
          )
        },
      },

      {
        Header: "",
        accessor: "action",
        Cell: cellProps => {
          return (
            <div className="d-flex gap-3">
              <Link
                to={`/edit-problem/${cellProps.row.original.id}`}
                className="text-success"
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                  Cập nhật
                </UncontrolledTooltip>
              </Link>
              <Link
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
              </Link>
            </div>
          )
        },
      },
    ],
    []
  )

  /*
  ==================================================
  SORT
  ==================================================
  */

  const sortedProblem = [...carsProblemByModel].reverse()

  /*
  ==================================================
  DELETE
  ==================================================
  */

  const onClickDelete = (id, name) => {
    setProblem({
      ...problem,
      id: id,
      name: name,
    })
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(onDeleteProblem(problem))
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

  /*
  ==================================================
  ADD NEW
  ==================================================
  */

  const handleAddNew = () => {
    props.history.push("/create-new-problem")
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
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title="Quản lý"
              breadcrumbItem={`Vấn đề xe - ${params.mName}`}
            />
            <Row>
              <Col lg="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={sortedProblem}
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

CarProblemByModel.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarProblemByModel)
