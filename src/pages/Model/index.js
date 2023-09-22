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
  getCarsModel as onGetCarsModel,
  deleteCarsModel as onDeleteCarModel,
} from "store/actions"
import DeleteModal from "components/Common/DeleteModal"
import Loader from "components/Loader/Loader"

/*
  ==================================================
  TRANSFORM DATA
  ==================================================
  */

const transformData = data => {
  const transformedData = []

  // Create an object to group models by brand
  const groupedByBrand = data.reduce((acc, model) => {
    const { id, name, brand } = model
    if (!acc[brand.id]) {
      acc[brand.id] = { id: brand.id, category: brand.name, models: [] }
    }
    acc[brand.id].models.push({ id, name, photo: brand.photo })
    return acc
  }, {})

  // Convert the grouped object to an array of objects
  for (const brandId in groupedByBrand) {
    transformedData.push(groupedByBrand[brandId])
  }

  return transformedData
}

const CarModels = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Các dòng xe | Empire Garage"
  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsModel, isLoading } = useSelector(state => ({
    carsModel: state.models.carsModel,
    isLoading: state.models.isLoading,
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
    dispatch(onGetCarsModel())
  }, [dispatch, onGetCarsModel])

  useEffect(() => {
    const transformedData = transformData(carsModel)
    setModels(transformedData)
  }, [carsModel])

  useEffect(() => {
    const transformedData = transformData(carsModel)
    if (!isEmpty(transformedData)) {
      setModels(transformedData)
    }
  }, [carsModel])

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

    if (query === "") {
      // Revert to the original transformed data
      const transformedData = transformData(carsModel)
      setModels(transformedData)
    } else {
      // Filter models based on the search query
      const filteredData = models.map(brand => {
        return {
          ...brand,
          models: brand.models.filter(
            model =>
              model.name.toLowerCase().includes(query) ||
              brand.category.toLowerCase().includes(query)
          ),
        }
      })

      setModels(filteredData)
    }
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
      {isLoading && <Loader />}
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Quản lý" breadcrumbItem="Tất cả dòng xe" />
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
                      placeholder="Tìm kiếm"
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
            {sortedCarsModel.map(
              brand =>
                brand.models.length > 0 && ( // Correctly place the curly braces here
                  <React.Fragment key={brand.id}>
                    <Row>
                      <h4>{brand.category}</h4>
                      {brand.models.map(m => (
                        <Col xl="4" sm="6" key={m.id}>
                          <Card>
                            <CardBody>
                              <div className="d-flex">
                                <div className="avatar-md me-4">
                                  <span className="avatar-title rounded-circle bg-transparent text-danger font-size-16">
                                    <img
                                      src={m && m.photo}
                                      alt=""
                                      height="55"
                                    />
                                  </span>
                                </div>

                                <div className="flex-grow-1">
                                  <h5 className="d-flex justify-content-between align-items-center">
                                    <strong className="text-black font-size-16">
                                      {m && m.name}
                                    </strong>
                                    <Dropdown
                                      isOpen={openDropdownId === m.id}
                                      toggle={() => toggleDropdown(m.id)}
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
                                          to={`/edit-model/${m.id}`}
                                          className="dropdown-item"
                                        >
                                          Cập nhật
                                        </Link>
                                        <Link
                                          to="#"
                                          className="dropdown-item"
                                          onClick={onClickDelete(m.id, m.name)}
                                        >
                                          Xóa
                                        </Link>
                                      </DropdownMenu>
                                    </Dropdown>
                                  </h5>
                                  <p className="text-muted mb-3 text-uppercase">
                                    {brand.category}
                                  </p>
                                  <Link
                                    to={`/brands/${brand.id}/${
                                      brand.category
                                    }/models/${m.id}/${slugify(m.name, {
                                      lower: true,
                                    })}`}
                                    className="text-decoration-underline text-primary"
                                  >
                                    Xem các vấn đề{" "}
                                    <i className="mdi mdi-arrow-right"></i>
                                  </Link>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </React.Fragment>
                )
            )}
          </Row>
          {/* Render a message when no results are found for any category */}
          {models.every(brand => brand.models.length === 0) && (
            <div className="w-100 text-center mt-5">
              <h4>Không tìm thấy kết quả tìm kiếm "{searchQuery}"</h4>
            </div>
          )}
        </Container>
      </div>
    </React.Fragment>
  )
}

CarModels.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
}

export default withRouter(CarModels)
