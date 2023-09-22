import React, { useEffect, useState } from "react"

import {
  Alert,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap"

import Dropzone from "react-dropzone"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { Link, withRouter } from "react-router-dom"

import * as Yup from "yup"
import { useFormik } from "formik"

//Firebase
import { ref as sRef } from "firebase/storage"
import { storage } from "helpers/firebase"
import { getDownloadURL, uploadBytes } from "firebase/storage"

import {
  getCategoryService as onGetCategoryService,
  getCarsBrand as onGetCarBrand,
  getCarsModelByBrand as onGetCarModelByBrand,
  getCarsProblemByModel as onGetCarProblemByModel,
  addNewCarsItem as onAddNewCarItem,
  resetCarsModel as onResetCarsModel,
  resetCarsProblem as onResetCarsProblem,
} from "store/actions"
import Loader from "components/Loader/Loader"

const AddNewCarItem = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Tạo mới dịch vụ | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const {
    carsBrand,
    carsModelByBrand,
    carsProblemByModel,
    categoryServices,
    isLoading,
  } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
    carsModelByBrand: state.models.carsModelByBrand,
    carsProblemByModel: state.problems.carsProblemByModel,
    categoryServices: state.categoryServicess.categoryServices,
    isLoading: state.items.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetCategoryService())
  }, [dispatch])

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const handleChangeBrand = e => {
    const brandId = e.target.value
    setSelectedBrand(brandId === "" ? null : brandId)
    validation.setFieldValue("brandId", brandId)

    // Fetch models for the selected brand
    if (brandId) {
      dispatch(onGetCarModelByBrand(brandId))
    }
  }

  const handleChangeModel = e => {
    const modelId = e.target.value
    setSelectedModel(modelId === "" ? null : modelId)
    validation.setFieldValue("modelId", modelId)

    // Fetch models for the selected brand
    if (modelId) {
      dispatch(onGetCarProblemByModel(modelId))
    }
  }

  const handleAcceptedFiles = files => {
    if (files.length > 0) {
      const file = files[0]
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
      validation.setFieldValue("photo", file) // Update the 'photo' field in formik
    }
  }

  const handleConfirmService = e => {
    const isServiceValue = e.target.value
    validation.setFieldValue("isService", isServiceValue)

    if (isServiceValue === "false") {
      // If isService is false, set isDefault to false as well
      validation.setFieldValue("isDefault", "false")
    }
  }

  /*
  ==================================================
  FORMIK
  ==================================================
  */

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      price: "",
      warranty: "",
      description: "",
      photo: null,
      isPriceHidden: "",
      isPopular: "",
      isService: "",
      isDefault: "",
      categoryId: "",
      problemId: "",
      brandId: "",
      modelId: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Vui lòng nhập tên vấn đề"),
      price: Yup.number()
        .typeError("Vui lòng nhập số tiền hợp lệ")
        .positive("Giá tiền phải là số dương")
        .required("Vui lòng nhập giá tiền"),
      warranty: Yup.number()
        .typeError("Vui lòng nhập số tháng bảo trì hợp lệ")
        .positive("Số tháng bảo trì phải là số dương")
        .integer("Số tháng bảo trì không phải số thập phân")
        .required("Vui lòng nhập số tháng bảo hành"),
      description: Yup.string().required("Vui lòng nhập mô tả"),
      photo: Yup.mixed().required("Vui lòng chọn hình ảnh"),
      isPriceHidden: Yup.string().required("Vui lòng chọn việc hiện giá."),
      isPopular: Yup.string().required("Vui lòng chọn phổ biến."),
      isService: Yup.string().required("Vui lòng chọn việc là dịch vụ."),
      isDefault: Yup.string().required("Vui lòng chọn dịch vụ mặc định."),
      categoryId: Yup.string().required("Vui lòng chọn nhóm dịch vụ"),
      brandId: Yup.string().required("Vui lòng chọn hãng xe"),
      modelId: Yup.string().when("brandId", {
        is: brandId => !brandId,
        then: Yup.string().nullable().required("Vui lòng chọn hãng xe"),
        otherwise: Yup.string().nullable().required("Vui lòng chọn dòng xe"),
      }),
      problemId: Yup.string().when("modelId", {
        is: modelId => !modelId,
        then: Yup.string().nullable().required("Vui lòng chọn dòng xe"),
        otherwise: Yup.string().nullable().required("Vui lòng chọn vấn đề"),
      }),
    }),
    onSubmit: values => {
      const newValue = {
        ...values,
        isPriceHidden: JSON.parse(values.isPriceHidden),
        isPopular: JSON.parse(values.isPopular),
        isService: JSON.parse(values.isService),
        isDefault: JSON.parse(values.isDefault),
      }

      //Remove value not need
      delete newValue.brandId
      delete newValue.modelId

      console.log(newValue)

      const imageRef = sRef(storage, `items/${values.photo.name}`)
      setIsSubmitting(true)
      uploadBytes(imageRef, values.photo)
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then(url => {
          const newValues = {
            ...newValue,
            photo: url,
          }
          dispatch(onAddNewCarItem(newValues, props.history))

          setIsLoad(false)
        })
        .catch(error => {
          // Handle error, if any
          console.error(error)
          setIsSubmitting(false) // Set isSubmitting to false to allow resubmission
          setIsLoad(false)
        })
    },
  })

  /*
  ==================================================
  FORMAT PRICE VND
  ==================================================
  */

  const formatPriceWithDots = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  /*
  ==================================================
  FORMAT SIZE PHOTO
  ==================================================
  */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  /*
  ==================================================
  Reset Form
  ==================================================
  */

  const handleReset = () => {
    // Reset the form values to their initial state
    validation.resetForm()

    //Rest selected
    dispatch(onResetCarsModel())
    dispatch(onResetCarsProblem())

    setSelectedBrand(null)
    setSelectedModel(null)

    setIsSubmitting(false)

    // Clear any validation errors
    validation.setErrors({})
  }

  return (
    <div className="page-content">
      {(isLoading || isLoad) && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Vấn đề phương tiện" />

        <Row style={{ justifyContent: "center" }}>
          <Col xl={7} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Vấn đề</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để tạo mới vấn đề cho các phương
                  tiện
                </CardSubtitle>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <Row>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label htmlFor="name">Tên dịch vụ*</Label>
                        <Input
                          name="name"
                          placeholder="Nhập tên dịch vụ"
                          type="text"
                          className="form-control"
                          id="validationName"
                          onChange={validation.handleChange}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name
                              ? true
                              : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.name}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label>Nhóm dịch vụ*</Label>
                        <Input
                          type="select"
                          name="categoryId"
                          className="form-control"
                          value={validation.values.categoryId}
                          onChange={e => {
                            validation.handleChange(e)
                          }}
                          invalid={
                            validation.touched.categoryId &&
                            validation.errors.categoryId
                          }
                        >
                          <option value="">Chọn nhóm dịch vụ</option>
                          {categoryServices.map(option => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Input>
                        {validation.touched.categoryId &&
                        validation.errors.categoryId ? (
                          <FormFeedback type="invalid">
                            {validation.errors.categoryId}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label>Hãng xe*</Label>
                        <Input
                          type="select"
                          name="selectedBrand"
                          className="form-control"
                          value={selectedBrand || ""}
                          onChange={handleChangeBrand}
                          invalid={
                            validation.touched.brandId &&
                            validation.errors.brandId
                          }
                        >
                          <option value="">Chọn hãng xe</option>
                          {carsBrand.map(option => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Input>
                        {validation.touched.brandId &&
                          validation.errors.brandId && (
                            <FormFeedback type="invalid">
                              {validation.errors.brandId}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-3">
                        <Label>Dòng xe*</Label>
                        <Input
                          type="select"
                          name="selectedModel"
                          className="form-control"
                          value={selectedModel || ""}
                          onChange={handleChangeModel}
                          invalid={
                            validation.touched.modelId &&
                            validation.errors.modelId
                          }
                        >
                          <option value="">
                            {selectedBrand
                              ? "Chọn dòng xe"
                              : "Vui lòng chọn hãng xe"}
                          </option>
                          {selectedBrand &&
                            (carsModelByBrand.length > 0 ? (
                              carsModelByBrand.map(option => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>
                                Không có dòng xe
                              </option>
                            ))}
                        </Input>
                        {validation.touched.modelId &&
                          validation.errors.modelId && (
                            <FormFeedback type="invalid">
                              {selectedBrand
                                ? validation.errors.modelId
                                : "Vui lòng chọn hãng xe trước"}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-3">
                        <Label>Vấn đề*</Label>
                        <Input
                          type="select"
                          name="problemId"
                          className="form-control"
                          value={validation.values.problemId || ""}
                          onChange={e => {
                            validation.handleChange(e)
                          }}
                          invalid={
                            validation.touched.problemId &&
                            validation.errors.problemId
                          }
                        >
                          <option value="">
                            {selectedModel
                              ? "Chọn vấn đề"
                              : "Vui lòng chọn dòng xe"}
                          </option>
                          {selectedModel &&
                            (carsProblemByModel.length > 0 ? (
                              carsProblemByModel.map(option => (
                                <option key={option.id} value={option.id}>
                                  {option.name}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>
                                Không có vấn đề
                              </option>
                            ))}
                        </Input>
                        {validation.touched.problemId &&
                          validation.errors.problemId && (
                            <FormFeedback type="invalid">
                              {selectedModel
                                ? validation.errors.problemId
                                : "Vui lòng chọn dòng xe trước"}
                            </FormFeedback>
                          )}
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="name">Mô tả*</Label>
                        <Input
                          name="description"
                          type="textarea"
                          className="form-control"
                          onChange={validation.handleChange}
                          value={validation.values.description || ""}
                          invalid={
                            validation.touched.description &&
                            validation.errors.description
                              ? true
                              : false
                          }
                        />
                        {validation.touched.description &&
                        validation.errors.description ? (
                          <FormFeedback type="invalid">
                            {validation.errors.description}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="mb-3">
                        <Label className="d-flex justify-content-between">
                          Giá tiền (VND)*{" "}
                          {validation.values.price && (
                            <div className="text-muted">
                              {formatPriceWithDots(validation.values.price) +
                                " VND"}
                            </div>
                          )}
                        </Label>
                        <Input
                          name="price"
                          placeholder="Nhập giá tiền"
                          type="number"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          value={validation.values.price || ""}
                          invalid={
                            validation.touched.price && validation.errors.price
                              ? true
                              : false
                          }
                        />
                        {validation.touched.price && validation.errors.price ? (
                          <FormFeedback type="invalid">
                            {validation.errors.price}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="d-flex justify-content-between">
                          Bảo hành (tháng)*{" "}
                          {validation.values.warranty && (
                            <div className="text-muted">
                              {validation.values.warranty + " tháng"}
                            </div>
                          )}
                        </Label>
                        <Input
                          name="warranty"
                          placeholder="Nhập số tháng bảo trì"
                          type="number"
                          className="form-control"
                          id="validationCustom01"
                          onChange={validation.handleChange}
                          value={validation.values.warranty || ""}
                          invalid={
                            validation.touched.warranty &&
                            validation.errors.warranty
                              ? true
                              : false
                          }
                        />
                        {validation.touched.warranty &&
                        validation.errors.warranty ? (
                          <FormFeedback type="invalid">
                            {validation.errors.warranty}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label>Cho phép hiện giá*</Label>
                        <Input
                          type="select"
                          name="isPriceHidden"
                          className="form-control"
                          value={validation.values.isPriceHidden}
                          onChange={e => {
                            validation.handleChange(e)
                          }}
                          invalid={
                            validation.touched.isPriceHidden &&
                            validation.errors.isPriceHidden
                          }
                        >
                          <option value="">Chọn hiện giá</option>
                          <option value="true">Có</option>
                          <option value="false">Không</option>
                        </Input>
                        {validation.touched.isPriceHidden &&
                        validation.errors.isPriceHidden ? (
                          <FormFeedback type="invalid">
                            {validation.errors.isPriceHidden}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label>Phổ biến*</Label>
                        <Input
                          type="select"
                          name="isPopular"
                          className="form-control"
                          value={validation.values.isPopular}
                          onChange={e => {
                            validation.handleChange(e)
                          }}
                          invalid={
                            validation.touched.isPopular &&
                            validation.errors.isPopular
                          }
                        >
                          <option value="">Chọn việc phổ biến</option>
                          <option value="true">Có</option>
                          <option value="false">Không</option>
                        </Input>
                        {validation.touched.isPopular &&
                        validation.errors.isPopular ? (
                          <FormFeedback type="invalid">
                            {validation.errors.isPopular}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label>Xác định dịch vụ*</Label>
                        <Input
                          type="select"
                          name="isService"
                          className="form-control"
                          value={validation.values.isService}
                          onChange={handleConfirmService}
                          invalid={
                            validation.touched.isService &&
                            validation.errors.isService
                          }
                        >
                          <option value="">Xác định là dịch vụ</option>
                          <option value="true">Có</option>
                          <option value="false">Không</option>
                        </Input>
                        {validation.touched.isService &&
                        validation.errors.isService ? (
                          <FormFeedback type="invalid">
                            {validation.errors.isService}
                          </FormFeedback>
                        ) : null}
                      </div>
                      {validation.values.isService === "true" && (
                        <div className="mb-3">
                          <Label>Dịch vụ mặc định*</Label>
                          <Input
                            type="select"
                            name="isDefault"
                            className="form-control"
                            value={validation.values.isDefault}
                            onChange={e => {
                              validation.handleChange(e)
                            }}
                            invalid={
                              validation.touched.isDefault &&
                              validation.errors.isDefault
                            }
                          >
                            <option value="">Xác định dịch vụ mặc định</option>
                            <option value="true">Có</option>
                            <option value="false">Không</option>
                          </Input>
                          {validation.touched.isDefault &&
                          validation.errors.isDefault ? (
                            <FormFeedback type="invalid">
                              {validation.errors.isDefault}
                            </FormFeedback>
                          ) : null}
                        </div>
                      )}
                    </Col>
                    <div>
                      <Label htmlFor="formrow-email-Input">
                        Hình ảnh (Logo)*
                      </Label>
                      <Dropzone
                        onDrop={handleAcceptedFiles}
                        accept="image/*"
                        maxFiles={1}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick mt-2"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} name="photo" />
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                              </div>
                              <h4>Kéo thả ảnh tại đây hoặc nhấp để tải ảnh</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>

                      {validation.touched.photo && validation.errors.photo ? (
                        <Alert color="danger mt-2">
                          {validation.errors.photo}
                        </Alert>
                      ) : null}

                      <div
                        className="dropzone-previews mt-3"
                        id="file-previews"
                      >
                        {validation.values.photo && (
                          <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={validation.values.photo.name}
                                    src={validation.values.photo.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {validation.values.photo.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>
                                      {validation.values.photo.formattedSize}
                                    </strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        )}
                      </div>
                    </div>
                  </Row>

                  <hr />
                  <Row className="mt-3">
                    <Col sm="6">
                      <Button
                        className="btn btn-secondary"
                        onClick={() => props.history.goBack()}
                      >
                        <i className="mdi mdi-arrow-left me-1" /> Trở về{" "}
                      </Button>
                    </Col>
                    <Col sm="6">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary me-2"
                        >
                          Tạo mới
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleReset}
                        >
                          Hủy
                        </button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(AddNewCarItem)
