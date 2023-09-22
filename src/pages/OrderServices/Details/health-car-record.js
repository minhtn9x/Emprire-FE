import React from "react"
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Row,
} from "reactstrap"

const CarRecord = ({ record }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle>CHUẨN ĐOÁN TỪ KỸ THUẬT VIÊN</CardTitle>
              <CardSubtitle className="text-muted">
                Thông tin chi tiết ghi nhận các tình trạng xe kèm chuẩn đoán của
                kỹ thuật viên
              </CardSubtitle>

              <h6 className="font-size-16 fw-medium mt-4">
                <i className="fa fa-caret-right font-size-15 align-middle text-primary me-2" />
                Kết quả chuẩn đoán :
              </h6>

              <p className="mb-3 mt-3 font-size-14 ms-3">{record.symptom}</p>

              <h6 className="font-size-16 mt-4 fw-medium  mb-4">
                <i className="fa fa-caret-right font-size-15 align-middle text-primary me-2" />
                Dịch vụ gợi ý :
              </h6>

              <Row className="mb-3 ms-1">
                {record.healthCarRecordProblems &&
                  record.healthCarRecordProblems.map(problems => (
                    <Col md="6" key={problems.problem.id}>
                      <div className="mb-4">
                        <h6 className="mb-3 font-size-14">
                          <i className="fas fa-angle-right font-size-15 text-primary me-2" />
                          {problems.problem.name}
                        </h6>
                        {problems.problem.items &&
                          problems.problem.items.map(item => (
                            <ul key={item.id}>
                              <li className="py-1 font-size-13">
                                {item.name +
                                  ":  " +
                                  item.presentPrice.toLocaleString() +
                                  "đ"}
                              </li>
                            </ul>
                          ))}
                      </div>
                    </Col>
                  ))}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CarRecord
