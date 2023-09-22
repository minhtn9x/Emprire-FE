import React from "react"
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap"

import Breadcrumbs from "components/Common/Breadcrumb"

const PreloadDetail = () => {
  return (
    <React.Fragment>
      <div className="page-content placeholder-glow" aria-hidden="true">
        <Container fluid>
          {/* <Breadcrumbs title="Đặt lịch" breadcrumbItem="#" /> */}
          <div className="d-flex mb-3 justify-content-between">
            <span className="placeholder bg-secondary col-5"></span>
            <span className="placeholder bg-secondary col-3"></span>
          </div>
          <Row>
            <Col>
              <Card>
                <CardBody className="mb-2">
                  <div className="mb-3">
                    <span className="placeholder bg-secondary col-8"></span>
                    <span className="placeholder bg-secondary col-5"></span>
                  </div>

                  <Row>
                    <Col xl="6">
                      <div className="table-responsive">
                        <Table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col xl="6">
                      <div className="table-responsive">
                        <Table className="table table-borderless  mb-0">
                          <tbody>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardBody>
                  <div className="mb-3">
                    <span className="placeholder bg-secondary col-8"></span>
                    <span className="placeholder bg-secondary col-5"></span>
                  </div>

                  <Row>
                    <Col xl="6">
                      <div className="table-responsive">
                        <Table className="table table-borderless  mb-0">
                          <tbody>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    <Col xl="6">
                      <div className="table-responsive">
                        <Table className="table table-borderless  mb-0">
                          <tbody>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                            <tr>
                              <th style={{ width: "300px" }}>
                                <span className="placeholder bg-secondary col-8"></span>
                              </th>
                              <td>
                                <span className="placeholder bg-secondary col-5"></span>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PreloadDetail
