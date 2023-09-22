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

const Img = cell => {
  return (
    <>
      {!cell.value ? (
        <div className="avatar-xs">
          <span className="avatar-title rounded-circle">
            {/* {console.log("cell", cell.data[0].name)} */}
            {cell.data[0].name.charAt(0)}
          </span>
        </div>
      ) : (
        <div>
          <img className="rounded-circle avatar-xs" src={cell.value} alt="" />
        </div>
      )}
    </>
  )
}

export { Name, Email, Phone, Address, Gender, Img }
