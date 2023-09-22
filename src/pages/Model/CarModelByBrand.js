import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import slugify from "slugify"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap"
import { isEmpty, map } from "lodash"
import { Link, withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  getCarsModelByBrand as onGetCarsModelByBrand,
  deleteCarsModel as onDeleteCarModel,
} from "store/actions"
import DeleteModal from "components/Common/DeleteModal"

const CarModelByBrand = props => {
  const {
    match: { params },
  } = props

  const dispatch = useDispatch()

  //meta title
  useEffect(() => {
    if (params) {
      document.title = `Dòng xe ${
        params.name.charAt(0).toUpperCase() + params.name.slice(1)
      } | Empire Garage`
    } else {
      document.title = "Empire Garage"
    }
  })

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsModelByBrand } = useSelector(state => ({
    carsModelByBrand: state.models.carsModelByBrand,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [models, setModels] = useState([])

  const [model, setModel] = useState({ id: "", name: "" })

  const [openDropdownId, setOpenDropdownId] = useState(null)

  const [searchQuery, setSearchQuery] = useState("")

  //delete
  const [deleteModal, setDeleteModal] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarsModelByBrand(params.id))
    }
  }, [params, onGetCarsModelByBrand, dispatch])

  useEffect(() => {
    setModels(carsModelByBrand)
  }, [carsModelByBrand])

  useEffect(() => {
    if (!isEmpty(carsModelByBrand)) {
      setModels(carsModelByBrand)
    }
  }, [carsModelByBrand])

  /*
  ==================================================
  DROP DOWN
  ==================================================
  */

  const toggleDropdown = modelId => {
    setOpenDropdownId(prevId => (prevId === modelId ? null : modelId))
  }

  /*
  ==================================================
  SEARCH FUNCTION
  ==================================================
  */

  const handleSearch = event => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)

    // Filter models based on the search query
    const filtered = carsModelByBrand.filter(model =>
      model.name.toLowerCase().includes(query)
    )

    setModels(filtered)
  }

  /*
  ==================================================
  SORT
  ==================================================
  */

  const sortedCarsModel = [...models].reverse()

  /*
  ==================================================
  HANDLE DELETE
  ==================================================
  */

  const onClickDelete = (id, name) => () => {
    setModel({
      ...model,
      id: id,
      name: name,
    })
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(onDeleteCarModel(model))

    setDeleteModal(false)
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs
            title="Quản lý"
            breadcrumbItem={`Dòng xe - ${
              params.name.charAt(0).toUpperCase() + params.name.slice(1)
            }`}
          />
          <Row>
            <Col sm={4}>
              <div className="search-box me-2 mb-2 d-inline-block search-table">
                <div className="position-relative">
                  <label htmlFor="search-bar-0" className="search-label">
                    <span id="search-bar-0-label" className="sr-only"></span>
                    <input
                      id="search-bar-0"
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm dòng xe"
                      value={searchQuery}
                      onChange={handleSearch} // Call the search function on input change
                    />
                  </label>
                  <i className="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </Col>
            <Col sm={8}>
              <div className="d-flex justify-content-end">
                <div className="text-sm-end">
                  <Button
                    type="button"
                    color="primary"
                    className="btn-rounded mb-2 me-2"
                    onClick={() => props.history.push("/create-new-model")}
                  >
                    <i className="mdi mdi-plus me-1" />
                    Tạo mới
                  </Button>
                </div>
                <div className="text-sm-end">
                  <Button
                    type="button"
                    color="success"
                    className="mb-2 me-2"
                    onClick={() => props.history.push("/import-data-excel")}
                  >
                    <i className="mdi mdi-file-plus-outline me-1" />
                    Excel
                  </Button>
                </div>
              </div>
            </Col>
            {map(sortedCarsModel, model => (
              <Col xl="4" sm="6" key={model.id}>
                <Card>
                  <CardBody>
                    <div className="d-flex">
                      <div className="avatar-md me-4">
                        <span className="avatar-title rounded-circle bg-transparent text-danger font-size-16">
                          <img
                            src={model.brand && model.brand.photo}
                            alt=""
                            height="55"
                          />
                        </span>
                      </div>

                      <div className="flex-grow-1">
                        <h5 className="d-flex justify-content-between align-items-center">
                          <strong className="text-black font-size-17">
                            {model.name}
                          </strong>
                          <Dropdown
                            isOpen={openDropdownId === model.id}
                            toggle={() => toggleDropdown(model.id)}
                          >
                            <DropdownToggle
                              tag="a"
                              className="btn nav-btn"
                              type="button"
                            >
                              <i className="fa fa-fw fa-bars" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              <Link
                                to={`/edit-model/${model.id}`}
                                className="dropdown-item"
                              >
                                Cập nhật
                              </Link>
                              <Link
                                to="#"
                                className="dropdown-item"
                                onClick={onClickDelete(model.id, model.name)}
                              >
                                Xóa
                              </Link>
                            </DropdownMenu>
                          </Dropdown>
                        </h5>
                        <p className="text-muted mb-3 text-uppercase">
                          {params.name}
                        </p>
                        <Link
                          to={`/brands/${params.id}/${params.name}/models/${
                            model.id
                          }/${slugify(model.name, { lower: true })}`}
                          className="text-decoration-underline text-primary"
                        >
                          Xem các vấn đề <i className="mdi mdi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CarModelByBrand.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarModelByBrand)
