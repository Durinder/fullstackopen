const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
	if (blogs.length === 0)
		return {error: "no blogs"}

	const favorite = blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur)

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0)
		return {error: "no blogs"}
	
	let ret = blogs[0].author
	let maxValue = 1
	let modeMap = {}
	for (let i = 0; i < blogs.length; i++)
	{
		let cur = blogs[i].author
		if (modeMap[cur] === undefined)
			modeMap[cur] = 1
		else
			modeMap[cur]++
		if (modeMap[cur] > maxValue) {
			ret = cur
			maxValue = modeMap[cur]
		}
	}
	
	return {
		author: ret,
		blogs: maxValue
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
}