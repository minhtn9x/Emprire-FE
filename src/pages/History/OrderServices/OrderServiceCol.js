import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

const formatDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const timeFormat = format && format.includes("H") ? "HH:mm:ss" : ""
  const formattedDate = moment(new Date(date))
    .format(`${dateFormat} - ${timeFormat}`)
    .trim()
  return formattedDate
}

const OrderCode = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? "#" + cell.value : ""}
    </Link>
  )
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const DateCell = cell => {
  if (!cell.value) {
    return "Không tồn tại"
  }
  const formattedDateTime = formatDate(cell.value, "DD/MM/YYYY")
  return `${formattedDateTime.split(" ")[0]}` // return the formatted date and time in the desired format
}

const DateTimeCell = cell => {
  if (!cell.value) {
    return "Không tồn tại"
  }
  const formattedDateTime = formatDate(cell.value, "DD/MM/YYYY H:mm:ss")
  const formattedTime = formattedDateTime.split(" - ")[1] // get the formatted time from the formatted date and time
  return ` ${formattedTime} - ${formattedDateTime.split(" ")[0]}` // return the formatted date and time in the desired format
}

const Phone = ({ value }) => {
  if (!value) {
    return ""
  }

  const formattedPhone = `(+${value.slice(1, 3)}) ${value.slice(3)}`
  return formattedPhone
}

const ModalCar = cell => {
  return cell.value ? cell.value : ""
}

const Plate = cell => {
  return cell.value ? cell.value : ""
}

const Expert = cell => {
  return cell.value ? cell.value : "Chưa có kỹ thuật viên"
}

export {
  OrderCode,
  Name,
  DateCell,
  ModalCar,
  Plate,
  Expert,
  DateTimeCell,
  Phone,
}
