import React, { useEffect, useState } from "react"

const LiveClock = () => {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)

    return () => {
      clearInterval(timerID)
    }
  }, [])

  const tick = () => {
    setDate(new Date())
  }

  const formatDay = date => {
    const days = [
      "Chủ Nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ]
    return days[date.getDay()]
  }

  const formatDate = date => {
    const formattedDate = date
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$2/$1/$3")
    return formattedDate
  }

  const formatTime = date => {
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    return formattedTime
  }

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-md px-3 font-size-14 header-item d-none d-sm-block"
        disabled={true}
      >
        {/* <i className="bx bx-calendar" /> */}
        <strong className="blockquote blockquote-reverse font-size-12">{`${formatDay(
          date
        )}, ${formatDate(date)}`}</strong>
        {/* <i className="bx bx-time-five" /> */}
        <strong className="blockquote blockquote-reverse font-size-12">{`${formatTime(
          date
        )}`}</strong>
      </button>
    </React.Fragment>
  )
}

export default LiveClock
