const Header = (name) => {
  return(
    <h1>{name.course.name}</h1>
  )
}

const Content = (parts) => {
  return(
    <div>
      <Part part={parts.parts[0]}/>
      <Part part={parts.parts[1]}/>
      <Part part={parts.parts[2]}/>
    </div>
  )
}

const Total = (total) => {
  const sum = total.parts[0].exercises + total.parts[1].exercises + total.parts[2].exercises
  return(
    <p>
      Number of exercises {sum}
    </p>
  )
}

const Part = (part) =>{
  return(
    <p>
      {part.part.name} {part.part.exercises}
    </p>
  )
}
const App = () => {
  // Const-definitions
  const course = 'Half Stack application development'
  const courses = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={courses}/>
      <Content parts = {courses.parts}/>
      <Total parts={courses.parts}/>
    </div>
  )
}

export default App
