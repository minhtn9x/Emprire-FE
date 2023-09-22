import React, { useState } from "react"
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
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"

import Dropzone from "react-dropzone"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { useSelector, useDispatch } from "react-redux"

import { addNewCarsBrand as onAddNewCarBrand } from "store/actions"

import { Link, withRouter } from "react-router-dom"

import * as Yup from "yup"
import { useFormik } from "formik"

//Firebase
import { ref as sRef } from "firebase/storage"
import { storage } from "helpers/firebase"
import { getDownloadURL, uploadBytes } from "firebase/storage"
import Loader from "components/Loader/Loader"

const AddNewCarBrand = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading } = useSelector(state => ({
    isLoading: state.brands.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

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

  /**
   * Formats the size
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
  FORM
  ==================================================
  */

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: "",
      photo: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên thương hiệu"),
      photo: Yup.mixed().required("Vui lòng chọn hình ảnh"),
    }),
    onSubmit: values => {
      setIsLoad(true)

      const imageRef = sRef(storage, `brand/${values.photo.name}`)
      setIsSubmitting(true)
      uploadBytes(imageRef, values.photo)
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then(url => {
          const newValues = {
            ...values,
            photo: url,
          }
          dispatch(onAddNewCarBrand(newValues, props.history))

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
  Reset Form
  ==================================================
  */

  const handleReset = () => {
    // Reset the form values to their initial state
    validation.resetForm()

    // Clear the selected value for brandId
    validation.setFieldValue("photo", "")

    // Clear any validation errors
    validation.setErrors({})

    setIsSubmitting(false)
  }

  return (
    <div className="page-content">
      {(isLoading || isLoad) && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Thương hiệu" />

        <Row style={{ justifyContent: "center" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Tạo mới thương hiệu</CardTitle>
                <CardSubtitle className="mb-4">
                  {" "}
                  Nhập vào chỗ trống bên dưới để tạo mới thương hiệu
                </CardSubtitle>

                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <FormGroup className="mb-4" row>
                    <Label md="3" className="col-form-label">
                      Tên thương hiệu*
                    </Label>
                    <Col md="9">
                      <Input
                        name="name"
                        placeholder="Nhập tên thương hiệu"
                        type="text"
                        className="form-control"
                        id="validationCustom01"
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
                    </Col>
                  </FormGroup>

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

                    <div className="dropzone-previews mt-3" id="file-previews">
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

export default withRouter(AddNewCarBrand)
