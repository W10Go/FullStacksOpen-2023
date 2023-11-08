import { useState } from 'react'

const NoFeedback = (prop) => { 
  if (prop.feedback == 0){ // If 0 button has being pressed the total must be 0
    return <p>No feedback given</p>
  }
}

const Statistics = (props) =>{
  const clicks = props.clicks
  if(clicks.total == 0){ // If 0 button has being pressed the total must be 0
    return
  }

  const average = () => {
    if (clicks.total === 0){
      return 0
    }
    else return((clicks.good - clicks.bad)/clicks.total)
  }
  const postivie = () =>{
    if (clicks.total === 0){
      return 0
    }
    else return((clicks.good)*100/clicks.total)
  }
  return(
    <table>
      <tbody>
        <tr>
          <td><StatisticLine text='good' value={clicks.good}/></td>
        </tr>
        <tr>
            <td><StatisticLine text='neutral' value={clicks.neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='bad' value={clicks.bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='all' value={clicks.total}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='average' value={average()}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='positive' value={postivie()+'%'}/></td>
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = (statistics) =>  <p>{statistics.text} {statistics.value}</p>


const Button = (addProp) =>{
  return(
    <button onClick={addProp.handler}>
      {addProp.text}
    </button>
  )
}
const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0
  })
  const addGood= () =>{
      const newClicks = { 
        ...clicks, 
        good: clicks.good + 1,
        total: clicks.total +1
      }
      setClicks(newClicks)
  }
  const addNeutral= () =>{
    const newClicks = { 
      ...clicks, 
      neutral: clicks.neutral + 1,
      total: clicks.total +1
    }
    setClicks(newClicks)
  }
  const addBad= () =>{
    const newClicks = { 
      ...clicks, 
      bad: clicks.bad + 1,
      total: clicks.total +1
  }
  setClicks(newClicks)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handler={addGood} text='good'/>
        <Button handler={addNeutral} text='neutral'/>
        <Button handler={addBad} text='bad'/>
      </div>
      <h1>Statistics</h1>
      <NoFeedback feedback={clicks.total}/>
      <Statistics clicks={clicks}/>
    </div>
  )
}

export default App