import Header from './Header'
import Content from './Content'

const Course = ( { course } ) => {
    const parts = course.parts
    const array = parts.map(part => part.exercises)
    const initialValue = 0
    const sum = array.reduce((acum, current) => acum + current, initialValue)
    
    return(
    <>
        <Header name={course.name}/>
        {parts.map(part =>  <Content key={part.id} part={part}/>) /*Show every part of the course*/ }
        <h2>total of {sum} exercises</h2>
    </>
    )
}
export default Course
