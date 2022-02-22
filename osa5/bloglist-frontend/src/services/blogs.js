import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const blogService = {
	getAll: getAll
}

export default blogService