import { useFormik } from "formik"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import {
  Row,
  Col,
  Form,
  InputGroup,
  CardTitle,
  CardBody,
  FormFeedback,
  Label,
  Input,
  Table,
} from "reactstrap"

//redux
import { useSelector, useDispatch } from "react-redux"

import { runScriptConfirmPaid as onRunScriptConfirmPaid } from "store/actions"

const OrderConfirmPaid = () => {
  const dispatch = useDispatch()

  const { scriptConfirmPaid, isLoadScript, errorConfirmPaid } = useSelector(
    state => ({
      scriptConfirmPaid: state.scripts.scriptConfirmPaid,
      isLoadScript: state.scripts.isLoadScript,
      errorConfirmPaid: state.scripts.errorConfirmPaid,
    })
  )

  const [orders, setOrders] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [idList, setIdList] = useState([])
  const [count, setCount] = useState([])

  const [countSuccess, setCountSuccess] = useState(0)
  const [countFail, setCountFail] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("scriptCustomer")) {
      const obj = JSON.parse(localStorage.getItem("scriptCustomer"))
      setIdList(obj)
    }
  }, [localStorage.getItem("scriptCustomer")])

  useEffect(() => {
    if (localStorage.getItem("scriptDiagnose")) {
      const obj = JSON.parse(localStorage.getItem("scriptDiagnose"))
      setCount(obj)
    }
  }, [localStorage.getItem("scriptDiagnose")])

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      number1: 0,
      number2: 0,
      number3: 0,
    },
    validationSchema: Yup.object().shape({
      number1: Yup.number().required("Chỉ nhập số"),
      number2: Yup.number().required("Chỉ nhập số"),
      number3: Yup.number().required("Chỉ nhập số"),
    }),
    onSubmit: values => {
      const data = idList.map(il => il.result.id)
      dispatch(
        onRunScriptConfirmPaid(values.number1, values.number2, values.number3)
      )
      setIsSubmitting(false)
    },
  })

  useEffect(() => {
    setOrders(scriptConfirmPaid)

    // Count the number of successes and failures
    const successCount = scriptConfirmPaid.filter(
      o => o.statusCode === 200
    ).length
    const failCount = scriptConfirmPaid.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptConfirmPaid])

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">XÁC NHẬN & THANH TOÁN</CardTitle>

        {/* {!isLoadScript && orders.length === 0 && (
          <em className="mt-3">
            Đang có {count.length} hóa đơn chờ thanh toán{" "}
          </em>
        )} */}

        <Form
          className="row gy-2 gx-3 mt-3"
          onSubmit={e => {
            e.preventDefault()
            validationType.handleSubmit()
            return false
          }}
        >
          <div className="col-sm-4">
            <Label
              className="visually-hidden"
              htmlFor="autoSizingInputGroup"
            ></Label>
            <InputGroup>
              <div className="input-group-text">Thanh toán tất cả</div>
              <Input
                type="text"
                className="form-control"
                id="autoSizingInputGroup"
                name="number1"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.number1 || ""}
                invalid={
                  validationType.touched.number1 &&
                  validationType.errors.number1
                    ? true
                    : false
                }
              />
              {validationType.touched.number1 &&
              validationType.errors.number1 ? (
                <FormFeedback type="invalid">
                  {validationType.errors.number1}
                </FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          <div className="col-sm-4">
            <Label
              className="visually-hidden"
              htmlFor="autoSizingInputGroup"
            ></Label>
            <InputGroup>
              <div className="input-group-text">Thanh toán một phần</div>
              <Input
                type="text"
                className="form-control"
                id="autoSizingInputGroup"
                name="number2"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.number2 || ""}
                invalid={
                  validationType.touched.number2 &&
                  validationType.errors.number2
                    ? true
                    : false
                }
              />
              {validationType.touched.number2 &&
              validationType.errors.number2 ? (
                <FormFeedback type="invalid">
                  {validationType.errors.number2}
                </FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          <div className="col-sm-4">
            <Label
              className="visually-hidden"
              htmlFor="autoSizingInputGroup"
            ></Label>
            <InputGroup>
              <div className="input-group-text">Không thanh toán</div>
              <Input
                type="text"
                className="form-control"
                id="autoSizingInputGroup"
                name="number3"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.number3 || ""}
                invalid={
                  validationType.touched.number3 &&
                  validationType.errors.number3
                    ? true
                    : false
                }
              />
              {validationType.touched.number3 &&
              validationType.errors.number3 ? (
                <FormFeedback type="invalid">
                  {validationType.errors.number3}
                </FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          <div className="col-sm-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-label"
            >
              <i className="fa fa-money-bill-wave font-size-12 label-icon"></i>{" "}
              Xác nhận - Thanh Toán
            </button>
          </div>
        </Form>

        <hr className="my-4" />
        {isLoadScript && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-primary">
                  <i className="bx bx-loader bx-spin me-2" />
                  Đang thanh toán tất cả {validationType.values.number1}, thanh toán một
                  phần {validationType.values.number2} và không thanh toán{" "}
                  {validationType.values.number3} hóa đơn
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoadScript && (
          <>
            {orders.length > 0 && (
              <strong>
                Có {countSuccess} thành công và {countFail} thất bại
              </strong>
            )}
            {errorConfirmPaid !== null && orders.length === 0 ? (
              <Row>
                <div className="text-center mt-3">
                  <strong className="mt-3 text-danger font-size-14">
                    {errorConfirmPaid}
                  </strong>
                </div>
              </Row>
            ) : (
              ""
            )}
            <div className="table-responsive mt-3">
              <Table className="table-nowrap table-borderless">
                <tbody>
                  {orders.map((o, index) => (
                    <tr key={index}>
                      <td className="font-size-14 text-center">{index + 1}</td>
                      {o.statusCode === 200 &&
                      o.result.orderServiceDetails.length ? (
                        <td className="font-size-14">
                          Xác nhận & Thanh toán {o.result.information.confirmAll ? "tất cả" : "một phần"} thành công #
                          {o.result.code}
                        </td>
                      ) : o.statusCode === 200 &&
                        !o.result.orderServiceDetails.length ? (
                        <td className="font-size-14">
                          <u>Không thanh toán #{o.result.code}</u>
                        </td>
                      ) : (
                        <td className="font-size-14">
                          {o.result.error.message} | #
                          {o.result.information.code}
                        </td>
                      )}
                      <td className="text-end">
                        {o.statusCode === 200 ? (
                          <strong className="badge badge-soft-success rounded-pill font-size-13">
                            Thành công
                          </strong>
                        ) : (
                          <strong className="badge badge-soft-danger rounded-pill font-size-13">
                            Thất bại
                          </strong>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </CardBody>
    </React.Fragment>
  )
}

export default OrderConfirmPaid
