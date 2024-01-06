const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listEmpty = []

const biggerList = [
  {
    _id: '1',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '2',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '3',
    title: 'Cars and where to find them',
    author: 'Diego Carvajal',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '4',
    title: 'Hell 101',
    author: 'Puro Hueso',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('When the list is empty, equals zero', () => {
    const result = totalLikes(listEmpty)
    expect(result).toBe(0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('When the list hast more of one blog, equals the sum of every post', () => {
    const result = totalLikes(biggerList)
    expect(result).toBe(19)
  })
})

describe('favorite blog', () => {
  test('When the list is empty, the blog must be null', () => {
    const result = favoriteBlog(listEmpty)
    expect(result).toEqual(null)
  })
  test('When list has only one blog, the blog must be that one', () => {
    const result = favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('When the list hast more of one blog, the blog must be the one with most likes', () => {
    const result = favoriteBlog(biggerList)
    expect(result).toEqual({
      _id: '2',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 12,
      __v: 0
    })
  })
})

describe('most blogs', () => {
  test('When the list is empty, the blog must be null', () => {
    const result = mostBlogs(listEmpty)
    expect(result).toEqual(null)
  })
  test('When the list has only one blog, the blog must be the author and the likes of that one ',() => {
    const result = mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })
  test('When the list hast more than one blog, the return must be the author with the most blogs',()=> {
    const result = mostBlogs(biggerList)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})
describe('most likes', () =>{
  test('when the list is empty, the return must be null', () => {
    const result = mostLikes(listEmpty)
    expect(result).toEqual(null)
  })
  test('When the list has only one blog, returns that one',() => {
    const result = mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('When the list hast more than one blog, the return must be the author with the most likes',()=> {
    const result = mostLikes(biggerList)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})