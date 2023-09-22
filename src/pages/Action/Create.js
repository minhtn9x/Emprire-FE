import React, { useEffect, useState } from "react"
import { Container, Row, Nav, NavItem, NavLink, Col, Card } from "reactstrap"
import { withRouter } from "react-router-dom"

import classnames from "classnames"

import Breadcrumbs from "../../components/Common/Breadcrumb"

import AddNewCarBrand from "pages/CarBrand/AddNewCarBrand"
import AddNewCarModel from "pages/Model/AddNewCarModel"
import AddNewCarProblem from "pages/Problem/AddNewProblem"
import AddNewCarItem from "pages/Item/AddNewItems"

const CreateNew = props => {
  //meta title
  document.title = "Tạo mới | Empire Garage"

  const createNew = [
    { link: "/create-new-symptom", icon: "bx bx-flag", title: "Triệu chứng" },
    { link: "/create-new-brand", icon: "bx bx-planet", title: "Thương Hiệu" },
    { link: "/create-new-model", icon: "bx bxs-car", title: "Dòng xe" },
    {
      link: "/create-new-problem",
      icon: "bx bx-cog",
      title: "Vấn đề",
    },
    {
      link: "/create-new-item",
      icon: "bx bx-wrench",
      title: "Dịch vụ",
    },
    {
      link: "/import-data-excel",
      icon: "bx bx-file",
      title: "Excel",
    },
    {
      link: "/create-new-guest",
      icon: "bx bxs-user-plus",
      title: "Khách vãng lai",
    },
  ]

  const handleItemClick = link => {
    props.history.push(link)
  }

  /*
  ==================================================
  MODEL
  ==================================================
  */

  return (
    <>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Tạo mới" breadcrumbItem="Thêm mới" />

          <Row>
            {createNew.map((item, index) => (
              <Col xl="4" sm="6" key={"__create-new__" + index}>
                <Card>
                  <Row>
                    <Col xl="12">
                      <div
                        className="text-center p-4 border-end"
                        onClick={() => handleItemClick(item.link)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="mx-auto mb-3 mt-1">
                          <i
                            className={item.icon + " d-block bg-soft mb-2"}
                            style={{ fontSize: "36px" }}
                          />
                        </div>
                        <strong className="font-size-16">{item.title}</strong>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default withRouter(CreateNew)
