import { useEffect } from "react"

const events = ["load", "mousemove", "mousedown", "click", "scroll", "keypress"]

const AppLogout = ({ children }) => {
  let timer

  // ... (existing code)

  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer()
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach(item => {
        window.removeEventListener(item, resetTimer)
      })
      // logs out user
      logoutAction()
    }, 10800000) // 10000ms = 10secs. You can change the time.
  }

  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer)
  }

  // when component mounts, it adds event listeners to the window
  // each time any of the events is triggered (mousemove, click, scroll, keypress, etc.), the timer to logout the user after 10 secs of inactivity resets.
  // Additionally, the 'beforeunload' event is used to handle when the tab or browser is closed.
  useEffect(() => {
    Object.values(events).forEach(item => {
      window.addEventListener(item, () => {
        resetTimer()
        handleLogoutTimer()
      })
    })

    // Add event listener for the 'beforeunload' event
    window.addEventListener("beforeunload", resetTimer)

    // Clean up the 'beforeunload' event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", resetTimer)
    }
  }, [])

  // logs out user by clearing out auth token in localStorage and redirecting the URL to the /login page.
  const logoutAction = () => {
    localStorage.clear()
    window.location.pathname = "/login"
  }

  return children
}

export default AppLogout
