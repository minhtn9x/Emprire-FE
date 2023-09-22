import Loader from "components/Loader/Loader"
import React, { useState } from "react"
import Dropzone from "react-dropzone"
import { Link, withRouter } from "react-router-dom/cjs/react-router-dom.min"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import ExcelPNG from "../../assets/images/excel.png"

import * as Yup from "yup"
import { useFormik } from "formik"

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
  Label,
  Row,
} from "reactstrap"

import { useSelector, useDispatch } from "react-redux"

import { importDataExcel, resetErrorDataExcel } from "store/actions"

const ImportExcelCreate = props => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading, error } = useSelector(state => ({
    isLoading: state.imports.isLoading,
    error: state.imports.error,
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
      validation.setFieldValue("data", file)
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
      data: null,
    },
    validationSchema: Yup.object({
      data: Yup.mixed().required("Vui lòng chọn file excel"),
    }),
    onSubmit: values => {
      dispatch(importDataExcel(values.data, props.history))
      setIsSubmitting(true)
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
    validation.setFieldValue("data", "")

    // Clear any validation errors
    validation.setErrors({})

    setIsSubmitting(false)

    dispatch(resetErrorDataExcel())
  }

  return (
    <div className="page-content">
      {(isLoading || isLoad) && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Thêm mới với file Excel" />

        <Row style={{ justifyContent: "center" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Thêm mới với file Excel</CardTitle>
                <CardSubtitle className="mb-4">
                  {" "}
                  Chọn file trong khung bên dưới để tạo mới bằng Excel
                </CardSubtitle>

                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <div>
                    <Label htmlFor="formrow-email-Input">File*</Label>
                    {error ? <Alert color="danger">{error}</Alert> : null}
                    <Dropzone
                      onDrop={handleAcceptedFiles}
                      accept=".xlsx, .xls"
                      maxFiles={1}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Kéo thả ảnh tại đây hoặc nhấp để tải ảnh</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>

                    {validation.touched.data && validation.errors.data ? (
                      <Alert color="danger mt-2">
                        {validation.errors.data}
                      </Alert>
                    ) : null}

                    <div className="dropzone-previews mt-3" id="file-previews">
                      {validation.values.data && (
                        <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={validation.values.data.name}
                                  src={ExcelPNG}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {validation.values.data.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>
                                    {validation.values.data.formattedSize}
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

export default withRouter(ImportExcelCreate)
