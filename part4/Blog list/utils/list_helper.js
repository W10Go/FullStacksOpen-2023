
// Helper functions and unit tests
// Step1    Define a dummy function that receives an array of blog posts as a parameter and always returns the value 1.✔
// Step2    Define a new totalLikes function that receives a list of blog posts as a parameter, returns the total sum of likes in all of the blog posts.✔
// Step3    Define a favoriteBlog function that receives a list of blogs as a parameter, returns the blog with most likes.✔
// Step4*   

const blog = require("../models/blog")

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
    }else 
    {
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
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}