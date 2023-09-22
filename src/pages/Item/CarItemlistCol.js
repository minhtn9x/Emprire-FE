import React from "react"
import { Input } from "reactstrap"

const formatPriceVND = price => {
  // Assuming the input `price` is a number representing the price in VND
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const Category = cell => {
  return cell.value ? cell.value : ""
}

const Warranty = cell => {
  return cell.value ? cell.value + " tháng" : "Chưa có thời gian bảo hành"
}

const Price = cell => {
  return cell.value ? formatPriceVND(cell.value) : "Chưa có giá"
}

const IsCell = cell => {
  const isChecked = cell.value === true
  const isDisabled = cell.value === false

  return (
    <div>
      <Input
        type="checkbox"
        className="form-check-input"
        id="invalidCheck"
        checked={isChecked}
        disabled={isDisabled}
        readOnly
      />
    </div>
  )
}

const Img = cell => {
  return (
    <>
      {!cell.value ? (
        <div className="avatar-sm">
          <span className="avatar-title rounded">
            {/* {console.log("cell", cell.data[0].name)} */}
            {cell.data[0].name.charAt(0)}
          </span>
        </div>
      ) : (
        <div>
          <img className="rounded avatar-sm" src={cell.value} alt="" />
        </div>
      )}
    </>
  )
}

export { Name, Img, Price, Warranty, Category, IsCell }
