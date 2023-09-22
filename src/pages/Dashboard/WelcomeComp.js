import React, { useEffect, useState } from "react"

import { Row, Col, Card, CardBody } from "reactstrap"

import profileImg from "../../assets/images/profile-img.png"

const WelcomeComp = () => {
  const [info, setInfo] = useState({})

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      setInfo(obj)
    }
  }, [])

  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Empire Garage</h5>
                <p>Trang quản lý và theo dõi dành cho nhân viên</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="3">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={info.image}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              {/* <h5 className="font-size-15 text-truncate">Henry Price</h5>
              <p className="text-muted mb-0 text-truncate">
                Nhân viên tại Empire Garage
              </p> */}
            </Col>

            <Col sm="9">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15 text-truncate">{info.name}</h5>
                    {info.role === "RE" ? (
                      <p className="text-muted mb-0 text-truncate">
                        Lễ tân tại Empire Garage
                      </p>
                    ) : info.role === "MA" ? (
                      <p className="text-muted mb-0 text-truncate">
                        Quản lý tại Empire Garage
                      </p>
                    ) : info.role === "AD" ? (
                      <p className="text-muted mb-0 text-truncate">
                        Quản trị viên tại Empire Garage
                      </p>
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">{info.phone}</h5>
                    <p className="text-muted mb-0">{info.email}</p>
                  </Col>
                </Row>
              </div>
            </Col>

            {/* <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">125</h5>
                    <p className="text-muted mb-0">Projects</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">$1245</h5>
                    <p className="text-muted mb-0">Revenue</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link to="" className="btn btn-primary  btn-sm">
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col> */}
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
