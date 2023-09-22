import React from "react"
import { Spinner } from "reactstrap"

const Loading = () => {
  return (
    <div className="pt-3">
      <div className="row justify-content-center">
        <div className="col-xl-12">
          <div>
            <div className="my-5">
              <div className="text-center">
                <Spinner className="ms-2 mt-4" color="primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
