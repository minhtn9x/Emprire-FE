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

import { withRouter } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import {
  getCarsBrand as onGetCarBrand,
  getCarsModelDetail as onGetCarModelDetail,
  updateCarsModel as onUpdateCarModel,
} from "store/actions"
import Loader from "components/Loader/Loader"

import * as Yup from "yup"
import { useFormik } from "formik"

const EditCarModel = props => {
  const dispatch = useDispatch()

  //meta title
  useEffect(() => {
    if (carsModelDetail) {
      document.title = `${carsModelDetail.name} | Empire Garage`
    } else {
      document.title = `Empire Garage`
    }
  })

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { isLoading, carsBrand, carsModelDetail } = useSelector(state => ({
    isLoading: state.models.isLoading,
    carsModelDetail: state.models.carsModelDetail,
    carsBrand: state.brands.carsBrand,
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
      dispatch(onGetCarModelDetail(params.id))
    }
  }, [params, onGetCarModelDetail, dispatch])

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
      name: (carsModelDetail && carsModelDetail.name) || "",
      brandId:
        (carsModelDetail &&
          carsModelDetail.brand &&
          carsModelDetail.brand.id) ||
        "",
      code: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên dòng xe"),
      brandId: Yup.string().required("Vui lòng chọn thương hiệu xe"),
    }),
    onSubmit: values => {
      dispatch(onUpdateCarModel(values, params.id, props.history, values.name))
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
          breadcrumbItem={`${carsModelDetail && carsModelDetail.name}`}
        />

        <Row style={{ justifyContent: "center", height: "490px" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Cập nhật dòng xe</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để cập nhật mới dòng xe
                </CardSubtitle>
                <Form
                  onSubmit={e => {
                    e.preventDefault()
                    validation.handleSubmit()
                    return false
                  }}
                >
                  <FormGroup className="select2-container mb-4" row>
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
                        }}
                        invalid={
                          validation.touched.brandId &&
                          validation.errors.brandId
                        }
                      >
                        {validation.values.brandId ? null : (
                          <option value="">
                            {carsModelDetail &&
                              carsModelDetail.brand &&
                              carsModelDetail.brand.name}
                          </option>
                        )}
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
                  <FormGroup className="select2-container mb-4" row>
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

export default withRouter(EditCarModel)
