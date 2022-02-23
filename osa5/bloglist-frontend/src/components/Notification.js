import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )}

Notification.propTypes = {
  message: PropTypes.string
}

Error.propTypes = {
  message: PropTypes.string
}

export { Notification, Error }