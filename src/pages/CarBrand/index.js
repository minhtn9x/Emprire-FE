import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  UncontrolledTooltip,
} from "reactstrap"
import { map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//redux
import { useSelector, useDispatch } from "react-redux"

import {
  getCarsBrand as onGetCarsBrand,
  deleteCarsBrand as onDeleteCarsBrand,
} from "store/actions"
import { Link, withRouter } from "react-router-dom"

import Loading from "components/Loader/Loading"
import DeleteModal from "components/Common/DeleteModal"
import Loader from "components/Loader/Loader"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "helpers/firebase"

const CarBrand = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Thương hiệu xe | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsBrand, isLoading } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
    isLoading: state.brands.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [brand, setBrand] = useState({
    id: "",
    name: "",
    photo: "",
  })

  //Search
  const [searchQuery, setSearchQuery] = useState("")

  // Pagination
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)

  //delete
  const [deleteModal, setDeleteModal] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    if (carsBrand && !carsBrand.length) {
      dispatch(onGetCarsBrand())
    }
  }, [dispatch])

  /*
  ==================================================
  SORT
  ==================================================
  */

  const sortedCarsBrand = [...carsBrand].reverse()

  /*
  ==================================================
  SEARCHING
  ==================================================
  */

  const filteredCarsBrand = sortedCarsBrand.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  /*
  ==================================================
  PAGINATION
  ==================================================
  */

  // Calculate the total number of pages
  const totalPage = Math.ceil(filteredCarsBrand.length / itemsPerPage)

  // Function to handle page click
  const handlePageClick = pageNum => {
    setCurrentPage(pageNum)
  }

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  /*
  ==================================================
  HANDLE DELETE
  ==================================================
  */

  const onClickDelete = (id, name, photo) => () => {
    setBrand({
      ...brand,
      id: id,
      name: name,
      photo: photo,
    })
    setDeleteModal(true)
  }

  const handleDelete = () => {
    dispatch(onDeleteCarsBrand(brand))
    deletePhotoFromFirebase(brand.photo)
    setDeleteModal(false)
  }

  /*
  ==================================================
  REMOVE IMAGE
  ==================================================
  */

  const deletePhotoFromFirebase = async photoUrl => {
    try {
      // Get the reference to the photo in Firebase Storage
      const photoRef = ref(storage, photoUrl)

      // Delete the photo using the deleteObject method
      await deleteObject(photoRef)
    } catch (error) {
      // Handle the error if the photo deletion fails.
      console.error("Error deleting photo:", error)
    }
  }

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDelete}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Quản lý" breadcrumbItem="Thương hiệu xe" />

          {isLoading && <Loader />}
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
                      placeholder="Tìm kiếm thương hiệu"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
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
                    onClick={() => props.history.push("/create-new-brand")}
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
            {map(
              filteredCarsBrand.slice(startIndex, endIndex),
              (brand, key) => (
                <Col xl="3" sm="6" key={"brand" + key}>
                  <Card className="text-center">
                    <CardBody>
                      {!brand.photo ? (
                        <div className="avatar-md mx-auto mb-4">
                          <span
                            className={
                              "avatar-title bg-soft bg-" +
                              brand.name +
                              " text-" +
                              brand.name +
                              " font-size-16"
                            }
                          >
                            {brand.name.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <img
                            className="avatar-md rounded"
                            src={brand.photo}
                            alt=""
                          />
                        </div>
                      )}

                      <h5 className="font-size-15 mb-1">
                        <Link
                          to={`/brands/${brand.id}/${brand.name}`}
                          className="text-dark"
                        >
                          {brand.name}
                        </Link>
                      </h5>
                      {/* <p className="text-muted">{user.designation}</p> */}
                    </CardBody>
                    <CardFooter className="bg-transparent border-top">
                      <div className="contact-links d-flex font-size-20">
                        <div className="flex-fill">
                          <Link
                            to={`/brands/${brand.id}/${brand.name}`}
                            id={"brand-view-model" + brand.id}
                          >
                            <i className="mdi mdi-eye-circle-outline" />
                            <UncontrolledTooltip
                              placement="top"
                              target={"brand-view-model" + brand.id}
                            >
                              Xem dòng xe
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                        <div className="flex-fill">
                          <Link
                            to={`/edit-brand/${brand.id}`}
                            id={"brand-edit" + brand.id}
                          >
                            <i className="mdi mdi-file-document-edit-outline" />
                            <UncontrolledTooltip
                              placement="top"
                              target={"brand-edit" + brand.id}
                            >
                              Chỉnh sửa
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                        <div className="flex-fill">
                          <Link
                            to="#"
                            id={"brand-delete" + brand.id}
                            onClick={onClickDelete(
                              brand.id,
                              brand.name,
                              brand.photo
                            )}
                          >
                            <i className="mdi mdi-playlist-remove" />
                            <UncontrolledTooltip
                              placement="top"
                              target={"brand-delete" + brand.id}
                            >
                              Xóa
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              )
            )}
            <Row>
              <Col lg="12">
                <Pagination className="pagination pagination-rounded justify-content-center mb-2">
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      previous
                      href="#"
                      onClick={() => handlePageClick(currentPage - 1)}
                    />
                  </PaginationItem>
                  {map(Array(totalPage), (item, i) => (
                    <PaginationItem active={i + 1 === currentPage} key={i}>
                      <PaginationLink
                        onClick={() => handlePageClick(i + 1)}
                        href="#"
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage === totalPage}>
                    <PaginationLink
                      next
                      href="#"
                      onClick={() => handlePageClick(currentPage + 1)}
                    />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

CarBrand.propTypes = {
  isLoading: PropTypes.bool,
}

export default withRouter(CarBrand)
