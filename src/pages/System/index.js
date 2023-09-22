import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  Label,
  Row,
  Table,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { Link, withRouter } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"

import {
  putConfigSystem as onConfigSystem,
  getConfigSystem as onGetConfigSystem,
} from "store/actions"
import Loader from "components/Loader/Loader"

// Formik validation
import * as Yup from "yup"
import { useFormik } from "formik"

const SystemConfig = () => {
  const dispatch = useDispatch()

  /*
  ==================================================
  STATE REDUX
  ==================================================
  */

  const { isLoad, configSystems, isShow } = useSelector(state => ({
    isLoad: state.systems.isLoad,
    isShow: state.Layout.isShow,
    configSystems: state.systems.configSystems,
  }))

  /*
  ==================================================
  USE STATE
  ==================================================
  */

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEnableInput, setIsEnableInput] = useState(true)
  const [config, setConfig] = useState({
    type: {
      label: "",
      key: "",
    },
    value: "",
  })

  /*
  ==================================================
  USE EFFECT
  ==================================================
  */

  useEffect(() => {
    dispatch(onGetConfigSystem())
  }, [dispatch])

  useEffect(() => {
    if (isShow) {
      dispatch(onGetConfigSystem())
    }
  }, [dispatch, isShow])

  useEffect(() => {
    if (isLoad) {
      dispatch(onGetConfigSystem())
    }
  }, [dispatch, isLoad])

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
  RENDER VALUE
  ==================================================
  */

  const garageConfig = [
    {
      label: "Số lượng bãi đậu",
      key: "GARAGE_SLOT",
      value: getConfigValue(configSystems, "GARAGE_SLOT"),
      render: getConfigValue(configSystems, "GARAGE_SLOT"),
    },
    {
      label: "Xe tại garage",
      key: "CURRENT_CAR_COUNT_IN_GARAGE",
      value: getConfigValue(configSystems, "CURRENT_CAR_COUNT_IN_GARAGE"),
      render: getConfigValue(configSystems, "CURRENT_CAR_COUNT_IN_GARAGE"),
    },
  ]

  const bookingConfig = [
    {
      label: "Số lượng đặt lịch trong tuần",
      key: "BOOKING_SLOT_PER_WEEK",
      value: getConfigValue(configSystems, "BOOKING_SLOT_PER_WEEK"),
      render: getConfigValue(configSystems, "BOOKING_SLOT_PER_WEEK"),
    },
    {
      label: "Tổng đặt lịch hiện tại",
      key: "BOOKING_COUNT_IN_CURRENT_WEEK",
      value: getConfigValue(configSystems, "BOOKING_COUNT_IN_CURRENT_WEEK"),
      render: getConfigValue(configSystems, "BOOKING_COUNT_IN_CURRENT_WEEK"),
    },
    {
      label: "Đặt lịch tối đa trong ngày",
      key: "BOOKING_SLOT_PER_DAY",
      value: getConfigValue(configSystems, "BOOKING_SLOT_PER_DAY"),
      render: getConfigValue(configSystems, "BOOKING_SLOT_PER_DAY"),
    },
    {
      label: "Giá tiền đặt lịch (VND)",
      key: "BOOKING_PRICE",
      value: getConfigValue(configSystems, "BOOKING_PRICE"),
      render: formatPriceWithDots(
        getConfigValue(configSystems, "BOOKING_PRICE")
      ),
    },
  ]

  const workLoadConfig = [
    {
      label: "Công việc tối đa mỗi ngày (WLD)",
      key: "MAX_WORKLOAD_PER_DAY",
      value: getConfigValue(configSystems, "MAX_WORKLOAD_PER_DAY"),
      render: getConfigValue(configSystems, "MAX_WORKLOAD_PER_DAY"),
    },
    {
      label: "Thời gian cho mỗi công việc (phút)",
      key: "MINUTES_PER_WORKLOAD",
      value: getConfigValue(configSystems, "MINUTES_PER_WORKLOAD"),
      render: getConfigValue(configSystems, "MINUTES_PER_WORKLOAD"),
    },
  ]

  /*
  ==================================================
  VALIDATION
  ==================================================
  */
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      key: config.type.key,
      value: config.value,
    },
    validationSchema: Yup.object({
      key: Yup.string().required("Please Enter  key"),
      value: Yup.number()
        .typeError("Vui lòng chỉ nhập số") // Custom error message for non-numeric input
        .required("Vui lòng nhập thống số cần thay đổi")
        .min(-1, "Số cấu hình phải là số dương") // Optionally enforce positive numbers
        .integer("Số cầu hình không phải số thập phân"),
    }),
    onSubmit: values => {
      // Convert the value to a string
      const stringValue = values.value.toString()

      // Dispatch the action with the string value
      dispatch(onConfigSystem({ ...values, value: stringValue }))
      setIsEnableInput(true)
      setConfig({
        type: {
          label: "",
          key: "",
        },
        value: "",
      })
    },
  })

  // Use the 'dirty' property to disable the "Submit" button until there are changes
  const isButtonDisabled = !validation.dirty || isSubmitting

  /*
  ==================================================
  HANDLE UPDATE CLICK
  ==================================================
  */

  const handleUpdateClick = item => {
    setIsEnableInput(false)
    setConfig({
      type: {
        label: item.label,
        key: item.key,
      },
      value: item.value,
    })

    // Scroll to the "Số cấu hình" input field
    const inputElement = document.querySelector('[name="value"]')
    if (inputElement) {
      inputElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  /*
  ==================================================
  RESET FORM
  ==================================================
  */

  const handleReset = () => {
    // Reset the form values to their initial state
    validation.resetForm()

    setIsSubmitting(false)
    setIsEnableInput(true)

    setConfig({
      type: {
        label: "",
        key: "",
      },
      value: "",
    })

    // Clear any validation errors
    validation.setErrors({})
  }

  /*
  ==================================================
  VIEW VALUE
  ==================================================
  */

  const viewValue = (key, label, value) => {
    switch (key) {
      case "GARAGE_SLOT":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="mdi mdi-car-brake-parking me-1" /> {label}
            </p>
            <h5>{value} bãi</h5>
          </>
        )
      case "CURRENT_CAR_COUNT_IN_GARAGE":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="bx bx-car me-1" /> {label}
            </p>
            <h5>{value} xe</h5>
          </>
        )
      case "BOOKING_SLOT_PER_WEEK":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="mdi mdi-calendar-month me-1" /> {label}
            </p>
            <h5>{value} đặt lịch</h5>
          </>
        )
      case "BOOKING_COUNT_IN_CURRENT_WEEK":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="mdi mdi-calendar me-1" /> {label}
            </p>
            <h5>{value} đặt lịch</h5>
          </>
        )
      case "BOOKING_SLOT_PER_DAY":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="mdi mdi-calendar-account me-1" /> {label}
            </p>
            <h5>{value} đặt lịch</h5>
          </>
        )
      case "BOOKING_PRICE":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="bx bx-money me-1" /> {label}
            </p>
            <h5>{formatPriceWithDots(value)} VND</h5>
          </>
        )
      case "MAX_WORKLOAD_PER_DAY":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="bx bx-briefcase-alt me-1" /> {label}
            </p>
            <h5>{value} WLD</h5>
          </>
        )
      case "MINUTES_PER_WORKLOAD":
        return (
          <>
            <p className="text-muted mb-2">
              <i className="bx bxs-time-five me-1" /> {label}
            </p>
            <h5>{value} phút</h5>
          </>
        )
      default:
        return null
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Cấu hình" breadcrumbItem="Cấu hình hệ thống" />

          <Row>
            <Col xl="8">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-3">Garage</h4>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Loại cấu hình</th>
                          <th scope="col" className="text-end">
                            Số cấu hình
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {garageConfig.map((item, index) => (
                          <tr key={index}>
                            <td style={{ width: "90px" }}>
                              <span>{index + 1}</span>
                            </td>
                            <td style={{ width: "300px" }}>
                              <p className="font-size-14 mb-1">{item.label}</p>
                            </td>
                            <td style={{ width: "100px" }}>
                              <p className="font-size-14 mb-1 text-end">
                                {item.render}
                              </p>
                            </td>
                            <td style={{ width: "200px" }} className="text-end">
                              <Button
                                type="submit"
                                color="primary"
                                className="btn-sm w-xs"
                                onClick={() => handleUpdateClick(item)}
                              >
                                Cập nhật
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <h4 className="card-title mt-4 mb-3">Đặt lịch</h4>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Loại cấu hình</th>
                          <th scope="col" className="text-end">
                            Số cấu hình
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookingConfig.map((item, index) => (
                          <tr key={index}>
                            <td style={{ width: "90px" }}>
                              <span>{index + 1}</span>
                            </td>
                            <td style={{ width: "300px" }}>
                              <p className="font-size-14 mb-1">{item.label}</p>
                            </td>
                            <td style={{ width: "100px" }}>
                              <p className="font-size-14 mb-1 text-end">
                                {item.render}
                              </p>
                            </td>
                            <td style={{ width: "200px" }} className="text-end">
                              <Button
                                type="submit"
                                color="primary"
                                className="btn-sm w-xs"
                                onClick={() => handleUpdateClick(item)}
                              >
                                Cập nhật
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>

                  <h4 className="card-title mt-4 mb-3">
                    Thời gian làm việc (WorkLoad)
                  </h4>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Loại cấu hình</th>
                          <th scope="col" className="text-end">
                            Số cấu hình
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {workLoadConfig.map((item, index) => (
                          <tr key={index}>
                            <td style={{ width: "90px" }}>
                              <span>{index + 1}</span>
                            </td>
                            <td style={{ width: "300px" }}>
                              <p className="font-size-14 mb-1">{item.label}</p>
                            </td>
                            <td style={{ width: "100px" }}>
                              <p className="font-size-14 mb-1 text-end">
                                {item.render}
                              </p>
                            </td>
                            <td style={{ width: "200px" }} className="text-end">
                              <Button
                                type="submit"
                                color="primary"
                                className="btn-sm w-xs"
                                onClick={() => handleUpdateClick(item)}
                              >
                                Cập nhật
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Cập nhật hệ thống</h4>
                  {config.type.key && validation.values.value ? (
                    <div>
                      {viewValue(
                        config.type.key,
                        config.type.label,
                        validation.values.value
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mt-4">
                    <div>
                      {!isEnableInput && (
                        <Label>Bấm "Cập Nhật" để chọn loại cấu hình khác</Label>
                      )}
                      <Form
                        className="needs-validation"
                        onSubmit={e => {
                          e.preventDefault()
                          validation.handleSubmit()
                          return false
                        }}
                      >
                        <InputGroup className="mb-3">
                          <Label className="input-group-text">
                            Loại cấu hình
                          </Label>
                          <Input
                            disabled
                            type="text"
                            name="label"
                            className="form-control"
                            placeholder="Bấm 'Cập Nhật' để chọn loại cấu hình"
                            //onChange={validation.handleChange}
                            value={config.type.label || ""}
                          />
                        </InputGroup>

                        <InputGroup className="mb-3">
                          <Label className="input-group-text">
                            Số cấu hình
                          </Label>
                          <Input
                            disabled={isEnableInput}
                            type="text"
                            name="value"
                            className="form-control"
                            placeholder="Bấm 'Cập Nhật' để số cấu hình"
                            onChange={validation.handleChange}
                            value={validation.values.value || ""}
                            invalid={
                              validation.touched.value &&
                              validation.errors.value
                                ? true
                                : false
                            }
                          />{" "}
                          {validation.touched.value &&
                          validation.errors.value ? (
                            <FormFeedback type="invalid">
                              {validation.errors.value}
                            </FormFeedback>
                          ) : null}
                        </InputGroup>

                        <div className="text-end">
                          <Button
                            disabled={isButtonDisabled}
                            type="submit"
                            color="success"
                            className=" me-2"
                          >
                            Lưu
                          </Button>
                          <Button
                            type="button"
                            color="secondary"
                            onClick={handleReset}
                          >
                            Xóa
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default SystemConfig
