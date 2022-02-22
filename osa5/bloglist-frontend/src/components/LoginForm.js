import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
	<div>
		<h2>log in to application</h2>
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
			password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
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