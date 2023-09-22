import React, { useEffect, useState } from "react"

import {
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

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { withRouter } from "react-router-dom"

import * as Yup from "yup"
import { useFormik } from "formik"

import {
  getCarsModelByBrand as onGetCarModelByBrand,
  getCarsBrand as onGetCarBrand,
  getSymptomsLists as onGetCarSymptoms,
  addNewCarsProblem as onAddNewCarProblem,
  resetCarsModel as onResetCarsModel,
} from "store/actions"
import Loader from "components/Loader/Loader"

const AddNewCarProblem = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Tạo mới vấn đề phương tiện | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsBrand, carsModelByBrand, symptoms, isLoading } = useSelector(
    state => ({
      carsBrand: state.brands.carsBrand,
      carsModelByBrand: state.models.carsModelByBrand,
      symptoms: state.symptomsLists.symptoms,
      isLoading: state.problems.isLoading,
    })
  )

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [selectedBrand, setSelectedBrand] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedBrandName, setSelectedBrandName] = useState("")
  const [selectedModelName, setSelectedModelName] = useState("")

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetCarSymptoms())
  }, [dispatch])

  useEffect(() => {
    if (selectedBrand) {
      dispatch(onGetCarModelByBrand(selectedBrand))
    }
  }, [dispatch, selectedBrand])

  /*
  ==================================================
  HANDLE VALUE
  ==================================================
  */

  const handleChangeBrand = e => {
    const brandId = e.target.value
    setSelectedBrand(brandId === "" ? null : brandId)
    validation.setFieldValue("brandId", brandId)

    const selectedOption = e.target.options[e.target.selectedIndex]
    setSelectedBrandName(selectedOption.text)

    // Fetch models for the selected brand
    if (brandId) {
      dispatch(onGetCarModelByBrand(brandId))
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
      brandId: "",
      modelId: "",
      symptomId: "",
      intendedMinutes: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên vấn đề"),
      brandId: Yup.string().required("Vui lòng chọn hãng xe"),
      modelId: Yup.string().when("brandId", {
        is: brandId => !brandId,
        then: Yup.string().nullable().required("Vui lòng chọn hãng xe"),
        otherwise: Yup.string().nullable().required("Vui lòng chọn dòng xe"),
      }),
      symptomId: Yup.string().required("Vui lòng chọn triệu chứng đi kèm"),
      intendedMinutes: Yup.number()
        .typeError("Vui lòng nhập thời gian kết thúc hợp lệ")
        .required("Vui lòng nhập thời gian kết thúc")
        .positive("Thời gian dự kiến phải là một số dương")
        .integer("Thời gian dự kiến không phải số thập phân"),
    }),
    onSubmit: values => {
      const newValue = { ...values }
      delete newValue.brandId

      dispatch(
        onAddNewCarProblem(
          newValue,
          props.history,
          values.brandId,
          selectedBrandName,
          newValue.modelId,
          selectedModelName
        )
      )
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

    dispatch(onResetCarsModel())

    setSelectedBrand(null)

    setIsSubmitting(false)

    // Clear any validation errors
    validation.setErrors({})
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Vấn đề phương tiện" />

        <Row style={{ justifyContent: "center", height: "500px" }}>
          <Col xl={9} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Tạo Mới Vấn đề</CardTitle>
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
                      <FormGroup className="mb-4" row>
                        <Label htmlFor="name" md="5" className="col-form-label">
                          Tên vấn đề*
                        </Label>
                        <Col md="7">
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
                        <Label md="5" className="col-form-label">
                          Hãng xe*
                        </Label>
                        <Col md="7">
                          <Input
                            type="select"
                            name="selectedBrand"
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
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label md="5" className="col-form-label">
                          Dòng xe*
                        </Label>
                        <Col md="7">
                          <Input
                            type="select"
                            name="modelId"
                            value={validation.values.modelId}
                            onChange={e => {
                              validation.handleChange(e)
                              const selectedOption =
                                e.target.options[e.target.selectedIndex]
                              setSelectedModelName(selectedOption.text)
                            }}
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
                                  : "Vui lòng chọn hãng xe"}
                              </FormFeedback>
                            )}
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup className="mb-4" row>
                        <Label md="5" className="col-form-label">
                          Triệu chứng*
                        </Label>
                        <Col md="7">
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
                            <option value="">Chọn triệu chứng</option>
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
                      <FormGroup className="mb-4" row>
                        <Label md="5" className="col-form-label">
                          Dự kiến kết thức (phút)*
                        </Label>
                        <Col md="7">
                          <Input
                            name="intendedMinutes"
                            placeholder="Nhập thời gian dự kiến"
                            type="number"
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

export default withRouter(AddNewCarProblem)
