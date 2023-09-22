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
  InputGroup,
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
  getConfigSystem as onGetConfigSystem,
  resetCarsModel as onResetCarsModel,
  addNewGuest as onAddNewGuest,
} from "store/actions"
import Loader from "components/Loader/Loader"

const AddNewGuest = props => {
  const dispatch = useDispatch()

  //meta title
  document.title = "Tạo mới khách hàng | Empire Garage"

  /*
  ==================================================
  STATE FROM REDUX
  ==================================================
  */

  const { carsBrand, carsModelByBrand, configSystems, isLoading } = useSelector(
    state => ({
      carsBrand: state.brands.carsBrand,
      carsModelByBrand: state.models.carsModelByBrand,
      configSystems: state.systems.configSystems,
      isLoading: state.userLists.isLoading,
    })
  )

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState("")

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetCarBrand())
  }, [dispatch])

  useEffect(() => {
    dispatch(onGetConfigSystem())
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
    validation.setFieldValue("carBrand", selectedOption.text)

    // Fetch models for the selected brand
    if (brandId) {
      dispatch(onGetCarModelByBrand(brandId))
    }
  }

  /*
  ==================================================
  GET CONFIG VALUE
  ==================================================
  */

  const getConfigValue = (configSystems, key) => {
    const config = configSystems.find(config => config.key === key)
    return config ? config.value : "N/A"
  }

  /*
  ==================================================
  FORMAT VND
  ==================================================
  */

  const formatPriceWithDots = price => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
      userName: "",
      phoneNumber: "",
      email: "",
      gender: "",
      brandId: "",
      carBrand: "",
      carModel: "",
      carLisenceNo: "",
      prepaid: formatPriceWithDots(
        getConfigValue(configSystems, "BOOKING_PRICE")
      ),
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Vui lòng nhập tên vấn đề"),
      carLisenceNo: Yup.string().required("Vui lòng nhập biển số xe"),
      gender: Yup.string().required("Vui lòng chọn giới tính"),
      email: Yup.string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
      phoneNumber: Yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .max(9, "Số điện thoại không được vượt quá 9 số"), // Add this line

      brandId: Yup.string().required("Vui lòng chọn hãng xe"),
      carModel: Yup.string().when("brandId", {
        is: brandId => !brandId,
        then: Yup.string().nullable().required("Vui lòng chọn hãng xe"),
        otherwise: Yup.string().nullable().required("Vui lòng chọn dòng xe"),
      }),
    }),
    onSubmit: values => {
      const newValue = {
        ...values,
        phoneNumber: "+84" + values.phoneNumber,
        gender: JSON.parse(values.gender),
        prepaid: JSON.parse(getConfigValue(configSystems, "BOOKING_PRICE")),
      }
      delete newValue.brandId

      if (newValue) {
        dispatch(onAddNewGuest(newValue, props.history))
        setIsSubmitting(true)
      } else {
        setIsSubmitting(false)
      }
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
        <Breadcrumbs title="Tạo mới" breadcrumbItem="Khách vãng lai" />

        <Row style={{ justifyContent: "center", height: "500px" }}>
          <Col xl={9} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Tạo Mới Tài Khoản Cho Khách Vãng Lai</CardTitle>
                <CardSubtitle className="mb-4">
                  Nhập vào chỗ trống bên dưới để tạo mới khách hàng
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
                          Tên khách hàng*
                        </Label>
                        <Col md="7">
                          <Input
                            name="userName"
                            placeholder="Nhập tên khách hàng"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            onChange={validation.handleChange}
                            value={validation.values.userName || ""}
                            invalid={
                              validation.touched.userName &&
                              validation.errors.userName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.userName &&
                          validation.errors.userName ? (
                            <FormFeedback type="invalid">
                              {validation.errors.userName}
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
                            name="carModel"
                            value={validation.values.carModel}
                            onChange={validation.handleChange}
                            invalid={
                              validation.touched.carModel &&
                              validation.errors.carModel
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
                                  <option key={option.id} value={option.name}>
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
                      <FormGroup className="mb-4" row>
                        <Label htmlFor="name" md="5" className="col-form-label">
                          Biển số xe*
                        </Label>
                        <Col md="7">
                          <Input
                            name="carLisenceNo"
                            placeholder="Nhập biển số - 59D-12345"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            onChange={validation.handleChange}
                            value={validation.values.carLisenceNo || ""}
                            invalid={
                              validation.touched.carLisenceNo &&
                              validation.errors.carLisenceNo
                                ? true
                                : false
                            }
                          />
                          {validation.touched.carLisenceNo &&
                          validation.errors.carLisenceNo ? (
                            <FormFeedback type="invalid">
                              {validation.errors.carLisenceNo}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col lg={6}>
                      <FormGroup className="mb-4" row>
                        <Label htmlFor="name" md="5" className="col-form-label">
                          Số điện thoại*
                        </Label>
                        <Col md="7">
                          <InputGroup>
                            <div className="input-group-text">+84</div>
                            <Input
                              name="phoneNumber"
                              placeholder="Nhập số điện thoại"
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              onChange={validation.handleChange}
                              value={validation.values.phoneNumber || ""}
                              invalid={
                                validation.touched.phoneNumber &&
                                validation.errors.phoneNumber
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.phoneNumber &&
                            validation.errors.phoneNumber ? (
                              <FormFeedback type="invalid">
                                {validation.errors.phoneNumber}
                              </FormFeedback>
                            ) : null}
                          </InputGroup>
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label htmlFor="name" md="5" className="col-form-label">
                          Email*
                        </Label>
                        <Col md="7">
                          <Input
                            name="email"
                            placeholder="Nhập email"
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            onChange={validation.handleChange}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label htmlFor="name" md="5" className="col-form-label">
                          Giới tính*
                        </Label>
                        <Col md="7">
                          <Input
                            type="select"
                            name="gender"
                            className="form-control"
                            value={validation.values.gender}
                            onChange={e => {
                              validation.handleChange(e)
                            }}
                            invalid={
                              validation.touched.gender &&
                              validation.errors.gender
                            }
                          >
                            <option value="">Chọn giới tính</option>
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                          </Input>
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label htmlFor="name" md="5" className="col-form-label">
                          Giá đặt lịch*
                        </Label>
                        <Col md="7">
                          <Input
                            disabled
                            type="number"
                            className="form-control"
                            id="validationCustom01"
                            onChange={validation.handleChange}
                            value={validation.values.prepaid || ""}
                          />
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

export default withRouter(AddNewGuest)
