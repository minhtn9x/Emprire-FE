import React, { useEffect, useState } from "react"

import {
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

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Link, withRouter } from "react-router-dom"

import * as Yup from "yup"
import { useFormik } from "formik"

import {
  getCarsModelByBrand as onGetCarModelByBrand,
  getCarsBrand as onGetCarBrand,
  getSymptomsLists as onGetCarSymptoms,
  updateCarsProblem as onUpdateCarProblem,
  resetCarsModel as onResetCarsModel,
  getCarsProblemDetail as onGetCarProblemDetail,
} from "store/actions"
import Loader from "components/Loader/Loader"

const EditCarProblem = props => {
  const dispatch = useDispatch()

  //meta title
  useEffect(() => {
    if (carsProblemDetail) {
      document.title = `${carsProblemDetail.name} | Empire Garage`
    } else {
      document.title = `Empire Garage`
    }
  })

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const {
    carsBrand,
    carsModelByBrand,
    symptoms,
    carsProblemDetail,
    isLoading,
  } = useSelector(state => ({
    carsBrand: state.brands.carsBrand,
    carsModelByBrand: state.models.carsModelByBrand,
    symptoms: state.symptomsLists.symptoms,
    carsProblemDetail: state.problems.carsProblemDetail,
    isLoading: state.problems.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [selectedBrand, setSelectedBrand] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  /*
  ==================================================
  FORMIK
  ==================================================
  */

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (carsProblemDetail && carsProblemDetail.name) || "",
      brandId:
        (carsProblemDetail &&
          carsProblemDetail.model &&
          carsProblemDetail.model.brand &&
          carsProblemDetail.model.brand.id) ||
        "",
      modelId:
        (carsProblemDetail &&
          carsProblemDetail.model &&
          carsProblemDetail.model.id) ||
        "",
      symptomId:
        (carsProblemDetail &&
          carsProblemDetail.symptom &&
          carsProblemDetail.symptom.id) ||
        "",
      intendedMinutes:
        (carsProblemDetail && carsProblemDetail.intendedMinutes) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên vấn đề"),
      brandId: Yup.string().required("Vui lòng chọn hãng xe"),
      modelId: Yup.string().when("brandId", {
        is: brandId => !brandId,
        then: Yup.string().nullable().required("Vui lòng chọn hãng xe trước"),
        otherwise: Yup.string().nullable().required("Vui lòng chọn dòng xe"),
      }),
      symptomId: Yup.string().required("Vui lòng chọn triệu chứng đi kèm"),
      intendedMinutes: Yup.string().required("Vui lòng chọn dự kiến kết thúc"),
    }),
    onSubmit: values => {
      const newValue = { ...values }
      delete newValue.brandId

      dispatch(onUpdateCarProblem(newValue, params.id, props.history))

      setIsSubmitting(true)
    },
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarProblemDetail(params.id))
    }
  }, [params, onGetCarProblemDetail, dispatch])

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetCarSymptoms())
  }, [dispatch])

  useEffect(() => {
    if (validation.values) {
      dispatch(onGetCarModelByBrand(validation.values.brandId))
    }
  }, [dispatch, validation.values])

  // useEffect(() => {
  //   // Dispatch action to fetch car brands
  //   dispatch(onGetCarBrand())

  //   // If carsProblemDetail contains a model, fetch the models for the selected brand
  //   if (
  //     carsProblemDetail &&
  //     carsProblemDetail.model &&
  //     carsProblemDetail.model.brand
  //   ) {
  //     setSelectedBrand(carsProblemDetail.model.brand.id)
  //     dispatch(onGetCarModelByBrand(carsProblemDetail.model.brand.id))
  //   }
  // }, [dispatch, carsProblemDetail])

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const handleChangeBrand = e => {
    const brandId = e.target.value
    setSelectedBrand(brandId === "" ? null : brandId)

    validation.setFieldValue("brandId", brandId)
    validation.setFieldValue("modelId", "")

    // Fetch models for the selected brand
    if (brandId) {
      dispatch(onGetCarModelByBrand(brandId))
    }
  }

  // Use the 'dirty' property to disable the "Cập nhật" button until there are changes
  const isButtonDisabled = !validation.dirty || isSubmitting

  /*
  ==================================================
  Reset Form
  ==================================================
  */

  const handleReset = () => {
    // Reset the form values to their initial state
    validation.resetForm()

    dispatch(onResetCarsModel())

    setSelectedBrand(null)

    setIsSubmitting(false)

    // Clear any validation errors
    validation.setErrors({})

    props.history.goBack()
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid>
        <Breadcrumbs
          title="Cập nhật"
          breadcrumbItem={`${carsProblemDetail.name}`}
        />

        <Row style={{ justifyContent: "center", height: "500px" }}>
          <Col md={10}>
            <Card>
              <CardBody>
                <CardTitle>Cập nhật vấn đề</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để cấp nhật mới vấn đề cho các
                  phương tiện
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
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="billing-name"
                          md="4"
                          className="col-form-label"
                        >
                          Tên vấn đề*
                        </Label>
                        <Col md="8">
                          <Input
                            name="name"
                            placeholder="Nhập tên vấn đề"
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
                      <FormGroup className="mb-4" row>
                        <Label md="4" className="col-form-label">
                          Hãng xe
                        </Label>
                        <Col md="8">
                          <Input
                            disabled
                            type="select"
                            name="brandId"
                            value={validation.values.brandId || ""}
                          >
                            {carsBrand.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Label md="4" className="col-form-label">
                          Dòng xe*
                        </Label>
                        <Col md="8">
                          <Input
                            type="select"
                            name="modelId"
                            value={validation.values.modelId}
                            onChange={e => {
                              validation.handleChange(e)
                            }}
                            invalid={
                              validation.touched.modelId &&
                              validation.errors.modelId
                            }
                          >
                            <option value="">Chọn dòng xe</option>
                            {validation.values.brandId &&
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
                                  ? "Vui lòng chọn dòng xe"
                                  : "Vui lòng chọn hãng xe trước"}
                              </FormFeedback>
                            )}
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup className="mb-4" row>
                        <Label md="4" className="col-form-label">
                          Triệu chứng*
                        </Label>
                        <Col md="8">
                          <Input
                            type="select"
                            name="symptomId"
                            value={validation.values.symptomId}
                            onChange={e => {
                              validation.handleChange(e)
                            }}
                            invalid={
                              validation.touched.symptomId &&
                              validation.errors.symptomId
                            }
                          >
                            {symptoms.map(option => (
                              <option key={option.id} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </Input>
                          {validation.touched.symptomId &&
                          validation.errors.symptomId ? (
                            <FormFeedback type="invalid">
                              {validation.errors.symptomId}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          htmlFor="billing-name"
                          md="4"
                          className="col-form-label"
                        >
                          Dự kiến kết thức (phút)*
                        </Label>
                        <Col md="8">
                          <Input
                            name="intendedMinutes"
                            placeholder="Nhập thời gian dự kiến kết thúc"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            onChange={validation.handleChange}
                            value={validation.values.intendedMinutes || ""}
                            invalid={
                              validation.touched.intendedMinutes &&
                              validation.errors.intendedMinutes
                                ? true
                                : false
                            }
                          />
                          {validation.touched.intendedMinutes &&
                          validation.errors.intendedMinutes ? (
                            <FormFeedback type="invalid">
                              {validation.errors.intendedMinutes}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>

                  <hr />
                  <div className="d-flex flex-grap gap-2 justify-content-end text-center">
                    <button
                      type="submit"
                      disabled={isButtonDisabled}
                      className="btn btn-success"
                    >
                      Cập nhật
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleReset}
                    >
                      Hủy
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default withRouter(EditCarProblem)
