const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur)

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}