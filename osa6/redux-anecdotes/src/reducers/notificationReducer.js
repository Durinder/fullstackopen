import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNewNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { setNewNotification, clearNotification } = notificationSlice.actions

let timeoutID

export const setNotification = (message, time) => {
  if (typeof timeoutID === 'number') {
    clearTimeout(timeoutID)
  }
  return dispatch => {
    dispatch(setNewNotification(message))
    timeoutID  = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
}
}

export default notificationSlice.reducer