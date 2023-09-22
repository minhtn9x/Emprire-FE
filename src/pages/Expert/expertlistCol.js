import React from "react"

const Name = cell => {
  return cell.value ? cell.value : ""
}

const Email = cell => {
  return cell.value ? cell.value : ""
}

const Phone = ({ value }) => {
  if (!value) {
    return ""
  }

  const formattedPhone = `(+${value.slice(1, 3)}) ${value.slice(3)}`
  return formattedPhone
}

const Address = cell => {
  return cell.value ? cell.value : ""
}

const Gender = cell => {
  return cell.value ? "Nam" : cell.value === false ? "Nữ" : "Không xác định"
}

const WorkloadTotal = cell => {
  return cell.value !== undefined ? cell.value : 0
}

const isAvailable = cell => {
  return cell.value ? "true" : "false"
}

export { Name, Email, Phone, Address, Gender, WorkloadTotal, isAvailable }
