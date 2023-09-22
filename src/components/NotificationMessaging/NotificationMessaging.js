import { messaging, onMessageListener } from "helpers/firebase"
import React, { useEffect, useState } from "react"
import { Toast, ToastBody, ToastHeader } from "reactstrap"
import PropTypes from "prop-types"
import { connect } from "react-redux"

//Import dispatch
import { useDispatch } from "react-redux"
import { getToken } from "firebase/messaging"
import { postFcmToken } from "store/actions"

import { changeIsShow } from "store/actions"

const NotificationMessaging = props => {
  const dispatch = useDispatch()

  const [noti, setNoti] = useState({
    title: "",
    body: "",
  })

  const [uuid, setUuid] = useState("")

  const toggleToast = () => {
    dispatch(changeIsShow(!isShow))
  }

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        setUuid(obj.firebaseUuid)

        try {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BJjxtgb-iAq8YgbzV2bSIHxRjMLFTs39YpX5qeZBzxXM4yeOnr0HbyTCNCmEhm6LkM1-f4UvzDdWxtDLphFSg-8",
          })

          if (currentToken && uuid) {
            dispatch(postFcmToken(uuid, currentToken))
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            )
          }
        } catch (err) {
          console.log("An error occurred while retrieving token. ", err)
        }
      }
    }

    fetchData()
  })

  //Listen Notification

  onMessageListener()
    .then(payload => {
      // console.log(payload)
      const notification = payload
      setNoti({
        title: notification.notification.title,
        body: notification.notification.body,
      })
      if (notification) {
        dispatch(changeIsShow(true))
      }

      //Set a timeout for 5 seconds to close the notification
      setTimeout(() => {
        if (notification) {
          dispatch(changeIsShow(false))
        }
      }, 5000)
    })
    .catch(err =>
      console.log("An error occured while retrieving foreground message. ", err)
    )

  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
      <Toast isOpen={props.isShow}>
        <ToastHeader toggle={toggleToast}>
          {/* <img src={logo} alt="" className="me-2" height="18" /> */}
          {noti.title}
        </ToastHeader>
        <ToastBody>{noti.body}</ToastBody>
      </Toast>
    </div>
  )
}

NotificationMessaging.propTypes = {
  changeIsShow: PropTypes.func,
  isShow: PropTypes.bool,
}

const mapStateToProps = state => {
  return { ...state.Layout }
}

export default connect(mapStateToProps, {
  changeIsShow,
})(NotificationMessaging)
