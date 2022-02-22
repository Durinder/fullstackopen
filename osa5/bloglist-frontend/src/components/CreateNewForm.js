import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const CreateNewForm = ({ user }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreate = async () => {
		console.log(user)
		const newBlog = {
			title: title,
			author: author,
			url: url
		}

		try {
			await blogService.create(newBlog)
		}
		catch (exception) {
			console.log(exception)
		}
	}

	return (
		<div>
			<form onSubmit={handleCreate}>
				<div>
					title
					<input
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

CreateNewForm.propTypes = {
	user: PropTypes.object
}

export default CreateNewForm