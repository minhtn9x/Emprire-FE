import React from "react"

const Name = cell => {
  return cell.value ? cell.value : ""
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

export { Name, Img }
