import React, { useState } from "react"
import Select from "react-select"

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

import { Link, withRouter } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { addNewSymptoms as onAddSymptoms } from "store/actions"
import Loader from "components/Loader/Loader"

import * as Yup from "yup"
import { useFormik } from "formik"

const AddNewSymptom = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Tạo triệu chứng | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading } = useSelector(state => ({
    isLoading: state.symptomsLists.isLoading,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [isSubmitting, setIsSubmitting] = useState(false)

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
      intendedMinutes: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên triệu chứng"),
      intendedMinutes: Yup.number()
        .typeError("Vui lòng nhập thời gian kết thúc hợp lệ")
        .required("Vui lòng nhập thời gian kết thúc")
        .positive("Thời gian dự kiến phải là một số dương")
        .integer("Thời gian dự kiến phải là số nguyên"),
    }),
    onSubmit: values => {
      dispatch(onAddSymptoms(values, props.history))
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

    // Clear any validation errors
    validation.setErrors({})
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Tạo mới triệu chứng" />

        <Row style={{ justifyContent: "center", height: "490px" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Triệu chứng</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để tạo mới triệu chứng
                </CardSubtitle>

                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <FormGroup className="select2-container mb-4" row>
                    <Label md="5" className="col-form-label">
                      Tên triệu chứng*
                    </Label>
                    <Col md="7">
                      <Input
                        name="name"
                        placeholder="Nhập tên triệu chứng"
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
                      Thời gian dự kiến kết thúc (phút)*
                    </Label>
                    <Col md="7">
                      <Input
                        name="intendedMinutes"
                        placeholder="Nhập thời gian dự kiến (phút)"
                        type="number"
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

export default withRouter(AddNewSymptom)
