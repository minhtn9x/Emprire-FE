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

import { runScriptCheckOut as onRunScriptCheckOut } from "store/actions"

const OrderCheckOut = () => {
  const dispatch = useDispatch()

  const { scriptCheckOut, isLoadScript } = useSelector(state => ({
    scriptCheckOut: state.scripts.scriptCheckOut,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [orders, setOrders] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [idList, setIdList] = useState([])
  const [carList, setCarList] = useState([])
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
    if (localStorage.getItem("scriptConfirmPaid")) {
      const obj = JSON.parse(localStorage.getItem("scriptConfirmPaid"))
      setCount(obj)
    }
  }, [localStorage.getItem("scriptConfirmPaid")])

  useEffect(() => {
    if (localStorage.getItem("scriptDone")) {
      const obj = JSON.parse(localStorage.getItem("scriptDone"))
      setCarList(obj)
    }
  }, [localStorage.getItem("scriptDone")])

  const countConfirmPaid = count.filter(
    c =>
      Array.isArray(c.result.orderServiceDetails) &&
      c.result.orderServiceDetails.length === 0
  )

  const countDone = carList.filter(c => c.statusCode === 200)

  useEffect(() => {
    setOrders(scriptCheckOut)

    // Count the number of successes and failures
    const successCount = scriptCheckOut.filter(o => o.statusCode === 200).length
    const failCount = scriptCheckOut.filter(o => o.statusCode === 500).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptCheckOut])

  const handleDone = () => {
    const data = idList.map(il => il.result.id)
    dispatch(onRunScriptCheckOut(data))
    // setIsSubmitting(true)
  }

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">CHECK-OUT PHƯƠNG TIỆN</CardTitle>

        {/* {!isLoadScript && orders.length === 0 && (
          <em className="mt-3">
            Đang có {countDone.length + countConfirmPaid.length} phương tiện
            nhận xe{" "}
          </em>
        )} */}

        <div className="row gy-2 gx-3 mt-3">
          <div className="col-sm-5">
            <button
              disabled={isSubmitting}
              type="button"
              className="btn btn-primary btn-label"
              onClick={handleDone}
            >
              <i className="bx bx-log-out-circle font-size-18 label-icon"></i>
              Check-Out
            </button>
          </div>
        </div>

        <hr className="my-4" />

        {isLoadScript && (
          <Row>
            <Col xs="12">
              <div className="text-center my-3">
                <h5 className="text-primary">
                  <i className="bx bx-loader bx-spin me-2" />
                  Đang check-out phương tiện
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

            <div className="table-responsive">
              <Table className="table-nowrap table-borderless">
                <tbody>
                  {orders.map((o, index) => (
                    <tr key={index}>
                      <td className="font-size-14 text-center">{index + 1}</td>
                      {o.statusCode === 200 ? (
                        <td className="font-size-14">
                          Check-out thành công{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carLisenceNo}{" "}
                          |{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carBrand}
                        </td>
                      ) : (
                        <td className="font-size-14">
                          Check-out thất bại{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carLisenceNo}{" "}
                          |{" "}
                          {o.result &&
                            o.result.information &&
                            o.result.information.car &&
                            o.result.information.car.carBrand}
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

export default OrderCheckOut
