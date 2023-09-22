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

import { withRouter } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  getCarsBrand as onGetCarBrand,
  addNewCarsModel as onAddNewCarModel,
} from "store/actions"
import Loader from "components/Loader/Loader"

import * as Yup from "yup"
import { useFormik } from "formik"

const AddNewCarModel = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Tạo mới dòng xe | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading, carsBrand } = useSelector(state => ({
    isLoading: state.models.isLoading,
    carsBrand: state.brands.carsBrand,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [selectedBrandName, setSelectedBrandName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch, onGetCarBrand])

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
      brandId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên dòng  xe"),
      brandId: Yup.string().required("Vui lòng chọn thương hiệu xe"),
    }),
    onSubmit: values => {
      dispatch(onAddNewCarModel(values, props.history, selectedBrandName))
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
    validation.setFieldValue("brandId", "")

    // Clear any validation errors
    validation.setErrors({})
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Dòng xe" />

        <Row style={{ justifyContent: "center", height: "490px" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Tạo mới dòng xe</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để tạo mới dòng xe
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
                      Hãng xe
                    </Label>
                    <Col md="9">
                      <Input
                        type="select"
                        name="brandId"
                        value={validation.values.brandId}
                        onChange={e => {
                          validation.handleChange(e)
                          const selectedOption =
                            e.target.options[e.target.selectedIndex]
                          setSelectedBrandName(selectedOption.text) // Set the selected brand name
                        }}
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
                      validation.errors.brandId ? (
                        <FormFeedback type="invalid">
                          {validation.errors.brandId}
                        </FormFeedback>
                      ) : null}
                    </Col>
                  </FormGroup>

                  <FormGroup className="mb-4" row>
                    <Label md="3" className="col-form-label">
                      Tên dòng xe*
                    </Label>
                    <Col md="9">
                      <Input
                        name="name"
                        placeholder="Nhập tên dòng xe"
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

export default withRouter(AddNewCarModel)
