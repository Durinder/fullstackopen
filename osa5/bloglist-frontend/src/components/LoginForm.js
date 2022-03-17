import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2>log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
				username
        <input
          value={username}
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
				password
        <input
          value={password}
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id= 'login-button' type='submit'>login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func,
  username: PropTypes.string,
  setUsername: PropTypes.func,
  password: PropTypes.string,
  setPassword: PropTypes.func
}

export default LoginForm