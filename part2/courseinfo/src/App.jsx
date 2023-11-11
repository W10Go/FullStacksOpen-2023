import Courses from "./components/Courses"
// Step6 Use components to show the header and all the parts of a course ✔
// Step7 Show the sum of the exercises of the course ✔
// Step8 Use the method reduce() to calculate the sum of exercises ✔
// Step9 extend our application to allow for an arbitrary number of courses ✔
// Separate Module

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Courses key={courses.id} courses={courses}/>
    </div>
  )
}
export default App