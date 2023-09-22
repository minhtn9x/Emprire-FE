import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

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

import { withRouter } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  getSymptomsDetails as onGetSymptomDetail,
  updateSymptoms as onUpdateSymptoms,
} from "store/actions"
import Loader from "components/Loader/Loader"

import * as Yup from "yup"
import { useFormik } from "formik"

const EditSymptom = props => {
  const dispatch = useDispatch()

  //meta title
  useEffect(() => {
    if (symptomsDetail) {
      document.title = `${symptomsDetail.name} | Empire Garage`
    } else {
      document.title = `Empire Garage`
    }
  })

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading, symptomsDetail } = useSelector(state => ({
    isLoading: state.symptomsLists.isLoading,
    symptomsDetail: state.symptomsLists.symptomsDetail,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [isSubmitting, setIsSubmitting] = useState(false)

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
      dispatch(onGetSymptomDetail(params.id))
    }
  }, [params, onGetSymptomDetail, dispatch])

  /*
  ==================================================
  FORM
  ==================================================
  */

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (symptomsDetail && symptomsDetail.name) || "",
      intendedMinutes: (symptomsDetail && symptomsDetail.intendedMinutes) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên triệu chứng"),
      intendedMinutes: Yup.number()
        .typeError("Vui lòng nhập một số")
        .required("Vui lòng nhập thời gian kết thúc")
        .positive("Thời gian dự kiến phải là một số dương")
        .integer("Thời gian dự kiến phải là số nguyên"),
    }),
    onSubmit: values => {
      dispatch(onUpdateSymptoms(values, params.id, props.history))
      validation.resetForm()
      setIsSubmitting(true)
    },
  })

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

    // Clear any validation errors
    validation.setErrors({})

    props.history.goBack()
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid={true}>
        <Breadcrumbs
          title="Cập nhật"
          breadcrumbItem={`${symptomsDetail && symptomsDetail.name}`}
        />
        <Row style={{ justifyContent: "center" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Cập nhật triệu chứng</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để cập nhật mới triệu chứng
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

EditSymptom.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.any,
  history: PropTypes.any,
}

export default withRouter(EditSymptom)
