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

import { runScriptRemoveCustomer as onRunScriptRemoveCustomer } from "store/actions"

const CustomerRemoveScript = () => {
  const dispatch = useDispatch()

  const { scriptRemoveCustomer, isLoadScript } = useSelector(state => ({
    scriptRemoveCustomer: state.scripts.scriptRemoveCustomer,
    isLoadScript: state.scripts.isLoadScript,
  }))

  const [customers, setCustomers] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [idList, setIdList] = useState([])

  const [countSuccess, setCountSuccess] = useState(0)
  const [countFail, setCountFail] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("scriptCustomer")) {
      const obj = JSON.parse(localStorage.getItem("scriptCustomer"))
      setIdList(obj)
    }
  }, [localStorage.getItem("scriptCustomer")])

  useEffect(() => {
    setCustomers(scriptRemoveCustomer)

    // Count the number of successes and failures
    const successCount = scriptRemoveCustomer.filter(
      o => o.statusCode === 200
    ).length
    const failCount = scriptRemoveCustomer.filter(
      o => o.statusCode === 500
    ).length

    setCountSuccess(successCount)
    setCountFail(failCount)
  }, [scriptRemoveCustomer])

  const handleDone = () => {
    const data = idList.map(il => il.result.id)
    dispatch(onRunScriptRemoveCustomer(data))
    // setIsSubmitting(true)
  }

  return (
    <React.Fragment>
      <CardBody>
        <CardTitle className="mb-2">XÓA KHÁCH HÀNG</CardTitle>

        <div className="row gy-2 gx-3 mt-3">
          <div className="col-sm-5">
            <button
              disabled={isSubmitting}
              type="button"
              className="btn btn-danger btn-label"
              onClick={handleDone}
            >
              <i className="bx bx-user-x font-size-18 label-icon"></i> Xóa
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
                  Đang xóa các tài khoản tạo từ script
                </h5>
              </div>
            </Col>
          </Row>
        )}
        {!isLoadScript && (
          <>
            {customers.length > 0 && (
              <strong>
                Có {countSuccess} thành công và {countFail} thất bại
              </strong>
            )}
            <div className="table-responsive mt-3">
              <Table className="table-nowrap table-borderless">
                <tbody>
                  {customers.map((o, index) => (
                    <tr key={index}>
                      <td className="font-size-14 text-center">{index + 1}</td>
                      {o.statusCode === 200 ? (
                        <td className="font-size-14">
                          Xóa thành công {o.result.fullname}
                        </td>
                      ) : (
                        <td className="font-size-14">
                          Không tìm thấy tài khoản khách hàng !
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

export default CustomerRemoveScript
