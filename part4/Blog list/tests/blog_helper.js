const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12,
    },
    {
      title: 'Cars and where to find them',
      author: 'Diego Carvajal',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    },
    {
      title: 'Hell 101',
      author: 'Puro Hueso',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
      })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }
  
  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, nonExistingId, blogsInDb
  }