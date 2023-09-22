import React, { useState } from "react"
import logo from "../../assets/images/Empire-Logo.png"
import BeatLoader from "react-spinners/BeatLoader"

export default function Loader() {
  return (
    <>
      <div id="preloader">
        <div id="status">
          <img src={logo} alt="" className="mx-auto d-block logo-load" />
          <BeatLoader color="#2c53d2" size={10} />
        </div>
      </div>
    </>
  )
}
