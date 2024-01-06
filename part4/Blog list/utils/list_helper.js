const _ = require('lodash')
// Helper functions and unit tests
// Step1    Define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.✔
// Step2    Define a new totalLikes function that receives a list of blog posts as a parameter, returns the total sum of likes in all of the blog posts.✔
// Step3    Define a favoriteBlog function that receives a list of blogs as a parameter, returns the blog with most likes.✔
// Step4*   Define a funtion mostBlogs that returns the author who has the largest amount of blogs and the number of blogs.✔
// Step5*   Define a funtion mostBlogs that returns the author who has the largest amount of blogs and the number of likes.✔


const Blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let count = 0
    blogs.forEach(blog => {
        count += blog.likes
    })
    return count
}

const favoriteBlog = (blogs) => {
    if(blogs.length == 0){
        return null
    }   
    let favorite = {
        _id: '0',
        title: '',
        author: '',
        url: '',
        likes: 0,
        __v: 0
    }
    blogs.forEach(blog =>{
        if(blog.likes >= favorite.likes){
            favorite = {...blog}
        }
    })
    return favorite
    
}

const mostBlogs = (blogs) => {
    if(blogs.length == 0){
        return null
    }
    const convertedBlogs = []
    blogs.forEach(blog => {
        convertedBlogs.push({author: blog.author, blogs: 0 })
    })
    const uniqueBlogs = _.uniqBy(convertedBlogs, 'author')
    uniqueBlogs.forEach(uniqueBlog =>{
        convertedBlogs.forEach(convertedBlog => {
            if(uniqueBlog.author == convertedBlog.author){
                uniqueBlog['blogs'] += 1
            }
        })
    })
    const haveMostBlogs = uniqueBlogs[0]
    uniqueBlogs.forEach(uniqueBlog => {
        if (uniqueBlog.blogs > haveMostBlogs.blogs) {
            haveMostBlogs = {...uniqueBlog}
        }
    })
    return haveMostBlogs
}
const mostLikes = (blogs) =>{
    if(blogs.length == 0){
        return null
    }
    const convertedBlogs = []
    blogs.forEach(blog => {
        convertedBlogs.push({author: blog.author, likes: blog.likes })
    })
    const uniqueBlogs = _.uniqBy(convertedBlogs, 'author')
    uniqueBlogs.forEach(uniqueBlog =>{
        let counter = 0
        convertedBlogs.forEach(convertedBlog => {
            if(uniqueBlog.author == convertedBlog.author){
                counter += convertedBlog.likes
            }
        })
        uniqueBlog['likes'] = counter
    })
    const haveMostLikes = uniqueBlogs[0]
    uniqueBlogs.forEach(uniqueBlog => {
        if (uniqueBlog.likes > haveMostLikes.likes) {
            haveMostLikes = {...uniqueBlog}
        }
    })
    return haveMostLikes
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}