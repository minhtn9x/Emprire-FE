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

import { runScriptCustomer as onRunScriptCustomer } from "store/actions"

const CustomerScript = () => {
  const dispatch = useDispatch()

  const { scriptCustomer, isLoadScript } = useSelector(state => ({
    scriptCustomer: state.scripts.scriptCustomer,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [customers, setCustomers] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const validationType = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      number: "",
    },
    validationSchema: Yup.object().shape({
      number: Yup.number().required("Chỉ nhập số"),
    }),
    onSubmit: values => {
      dispatch(onRunScriptCustomer(values.number))
      setIsSubmitting(false)
    },
  })

  useEffect(() => {
    setCustomers(scriptCustomer)
  }, [scriptCustomer])

  function formatPhoneNumber(phone) {
    return `(+${phone.slice(1, 3)}) ${phone.slice(3)}`
  }

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">TẠO KHÁCH HÀNG</CardTitle>

        <Form
          className="row gy-2 gx-3 mt-3"
          onSubmit={e => {
            e.preventDefault()
            validationType.handleSubmit()
            return false
          }}
        >
          <div className="col-sm-5">
            <Label
              className="visually-hidden"
              htmlFor="autoSizingInputGroup"
            ></Label>
            <InputGroup>
              <div className="input-group-text">Số khách hàng</div>
              <Input
                type="text"
                className="form-control"
                id="autoSizingInputGroup"
                name="number"
                onChange={validationType.handleChange}
                onBlur={validationType.handleBlur}
                value={validationType.values.number || ""}
                invalid={
                  validationType.touched.number && validationType.errors.number
                    ? true
                    : false
                }
              />
              {validationType.touched.number && validationType.errors.number ? (
                <FormFeedback type="invalid">
                  {validationType.errors.number}
                </FormFeedback>
              ) : null}
            </InputGroup>
          </div>
          <div className="col-sm-5">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary btn-label"
            >
              <i className="bx bx-user-plus label-icon"></i> Khởi tạo
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
                  Đang khởi tạo {validationType.values.number} khách hàng
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoadScript && (
          <div className="table-responsive">
            <Table className="table-nowrap table-borderless">
              {/* <thead>
              <tr>
                <th style={{ width: "70px" }}>Số</th>
                <th>Nội dung</th>
                <th className="text-end">Trạng thái</th>
              </tr>
            </thead> */}
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td className="font-size-14 text-center">{index + 1}</td>
                    {customer.statusCode === 201 ? (
                      <td className="font-size-14">
                        Tạo thành công {customer.result.fullname}
                      </td>
                    ) : (
                      <td className="font-size-14">Tạo khách hàng thất bại</td>
                    )}
                    {customer.statusCode === 201 ? (
                      <td className="font-size-14">
                        {formatPhoneNumber(customer.result.phone)}
                      </td>
                    ) : (
                      <td className="font-size-14"></td>
                    )}
                    <td className="text-end">
                      {customer.statusCode === 201 ? (
                        <span className="badge badge-soft-success rounded-pill font-size-13">
                          Thành công
                        </span>
                      ) : (
                        <span className="badge badge-soft-danger rounded-pill font-size-13">
                          Thất bại
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </CardBody>
    </React.Fragment>
  )
}

export default CustomerScript
